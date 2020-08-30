import {
    FRAGMENT,
    MESSAGE_BAR_LOCAL,
    GET_PROJECT_SET,
    GET_PROJECT_ISSUE_SET,
    GET_ISSUE_SET,
    GET_ISSUE
} from '../config/gqls';

import { severity, statuses, priority } from '../config/constants';

const showMessageBar = (cache, severity, text) => {
    cache.writeQuery({
        query: MESSAGE_BAR_LOCAL,
        data: {
            messageBarOpen: true,
            messageBarSeverity: severity,
            messageBarText: text,
        },
    });
}

const sortByFieldAsc = (a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
}

class ProjectCacheUpdater {

    _sortProjects(a, b) {
        return sortByFieldAsc(statuses[a.status].value, statuses[b.status].value) || sortByFieldAsc(a.code, b.code);
    }

    created = (cache, { data: { createProject } }) => {
        const { projects } = cache.readQuery({ query: GET_PROJECT_SET });

        const newProjects = projects.concat([createProject]);

        newProjects.sort(this._sortProjects);

        cache.writeQuery({
            query: GET_PROJECT_SET,
            data: { projects: newProjects },
        });

        showMessageBar(cache, severity.success, `Project ${createProject.name} (${createProject.code}) was created successfully.`);
    };

    updated = (cache, { data: { updateProject } }) => {

        const { projects } = cache.readQuery({ query: GET_PROJECT_SET });

        cache.writeQuery({
            query: GET_PROJECT_SET,
            data: { projects: projects.sort(this._sortProjects) },
        });
        showMessageBar(cache, severity.success, `Project ${updateProject.name} (${updateProject.code}) was updated successfully.`);
    };

    deleted = (cache, { data: { deleteProject } }) => {
        const { projects } = cache.readQuery({ query: GET_PROJECT_SET });
        cache.writeQuery({
            query: GET_PROJECT_SET,
            data: { projects: projects.filter((item) => deleteProject.id !== item.id) }
        });

        showMessageBar(cache, severity.success, `Project ${deleteProject.name} (${deleteProject.code}) was deleted successfully.`);

    };
}

class IssueCacheUpdater {

    _sortIssues(a, b) {
        return sortByFieldAsc(statuses[a.status].value, statuses[b.status].value) ||
            sortByFieldAsc(priority[a.priority].value, priority[b.priority].value) ||
            sortByFieldAsc(a.code, b.code);
    }

    created = (cache, { data: { createIssue } }) => {
        try {
            const { issues } = cache.readQuery({ query: GET_ISSUE_SET });

            const newIssues = issues.concat(createIssue);
            newIssues.sort(this._sortIssues);

            cache.writeQuery({
                query: GET_ISSUE_SET,
                data: { issues: newIssues }
            });
        } catch (error) {

        }

        try {
            const { project } = cache.readQuery({ query: GET_PROJECT_ISSUE_SET, variables: { id: createIssue.project_id } });

            const newProject = { ...project };
            const newIssues = project.issues.concat(createIssue);
            newIssues.sort(this._sortIssues);
            newProject.issues = newIssues;

            cache.writeQuery({
                query: GET_PROJECT_ISSUE_SET,
                data: { project: newProject }
            });
        } catch (error) {

        }

        showMessageBar(cache, severity.success, `Issue ${createIssue.summary} (${createIssue.code}) was created successfully.`);
    };

    updated = (cache, { data: { updateIssue } }) => {
        try {
            const { issues } = cache.readQuery({ query: GET_ISSUE_SET });

            issues.sort(this._sortIssues);

            cache.writeQuery({
                query: GET_ISSUE_SET,
                data: { issues: issues }
            });
        } catch (error) {

        }

        try {
            const { project } = cache.readQuery({ query: GET_PROJECT_ISSUE_SET, variables: { id: updateIssue.project_id } });

            const newProject = { ...project };
            newProject.issues.sort(this._sortIssues);

            cache.writeQuery({
                query: GET_PROJECT_ISSUE_SET,
                data: { project: newProject }
            });
        } catch (error) {

        }

        showMessageBar(cache, severity.success, `Issue ${updateIssue.summary} (${updateIssue.code}) was updated successfully.`);
    };

