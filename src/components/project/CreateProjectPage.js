import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import FormProject from './FormProject';

import { nav, severity } from '../../config/constants';
import { GET_PROJECT_SET, CREATE_PROJECT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

const CreateProjectPage = () => {

    const classes = styles();

    const history = useHistory();

    const updater = (cache, { data: { createProject } }) => {
        const { projects } = cache.readQuery({ query: GET_PROJECT_SET });
        cache.writeQuery({
            query: GET_PROJECT_SET,
            data: { projects: projects.concat([createProject]) },
        });
        cache.writeData({
            data: {
                messageBarOpen: true,
                messageBarSeverity: severity.success,
                messageBarText: `Project ${createProject.name} (${createProject.code}) was created successfully.`,
            },
        });
    };

    const [createMutation] = useMutation(CREATE_PROJECT, { update: updater });

    const handleClose = () => {
        history.push(nav.projects.path);
    }

    const handleSave = (input) => {
        createMutation({ variables: { input } });
        history.push(nav.projects.path);
    }

    return (
        <div className={classes.root}>
            <FormProject
                title={`Create a new Project`}
                project={{}}
                cancelHandler={handleClose}
                saveHandler={handleSave}
            />
        </div>
    );
}

export default CreateProjectPage;