import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { useLazyQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';

import { LoadingComponent } from '../common';
import { REPORT } from '../../config/gqls';

export default ({ startDate, endDate, project_id }) => {

    const [openReport, setOpenReport] = useState(false);

    const handleClickButton = () => {
        setOpenReport(true);
        loadReport();
    };

    const [loadReport, { loading, data }] = useLazyQuery(REPORT,
        {
            variables: {
                startDate,
                endDate,
                project_id
            },
            fetchPolicy: "no-cache"
        });

    if (loading) return <LoadingComponent loading={loading} />;

    if (data && data.report && openReport) {
        window.open(`${process.env.REACT_APP_SERVER_URI || 'http://localhost:3005'}/static/${data.report.filename}`, 'PDF Report');
        setOpenReport(false);
    }

    return (
        <Hidden xsDown>
            <Button color="primary" onClick={handleClickButton}>Open PDF</Button>
        </Hidden>
    );
}