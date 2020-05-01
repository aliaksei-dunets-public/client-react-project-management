import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const MenuComponent = ({ id, name, items }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color="inherit"
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {name}
            </Button>
            <Menu
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((element) => (
                    <MenuItem key={element.key} onClick={handleClose}>{element.name}</MenuItem>
                ))}
            </Menu>
        </>
    );
}

// MenuComponent.PropTypes = {
//     id: PropTypes.string,
//     name: PropTypes.string,
//     items: PropTypes.array,
// }

export default MenuComponent;