import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Divider from '@material-ui/core/Divider';

import { nav } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
    },
}));

const ToolbarMenuProject = () => {

    const classes = useStyles();
    const history = useHistory();

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
                className={classes.menuButton}
                color="inherit"
                aria-controls="menu-projects"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {nav.issues.name}
            </Button>
            <Menu
                id="menu-projects"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        history.push(nav.open_issues.path);
                    }}
                >
                    My open Issues
                </MenuItem>

                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        history.push(nav.issues.path);
                    }}
                >
                    View All Issues
                </MenuItem>
            </Menu>
        </>
    );
}

export default ToolbarMenuProject;