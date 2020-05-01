import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TableTimelogs from './TableTimelogs';

const GET_TASK_SET = gql`
    {
        timelogs {
            id
            project_id
            issue_id
            dateLog
            valueLog
            descr
        }  
    }
`

const PageTimelog = () => {
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
                        <TableTimelogs timelogs={data.timelogs} />
                    </>
                );
            }}
        </Query>
    );
}

export default PageTimelog;