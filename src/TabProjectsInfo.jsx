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
  StatusLozenge,
  Select,
  Option,
  UserPicker,
} from '@forge/ui';
import {
  getCustomFieldInfo,
  getCurrentUser,
  getAProjectPage,
  getAllProjects,
  getTotalIssuesInInstance,
  getAllIssuesCommentedByUser,
  getIssuesInTableFormat,
  getInstance,
  getCustomFieldCount,
  getAllIssues,
} from './restApiCalls';

export const TabProjectsInfo = () => {

  const handleGetProjectsInfo = async () => {
    const allProjects = (await getAllProjects())
    let allProjectsSorted = [];
    allProjects.sort((a, b) => (a.insight.lastIssueUpdateTime > b.insight.lastIssueUpdateTime) ? 1 : -1);
    console.log(allProjects);
    setProjects(allProjects);
  };

  const [projects, setProjects] = useState(async () => []);
  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);

  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onSubmit = async (formData) => {
    /**
     * formData:
     * {
     *    username: 'Username',
     *    products: ['jira']
     * }
     */
    setFormState(formData);
  };

  const goBack = () => { };
  const cancel = () => { };

  // The array of additional buttons.
  // These buttons align to the right of the submit button.
  const actionButtons = [
    // <Button text="Go back" onClick={goBack} />,
    // <Button text="Cancel" onClick={cancel} />,
  ];

  const Healthy = ({ project }) => {
    if (project.insight.lastIssueUpdateTime === "2019-10-07T12:37:11.744+0100")
      return <Text><StatusLozenge text="Too old man!" appearance="removed" /></Text>
    if (project.insight.totalIssueCount === 0)
      return <Text><StatusLozenge text="This project is empty!" appearance="moved" /></Text>
    return <Text><StatusLozenge text="As healthy as eating veggies" appearance="success" /></Text>
  };

  return (
    <Tab label="📁 Projects 🗂️">
      <Text></Text>

      <ButtonSet>
        <Button text="Get Projects info" icon="retry" iconPosition="before" onClick={handleGetProjectsInfo} />
        <Button text="Sort by oldest" appearance="subtle" icon="filter" iconPosition="after" onClick={handleGetProjectsInfo} />
        <Button text="Sort by number of issues" appearance="subtle" icon="filter" iconPosition="after" onClick={handleGetProjectsInfo} />
      </ButtonSet>
      <Form onSubmit={onSubmit} submitButtonText="🔎 Search" actionButtons={actionButtons}>
        <TextField name="search" label="Search" />
      </Form>
      {formState && <Text>{JSON.stringify(formState)}</Text>}
      <Table>
        <Head>
          <Cell>
            <Text>Project Name</Text>
          </Cell>
          <Cell>
            <Text>Project Id</Text>
          </Cell>
          <Cell>
            <Text>Number of issues</Text>
          </Cell>
          <Cell>
            <Text>Last updated</Text>
          </Cell>
          <Cell>
            <Text>Healthy?</Text>
          </Cell>
        </Head>
        {projects?.map((project, i) => (
          <Row>
            <Cell>
              <Text>{project.name}</Text>
            </Cell>
            <Cell>
              <Text>{project.key}</Text>
            </Cell>
            <Cell>
              <Text>{project.insight.totalIssueCount}</Text>
            </Cell>
            <Cell>
              <Text>{project.insight.lastIssueUpdateTime}</Text>
            </Cell>
            <Cell>
              <Healthy project={project} />
            </Cell>
          </Row>
        ))}
      </Table>

      {/* {customFieldInfo.map(customField => <Text>{customField.name}</Text>)} */}

    </Tab>
  );

};