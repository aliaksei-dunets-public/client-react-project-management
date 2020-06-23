import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { nav } from '../../config/constants';
import ToolbarMainComponent from '../common/ToolbarMainComponent';
import MessageBarComponent from '../common/MessageBarComponent';

import { HomePage } from '../home';
import PageProjects from '../project/PageProjects';
import DetailProject from '../project/DetailProject';
import DashboardProject from '../project/DashboardProject';
import CreateProjectPage from '../project/CreateProjectPage';
import UpdateProjectPage from '../project/UpdateProjectPage';
import { PageIssues, Detailssue, PageOpenIssues } from '../issue';
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
          <Route path={nav.projects.path} >
            <PageProjects />
          </Route>
          <Route path={`${nav.project.path}/:id`}>
            <DetailProject />
          </Route>
          <Route path={`${nav.dashboard.path}/:id`}>
            <DashboardProject />
          </Route>
          <Route path={nav.create_project.path}>
            <CreateProjectPage />
          </Route>
          <Route path={`${nav.update_project.path}/:id`}>
            <UpdateProjectPage />
          </Route>
          <Route path={nav.issues.path} >
            <PageIssues />
          </Route>
          <Route path={nav.open_issues.path} >
            <PageOpenIssues />
          </Route>
          <Route path={`${nav.issue.path}/:id`} >
            <Detailssue />
          </Route>
          <Route path={nav.timelogs.path} >
            <PageTimelogs />
          </Route>
          <Route path={nav.timesheet.path} >
            <PageTimesheet />
          </Route>
          <Route path={nav.projections.path} >
            <PageProjections />
          </Route>
          <Route path={nav.versions.path} >
            <PageVersions />
          </Route>
          <Route path={nav.stories.path} >
            <PageStories />
          </Route>
          <Route path={nav.tasks.path} >
            <PageTasks />
          </Route>
        </Switch>
      </BrowserRouter>
      <MessageBarComponent />
    </>
  );
}

export default Content;
