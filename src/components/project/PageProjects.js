import React from 'react';
import { Query } from "react-apollo";

import TableProjects from './TableProjects';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import CreateFormProject from './CreateFormProject';

import { GET_PROJECT_SET } from '../../config/gqls';

const PageProject = () => {

    return (
        <>
            <Query
                query={GET_PROJECT_SET}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return 'Refetching!';
                    if (loading) return <LoadingComponent loading={loading} />;
                    if (error) return <ErrorServiceComponent error={error} />;

                    return (
                        <>
                            <TableProjects projects={data.projects} />
                        </>
                    );
                }}

            </Query>
            <CreateDialogComponent title="Create a new Project">
                <CreateFormProject />
            </CreateDialogComponent>
        </>

    );
}

export default PageProject;