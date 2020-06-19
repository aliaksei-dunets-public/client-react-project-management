import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CreateFabComponent from './CreateFabComponent';

const CreateDialogComponent = (props) => {

    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => setOpen(false);

    const childrenWithState = React.cloneElement(props.children, { handleCloseDialog });

    return (
        <>
            <CreateFabComponent handleClick={() => setOpen(true)} />
            <Dialog open={open}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    {childrenWithState}
                </DialogContent>
            </Dialog>
        </>
    );
}

CreateDialogComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default CreateDialogComponent;

