import {
    FRAGMENT,
    GET_ISSUE
} from '../config/gqls';

import { severity } from '../config/constants';

const showMessaeBar = (cache, severity, text) => {
    cache.writeData({
        data: {
            messageBarOpen: true,
            messageBarSeverity: severity,
            messageBarText: text
        },
    });
}

export const createdTimelog = (cache, { data: { createTimelog } }) => {
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

    showMessaeBar(cache, severity.success, `Timelog was created successfully.`);

}

export const createdMultiTimelogs = (cache, { data: { createMultiTimelogs } }) => {
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

    showMessaeBar(cache, severity.success, `Timelogs were created successfully.`);

}

export const updatedTimelog = (cache, { data: { updateTimelog } }) => {
    try {
        cache.writeFragment({
            id: updateTimelog.id,
            fragment: FRAGMENT.fragments.TIMELOG_COMMON,
            data: {
                updateTimelog
            }
        });
    } catch (error) {

    }
}

export const deletedTimelog = (cache, { data: { deleteTimelog } }) => {
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

    showMessaeBar(cache, severity.success, `Timelog was deleted successfully.`);

}

