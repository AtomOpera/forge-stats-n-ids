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
} from './restApiCalls';

export const TabWelcome = () => {
  const [totalIssues, setTotalIssues] = useState();
  const [totalProjects, setTotalProjects] = useState();
  const [totalCustomFields, setTotalCustomFields] = useState();

  const handleGetSystemInfo = async () => {
    const totalIssues = await getTotalIssuesInInstance();
    const totalProjects = await getTotalProjectsInInstance();
    const totalCustomFields = await getTotalCustomFieldsInInstance();
    setTotalIssues(totalIssues);
    setTotalProjects(totalProjects);
    setTotalCustomFields(totalCustomFields);
  };

  return (
    <Tab label="Welcome">
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
        {!totalIssues && <Text></Text>}
        {totalIssues && <Text>Total issues in this instance: <Strong>{totalIssues}</Strong></Text>}
        {totalProjects && <Text>Total projects in this instance: <Strong>{totalProjects}</Strong></Text>}
        {totalCustomFields && <Text>Total custom fields in this instance: <Strong>{totalCustomFields}</Strong></Text>}

      </Fragment>
    </Tab>
  );

};