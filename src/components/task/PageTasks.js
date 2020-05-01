import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TableTasks from './TableTasks';

const GET_TASK_SET = gql`
    {
        tasks {
            id
            projection_id
            version_id
            story_id
            level
            code            
            summary
            descr
            status
            total
        }  
    }
`

const PageTask = () => {
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
                        <TableTasks tasks={data.tasks} />
                    </>
                );
            }}
        </Query>
    );
}

export default PageTask;