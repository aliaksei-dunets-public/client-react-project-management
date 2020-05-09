import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogHandler = () => {
    const [open, setOpen] = useState(false);

    return {
        show: () => setOpen(true),
        hide: () => setOpen(false),
        component: ({ title, children }) => {
            return (
                < Dialog
                    open={open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        {children}
                    </DialogContent>
                </Dialog>
            )
        }
    }
}

export default DialogHandler;