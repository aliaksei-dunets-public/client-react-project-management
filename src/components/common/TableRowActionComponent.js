import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function TableRowActionComponent({ row, handleUpdate, handleDelete }) {

    return (
        <>
            <Tooltip title="Edit entry" aria-label="Edit">
                <IconButton color="primary" aria-label="Edit" onClick={() => handleUpdate(row)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete entry" aria-label="Delete">
                <IconButton color="primary" aria-label="Delete" onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

TableRowActionComponent.propTypes = {
    row: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};
