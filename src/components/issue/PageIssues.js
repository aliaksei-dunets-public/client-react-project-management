import React from 'react';
import { Query } from "react-apollo";

import { GET_ISSUE_SET } from '../../config/gqls';
import TableIssues from './TableIssues';

const PageIssue = () => {
    return (
        <Query
            query={GET_ISSUE_SET}
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