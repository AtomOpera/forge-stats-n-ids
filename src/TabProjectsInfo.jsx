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
      const allProjects = await getAllProjects();
      console.log(allProjects);
      setProjects(allProjects);
    };
  
    const [projects, setProjects] = useState(async () => []);
    
    return (
      <Tab label="📁 Projects 🗂️">
        <Text></Text>
  
        <ButtonSet>
          <Button text="Get Projects info" onClick={handleGetProjectsInfo} />
        </ButtonSet>
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
            </Row>
          ))}
        </Table>
  
        {/* {customFieldInfo.map(customField => <Text>{customField.name}</Text>)} */}
  
      </Tab>
    );
  
  };