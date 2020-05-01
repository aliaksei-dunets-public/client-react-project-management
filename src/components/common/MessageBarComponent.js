import React from 'react';
import { Query } from "@apollo/react-components";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { MESSAGE_BAR_LOCAL } from '../../config/gqls';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MessageBarComponent = () => {

    return (
        <Query query={MESSAGE_BAR_LOCAL}>
            {({ data: { messageBarOpen, messageBarSeverity, messageBarText }, client }) => (
                <Snackbar
                    open={messageBarOpen}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={4000}
                    onClose={() => client.writeData({ data: { messageBarOpen: false } })}
                >
                    <Alert
                        onClose={() => client.writeData({ data: { messageBarOpen: false } })}
                        severity={messageBarSeverity}
                    >
                        {messageBarText}
                    </Alert>
                </Snackbar>
            )}
        </Query>
    );
}

export default MessageBarComponent;