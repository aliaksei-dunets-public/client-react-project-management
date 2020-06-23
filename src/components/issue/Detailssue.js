import React from 'react';
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";
import Hidden from '@material-ui/core/Hidden';

import { GET_ISSUE } from '../../config/gqls';
import { DetailssuePage, DetailssueTabs } from './';
import { LoadingComponent, ErrorServiceComponent } from '../common';

const Detailssue = () => {

    const { id } = useParams();

    return (
        <Query
            query={GET_ISSUE}
            variables={{ id }}
        >
            {({ loading, error, data }) => {
                if (loading) return <LoadingComponent loading={loading} />;
                if (error) return <ErrorServiceComponent error={error} />;

                return (
                    <>
                        <Hidden smDown>
                            <DetailssuePage issue={data.issue} />
                        </Hidden>
                        <Hidden mdUp>
                            <DetailssueTabs issue={data.issue} />
                        </Hidden>
                    </>
                );
            }}
        </Query>
    );
}

export default Detailssue;