import moment from 'moment';

/**
* @param {String} startDate 
* @param {String} endDate 
* @param {Object} apiData - Data from API 
 */
export const generateTimesheet = (startDate, endDate, apiData) => {

    const aggregator = new Aggregator(startDate, endDate, apiData.timelogs)
        .buildIssueTimeslots(apiData.issues)
        .buildProjectTimeslots(apiData.projects);

    return {
        projects: aggregator.getModelProjects(),
        timeslots: aggregator.getTimeslots()
    }
}

/**
* @param {String} startDate 
* @param {String} endDate 
* @param {Object} apiData - Data from API 
 */
export const generateSimpleBarChart = (startDate, endDate, apiData) => {

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

    const aggregator = new Aggregator(startDate, endDate, apiData.timelogs)
        .buildProjectTimeslots(apiData.projects);

    aggregator.getTimeslots().forEach((item, index) => {
        barChar.push({
            index,
            point: window.innerWidth <= 650 ? moment.weekdaysShort(index + 1) : moment.weekdays(index + 1),
            date: item.date,
            hasTime: false,
        })
    });

    aggregator.getModelProjects().forEach((project, index) => {

        legend.push({
            key: project.id,
            legend: `${project.name} (${project.code})`,
            fill: getFillColor(index),
            id: project.id
        });

        project.timeslots.forEach(timeslot => {
            let singleBarChar = barChar.find(item => timeslot.isSameDate(item.date, "day"));

            if (timeslot.time > 0) {
                singleBarChar[project.id] = +timeslot.time;
                singleBarChar.hasTime = true;
            }
        });

    });

    //Remove  Saturday And Sunday if they equal = 0
    if (barChar.length > 0 && barChar[barChar.length - 1].hasTime === false) {
        // Remove Sunday
        barChar.pop();
        if (barChar[barChar.length - 1].hasTime === false) {
            // Remove Saturday
            barChar.pop();
        }
    }

    return {
        legend,
        barChar
    }

}

export class Aggregator {

    /**
     * @param {String} startDate 
     * @param {String} endDate 
     * @param {Array} Timelogs - API Timelogs array
     */
    constructor(startDate, endDate, timelogs) {
        this.startDate = moment.utc(startDate);
        this.endDate = moment.utc(endDate);

        this.projects = [];
        this.issues = [];
        this.timelogs = [];
        this.timeslots = [];

        this._initTimelogs(timelogs);
    }

    _getInitTimeslots() {
        if (this.timeslots.length === 0) {
            let localStartDate = this.startDate.clone();
            // Initialize timeslots
            const difCount = this.endDate.diff(this.startDate, 'days');
            for (let i = 0; i <= difCount; i++) {
                this.timeslots.push(new TimeslotBase(localStartDate));
                localStartDate.add(1, 'days');
            }
        }

        return this.timeslots;
    }

    /**
     * @param {Array} timelogs - API Timelogs array
     */
    _initTimelogs(timelogs) {
        if (timelogs && timelogs.length !== 0) {
            timelogs.forEach(timelog => {
                this.timelogs.push(new TimelogModel(timelog));
            });
        }
    }

    /**
     * @returns {Array} 
     */
    getModelTimelogs() {
        return this.timelogs;
    }

    /**
     * @returns {Array} 
     */
    getModelIssues() {
        return this.issues;
    }

    /**
     * @returns {Array} 
     */
    getModelProjects() {
        return this.projects;
    }

    /**
     * @returns {Array} 
     */
    getTimeslots() {
        return this._getInitTimeslots();
    }

    /**
     * @param {Array} issues - API Issues array
     */
    buildIssueTimeslots(issues) {
        if (issues && issues.length !== 0) {
            issues.forEach(issue => {
                const instance = new IssueModel(issue);

                // Calculate timeslots for Issue
                if (this.timelogs.length !== 0) instance.calculateTimeslots(this.timelogs, this._getInitTimeslots());

                this.issues.push(instance);
            });
        }
        return this;
    }

    /**
     * @param {Array} projects - API Projects array
     */
    buildProjectTimeslots(projects) {
        if (projects && projects.length !== 0) {

            // Clear Project Model in order to exclude duplicate data
            this.projects = [];

            projects.forEach(project => {
                const instance = new ProjectModel(project);

                // Determine issues of the Project
                if (this.issues.length !== 0) {
                    instance.issues = this.issues.filter(item => item.project_id === project.id);
                }

                // Calculate timeslots for Project
                if (this.timelogs.length !== 0) {
                    instance.calculateTimeslots(this.timelogs, this._getInitTimeslots());
                }

                this.projects.push(instance);
            });
        }
        return this;
    }

    /**
     * @param {Array} projects - API Projects array
     */
    buildProjectTotalTime(projects) {
        if (projects && projects.length !== 0) {

            // Clear Project Model in order to exclude duplicate data
            this.projects = [];

            projects.forEach(project => {
                const instance = new ProjectModel(project);

                // Calculate total Time for Project
                if (this.timelogs.length !== 0) instance.calculateTotalTime(this.timelogs);

                this.projects.push(instance);
            });
        }
        return this;
    }

}

