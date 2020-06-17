import React from 'react';
import { useHistory } from "react-router-dom";
import { Query } from "react-apollo";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Divider from '@material-ui/core/Divider';

import { nav } from '../../config/constants';
import { GET_PROJECT_SET } from '../../config/gqls';
import LoadingComponent from '../common/LoadingComponent';
import ErrorServiceComponent from '../common/ErrorServiceComponent';

const ToolbarMenuProject = () => {

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
                color="inherit"
                aria-controls="menu-projects"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {nav.projects.name}
            </Button>
            <Menu
                id="menu-projects"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Query query={GET_PROJECT_SET}>
                    {({ loading, error, data }) => {                        

                        if (loading) return <LoadingComponent loading={loading} />;
                        if (error) return <ErrorServiceComponent error={error} />;

                        const activeProjects = data.projects.filter((item) => item.status === "ACTIVE");

                        return (
                            <>
                                {
                                    activeProjects.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={() => {
                                                handleClose();
                                                history.push(`${nav.dashboard.path}/${item.id}`);
                                            }}
                                        >
                                            {`${item.code} - ${item.name}`}
                                        </MenuItem>
                                    ))
                                }
                            </>
                        );
                    }}
                </Query>

                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        history.push(nav.create_project.path);
                    }}
                >
                    Create Project
                </MenuItem>

                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        history.push(nav.projects.path);
                    }}
                >
                    View All Projects
                </MenuItem>
            </Menu>
        </>
    );
}

export default ToolbarMenuProject;