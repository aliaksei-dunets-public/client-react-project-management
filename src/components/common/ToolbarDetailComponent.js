import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  appBarRoot: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  headerText: {
    color: 'rgba(0, 0, 0, 0.87)',
    flexGrow: 1,
  },
  actions: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const ToolbarDetailPage = ({ title, children }) => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <AppBar className={classes.appBarRoot} position="static">
      <Toolbar variant="dense">
        <IconButton aria-label="back" onClick={() => { history.goBack() }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography className={classes.headerText} variant="h6" noWrap>
          {title}
        </Typography>
        <div className={classes.actions}>
          {children}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default ToolbarDetailPage;