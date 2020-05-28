import moment from 'moment';

export class Aggregator {

    constructor(startDate, endDate) {
        this.startDate = moment(startDate);
        this.endDate = moment(endDate);

        this.projects = [];
        this.issues = [];
        this.timelogs = [];

        this.rangeDates = Aggregator.generateRangeDates(this.startDate, this.endDate);
    }

    static generateRangeDates = (startDate, endDate) => {

        let range = [];
        const difCount = endDate.diff(startDate, 'days');

        for (let i = 0; i <= difCount; i++) {
            range.push(startDate.clone().add(i, 'days'));
        }

        return range;
    }

    buildTimelogs(timelogs) {
        if (!timelogs) return this;

        timelogs.forEach(element => {
            this.timelogs.push(new Timelog(element));
        });

        return this;
    }

    buildIssues(issues) {
        if (!issues) return this;

        issues.forEach(element => {
            const instIssueTime = new IssueTime(element);
            // Timelogs exist -> collect times for issue
            if (this.timelogs) instIssueTime.collectTimeByDates(this.rangeDates, this.timelogs);

            this.issues.push(instIssueTime);
        });

        return this;
    }

    buildProjects(projects) {
        if (!projects) return this;

        projects.forEach(element => {
            const instProjectTime = new ProjectTime(element);

            // Issues exist -> add issues to project
            if (this.issues) instProjectTime.setIssues(this.issues);
            // Timelogs exist -> collect times for project
            if (this.timelogs) instProjectTime.collectTimeByDates(this.rangeDates, this.timelogs);

            this.projects.push(instProjectTime);
        });

        return this;
    }

    getRangeDates() {
        return this.rangeDates;
    }

    getPeriodDates() {
        return {
            startDate: this.startDate,
            endDate: this.endDate
        }
    }

    getProjects() {
        return this.projects;
    }

    getIssues() {
        return this.issues;
    }

    getTimelogs() {
        return this.timelogs;
    }

    getTimesheet() {
        return this.getProjects();
    }

    getSimpleBarChart() {

        const getFillColor = (index) => {
            // '#8884d8'
            //'rgb(31, 119, 180)'
            // rgb(255, 127, 14) - orange
            // rgb(140, 86, 75) - bronw
            // rgb(44, 160, 44) - green
            const colors = ['rgb(31, 119, 180)', 'rgb(255, 127, 14)', 'rgb(140, 86, 75)', 'rgb(44, 160, 44)', '#8884d8'];
            return colors[index];
        }

        let legend = [];
        let barChar = [];

        this.rangeDates.forEach((item, index) => {
            barChar.push({
                point: moment.weekdays(true, index + 1),
                date: item,
                hasTime: false,
            })
        });

        this.projects.forEach((project, index) => {
            legend.push({
                key: project.id,
                legend: `${project.name} (${project.code})`,
                fill: getFillColor(index),
                id: project.id
            });

            project.totalByDates.forEach(element => {
                let singleBarChar = barChar.find(item => element.date.isSame(item.date, "day"));

                if (element.time > 0) {
                    singleBarChar[project.id] = +element.time;
                    singleBarChar.hasTime = true;
                }
            });

        });

        //Remove  Saturday And Sunday if they equal = 0
        if (barChar[barChar.length - 1].hasTime === false) {
            // Remove Sunday
            barChar.pop();
            if (barChar[barChar.length - 1].hasTime === false) {
                // Remove Sunday
                barChar.pop();
            }
        }

        return {
            legend,
            barChar
        }
    }
}

class TimeBase {
    constructor(time = 0) {
        this.time = time;
    }

    addTime(time) {
        this.time += +time;
    }
}

class DateTimeBase extends TimeBase {
    constructor({ id, project_id, issue_id, date, time, descr }) {
        super(time);

        this.id = id;
        this.project_id = project_id;
        this.issue_id = issue_id;
        this.date = moment(date);
        this.descr = descr;

        if (this.id) this.isExistTimelog = true;
        else this.isExistTimelog = false;
    }

    isTheSameDate(date) {
        if (!date) return false;
        return this.date.isSame(date, 'day');
    }

    collectDateTime(instDateTime) {
        this.id = instDateTime.id;
        this.project_id = instDateTime.project_id;
        this.issue_id = instDateTime.issue_id;
        this.descr = instDateTime.descr;
        this.addTime(instDateTime.time);
    }
}

class Timelog extends DateTimeBase {
    constructor({ id, project_id, issue_id, dateLog, valueLog, descr }) {
        super({
            id,
            project_id,
            issue_id,
            date: dateLog,
            time: valueLog,
            descr
        });
    }
}

class ModelBase {
    constructor(id) {
        this.id = id;
        this.total = new TimeBase();
        this.totalByDates = [];    // Array of DateTimeBase
    }

    collectTimeByDates(rangeDates, arrayDateTime) {

        const filteredArrayDateTime = this.filterArrayDateTime(arrayDateTime);

        for (let i = 0; i < rangeDates.length; i++) {

            let instTotalDateTime = this.totalByDates.find(item => {
                return item.isTheSameDate(rangeDates[i])
            });

            if (!instTotalDateTime) {
                instTotalDateTime = this.createDateTime(rangeDates[i]);
                this.totalByDates.push(instTotalDateTime);
            }

            const collArrayDateTime = filteredArrayDateTime.filter(item => {
                return item.isTheSameDate(rangeDates[i])
            });

            if (!collArrayDateTime) continue;
            collArrayDateTime.forEach(item => {
                this.total.addTime(item.time);
                instTotalDateTime.collectDateTime(item);
            });
        }
    }

    filterArrayDateTime(arrayDateTime) {
        throw new Error('Method <filterArrayDateTime> is not implemented');
    }

    createDateTime(date) {
        throw new Error('Method <createDateTime> is not implemented');
    }
}

class IssueTime extends ModelBase {
    constructor({ id, project_id, code, summary }) {
        super(id);
        this.project_id = project_id;
        this.code = code;
        this.summary = summary;
    }

    filterArrayDateTime(arrayDateTime) {
        return arrayDateTime.filter(item => item.issue_id === this.id);
    }

    createDateTime(date) {
        return new DateTimeBase({
            project_id: this.project_id,
            issue_id: this.id,
            date,
        });
    }
}

class ProjectTime extends ModelBase {
    constructor({ id, code, name }) {
        super(id);
        this.code = code;
        this.name = name;
        this.issues = [];
    }

    filterArrayDateTime(arrayDateTime) {
        return arrayDateTime.filter(item => item.project_id === this.id);
    }

    createDateTime(date) {
        return new DateTimeBase({
            project_id: this.id,
            date,
        });
    }

    setIssues(issues) {
        this.issues = issues.filter(item => item.project_id === this.id);
    }
}