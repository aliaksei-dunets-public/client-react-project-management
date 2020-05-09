import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import { nav } from '../config/constants';
// import typeDefs from '../states/schema';
import ToolbarMainComponent from './common/ToolbarMainComponent';
import MessageBarComponent from './common/MessageBarComponent';
import PageProjects from './project/PageProjects';
import DetailProject from './project/DetailProject';
import PageIssues from './issue/PageIssues';
import PageTimelogs from './timelog/PageTimelogs';
import PageProjections from './projection/PageProjections';
import PageVersions from './version/PageVersions';
import PageStories from './story/PageStories';
import PageTasks from './task/PageTasks';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  // link: createHttpLink({
  //   uri: config[process.env.NODE_ENV || 'development'].server.uri,
  // }),
  uri: process.env.REACT_APP_SERVER_URI || 'http://localhost:3005',
  resolvers: {
    // Query: {
    //   updateDialog: () => ({ __typename: "UpdateDialog", open: true, title: 'Resolver test' })
    // }
  },
  // typeDefs,
});

cache.writeData({
  data: {
    messageBarOpen: false,
    messageBarSeverity: 'info',
    messageBarText: ''
  },
});

function App() {

  return (
    <Container maxWidth='xl' disableGutters={true}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ToolbarMainComponent />
          <Switch>
            <Route path={nav.home.path} exact>
              <PageProjects />
            </Route>
            <Route path={nav.projects.path} exact>
              <PageProjects />
            </Route>
            <Route path={`${nav.project.path}/:id`}>
              <DetailProject />
            </Route>
            <Route path={nav.issues.path} exact>
              <PageIssues />
            </Route>
            <Route path={nav.timelogs.path} exact>
              <PageTimelogs />
            </Route>
            <Route path={nav.projections.path} exact>
              <PageProjections />
            </Route>
            <Route path={nav.versions.path} exact>
              <PageVersions />
            </Route>
            <Route path={nav.stories.path} exact>
              <PageStories />
            </Route>
            <Route path={nav.tasks.path} exact>
              <PageTasks />
            </Route>
          </Switch>
        </BrowserRouter>
        <MessageBarComponent />

      </ApolloProvider>
    </Container>
  );
}

export default App;
