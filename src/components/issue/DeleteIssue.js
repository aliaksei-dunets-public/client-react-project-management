import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

import { useMutation } from '@apollo/react-hooks';
import { severity } from '../../config/constants';
import { MESSAGE_BAR_LOCAL, GET_ISSUE_SET, GET_PROJECT_ISSUE_SET, DELETE_ISSUE } from '../../config/gqls';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: 400,
    },
    buttons: {
        width: '100%',
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}));

export default function DeleteFormProject({ issue, handleHide }) {

    const classes = useStyles();

    const [deleteProject] = useMutation(DELETE_ISSUE);

    const updateCache = (cache, { data: { deleteIssue } }) => {
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

        cache.writeQuery({
            query: MESSAGE_BAR_LOCAL,
            data: {
                messageBarOpen: true,
                messageBarSeverity: severity.success,
                messageBarText: `Issue ${issue.summary} (${issue.code}) was deleted successfully.`,
            },
        });
    };

    const handleDelete = () => {
        deleteProject({
            variables: { id: issue.id, deleteChild: true },
            update: updateCache,
        });
        handleHide();
    }

    return (
        <div className={classes.root}>
            <DialogContentText id="alert-dialog-description">
                During deletion of the Issue all timelogs will be deleted too. Are you sure?
            </DialogContentText>
            <div className={classes.buttons}>
                <Button color="primary" onClick={handleHide}>Cancel</Button>
                <Button color="primary" onClick={handleDelete} >Delete</Button>
            </div>
        </div>
    );
};

DeleteFormProject.propTypes = {
    issue: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired
};
