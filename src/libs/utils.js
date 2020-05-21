import moment from 'moment';

export const getArray4DateRange = (startDate, endDate) => {

    let range = [];
    const difCount = moment(endDate).diff(startDate, 'days');

    for (let i = 0; i <= difCount; i++) {
        range.push(moment(startDate).clone().add(i, 'days'));
    }

    return range;
}

class BaseTime {
    constructor(time = 0) {
        this.time = time;
    }

    getTime() {
        return this.time;
    }
}

class DateTime extends BaseTime {
    constructor(date, time, project_id, issue_id, timelog_id) {
        super(time);
        this.date = moment(date);
        this.project_id = project_id;
        this.issue_id = issue_id;
        this.timelog_id = timelog_id;
    }

    collectTime(time) {
        this.time += +time;
    }

    isTheSameDate(date) {
        return this.date.isSame(date, "day");
    }
}

class RangeDateTime {
    constructor() {
        this.rangeDateTime = [];
    }

    addDateTime({ date, time, project_id, issue_id, timelog_id }) {
        this.rangeDateTime.push(new DateTime(date, time, project_id, issue_id, timelog_id));
    }

    getByIssue(id) {
        return this.rangeDateTime.filter(item => item.issue_id === id);
    }

    getByProject(id) {
        return this.rangeDateTime.filter(item => item.project_id === id);
    }
}

class IssueTime extends BaseTime {
    constructor(data) {
        super();
        this.id = data.id;
        this.project_id = data.project_id;
        this.code = data.code;
        this.summary = data.summary;
        this.timeSlots = new RangeDateTime();
    }

    addRangeDateTime(dateRange, timelogs) {

        const issueTimelogs = timelogs.getByIssue(this.id);

        for (let i = 0; i < dateRange.length; i++) {

            const instanceDateTime = issueTimelogs.find(item => {
                return item.isTheSameDate(dateRange[i])
            });

            if (instanceDateTime) {
                this.timeSlots.addDateTime(instanceDateTime);
                this.time += +instanceDateTime.getTime();
            }
            else this.timeSlots.addDateTime({
                date: dateRange[i],
                project_id: this.project_id,
                issue_id: this.id
            });
        }
    }
}

class ProjectTime extends BaseTime {
    constructor(data) {
        super();
        this.id = data.id;
        this.code = data.code;
        this.name = data.name;
        this.issues = [];
        this.timelogs = [];
        this.timeSlots = new RangeDateTime();
    }

    addIssues(childs) {
        this.issues = [...childs.filter(item => item.project_id === this.id)];
    }

    addRangeDateTime(dateRange, timelogs) {

        const projectTimelogs = timelogs.getByProject(this.id);

        for (let i = 0; i < dateRange.length; i++) {

            const instanceDateTime = projectTimelogs.find(item => {
                return item.isTheSameDate(dateRange[i])
            });

            if (instanceDateTime) {
                this.timeSlots.addDateTime(instanceDateTime);
                this.timelogs.push(instanceDateTime);
                this.time += +instanceDateTime.getTime();
            }
            else this.timeSlots.addDateTime({
                date: dateRange[i],
                project_id: this.id
            });
        }
    }
}

export const generateTimesheet = (data, startDate, endDate) => {

    let projects = [],
        issues = [],
        timelogs = new RangeDateTime();
    const array4DateRange = getArray4DateRange(startDate, endDate);

    data.timelogs.forEach(element => {
        timelogs.addDateTime({
            date: element.dateLog,
            time: element.valueLog,
            project_id: element.project_id,
            issue_id: element.issue_id,
            timelog_id: element.id
        });
    });

    data.issues.forEach(element => {
        const instanecIssue = new IssueTime(element);
        instanecIssue.addRangeDateTime(array4DateRange, timelogs);
        issues.push(instanecIssue);
    });

    data.projects.forEach(element => {
        const instanceProject = new ProjectTime(element);
        instanceProject.addRangeDateTime(array4DateRange, timelogs);
        instanceProject.addIssues(issues);
        projects.push(instanceProject);
    });

    return {
        timesheet: projects,
        dateRange: array4DateRange
    };
}

export const generateSimpleBar = (data, startDate, endDate) => {

    let legendDetail = [];
    let barCharDetail = [];

    let projects = [],
        timelogs = new RangeDateTime();

    const array4DateRange = getArray4DateRange(startDate, endDate);

    array4DateRange.forEach((item, index) => {
        barCharDetail.push({
            period: moment.weekdays(true, index + 1),
            date: item
        })
    });

    if (!data.timelogs) return {
        legendDetail,
        barCharDetail
    };

    data.timelogs.forEach(element => {
        timelogs.addDateTime({
            date: element.dateLog,
            time: element.valueLog,
            project_id: element.project_id,
            issue_id: element.issue_id,
            timelog_id: element.id
        });
    });

    data.projects.forEach(element => {
        const instanceProject = new ProjectTime(element);
        instanceProject.addRangeDateTime(array4DateRange, timelogs);
        projects.push(instanceProject);
    });

    projects.forEach((project, index) => {

        legendDetail.push({
            key: project.id,
            legend: `${project.name} (${project.code})`,
            fill: getFillColor(index),
            id: project.id
        });

        project.timeSlots.rangeDateTime.forEach((dateTime, index) => {

            let singleBarDetail = barCharDetail.find(item => item.date.isSame(dateTime.date, "day"));

            if (dateTime.time > 0) {
                if (!singleBarDetail.hasOwnProperty(project.id)) singleBarDetail[project.id] = +dateTime.time;
                else singleBarDetail[project.id] = +dateTime.time;
            }

        });

    });

    return {
        legendDetail,
        barCharDetail
    }
}

const getFillColor = (index) => {
    // '#8884d8'
    //'rgb(31, 119, 180)'
    // rgb(255, 127, 14) - orange
    // rgb(140, 86, 75) - bronw
    // rgb(44, 160, 44) - green
    const colors = ['rgb(31, 119, 180)', 'rgb(255, 127, 14)', 'rgb(140, 86, 75)', 'rgb(44, 160, 44)', '#8884d8'];
    return colors[index];
}