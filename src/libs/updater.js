import {
    FRAGMENT,
    MESSAGE_BAR_LOCAL,
    GET_ISSUE
} from '../config/gqls';

import { severity } from '../config/constants';

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

