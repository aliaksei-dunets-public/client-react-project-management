import React from 'react';
// import { Link as LinkRouter } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

import { nav } from '../../config/constants';
import ToolbarMenuProject from '../project/ToolbarMenuProject';
import ToolbarMenuIssue from '../issue/ToolbarMenuIssue';

// import MenuComponent from './MenuComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    menuButton: {
        display: 'flex',
        // alignItems: 'flex-end',
        justifySelf: 'flex-end',
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

export default function ToolbarComponent() {
    const history = useHistory();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">

                    <Button color="inherit" onClick={() => { history.push(nav.home.path) }}>
                        {nav.home.name}
                    </Button>
                    <ToolbarMenuProject />
                    <ToolbarMenuIssue />
                    <Hidden xsDown>
                        <Button color="inherit" onClick={() => { history.push(nav.timesheet.path) }}>
                            {nav.timesheet.name}
                        </Button>
                    </Hidden>
                    {/* <Hidden smDown>
                        <Button color="inherit" onClick={() => { history.push(nav.projections.path) }}>
                            {nav.projections.name}
                        </Button>
                        <Button color="inherit" onClick={() => { history.push(nav.versions.path) }}>
                            {nav.versions.name}
                        </Button>
                    </Hidden>
                    <Hidden mdDown>
                        <Button color="inherit" onClick={() => { history.push(nav.stories.path) }}>
                            {nav.stories.name}
                        </Button>
                        <Button color="inherit" onClick={() => { history.push(nav.tasks.path) }}>
                            {nav.tasks.name}
                        </Button>
                    </Hidden> */}
                    <Hidden lgUp>
                        <div className={classes.menuButton}>
                            <IconButton
                                edge="start"                                
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleClick}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <Menu
                            id="mobileMenu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Hidden smUp>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        history.push(nav.timesheet.path)
                                    }}
                                >
                                    {nav.timesheet.name}
                                </MenuItem>
                            </Hidden>

                            {/* <Hidden mdUp>
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        history.push(nav.projections.path);
                                    }}
                                >
                                    {nav.projections.name}
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        history.push(nav.versions.path);
                                    }}
                                >
                                    {nav.versions.name}
                                </MenuItem>
                            </Hidden>

                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    history.push(nav.stories.path);
                                }}
                            >
                                {nav.stories.name}
                            </MenuItem>

                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    history.push(nav.tasks.path);
                                }}
                            >
                                {nav.tasks.name}
                            </MenuItem> */}
                        </Menu>

                        {/* <BottomNavigation
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            showLabels
                            className={classes.bottomNavigation}
                        >
                            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                        </BottomNavigation> */}
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div >
    );
}
