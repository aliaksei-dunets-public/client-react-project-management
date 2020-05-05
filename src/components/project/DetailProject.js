import React from 'react';
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";

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

const DetailProject = () => {

    const { id } = useParams();

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
                            <ToolbarDetailComponent title={`Project: ${data.project.code} - ${data.project.name}`} />
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
                        </>
                    );
                }}
            </Query>
        </>
    );
}

export default DetailProject;