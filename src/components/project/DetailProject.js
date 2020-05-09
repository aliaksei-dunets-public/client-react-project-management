import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Query } from "react-apollo";
import Button from '@material-ui/core/Button';

import { nav } from '../../config/constants';
import { GET_PROJECT } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';
import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import LabelValueComponent from '../common/LabelValueComponent';
import StatusComponent from '../common/StatusComponent';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import TableIssues from '../issue/TableIssues';
import CreateIssue from '../issue/CreateIssue';
import UpdateFormProject from './UpdateFormProject';
import DeleteFormProject from './DeleteFormProject';
import DialogHandler from '../common/DialogHandler';

const DetailProject = () => {

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
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return 'Refetching!';
                    if (loading) return <LoadingComponent loading={loading} />;
                    if (error) return <ErrorServiceComponent error={error} />;

                    return (
                        <>
                            <ToolbarDetailComponent title={`Project: ${data.project.code} - ${data.project.name}`} >
                                <Button variant="contained" color="primary" onClick={dialogUpdateHandler.show}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="primary" onClick={dialogDeleteHandler.show}>
                                    Delete
                                </Button>
                            </ToolbarDetailComponent>
                            <LabelValueComponent label='ID' value={data.project.id} />
                            <LabelValueComponent label='Code' value={data.project.code} />
                            <LabelValueComponent label='Name' value={data.project.name} />
                            <LabelValueComponent label='Description' value={data.project.descr} />
                            <LabelValueComponent label='Status' >
                                <StatusComponent status={data.project.status} />
                            </LabelValueComponent>
                            <LabelValueComponent label='External' >
                                <ExternalLinkComponent url={data.project.external_url} code={data.project.external_code} />
                            </LabelValueComponent>
                            <TableIssues issues={data.project.issues} />
                            <CreateDialogComponent title="Create a new Issue">
                                <CreateIssue project={data.project} />
                            </CreateDialogComponent>
                            <DialogUpdateComponent title={`Update the project - ${data.project.name}`}>
                                <UpdateFormProject project={data.project} handleHide={dialogUpdateHandler.hide} />
                            </DialogUpdateComponent>
                            <DialogDeleteComponent title={`Delete the project - ${data.project.name}`}>
                                <DeleteFormProject
                                    project={data.project}
                                    handleHide={() => {
                                        dialogDeleteHandler.hide();
                                        history.push(nav.projects.path);
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