    deleted = (cache, { data: { deleteIssue } }) => {
        try {
            const { issues } = cache.readQuery({ query: GET_ISSUE_SET });
            cache.writeQuery({
                query: GET_ISSUE_SET,
                data: { issues: issues.filter((item) => deleteIssue.id !== item.id) }
            });
        } catch (error) {

        }

        try {
            const { project } = cache.readQuery({ query: GET_PROJECT_ISSUE_SET, variables: { id: deleteIssue.project_id } });
            const newProject = { ...project };
            newProject.issues = project.issues.filter((item) => deleteIssue.id !== item.id);
            cache.writeQuery({
                query: GET_PROJECT_ISSUE_SET,
                data: { project: newProject }
            });
        } catch (error) {

        }

        showMessageBar(cache, severity.success, `Issue ${deleteIssue.summary} (${deleteIssue.code}) was deleted successfully.`);

    };
}

export class SubIssueCacheUpdater {
    constructor(showMessage) {
        this.showMessage = showMessage;
    }

    created = (cache, { data: { createSubIssue } }) => {
        try {
            const { issue } = cache.readQuery({ query: GET_ISSUE, variables: { id: createSubIssue.issue_id } });
            const newIssue = { ...issue };
            newIssue.subIssues = issue.subIssues.concat(createSubIssue);
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue: newIssue }
            });
        } catch (error) {

        }

        if (this.showMessage) showMessageBar(cache, severity.success, `Task was created successfully.`);
    }

    updated = (cache, { data: { updateSubIssue } }) => {
        try {
            cache.writeFragment({
                id: updateSubIssue.id,
                fragment: FRAGMENT.fragments.SUB_ISSUE_COMMON,
                data: {
                    ...updateSubIssue,
                    __typename: "SubIssue"
                }
            });
        } catch (error) {

        }
    }

    deleted = (cache, { data: { deleteSubIssue } }) => {
        try {
            const { issue } = cache.readQuery({ query: GET_ISSUE, variables: { id: deleteSubIssue.issue_id } });
            const newIssue = { ...issue };
            newIssue.subIssues = issue.subIssues.filter((item) => deleteSubIssue.id !== item.id);
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue: newIssue }
            });
        } catch (error) {

        }

        if (this.showMessage) showMessageBar(cache, severity.success, `Task was deleted successfully.`);

    }
}

export class TimelogCacheUpdater {
    constructor(showMessage) {
        this.showMessage = showMessage;
    }

    createdSingle = (cache, { data: { createTimelog } }) => {
        try {
            const { issue } = cache.readQuery({ query: GET_ISSUE, variables: { id: createTimelog.issue_id } });
            const newIssue = { ...issue };
            newIssue.timelogs = issue.timelogs.concat(createTimelog);
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue: newIssue }
            });
        } catch (error) {

        }

        if (this.showMessage) showMessageBar(cache, severity.success, `Timelog was created successfully.`);
    }

    createdMulti = (cache, { data: { createMultiTimelogs } }) => {
        try {
            const issue_id = createMultiTimelogs[0].issue_id;

            const { issue } = cache.readQuery({ query: GET_ISSUE, variables: { id: issue_id } });
            const newIssue = { ...issue };
            newIssue.timelogs = issue.timelogs.concat(createMultiTimelogs);
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue: newIssue }
            });
        } catch (error) {

        }

        if (this.showMessage) showMessageBar(cache, severity.success, `Timelogs were created successfully.`);

    }

    updated = (cache, { data: { updateTimelog } }) => {
        try {
            cache.writeFragment({
                id: updateTimelog.id,
                fragment: FRAGMENT.fragments.TIMELOG_COMMON,
                data: {
                    ...updateTimelog,
                    __typename: "Timelog"
                }
            });
        } catch (error) {

        }
    }

    deleted = (cache, { data: { deleteTimelog } }) => {
        try {
            const { issue } = cache.readQuery({ query: GET_ISSUE, variables: { id: deleteTimelog.issue_id } });
            const newIssue = { ...issue };
            newIssue.timelogs = issue.timelogs.filter((item) => deleteTimelog.id !== item.id);
            cache.writeQuery({
                query: GET_ISSUE,
                data: { issue: newIssue }
            });
        } catch (error) {

        }

        if (this.showMessage) showMessageBar(cache, severity.success, `Timelog was deleted successfully.`);

    }
}

export const projectUpdater = new ProjectCacheUpdater();
export const issueUpdater = new IssueCacheUpdater();
export const subIssueUpdater = new SubIssueCacheUpdater(true);


