import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import TableStories from './TableStories';

const GET_STORY_SET = gql`
    {
        stories {
            id
            projection_id
            version_id
            code
            summary
            descr
        }  
    }
`

const PageStories = () => {
    return (
        <Query
            query={GET_STORY_SET}
            notifyOnNetworkStatusChange
        >
            {({ loading, error, data, refetch, networkStatus }) => {
                if (networkStatus === 4) return 'Refetching!';
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                    <>
                        <TableStories stories={data.stories} />
                        {/* <button onClick={() => refetch()}>Refetch!</button> */}
                    </>
                );
            }}
        </Query>
    );
}

export default PageStories;