class TimeBase {
    /**
     * @param {Number} time - Initial Time (Default = 0)
     */
    constructor(time = 0) {
        this.time = time;
    }

    /**
     * @param {Number} time - Add additional time to the current
     */
    addTime(time) {
        this.time += +time;
    }
}

class TimeslotBase extends TimeBase {

    /**
     * @param {Date} date - Timeslot Date
     * @param {Number} time - Timeslot Time
     */
    constructor(date, time) {
        super(time);
        this.date = moment(date);
        this.weekend = false;

        const dayOfWeek = this.date.day();
        if (dayOfWeek === 6 || dayOfWeek === 0) this.weekend = true;
    }

    /**
     * @param {Date} date - Date of comparison with the Timeslot date
     * @returns {Boolean} - The dates are the same or not
     */
    isSameDate(date) {
        if (!date) return false;

        return this.date.isSame(date, 'day');
    }

    /**
     * @param {Number} time - Time of the Timeslot
     */
    collectTime(time) {
        this.addTime(time);
    }

    /**
     * @param {Object} timelog - instance of the Timeslot   
     */
    collectTimelog({ id, time, descr, paidUp }) {
        this.id = id;
        this.descr = descr;
        this.paidUp = paidUp;
        this.addTime(time);
    }

    static collectTotalTime(timeslots) {
        let total = 0;
        for (let i = 0; i < timeslots.length; i++) {
            total += timeslots[i].time;
        }

        return total;
    }
}

class ModelBase {

    /**
     * @param {String} id - ID of the Model
     */
    constructor(id) {
        this.id = id;
        this.total = new TimeBase();
        this.timeslots = [];            // Array of TimeslotBase
    }

    /**
     * @param {Array} timelogs 
     */
    _filterTimelogs(timelogs) {
    }

    /**
     * @param {Array} timelogs 
     * @param {Array} timeslots 
     */
    calculateTimeslots(timelogs, timeslots) {
        if (!timeslots || timeslots.length === 0) return;
        timeslots.forEach(element => {
            this.timeslots.push(new TimeslotBase(element.date));
        });
    }

    /**
     * @param {Array} timelogs 
     */
    calculateTotalTime(timelogs) {
        this.total.addTime(TimeslotBase.collectTotalTime(this._filterTimelogs(timelogs)));
    }
}

class ProjectModel extends ModelBase {

    /**
     * @param {Object} project - Object from API
     */
    constructor({ id, code, name }) {
        super(id);
        this.code = code;
        this.name = name;
        this.issues = [];
    }

    /**
     * @param {Array} timelogs 
     * @param {Array} timeslots 
     */
    calculateTimeslots(timelogs, timeslots) {
        super.calculateTimeslots(timelogs, timeslots);

        const projectTimelogs = this._filterTimelogs(timelogs);
        if (!projectTimelogs || projectTimelogs.length === 0) return;

        projectTimelogs.forEach(element => {
            this.total.addTime(element.time);

            if (this.timeslots.length !== 0) {
                const timeslot = this.timeslots.find(slot => slot.isSameDate(element.date));
                if (timeslot) {
                    timeslot.collectTime(element.time);
                }
            }
        });
    }

    /**
     * @param {Array} timelogs 
     */
    _filterTimelogs(timelogs) {
        return timelogs.filter(item => item.project_id === this.id);
    }
}

class IssueModel extends ModelBase {

    /**
     * @param {Object} issue - Object from API  
     */
    constructor({ id, project_id, code, summary }) {
        super(id);
        this.project_id = project_id;
        this.code = code;
        this.summary = summary;
    }

    /**
     * @param {Array} timelogs 
     * @param {Array} timeslots 
     */
    calculateTimeslots(timelogs, timeslots) {
        super.calculateTimeslots(timelogs, timeslots);

        const issueTimelogs = this._filterTimelogs(timelogs);
        if (!issueTimelogs || issueTimelogs.length === 0) return;

        issueTimelogs.forEach(element => {
            this.total.addTime(element.time);

            if (this.timeslots.length !== 0) {
                const timeslot = this.timeslots.find(slot => slot.isSameDate(element.date));
                if (timeslot) {
                    timeslot.collectTimelog(element);
                }
            }
        });
    }

    /**
     * @param {Array} timelogs 
     */
    _filterTimelogs(timelogs) {
        return timelogs.filter(item => item.issue_id === this.id);
    }
}

class TimelogModel extends TimeslotBase {

    /**
     * @param {Object} timelog - Object from API
     */
    constructor({ id, project_id, issue_id, dateLog, valueLog, descr, paidUp }) {
        super(dateLog, valueLog);
        this.id = id;
        this.project_id = project_id;
        this.issue_id = issue_id;
        this.descr = descr;
        this.paidUp = paidUp;
    }
}

