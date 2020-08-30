import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { nav } from '../../config/constants';
import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import LabelValueComponent from '../common/LabelValueComponent';
import StatusComponent from '../common/StatusComponent';
import PriorityComponent from '../common/PriorityComponent';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import { DeleteIssue } from '.';
import DialogHandler from '../common/DialogHandler';
import { TableSubIssues } from '../subIssue';
import { TableTimelogs, CreateFormTimelog } from '../timelog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        marginTop: theme.spacing(1),
    },
    fabEdit: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(10),
    },
    fabDelete: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
}));

const DetailssueTabs = ({ issue }) => {

    const classes = useStyles();
    const history = useHistory();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    const TabContent = () => {

        switch (value) {
            case 0:
                return (
                    <div className={classes.content}>
                        <TableSubIssues issue_id={issue.id} project_id={issue.project_id} subIssues={issue.subIssues} />
                    </div>
                );
            case 1:
                return (
                    <div className={classes.content}>
                        <TableTimelogs timelogs={issue.timelogs} />
                        <CreateDialogComponent title="Create a new timelog">
                            <CreateFormTimelog issue={issue} />
                        </CreateDialogComponent>

                    </div>
                );
            case 2:
                return (
                    <div className={classes.content}>
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

                        <DialogDeleteComponent title={`Delete issue - ${issue.code}`}>
                            <DeleteIssue
                                issue={issue}
                                handleHide={(wasDeleted) => {
                                    dialogDeleteHandler.hide();
                                    if (wasDeleted) history.goBack();
                                }} />
                        </DialogDeleteComponent>
                        <Fab
                            className={classes.fabEdit}
                            size="medium"
                            color="primary"
                            aria-label="edit"
                            onClick={() => history.push(`${nav.update_issue.path}/${issue.id}`)}
                        >
                            <EditIcon />
                        </Fab>
                        <Fab
                            className={classes.fabDelete}
                            size="medium"
                            color="secondary"
                            aria-label="delete"
                            onClick={dialogDeleteHandler.show}
                        >
                            <DeleteIcon />
                        </Fab>
                    </div>
                );
            default:
                return (null);
        }

    }

    return (
        <>
            <ToolbarDetailComponent title={`Issue: ${issue.code}`} />
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Tasks" />
                    <Tab label="Timelogs" />
                    <Tab label="Details" />
                    {/* <Tab label="History" /> */}
                </Tabs>
            </AppBar>

            <TabContent />
        </>
    );
}

export default DetailssueTabs;