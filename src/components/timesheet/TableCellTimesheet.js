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
import Tooltip from '@material-ui/core/Tooltip';

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
    editCell: {
        maxWidth: '60px',
        minWidth: '50px'
    },
    cell: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
    },
    weekendcell: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        opacity: 0.6,
    },
    totalcell: {
        background: '#f4f5f5',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        fontWeight: 'bold',
        fontSize: '0.9rem'
    },
    totalweekendcelll: {
        background: '#f4f5f5',
        opacity: 0.6,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        fontWeight: 'bold',
        fontSize: '0.9rem'
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
    paidTime: {
        color: 'green',
        fontSize: '0.9rem'
    },
    noPaidTime: {
        color: 'red',
        fontSize: '0.9rem'
    }
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
                            paidUp: true
                        }
                    }
                });
            }


            changedNotification();
        }
    }

    const ReadOnlyTime = ({ timelog }) => {
        if (timelog.time) {
            return (
                <div className={timelog.paidUp ? classes.paidTime : classes.noPaidTime}>
                    {timelog.time}
                </div>
            );
        } else {
            return <div>{'-'}</div>;
        }
    }

    return (
        <Tooltip title={timelog.descr ? timelog.descr : ''} >
            <TableCell
                className={timelog.weekend ? classes.weekendcell : classes.cell}
                align="center"
                onDoubleClick={handleDoubleClick}
            >
                {
                    editMode === false ?
                        <ReadOnlyTime timelog={timelog} /> :
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
        </Tooltip>
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
                        className={item.weekend ? classes.totalweekendcelll : classes.totalcell}
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