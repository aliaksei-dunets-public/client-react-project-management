import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
// }));

const ErrorServiceComponent = ({ error }) => {
    return (
        <>
            <Typography variant="h5" gutterBottom color="error">
                {error ? error.message : 'Network Error. Connect to Admin.'}
            </Typography>
            {/* {
                error.graphQLErrors.map(item => (
                    <Typography variant="h5" gutterBottom color="error">
                        {item.message}
                    </Typography>
                ))
            } */}

        </>
    );
}

export default ErrorServiceComponent;