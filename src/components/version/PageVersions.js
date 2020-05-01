import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TableVersions from './TableVersions';

const GET_PROJECT_SET = gql`
    {
        versions {
            id
            projection_id
            version
            name
            descr
            status
        }  
    }
`

const PageVersion = () => {
    return (
        <Query
            query={GET_PROJECT_SET}
            notifyOnNetworkStatusChange
        >
            {({ loading, error, data, refetch, networkStatus }) => {
                if (networkStatus === 4) return 'Refetching!';
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                    <>
                        <TableVersions versions={data.versions} />
                        {/* <button onClick={() => refetch()}>Refetch!</button> */}
                    </>
                );
            }}
        </Query>
    );
}

export default PageVersion;