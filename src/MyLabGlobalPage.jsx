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
// import { route } from '@forge/api';
// import { router } from '@forge/bridge';
import {
  getCustomFieldInfo,
  getCurrentUser,
  getAProjectPage,
  getAllProjects,
  getTotalIssuesInInstance,
  getAllIssuesCommentedByUser,
  getIssuesInTableFormat,
  getInstance,
} from './restApiCalls';
import { TabIssuesCommentedBy } from './TabIssuesCommentedBy';


export default function () {
  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);

  const [aProjectPage, setAProjectPage] = useState(async () => await getAProjectPage());

  const [instance, setInstance] = useState(undefined);

  // NON parallelize all REST API calls to Jira
  // const [customFieldInfo, setCustomFieldInfo] = useState(async () => await getCustomFieldInfo());
  // const [allProjects, setAllProjects] = useState(async () => wait getAllProjects());
  // const [totalIssuesInInstance, setTotalIssuesInInstance] = useState(async () => await getTotalIssuesInInstance());
  // const [currentUser, setCurrentUser] = useState(async () => await getCurrentUser());

  // parallelize all REST API calls to Jira
  const [customFieldInfo, setCustomFieldInfo] = useState(async () => []); // await getCustomFieldInfo());
  const [allProjects, setAllProjects] = useState(async () => []); // await getAllProjects());
  const [totalIssuesInInstance, setTotalIssuesInInstance] = useState(async () => []); // await getTotalIssuesInInstance());
  const [currentUser, setCurrentUser] = useState(async () => { }); // await getCurrentUser());
  useEffect(async () => {
    const [
      // customFieldResp,
      allProjectsResp,
      totalIssuesInInstanceResp,
      currentUserResp,
      currentinstance,
    ] = await Promise.all([
      // getCustomFieldInfo(),
      getAllProjects(),
      getTotalIssuesInInstance(),
      getCurrentUser(),
      getInstance(),
    ]);
    // setCustomFieldInfo(customFieldResp);
    setAllProjects(allProjectsResp);
    setTotalIssuesInInstance(totalIssuesInInstanceResp);
    setCurrentUser(currentUserResp);
    setInstance(currentinstance);
  }, []);

  const handleGetCustomFieldInfo = async () => {
    const customFieldInfo = await getCustomFieldInfo();
    setCustomFieldInfo(customFieldInfo);
  };

  const [options, setOptions] = useState(
    async () => {
      const projects = await getAllProjects();
      return projects.map((project) => {
        return { label: project.name, value: project.key };
      });
    }
    // [
    //   { label: 'first', value: 'first' },
    //   { label: 'second', value: 'second' },
    //   { label: 'third', value: 'third' },
    // ]
  )

  const [allIssues, setAllIssues] = useState('loading...');
  const [issuesCommentedByUser, setIssuesCommentedByUser] = useState('loading...');
  const [issuesInTableFormat, setIssuesInTableFormat] = useState();
  const [count, setCount] = useState(0);
  const [startAt, setstartAt] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalCommentedIssues, setTotalComentedIssues] = useState(0);

  const actionButtons = [
    <Button
      text={!issuesInTableFormat ? 'Search for issues I have commented on...' : `Load more results ${startAt}`}
      onClick={() => {
        setstartAt(startAt + 50);
      }}
    />,
    <Button text="Cancel" onClick={() => { }} />,
  ];

  const onSubmit = async (formData) => {
    /**
     * formData:
     * {
     *    username: 'Username',
     *    products: ['jira']
     * }
     */
    // {"search":"one","user":"5d19ec2b0fa0030d15fc5ee2","projects":["GSP","FT"]}
    // console.log(formData.projects);
    const commentedByUser = await getAllIssuesCommentedByUser(currentUser.accountId, formData.projects);
    setFormState(formData);
    setTotalComentedIssues(commentedByUser.totalIssuesFound);
    // getIssuesInTableFormat(commentedByUser.issues);
    setIssuesInTableFormat(getIssuesInTableFormat(commentedByUser.issues));
  };

  // console.log(formState && formState.projects.some((project) => "FT" === project));
  // console.log(formState);

  return (
    <GlobalPage>
      <Fragment>
        <Tabs>
          <Tab label="Welcome">
            <Text></Text>
            <Fragment>
              <Text>{instance}</Text>
              <Text>Hello <Strong>{currentUser?.displayName || 'loading...'}</Strong>, this is MyForgeLabGlobalPage.jsx</Text>
              {totalCommentedIssues
                ? (
                  <Text>Total issues found <Strong>{totalCommentedIssues || 'loading...'}</Strong> out of <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
                )
                : (
                  <Text>Total issues in your Jira instance: <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
                )}

              <Form
                onSubmit={onSubmit}
                submitButtonText={!issuesInTableFormat ? 'Search for issues I have commented on...' : `Load more results ${startAt}`}
              // actionButtons={actionButtons}
              >
                <Select label="Search for?" name="search">
                  <Option defaultSelected label="Issues commented by user" value="one" />
                  <Option label="Issues blablabla" value="two" />
                  <Option label="Issues blablabla" value="three" />
                </Select>
                <UserPicker label="User" name="user" defaultValue={currentUser?.accountId} />
                <Select label="Filter by projects?" name="projects" isMulti placeholder="Do not filter">
                  {/* <Option defaultSelected label="All projects" value="one" /> */}
                  {/* {options.map(option => <Option {...option} />)} */}
                  {allProjects.length !== 0 && allProjects.map((project) => (
                    <Option
                      defaultSelected={formState && formState.projects.find((p) => p === project.key)}
                      label={project.name}
                      value={project.key}
                    />
                  ))}
                  {/* <Option label="Milestone 2" value="two" />
              <Option label="Milestone 3" value="three" /> */}
                </Select>
                {/* <Text>{JSON.stringify(formState && formState.projects)}</Text>
                <Text>{JSON.stringify(formState && formState.projects.some((project) => "FT" === project))}</Text> */}
              </Form>
              {/* <Button onClick={async () => {
                const resp = await getAllProjects();
                setAllProjects(resp)
              }} text="Change options" /> */}
              {formState && <Text>{JSON.stringify(formState)}</Text>}
              {issuesInTableFormat && (
                <Table>
                  <Head>
                    <Cell>
                      <Text>Issue Key</Text>
                    </Cell>
                    <Cell>
                      <Text>Summary</Text>
                    </Cell>
                  </Head>
                  {issuesInTableFormat?.map(issue => (
                    <Row>
                      <Cell>
                        <Text>
                          <Link
                            href={`${instance}/browse/${issue.key}`}
                            appearance="button"
                            openNewTab
                          >{issue.key}</Link></Text>
                        {/* <Button
                          text={issue.key}
                          onClick={() => {
                            router.open(`https://abri003.atlassian.net/browse/${issue.key}`);
                          }}
                        /> */}
                      </Cell>
                      <Cell>
                        <Text>{issue.summary}</Text>
                      </Cell>
                    </Row>
                  ))}
                </Table>
              )}
            </Fragment>
          </Tab>

          <TabIssuesCommentedBy />

          <Tab label="Rubbish">
            <Text></Text>
            {/* <Text>{JSON.stringify(allProjects)}</Text>
          <Text>{JSON.stringify(aProjectPage)}</Text> */}
            {/* {fakeProjects.map(project => <Text key={project.key}>{project.name}</Text>)} */}
            {/* {aProjectPage.map((project) => {
            <Text>{project.name}</Text>
          })} */}
            {/* {allProjects.map((project) => { <Text>{project.name}</Text> })} */}
            {allProjects.length !== 0 && allProjects.map(project => <Text>{project.name}</Text>)}
            {/* <Text>{JSON.stringify(allProjects)}</Text> */}
            <Text>{JSON.stringify(currentUser)}</Text>
          </Tab>
          <Tab label="Custom Fields info">
            <Text></Text>

            <ButtonSet>
              <Button text="Get Custom Fields info" onClick={handleGetCustomFieldInfo} />
              <Button text="danger" appearance="danger" onClick={() => { }} />
              <Button text="warning" appearance="warning" onClick={() => { }} />
              <Button text="link" appearance="link" onClick={() => { }} />
              <Button text="subtle" appearance="subtle" onClick={() => { }} />
              <Button text="subtle-link" appearance="subtle-link" onClick={() => { }} />
            </ButtonSet>
            <Table>
              <Head>
                <Cell>
                  <Text>Custom Field Name</Text>
                </Cell>
                <Cell>
                  <Text>CustomField Id</Text>
                </Cell>
              </Head>
              {customFieldInfo?.map(customField => (
                <Row>
                  <Cell>
                    <Text>{customField.name}</Text>
                  </Cell>
                  <Cell>
                    <Text>{customField.id}</Text>
                  </Cell>
                </Row>
              ))}
            </Table>

            {customFieldInfo.map(customField => <Text>{customField.name}</Text>)}

          </Tab>
        </Tabs>



      </Fragment>

      {/* <Button
          text={`Count is ${count}`}
          onClick={() => {
            setCount(count + 1);
          }}
        /> */}
      {/* <Text><Code text={JSON.stringify(issuesCommentedByUser, null, 2)} /></Text>
        <Text><Code text={JSON.stringify(currentUser, null, 2)} /></Text>
        <Text><Code text={allIssues} /></Text> */}
      {/* <Text><Code text={JSON.stringify(allIssues, null, 2)} /></Text> */}
      {/* <Button
          text={`Count is ${count}`}
          onClick={() => {
            setCount(count + 1);
          }}
        /> */}
      {/* </Fragment> */}
    </GlobalPage>
  );
};