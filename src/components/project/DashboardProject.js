import React from 'react';
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";
import { useHistory } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';

import { nav } from '../../config/constants';
import { GET_PROJECT_ISSUE_SET } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import CreateFabComponent from '../common/CreateFabComponent';
import { TableIssues, CreateIssueDialog } from '../issue';

const DashboardProject = () => {

    const { id } = useParams();

    const history = useHistory();

    return (
        <>
            <Query
                query={GET_PROJECT_ISSUE_SET}
                variables={{ id }}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data }) => {
                    if (loading) return <LoadingComponent loading={loading} />;
                    if (error) return <ErrorServiceComponent error={error} />;

                    return (
                        <>
                            <TableIssues issues={data.project.issues} />

                            <Hidden mdUp>
                                <CreateFabComponent 
                                    handleClick={() => history.push(`${nav.create_issue.path}/${data.project.id}/${encodeURIComponent(data.project.external_url)}`)} />
                            </Hidden>
                            <Hidden smDown>
                                <CreateDialogComponent title="Create a new issue">
                                    <CreateIssueDialog project={data.project} />
                                </CreateDialogComponent>
                            </Hidden>
                        </>
                    );
                }}
            </Query>
        </>
    );
}

export default DashboardProject;