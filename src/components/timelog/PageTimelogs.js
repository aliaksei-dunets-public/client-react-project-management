import React from 'react';
import { Query } from "react-apollo";

import { GET_TIMELOG_SET } from '../../config/gqls';
import TableTimelogs from './TableTimelogs';

const PageTimelog = () => {
    return (
        <Query
            query={GET_TIMELOG_SET}
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