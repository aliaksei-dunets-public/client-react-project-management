import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { nav } from '../../config/constants';
import ToolbarMainComponent from '../common/ToolbarMainComponent';
import MessageBarComponent from '../common/MessageBarComponent';

import { HomePage } from '../home';
import PageProjects from '../project/PageProjects';
import DetailProject from '../project/DetailProject';
import DashboardProject from '../project/DashboardProject';
import { PageIssues, Detailssue } from '../issue';
import PageTimelogs from '../timelog/PageTimelogs';
import { PageTimesheet } from '../timesheet';
import PageProjections from '../projection/PageProjections';
import PageVersions from '../version/PageVersions';
import PageStories from '../story/PageStories';
import PageTasks from '../task/PageTasks';

function Content() {
  return (
    <>
      <BrowserRouter>
        <ToolbarMainComponent />
        <Switch>
          <Route path={nav.home.path} exact>
            <HomePage />
          </Route>
          <Route path={nav.projects.path} exact>
            <PageProjects />
          </Route>
          <Route path={`${nav.project.path}/:id`}>
            <DetailProject />
          </Route>
          <Route path={`${nav.dashboard.path}/:id`}>
            <DashboardProject />
          </Route>
          <Route path={nav.issues.path} exact>
            <PageIssues />
          </Route>
          <Route path={`${nav.issue.path}/:id`} exact>
            <Detailssue />
          </Route>
          <Route path={nav.timelogs.path} exact>
            <PageTimelogs />
          </Route>
          <Route path={nav.timesheet.path} exact>
            <PageTimesheet />
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
    </>
  );
}

export default Content;
