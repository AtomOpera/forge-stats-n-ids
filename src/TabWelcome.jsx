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
} from './restApiCalls';

export const TabWelcome = () => {
  const [totalIssues, setTotalIssues] = useState();
  const [totalProjects, setTotalProjects] = useState();
  const [totalCustomFields, setTotalCustomFields] = useState();
  const [totalFilters, setTotalFilters] = useState();

  const handleGetSystemInfo = async () => {
    const totalIssues = await getTotalIssuesInInstance();
    const totalProjects = await getTotalProjectsInInstance();
    const totalCustomFields = await getTotalCustomFieldsInInstance();
    const totalFilters = await getTotalFiltersInInstance();
    setTotalIssues(totalIssues);
    setTotalProjects(totalProjects);
    setTotalCustomFields(totalCustomFields);
    setTotalFilters(totalFilters);
  };

  return (
    <Tab label="💫 Welcome">
      <Text></Text>
      <Fragment>
        <ButtonSet>
          <Button text="Get system info" onClick={handleGetSystemInfo} />
          {/* <Button text="danger" appearance="danger" onClick={() => { }} />
        <Button text="warning" appearance="warning" onClick={() => { }} />
        <Button text="link" appearance="link" onClick={() => { }} />
        <Button text="subtle" appearance="subtle" onClick={() => { }} />
        <Button text="subtle-link" appearance="subtle-link" onClick={() => { }} /> */}
        </ButtonSet>
        <Tooltip text="Total Issues in this instance"><Text>hey</Text></Tooltip>
        {!totalIssues && <Text></Text>}
        <Tooltip text="Total Issues in this instance">
          {totalIssues && <Text>Issues: <Strong>{totalIssues}</Strong></Text>}
        </Tooltip>
        {totalProjects && <Tooltip text="Total Projects in this instance"><Text>Projects: <Strong>{totalProjects}</Strong></Text></Tooltip>}
        {totalCustomFields && <Tooltip text="Total Fields in this instance"><Text>Fields: <Strong>{totalCustomFields}</Strong></Text></Tooltip>}
        {totalFilters && <Tooltip text="Total Filters in this instance"><Text>Filters: <Strong>{totalFilters}</Strong></Text></Tooltip>}
      </Fragment>
    </Tab>
  );

};