import React from 'react';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
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
} from './restApiCalls';

export const TabWelcome = () => {
  const [totalIssues, setTotalIssues] = useState();
  const [totalProjects, setTotalProjects] = useState();
  const [totalCustomFields, setTotalCustomFields] = useState();
  const [totalFilters, setTotalFilters] = useState();
  const [totalBoards, setTotalBoards] = useState();

  const handleGetSystemInfo = async () => {
    const totalIssues = await getTotalIssuesInInstance();
    const totalProjects = await getTotalProjectsInInstance();
    const totalCustomFields = await getTotalCustomFieldsInInstance();
    const totalFilters = await getTotalFiltersInInstance();
    const totalBoards = await getTotalBoardsInInstance();
    setTotalIssues(totalIssues);
    setTotalProjects(totalProjects);
    setTotalCustomFields(totalCustomFields);
    setTotalFilters(totalFilters);
    setTotalBoards(totalBoards);
  };

  const text1 = (<Text><Strong>{totalProjects}</Strong></Text>);
  return (
    <Tab label="💫 Welcome">
      <Text></Text>
      <Fragment>
        <ButtonSet>
          <Button icon="info" text="Get system info" onClick={handleGetSystemInfo} />
          <Button icon="warning" text="Get full health check" onClick={handleGetSystemInfo} />
          {/* <Button text="danger" appearance="danger" onClick={() => { }} />
        <Button text="warning" appearance="warning" onClick={() => { }} />
        <Button text="link" appearance="link" onClick={() => { }} />
        <Button text="subtle" appearance="subtle" onClick={() => { }} />
        <Button text="subtle-link" appearance="subtle-link" onClick={() => { }} /> */}
        </ButtonSet>
        {!totalIssues && <Text></Text>}

        {/* <Text>
          <Link appearance="button" href="https://atlassian.com">
            Go to Atlassian
          </Link>
        </Text>
        {totalIssues &&
          <Fragment><Text>
            <Button
              icon="add-circle"
              text={`Total issues: ${totalIssues}`}
              onClick={() => { }} />
            <Strong>{totalProjects}</Strong></Text>
          </Fragment>
        } */}
        {totalIssues && <Text>📚 Issues in Jira: <Strong>{totalIssues}</Strong></Text>}
        {totalProjects && <Text>🗂️ Projects in Jira: <Strong>{totalProjects}</Strong></Text>}
        {totalCustomFields && <Text>🎫 Fields in Jira: <Strong>{totalCustomFields}</Strong></Text>}
        {totalFilters && <Text>🏁 Filters in Jira: <Strong>{totalFilters}</Strong></Text>}
        {totalBoards && <Text>🧰 Boards in Jira: <Strong>{totalBoards}</Strong></Text>}
        {totalBoards && <Text>💠 Screens in Jira: <Strong>{totalBoards}</Strong></Text>}
        {totalBoards && <Text>🧊 Workflows in Jira: <Strong>{totalBoards}</Strong></Text>}
      </Fragment>
    </Tab>
  );

};