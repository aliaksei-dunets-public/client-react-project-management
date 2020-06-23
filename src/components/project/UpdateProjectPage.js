import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Query } from "react-apollo";
import { Mutation } from '@apollo/react-components';
import { makeStyles } from '@material-ui/core/styles';

import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import FormProject from './FormProject';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';

import { nav } from '../../config/constants';
import { GET_PROJECT, UPDATE_PROJECT } from '../../config/gqls';

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

const UpdateProjectPage = () => {

    const classes = styles();

    const history = useHistory();
    const { id } = useParams();

    const handleClose = () => {
        history.goBack();
    }

    const handleSave = (updateProject, input) => {
        updateProject({ variables: { id, input } });
        history.push(nav.projects.path);
    }

    return (

        <Query
            query={GET_PROJECT}
            variables={{ id }}
        >
            {({ loading, error, data }) => {

                if (loading) return <LoadingComponent loading={loading} />;
                if (error) return <ErrorServiceComponent error={error} />;

                return (
                    <Mutation mutation={UPDATE_PROJECT} key={data.project.id}>
                        {(updateProject) => (

                            <div className={classes.root}>
                                <div className={classes.container}>
                                    <ToolbarDetailComponent title={`Update the project - ${data.project.code}`} />
                                    <FormProject
                                        project={data.project}
                                        cancelHandler={handleClose}
                                        saveHandler={(input) => { handleSave(updateProject, input) }}
                                    />
                                </div>
                            </div>

                        )}
                    </Mutation>
                );
            }}
        </Query>

    );
}

export default UpdateProjectPage;