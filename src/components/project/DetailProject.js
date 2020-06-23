import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from "react-router-dom";
import { Query } from "react-apollo";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from '@material-ui/core/Hidden';

import { nav } from '../../config/constants';
import { GET_PROJECT } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';
import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import LabelValueComponent from '../common/LabelValueComponent';
import StatusComponent from '../common/StatusComponent';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import UpdateProjectDialog from './UpdateProjectDialog';
import DeleteProjectDialog from './DeleteProjectDialog';
import DialogHandler from '../common/DialogHandler';

const useStyles = makeStyles(theme => ({
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

const DetailProject = () => {

    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();

    const dialogUpdateHandler = DialogHandler();
    const DialogUpdateComponent = dialogUpdateHandler.component;

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    return (
        <>
            <Query
                query={GET_PROJECT}
                variables={{ id }}
                notifyOnNetworkStatusChange
            >
                {({ loading, error, data }) => {
                    if (loading) return <LoadingComponent loading={loading} />;
                    if (error) return <ErrorServiceComponent error={error} />;

                    return (
                        <>
                            <ToolbarDetailComponent title={`Project: ${data.project.code}`} >
                                <Hidden xsDown>
                                    <Button variant="contained" color="primary" onClick={dialogUpdateHandler.show}>
                                        Edit
                                </Button>
                                    <Button variant="contained" color="primary" onClick={dialogDeleteHandler.show}>
                                        Delete
                                </Button>
                                </Hidden>
                            </ToolbarDetailComponent>
                            {/* <LabelValueComponent label='ID' value={data.project.id} /> */}
                            <LabelValueComponent label='Code' value={data.project.code} />
                            <LabelValueComponent label='Name' value={data.project.name} />
                            <LabelValueComponent label='Description' value={data.project.descr} />
                            <LabelValueComponent label='Status' >
                                <StatusComponent status={data.project.status} />
                            </LabelValueComponent>

                            {
                                (data.project.external_url && data.project.external_code) ?
                                    <LabelValueComponent label='External' >
                                        <ExternalLinkComponent url={data.project.external_url} code={data.project.external_code} />
                                    </LabelValueComponent>
                                    : null
                            }

                            <Hidden smUp>
                                <Fab
                                    className={classes.fabEdit}
                                    size="medium"
                                    color="primary"
                                    aria-label="edit"
                                    onClick={() => history.push(`${nav.update_project.path}/${data.project.id}`)}
                                >
                                    <EditIcon />
                                </Fab>
                                <Fab
                                    className={classes.fabDelete}
                                    size="medium"
                                    color="secondary"
                                    aria-label="delete"
                                    onClick={dialogDeleteHandler.show}
                                >
                                    <DeleteIcon />
                                </Fab>
                            </Hidden>
                            <DialogUpdateComponent title={`Update project: ${data.project.code}`}>
                                <UpdateProjectDialog project={data.project} handleCloseDialog={dialogUpdateHandler.hide} />
                            </DialogUpdateComponent>

                            <DialogDeleteComponent title={`Delete project: ${data.project.code}`}>
                                <DeleteProjectDialog
                                    project={data.project}
                                    handleHide={(wasDeleted) => {
                                        dialogDeleteHandler.hide();
                                        if (wasDeleted) history.push(nav.projects.path);
                                    }}
                                />
                            </DialogDeleteComponent>

                        </>
                    );
                }}
            </Query>
        </>
    );
}

export default DetailProject;