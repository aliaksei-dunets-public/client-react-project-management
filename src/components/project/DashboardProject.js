import React from 'react';
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";

import { GET_PROJECT_ISSUE_SET } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import TableIssues from '../issue/TableIssues';
import CreateIssue from '../issue/CreateIssue';

const DashboardProject = () => {

    const { id } = useParams();

    return (
        <>
            <Query
                query={GET_PROJECT_ISSUE_SET}
                variables={{ id }}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return 'Refetching!';
                    if (loading) return <LoadingComponent loading={loading} />;
                    if (error) return <ErrorServiceComponent error={error} />;

                    return (
                        <>
                            <TableIssues issues={data.project.issues} />
                            <CreateDialogComponent title="Create a new issue">
                                <CreateIssue project={data.project} />
                            </CreateDialogComponent>
                        </>
                        // <div className={classes.root}>
                        //     <List dense component="nav" aria-label="issues">
                        //         {data.project.issues.map(row => (
                        //             <>
                        //                 <ListItem
                        //                     key={row.id}
                        //                     button
                        //                     selected={selectedId === row.id}
                        //                     onClick={() => { setSelectedId(row.id) }}
                        //                 >
                        //                     <ListItemText
                        //                         primary={row.code}
                        //                         secondary={row.summary}
                        //                     />
                        //                 </ListItem>
                        //                 <Divider />
                        //             </>
                        //         )
                        //         )}
                        //     </List>                            
                        // </div>
                    );
                }}
            </Query>
        </>
    );
}

export default DashboardProject;