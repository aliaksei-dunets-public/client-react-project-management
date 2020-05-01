import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TableIssues from './TableIssues';

const GET_TASK_SET = gql`
    {
        issues {
            id
            code
            project_id
            summary
            descr
            status
            external_code
        }  
    }
`

const PageIssue = () => {
    return (
        <Query
            query={GET_TASK_SET}
            notifyOnNetworkStatusChange
        >
            {({ loading, error, data, refetch, networkStatus }) => {
                if (networkStatus === 4) return 'Refetching!';
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                    <>
                        <TableIssues issues={data.issues} />
                    </>
                );
            }}
        </Query>
    );
}

export default PageIssue;