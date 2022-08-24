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
  ModalDialog,
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
  getCustomFieldsInfo,
  getCurrentUser,
  getAProjectPage,
  getAllProjects,
  getTotalIssuesInInstance,
  getAllIssuesCommentedByUser,
  getIssuesInTableFormat,
  getInstance,
  get50IssuesCommentedByUser,
} from './restApiCalls';

export const TabIssuesCommentedBy = () => {
  const [formState, setFormState] = useState(undefined);
  const [instance, setInstance] = useState(undefined);
  const [customFieldsInfo, setCustomFieldsInfo] = useState(async () => []); // await getCustomFieldsInfo());
  const [allProjects, setAllProjects] = useState(async () => []); // await getAllProjects());
  const [totalIssuesInInstance, setTotalIssuesInInstance] = useState(async () => []); // await getTotalIssuesInInstance());
  const [currentUser, setCurrentUser] = useState(async () => { }); // await getCurrentUser());
  const [totalCommentedIssues, setTotalComentedIssues] = useState(0);
  const [issuesInTableFormat, setIssuesInTableFormat] = useState();
  const [startAt, setstartAt] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  useEffect(async () => {
    const [
      // customFieldResp,
      // allProjectsResp,
      // totalIssuesInInstanceResp,
      currentUserResp,
      currentinstance,
    ] = await Promise.all([
      // getCustomFieldsInfo(),
      // getAllProjects(),
      // getTotalIssuesInInstance(),
      getCurrentUser(),
      getInstance(),
    ]);
    // setCustomFieldInfo(customFieldResp);
    // setAllProjects(allProjectsResp);
    // setTotalIssuesInInstance(totalIssuesInInstanceResp);
    setCurrentUser(currentUserResp);
    setInstance(currentinstance);
  }, []);

  const handleOpenDialog = async () => {
    setOpen(true);
    const currentProjects = await getAllProjects();
    setAllProjects(currentProjects);
  };

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
    // const commentedByUser = await get50IssuesCommentedByUser(currentUser.accountId, formData.projects || []);
    const commentedByUser = await getAllIssuesCommentedByUser(currentUser.accountId, formData.projects || []);
    setFormState(formData);
    setTotalComentedIssues(commentedByUser.totalIssuesFound);
    // getIssuesInTableFormat(commentedByUser.issues);
    setIssuesInTableFormat(getIssuesInTableFormat(commentedByUser.issues));
  };

  return (
    <Tab label="👩‍💼 Issues commented by user">
      <Text></Text>
      <Fragment>
        <ButtonSet>
          <Button text="Get issues commented by user" onClick={() => { }} />
          <Button
            text={'Filter'}
            onClick={async () => await handleOpenDialog()}
          />
        </ButtonSet>
        {isOpen && (
          <ModalDialog header="Filter search" onClose={() => setOpen(false)}>
            <Form
              onSubmit={data => {
                // setSize(data.size);
                setSelectedProjects(data.projects);
                setOpen(false);
              }}
            >
              <Select label="Filter by projects?" name="projects" isMulti placeholder="Do not filter">
                {/* <Option defaultSelected label="All projects" value="one" /> */}
                {/* {options.map(option => <Option {...option} />)} */}
                {allProjects.length !== 0 && allProjects.map((project) => (
                  <Option
                    defaultSelected={selectedProjects.find((p) => p === project.key)}
                    label={project.name}
                    value={project.key} />
                ))}
                {/* <Option label="Milestone 2" value="two" />
<Option label="Milestone 3" value="three" /> */}
              </Select>
            </Form>
          </ModalDialog>
        )}
        {/* {totalCommentedIssues && (
          <Text>Total issues found <Strong>{totalCommentedIssues || 'loading...'}</Strong> out of <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
        )} */}
        {/* {totalCommentedIssues 
          ? (
            <Text>Total issues found <Strong>{totalCommentedIssues || 'loading...'}</Strong> out of <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
          )
          : (
            <Text>Total issues in your Jira instance: <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
          )} */}

        <Form
          onSubmit={onSubmit}
          submitButtonText={!issuesInTableFormat ? 'Search for issues I have commented on...' : `Load more results ${startAt}`}
        >
          {/* <Select label="Search for?" name="search">
            <Option defaultSelected label="Issues commented by user" value="one" />
            <Option label="Issues blablabla" value="two" />
            <Option label="Issues blablabla" value="three" />
          </Select> */}
          <UserPicker label="Search for issues commented by" name="user" defaultValue={currentUser?.accountId} />
          {/* <Select label="Filter by projects?" name="projects" isMulti placeholder="Do not filter">
            {allProjects.length !== 0 && allProjects.map((project) => (
              <Option
                defaultSelected={formState && formState.projects.find((p) => p === project.key)}
                label={project.name}
                value={project.key} />
            ))}
          </Select> */}
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
  );

};