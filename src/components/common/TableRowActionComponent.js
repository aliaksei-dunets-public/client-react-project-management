import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

export default function TableRowActionComponent(props) {
    return (
        <>
            <Tooltip title="Edit entry" aria-label="Edit">
                <IconButton color="primary" aria-label="Edit" onClick={() => { props.handleUpdateRow(props.rowId) }}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete entry" aria-label="Delete">
                <IconButton color="primary" aria-label="Delete" onClick={() => { props.handelDeleteRow(props.rowId) }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

TableRowActionComponent.propTypes = {
    rowId: PropTypes.string.isRequired,
    handleUpdateRow: PropTypes.func.isRequired,
    handelDeleteRow: PropTypes.func.isRequired,
};
