import React from 'react';
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import { GET_ISSUE } from '../../config/gqls';
import ToolbarDetailComponent from '../common/ToolbarDetailComponent';
import LabelValueComponent from '../common/LabelValueComponent';
import StatusComponent from '../common/StatusComponent';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import { UpdateIssue, DeleteIssue } from './';
import DialogHandler from '../common/DialogHandler';
import { TableTimelogs, CreateFormTimelog } from '../timelog';

const Detailssue = () => {

    // const history = useHistory();
    const { id } = useParams();

    const dialogUpdateHandler = DialogHandler();
    const DialogUpdateComponent = dialogUpdateHandler.component;

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    return (
        <Query
            query={GET_ISSUE}
            variables={{ id }}
        >
            {({ loading, error, data, refetch, networkStatus }) => {
                if (networkStatus === 4) return 'Refetching!';
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                    <>  <ToolbarDetailComponent title={`Issue: ${data.issue.code} - ${data.issue.summary}`} >
                        <Hidden xsDown>
                            <Button variant="contained" color="primary" onClick={dialogUpdateHandler.show}>
                                Edit
                    </Button>
                            <Button variant="contained" color="primary" onClick={dialogDeleteHandler.show}>
                                Delete
                    </Button>
                        </Hidden>
                    </ToolbarDetailComponent>
                        <LabelValueComponent label='ID' value={data.issue.id} />
                        <LabelValueComponent label='Code' value={data.issue.code} />
                        <LabelValueComponent label='Summary' value={data.issue.summary} />
                        <LabelValueComponent label='Description' value={data.issue.descr} />
                        <LabelValueComponent label='Status' >
                            <StatusComponent status={data.issue.status} />
                        </LabelValueComponent>
                        <LabelValueComponent label='External' >
                            <ExternalLinkComponent url={data.issue.external_url} code={data.issue.external_code} />
                        </LabelValueComponent>

                        <DialogUpdateComponent title={`Update the issue - ${data.issue.summary}`}>
                            <UpdateIssue issue={data.issue} handleHide={dialogUpdateHandler.hide} />
                        </DialogUpdateComponent>
                        <DialogDeleteComponent title={`Delete the issue - ${data.issue.summary}`}>
                            <DeleteIssue issue={data.issue} handleHide={dialogDeleteHandler.hide} />
                        </DialogDeleteComponent>

                        <TableTimelogs timelogs={data.issue.timelogs} />
                        <CreateDialogComponent title="Create a new timelog">
                            <CreateFormTimelog issue={data.issue} />
                        </CreateDialogComponent>
                    </>
                );
            }}
        </Query>
    );
}

export default Detailssue;