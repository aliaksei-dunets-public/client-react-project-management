import React from 'react';
import MaterialTable from 'material-table';
import { useMutation } from "@apollo/react-hooks";

import StatusComponent from '../common/StatusComponent';
import PriorityComponent from '../common/PriorityComponent';
import { statuses, priority } from '../../config/constants';
import { subIssueUpdater } from '../../libs';
import { CREATE_SUB_ISSUE, UPDATE_SUB_ISSUE, DELETE_SUB_ISSUE } from '../../config/gqls';

const TableSubIssus = ({ project_id, issue_id, subIssues }) => {
    const columns = [
        { title: 'Summary', field: 'summary' },
        { title: 'Description', field: 'descr' },
        {
            title: 'Status',
            field: 'status',
            render: rowData => <StatusComponent status={rowData.status} />,
            // 10 - PROGRESS, 20 - NEW, 30 - HOLD, 40 - READY, 50 - CLOSED
            lookup: {
                [statuses.NEW.code]: [statuses.NEW.name],
                [statuses.PROGRESS.code]: [statuses.PROGRESS.name],
                [statuses.HOLD.code]: [statuses.HOLD.name],
                [statuses.READY.code]: [statuses.READY.name],
                [statuses.CLOSED.code]: [statuses.CLOSED.name],
            },
        },
        {
            title: 'Priority',
            field: 'priority',
            render: rowData => <PriorityComponent code={rowData.priority} />,
            // 1 - Critical, 2 - High, 3 - Medium, 4 - Low
            lookup: {
                [priority.LOW.code]: [priority.LOW.name],
                [priority.MEDIUM.code]: [priority.MEDIUM.name],
                [priority.HIGH.code]: [priority.HIGH.name],
                [priority.CRITICAL.code]: [priority.CRITICAL.name],
            },
        },
    ];

    const [createMutation] = useMutation(CREATE_SUB_ISSUE, { update: subIssueUpdater.created });
    const [updateMutation] = useMutation(UPDATE_SUB_ISSUE, { update: subIssueUpdater.updated });
    const [deleteMutation] = useMutation(DELETE_SUB_ISSUE, { update: subIssueUpdater.deleted });

    return (
        <MaterialTable
            title="Taks"
            columns={columns}
            data={subIssues ? subIssues : []}
            editable={{
                onRowAdd: (newData) => {
                    return createMutation({
                        variables: {
                            input: {
                                project_id,
                                issue_id,
                                ...newData
                            }
                        }
                    })
                },
                onRowUpdate: (newData, oldData) => {
                    return updateMutation({
                        variables: {
                            id: oldData.id,
                            input: {
                                summary: newData.summary,
                                descr: newData.descr,
                                status: newData.status,
                                priority: newData.priority,
                            }
                        }
                    })
                },
                onRowDelete: (oldData) => {
                    return deleteMutation({
                        variables: {
                            id: oldData.id,
                        }
                    })
                },
            }}
        />
    );
}

export default TableSubIssus;