import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from "react-router-dom";
import { Query } from "react-apollo";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// import { nav } from '../../config/constants';
import { GET_PROJECT_ISSUE_SET } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';
// import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
// import LabelValueComponent from '../common/LabelValueComponent';
// import StatusComponent from '../common/StatusComponent';
// import ExternalLinkComponent from '../common/ExternalLinkComponent';
// import CreateDialogComponent from '../common/CreateDialogComponent';
import TableIssues from '../issue/TableIssues';
// import CreateIssue from '../issue/CreateIssue';
// import UpdateFormProject from './UpdateFormProject';
// import DeleteFormProject from './DeleteFormProject';
import DialogHandler from '../common/DialogHandler';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    fabEdit: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(10),
    },
    fabDelete: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
}));

const DashboardProject = () => {

    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();

    const [selectedId, setSelectedId] = useState(null);

    // const dialogUpdateHandler = DialogHandler();
    // const DialogUpdateComponent = dialogUpdateHandler.component;

    // const dialogDeleteHandler = DialogHandler();
    // const DialogDeleteComponent = dialogDeleteHandler.component;

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
                        <div className={classes.root}>
                            <List dense component="nav" aria-label="issues">
                                {data.project.issues.map(row => (
                                    <>
                                        <ListItem
                                            key={row.id}
                                            button
                                            selected={selectedId === row.id}
                                            onClick={() => { setSelectedId(row.id) }}
                                        >
                                            <ListItemText
                                                primary={row.code}
                                                secondary={row.summary}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                )
                                )}
                            </List>

                            {/* <TableIssues issues={data.project.issues} /> */}
                        </div>
                    );
                }}
            </Query>
        </>
    );
}

export default DashboardProject;