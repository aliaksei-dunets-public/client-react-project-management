import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TableProjections from './TableProjections';

const GET_PROJECT_SET = gql`
    {
        projections {
            id
            code
            name
            descr
            status
        }  
    }
`

const PageProjection = () => {
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
                        <TableProjections projections={data.projections} />
                        {/* <button onClick={() => refetch()}>Refetch!</button> */}
                    </>
                );
            }}
        </Query>
    );
}

export default PageProjection;