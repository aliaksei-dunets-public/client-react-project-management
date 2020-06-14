import React from 'react';
import { Query } from "react-apollo";

import { GET_ISSUE_SET } from '../../config/gqls';
import TableIssues from './TableIssues';
import {
    LoadingComponent,
    ErrorServiceComponent,
} from '../common';

const PageIssue = () => {
    return (
        <Query
            query={GET_ISSUE_SET}
        >
            {({ loading, error, data }) => {
                if (loading) return <LoadingComponent />;
                if (error) return <ErrorServiceComponent />;

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