import React from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import i18n from '../../i18n';
import { GET_PROJECT_SET } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';

const useStyles = makeStyles((theme) => ({
    option: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const AutocompleteProject = ({ isError, setProjectId, setExternalUrl = (data) => { return; } }) => {

    const classes = useStyles();

    const handleSelectProject = (param) => {
        if (param) {
            setProjectId(param.id);
            setExternalUrl(param.external_url);
        } else {
            setProjectId('');
            setExternalUrl('');
        }
    }

    return (
        <>
            <Query query={GET_PROJECT_SET}>
                {({ loading, error, data }) => {

                    if (loading) return <LoadingComponent loading={loading} />;
                    if (error) return <ErrorServiceComponent error={error} />;

                    const activeProjects = data.projects.filter((item) => item.status === "ACTIVE");

                    return (
                        <>
                            <Autocomplete
                                className={classes.option}
                                id="autocomplete_project"                                
                                options={activeProjects}
                                getOptionLabel={option => `${option.code}: ${option.name}`}
                                onChange={(event, param) => { handleSelectProject(param) }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={i18n.getText('labelProject')}                                        
                                        fullWidth
                                        required
                                        error={isError}
                                    />
                                )}
                            />
                        </>
                    );
                }}
            </Query>
        </>
    );
}

AutocompleteProject.propTypes = {
    isError: PropTypes.bool.isRequired,
    setProjectId: PropTypes.func.isRequired,
    setExternalUrl: PropTypes.func,
};

export default AutocompleteProject;