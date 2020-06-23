import React from 'react';
import { Query } from "react-apollo";

import { GET_ISSUE_SET } from '../../config/gqls';
import { statuses } from '../../config/constants';
import TableIssues from './TableIssues';
import {
    LoadingComponent,
    ErrorServiceComponent,
} from '../common';

const PageOpenIssue = () => {
    return (
        <Query
            query={GET_ISSUE_SET}
        >
            {({ loading, error, data }) => {
                if (loading) return <LoadingComponent loading={loading} />;
                if (error) return <ErrorServiceComponent error={error}/>;

                const openIssues = data.issues.filter((item) => item.status === statuses.NEW.code || item.status === statuses.PROGRESS.code);

                return (
                    <>
                        <TableIssues issues={openIssues} />
                    </>
                );
            }}
        </Query>
    );
}

export default PageOpenIssue;