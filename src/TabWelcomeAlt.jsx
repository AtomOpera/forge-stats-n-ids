// import React from 'react';
// import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  Strong,
  Code,
  SectionMessage,
  Fragment,
  IssueGlance,
  GlobalPage,
  useAction,
  useState,
  useEffect,
  ButtonSet,
  Button,
  Tooltip,
  render,
  Macro,
  Link,
  Table,
  Head,
  Cell,
  Row,
  Form,
  TextField,
  Select,
  Option,
  UserPicker,
} from '@forge/ui';
import {
  getTotalIssuesInInstance,
  getTotalProjectsInInstance,
  getTotalCustomFieldsInInstance,
  getTotalFiltersInInstance,
  getTotalBoardsInInstance,
  getTotalScreensInInstance,
  getTotalWorkflowsInInstance,
} from './restApiCalls';

export const TabWelcomeAlt = (props) => {
  const { state, handleGetSystemInfo } = props;
  // const [totalIssues, setTotalIssues] = useState('Scan to load...');
  // const [totalProjects, setTotalProjects] = useState('Scan to load...');
  // const [totalCustomFields, setTotalCustomFields] = useState('Scan to load...');
  // const [totalFilters, setTotalFilters] = useState('Scan to load...');
  // const [totalBoards, setTotalBoards] = useState('Scan to load...');
  // const [totalScreens, setTotalScreens] = useState('Scan to load...');
  // const [totalWorkflows, setTotalWorkflows] = useState('Scan to load...');

  // const handleGetSystemInfo = async () => {
  //   const totalIssues = await getTotalIssuesInInstance();
  //   const totalProjects = await getTotalProjectsInInstance();
  //   const totalCustomFields = await getTotalCustomFieldsInInstance();
  //   const totalFilters = await getTotalFiltersInInstance();
  //   const totalBoards = await getTotalBoardsInInstance();
  //   const totalScreens = await getTotalScreensInInstance();
  //   const totalWorkflows = await getTotalWorkflowsInInstance();
  //   setTotalIssues(totalIssues);
  //   setTotalProjects(totalProjects);
  //   setTotalCustomFields(totalCustomFields);
  //   setTotalFilters(totalFilters);
  //   setTotalBoards(totalBoards);
  //   setTotalScreens(totalScreens);
  //   setTotalWorkflows(totalWorkflows);
  // };
  // useEffect(async () => { await handleGetSystemInfo(); }, []);

  return (
    <Tab label="❤️‍🩹 Health check">
      <Text></Text>
      <Fragment>
        <ButtonSet>
          <Button icon="retry" text="" onClick={handleGetSystemInfo} />
          <Button icon="info" text="Scan Jira" onClick={handleGetSystemInfo} />
          <Button icon="warning" text="Get full health check" onClick={handleGetSystemInfo} />
          {/* <Button text="danger" appearance="danger" onClick={() => { }} />
        <Button text="warning" appearance="warning" onClick={() => { }} />
        <Button text="link" appearance="link" onClick={() => { }} />
        <Button text="subtle" appearance="subtle" onClick={() => { }} />
        <Button text="subtle-link" appearance="subtle-link" onClick={() => { }} /> */}
        </ButtonSet>

        <Button
          icon="issues"
          appearance="subtle"
          text={`Total issues: ${state.totalIssues}`}
          onClick={() => { }}
        />
        <Button
          icon="folder"
          appearance="subtle"
          text={`Total projects: ${state.totalProjects}`}
          onClick={() => { }}
        />
        <Button
          icon="detail-view"
          appearance="subtle"
          text={`Total fields: ${state.totalCustomFields}`}
          onClick={() => { }}
        />
        <Button
          icon="filter"
          appearance="subtle"
          text={`Total filters: ${state.totalFilters}`}
          onClick={() => { }}
        />
        <Button
          icon="subtask"
          appearance="subtle"
          text={`Total issue types: ${state.totalIssues}`}
          onClick={() => { }}
        />
        <Button
          icon="board"
          appearance="subtle"
          text={`Total boards: ${state.totalBoards}`}
          onClick={() => { }}
        />
        <Button
          icon="screen"
          appearance="subtle"
          text={`Total screens: ${state.totalScreens}`}
          onClick={() => { }}
        />
        <Button
          icon="bitbucket-branches"
          appearance="subtle"
          text={`Total workflows: ${state.totalWorkflows}`}
          onClick={() => { }}
        />
        {/* <Button
          icon="issues"
          appearance="link"
          text={`Total issues: ${totalIssues}`}
          onClick={() => { }}
        />
        <Button
          icon="folder"
          appearance="subtle-link"
          text={`Total projects: ${totalProjects}`}
          onClick={() => { }}
        />
        <Button
          icon="detail-view"
          appearance="subtle"
          text={`Total fields: ${totalFilters}`}
          onClick={() => { }}
        />
        <Button
          icon="board"
          appearance="subtle-link"
          text={`Total fields: ${totalBoards}`}
          onClick={() => { }}
        /> */}
      </Fragment>
    </Tab>
  );

};