import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Query } from "react-apollo";
import { Mutation } from '@apollo/react-components';
import { makeStyles } from '@material-ui/core/styles';

import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import FormIssue from './FormIssue';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';

import { issueUpdater } from '../../libs';
import { GET_ISSUE, UPDATE_ISSUE } from '../../config/gqls';

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

const UpdateIssuePage = () => {

    const classes = styles();

    const history = useHistory();
    const { id } = useParams();

    const handleClose = () => {
        history.goBack();
    }

    const handleSave = (updateIssue, input) => {
        updateIssue({ variables: { id, input } });
    }

    return (

        <Query
            query={GET_ISSUE}
            variables={{ id }}
        >
            {({ loading, error, data }) => {

                if (loading) return <LoadingComponent loading={loading} />;
                if (error) return <ErrorServiceComponent error={error} />;

                return (
                    <Mutation
                        mutation={UPDATE_ISSUE}
                        key={data.issue.id}
                        update={issueUpdater.updated}
                    >
                        {
                            (updateIssue) => (

                                <div className={classes.root}>
                                    <div className={classes.container}>
                                        <ToolbarDetailComponent title={`Update issue - ${data.issue.code}`} />
                                        <FormIssue
                                            issue={data.issue}
                                            cancelHandler={handleClose}
                                            saveHandler={(input) => { handleSave(updateIssue, input) }}
                                        />
                                    </div>
                                </div>

                            )
                        }
                    </Mutation>
                );
            }}
        </Query >

    );
}

export default UpdateIssuePage;