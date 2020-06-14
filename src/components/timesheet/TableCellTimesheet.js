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
import { TimelogCacheUpdater } from '../../libs';

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
                projects.map((project) => (
                    <TableCellProject
                        key={project.id}
                        project={project}
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
                <TableCell className={classes.totalcell} align="center">{project.total.time}</TableCell>
                <Hidden xsDown>
                    <TableCellProjectTimelog project_id={project.id} timeslots={project.timeslots} />
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
                issues.map((issue) => (
                    <TableRow key={issue.id}>
                        <TableCell className={classes.Issue} align="left">
                            <Link to={`/Issue/${issue.id}`}>
                                {`${issue.summary} (${issue.code})`}
                            </Link>
                        </TableCell>
                        <TableCell className={classes.totalcell} align="center">{issue.total.time}</TableCell>
                        <Hidden xsDown>
                            {
                                issue.timeslots.map((item) =>
                                    <EditCellTime
                                        key={`${issue.id}-${item.date._d}`}
                                        project_id={issue.project_id}
                                        issue_id={issue.id}
                                        timelog={item}
                                        changedNotification={changedNotification}
                                    />
                                )
                            }
                        </Hidden>
                    </TableRow>
                ))
            }
        </>
    );
}

const EditCellTime = ({ project_id, issue_id, timelog, changedNotification }) => {
    const classes = useStyles();

    const [time, setTime] = useState(timelog.time);
    const [editMode, setEditMode] = useState(false);

    const updaterTimelog = new TimelogCacheUpdater(false);

    const [createMutation] = useMutation(CREATE_TIMELOG, { update: updaterTimelog.createdSingle });
    const [updateMutation] = useMutation(UPDATE_TIMELOG, { update: updaterTimelog.updated });
    const [deleteMutation] = useMutation(DELETE_TIMELOG, { update: updaterTimelog.deleted });

    const handleDoubleClick = () => {
        setEditMode(true);
    }

    const handleTimeChange = (event) => {
        setTime(event.currentTarget.value);
    }

    const handleBlur = async () => {

        setEditMode(false);

        if (time !== timelog.time) {

            if (timelog.id) {
                if (time) {
                    await updateMutation({
                        variables: {
                            id: timelog.id,
                            input: {
                                valueLog: parseFloat(time),
                            }
                        }
                    });
                } else {
                    await deleteMutation({
                        variables: {
                            id: timelog.id
                        }
                    });
                }
            } else {
                await createMutation({
                    variables: {
                        input: {
                            project_id,
                            issue_id,
                            dateLog: timelog.date,
                            valueLog: parseFloat(time),
                        }
                    }
                });
            }


            changedNotification();
        }
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

const TableCellProjectTimelog = ({ project_id, timeslots }) => {
    const classes = useStyles();

    return (
        <>
            {
                timeslots.map((item) =>
                    <TableCell
                        key={`${project_id}-${item.date._d}`}
                        className={classes.totalcell}
                        align="center"
                    >
                        {item.time}
                    </TableCell>
                )
            }
        </>
    );
}

export default TableCellTimesheet;