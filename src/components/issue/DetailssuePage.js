import React from 'react';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import LabelValueComponent from '../common/LabelValueComponent';
import StatusComponent from '../common/StatusComponent';
import PriorityComponent from '../common/PriorityComponent';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import { UpdateIssueDialog, DeleteIssue } from '.';
import DialogHandler from '../common/DialogHandler';
import { TableTimelogs, CreateFormTimelog } from '../timelog';
import { TableSubIssues } from '../subIssue';

const DetailssuePage = ({ issue }) => {

    const dialogUpdateHandler = DialogHandler();
    const DialogUpdateComponent = dialogUpdateHandler.component;

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    return (
        <>
            <ToolbarDetailComponent title={`Issue: ${issue.code}`} >
                <Hidden xsDown>
                    <Button variant="contained" color="primary" onClick={dialogUpdateHandler.show}>
                        Edit
                    </Button>
                    <Button variant="contained" color="primary" onClick={dialogDeleteHandler.show}>
                        Delete
                    </Button>
                </Hidden>
            </ToolbarDetailComponent>
            <LabelValueComponent label='Code' value={issue.code} />
            <LabelValueComponent label='Summary' value={issue.summary} />
            <LabelValueComponent label='Description' value={issue.descr} />
            <LabelValueComponent label='Status' >
                <StatusComponent status={issue.status} />
            </LabelValueComponent>
            <LabelValueComponent label='Priority' >
                <PriorityComponent code={issue.priority} />
            </LabelValueComponent>
            {
                (issue.external_url && issue.external_code) ?
                    <LabelValueComponent label='External' >
                        <ExternalLinkComponent url={issue.external_url} code={issue.external_code} />
                    </LabelValueComponent>
                    : null
            }

            <DialogUpdateComponent title={`Update the issue - ${issue.summary}`}>
                <UpdateIssueDialog issue={issue} handleCloseDialog={dialogUpdateHandler.hide} />
            </DialogUpdateComponent>
            <DialogDeleteComponent title={`Delete the issue - ${issue.summary}`}>
                <DeleteIssue issue={issue} handleHide={dialogDeleteHandler.hide} />
            </DialogDeleteComponent>

            <TableSubIssues issue_id={issue.id} project_id={issue.project_id} subIssues={issue.subIssues}/>
            <TableTimelogs timelogs={issue.timelogs} />
            
            <CreateDialogComponent title="Create a new timelog">
                <CreateFormTimelog issue={issue} />
            </CreateDialogComponent>
        </>
    );
}

export default DetailssuePage;