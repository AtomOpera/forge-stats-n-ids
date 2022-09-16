// import React from 'react';
// import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  Strong,
  Code,
  Badge,
  StatusLozenge,
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
import { HowLongAgo } from './HowLongAgo';

export const TabWelcome = (props) => {
  const { state, handleGetSystemInfo } = props;
  // console.log(state);
  // const [totalIssues, setTotalIssues] = useState('Scan to load...');
  // const [totalProjects, setTotalProjects] = useState('Scan to load...');
  // const [totalCustomFields, setTotalCustomFields] = useState('Scan to load...');
  // const [totalFilters, setTotalFilters] = useState('Scan to load...');
  // const [totalBoards, setTotalBoards] = useState('Scan to load...');
  // const [totalScreens, setTotalScreens] = useState('Scan to load...');
  // const [totalWorkflows, setTotalWorkflows] = useState('Scan to load...');

  // const handleGetSystemInfo = async (props) => {
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
    <Tab label="💫 Home">
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

        {
          /**
           * default = grey (default)
           * inprogress = blue
           * moved = yellow
           * new = purple
           * success = green
           * removed = red
           */
        }
        <HowLongAgo />
        {<Text>📚 Issues in Jira: <StatusLozenge text={state.totalIssues} appearance={state.totalIssues > 1300 ? "default" : "removed"} /></Text>}
        {<Text>🗂️ Projects in Jira: <StatusLozenge text={state.totalProjects} appearance="inprogress" /></Text>}
        {<Text>🎫 Fields in Jira: <StatusLozenge text={state.totalCustomFields} appearance="moved" /></Text>}
        {<Text>🏁 Filters in Jira: <StatusLozenge text={state.totalFilters} appearance="new" /></Text>}
        {<Text>🧰 Boards in Jira: <StatusLozenge text={state.totalBoards} appearance="success" /></Text>}
        {<Text>💠 Screens in Jira: <StatusLozenge text={state.totalScreens} appearance="removed" /></Text>}
        {<Text>🧊 Workflows in Jira: <Strong>{state.totalWorkflows}</Strong></Text>}
        {/* <Button
          icon="issues"
          appearance="subtle-link"
          text={`Total issues: ${totalIssues}`}
          onClick={() => { }}
        /> */}
      </Fragment>
    </Tab>
  );

};