import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from "@apollo/react-hooks";
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from "react-router-dom/Link";
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';

import { CREATE_TIMELOG, UPDATE_TIMELOG, DELETE_TIMELOG } from '../../config/gqls';
import { createdTimelog, updatedTimelog, deletedTimelog } from '../../libs';

const useStyles = makeStyles(theme => ({
    project: {
        background: '#f4f5f5',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        minWidth: '15em',
    },
    Issue: {
        paddingLeft: theme.spacing(3),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
    },
    cell: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
    },
    weekendcell: {
        background: '#f2f2f2',
        opacity: 0.4,
    },
    totalcell: {
        background: '#f4f5f5',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        fontWeight: 'bold',
        fontSize: '0.9rem'
    },
    editCell: {
        maxWidth: '50px',
        minWidth: '24px'
    },
    expand: {
        padding: '1px',
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        padding: '1px',
        transform: 'rotate(180deg)',
    },
}));

const TableCellTimesheet = ({ projects, changedNotification }) => {

    return (
        <>
            {
                projects.map((item) => (
                    <TableCellProject
                        project={item}
                        changedNotification={changedNotification}
                    />
                ))
            }
        </>
    );
}

const TableCellProject = ({ project, changedNotification }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <>
            <TableRow key={project.id}>
                <TableCell className={classes.project} align="left">

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <Link to={`/Project/${project.id}`}>
                        {`${project.name} (${project.code})`}
                    </Link>
                </TableCell>
                <TableCell className={classes.totalcell} align="center">{project.time}</TableCell>
                <Hidden xsDown>
                    <TableCellProjectTimelog timeSlots={project.timeSlots.rangeDateTime} />
                </Hidden>
            </TableRow>
            {
                expanded ?
                    <TableCellIssue issues={project.issues} changedNotification={changedNotification} /> :
                    null
            }

        </>
    );
}

const TableCellIssue = ({ issues, changedNotification }) => {
    const classes = useStyles();

    return (
        <>
            {
                issues.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className={classes.Issue} align="left">
                            <Link to={`/Issue/${item.id}`}>
                                {`${item.summary} (${item.code})`}
                            </Link>
                        </TableCell>
                        <TableCell className={classes.totalcell} align="center">{item.time}</TableCell>
                        <Hidden xsDown>
                            {
                                item.timeSlots.rangeDateTime.map((item) =>
                                    <EditCellTime timelog={item} changedNotification={changedNotification} />
                                )
                            }
                        </Hidden>
                    </TableRow>
                ))
            }
        </>
    );
}

const EditCellTime = ({ timelog, changedNotification }) => {
    const classes = useStyles();

    const [time, setTime] = useState(timelog.time);
    const [editMode, setEditMode] = useState(false);

    const [createMutation] = useMutation(CREATE_TIMELOG, { update: createdTimelog });
    const [updateMutation] = useMutation(UPDATE_TIMELOG, { update: updatedTimelog });
    const [deleteMutation] = useMutation(DELETE_TIMELOG, { update: deletedTimelog });

    const handleDoubleClick = () => {
        setEditMode(true);
    }

    const handleTimeChange = (event) => {
        setTime(event.currentTarget.value);
    }

    const handleBlur = async (event) => {

        if (time !== timelog.time) {

            if (timelog.timelog_id) {
                if (time) {
                    updateMutation({
                        variables: {
                            id: timelog.timelog_id,
                            input: {
                                dateLog: timelog.date,
                                valueLog: parseFloat(time),
                            }
                        }
                    })
                } else {
                    deleteMutation({
                        variables: {
                            id: timelog.timelog_id
                        }
                    });
                }
            } else {
                createMutation({
                    variables: {
                        input: {
                            project_id: timelog.project_id,
                            issue_id: timelog.issue_id,
                            dateLog: timelog.date,
                            valueLog: parseFloat(time),
                        }
                    }
                });
            }

            changedNotification();
        }

        setEditMode(false);
    }

    return (


        <TableCell className={classes.cell} align="center" onDoubleClick={handleDoubleClick}>
            {
                editMode === false ?
                    timelog.time !== 0 ? timelog.time : '-' :
                    <TextField
                        className={classes.editCell}
                        variant="outlined"
                        size="small"
                        value={time}
                        onChange={handleTimeChange}
                        onBlur={handleBlur}
                        autoFocus
                    />
            }
        </TableCell>
    );
}

const TableCellProjectTimelog = ({ timeSlots }) => {
    const classes = useStyles();

    return (
        <>
            {
                timeSlots.map((item) =>
                    <TableCell className={classes.totalcell} align="center">{item.time}</TableCell>
                )
            }
        </>
    );
}

export default TableCellTimesheet;