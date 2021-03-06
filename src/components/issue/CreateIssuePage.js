import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import FormIssue from './FormIssue';
import ToolbarDetailComponent from '../common/ToolbarDetailComponent';

import i18n from '../../i18n';
import { nav } from '../../config/constants';
import { issueUpdater } from '../../libs';
import { CREATE_ISSUE } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'inherit',
        },
    },
}));

const CreateIssuePage = () => {

    const classes = styles();
    const history = useHistory();
    const { project_id, external_url } = useParams();

    const [createMutation] = useMutation(CREATE_ISSUE, { update: issueUpdater.created });

    const handleClose = () => {
        project_id ? history.push(`${nav.dashboard.path}/${project_id}`) : history.push(`${nav.issues.path}`);
    }

    const handleSave = (input) => {
        createMutation({ variables: { input } });
        handleClose();
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <ToolbarDetailComponent title={i18n.getText('issueCreateDialogTitle')} />
                <FormIssue
                    issue={{ project_id, external_url: external_url ? decodeURIComponent(external_url) : '' }}
                    cancelHandler={handleClose}
                    saveHandler={handleSave}
                />
            </div>
        </div>
    );
}

export default CreateIssuePage;