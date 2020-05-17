import React from 'react';
// import { Link as LinkRouter } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import { nav } from '../../config/constants';
import ToolbarMenuProject from '../project/ToolbarMenuProject';

// import MenuComponent from './MenuComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        justifyContent: 'end'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function ToolbarComponent() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">

                    <Button color="inherit" onClick={() => { history.push(nav.home.path) }}>
                        {nav.home.name}
                    </Button>

                    <ToolbarMenuProject />

                    {/* <MenuComponent
                        id={nav.projects.path}
                        name={nav.projects.name}
                        items={[
                            { key: 'active_projects', name: 'Active Projects', handle: () => { history.push(nav.projects.path) } },
                            { key: 'all_projects', name: 'All Projects', handle: () => { history.push(nav.projects.path) } }
                        ]}
                    /> */}

                    {/* <Button color="inherit" onClick={() => { history.push(nav.projects.path) }}>
                        {nav.projects.name}
                    </Button> */}

                    <Button color="inherit" onClick={() => { history.push(nav.issues.path) }}>
                        {nav.issues.name}
                    </Button>
                    <Hidden xsDown>
                        <Button color="inherit" onClick={() => { history.push(nav.timelogs.path) }}>
                            {nav.timelogs.name}
                        </Button>

                        <Button color="inherit" onClick={() => { history.push(nav.timesheet.path) }}>
                            {nav.timesheet.name}
                        </Button>

                        <Button color="inherit" onClick={() => { history.push(nav.projections.path) }}>
                            {nav.projections.name}
                        </Button>
                        <Button color="inherit" onClick={() => { history.push(nav.versions.path) }}>
                            {nav.versions.name}
                        </Button>
                        <Button color="inherit" onClick={() => { history.push(nav.stories.path) }}>
                            {nav.stories.name}
                        </Button>
                    </Hidden>
                    <Hidden smDown>
                        <Button color="inherit" onClick={() => { history.push(nav.tasks.path) }}>
                            {nav.tasks.name}
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div> */}
                </Toolbar>
            </AppBar>
        </div >
    );
}
