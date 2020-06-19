import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import FormProject from './FormProject';

import { nav } from '../../config/constants';
import { projectUpdater } from '../../libs';
import { CREATE_PROJECT } from '../../config/gqls';

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

const CreateProjectPage = () => {

    const classes = styles();

    const history = useHistory();

    const [createMutation] = useMutation(CREATE_PROJECT, { update: projectUpdater.created });

    const handleClose = () => {
        history.push(nav.projects.path);
    }

    const handleSave = (input) => {
        createMutation({ variables: { input } });
        history.push(nav.projects.path);
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <ToolbarDetailComponent title={`Create a new Project`} />
                <FormProject
                    project={{}}
                    cancelHandler={handleClose}
                    saveHandler={handleSave}
                />
            </div>
        </div>
    );
}

export default CreateProjectPage;