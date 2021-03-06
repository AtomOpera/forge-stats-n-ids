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
  Button,
  render,
  Macro,
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
import api, { route } from '@forge/api';

export async function getCustomFieldInfo() {
  const maxResults = 100; // 50;
  let startAt = 0;
  let resource;
  let customFields = [];
  let page;
  // let parsedPage = { isLast: false };
  let isLast = false;

  // Await in loop as next page depends on previous page.
  do {
    // eslint-disable-next-line no-await-in-loop
    // resource = `search?startAt=${startAt}&maxResults=${maxResults}&type=custom`
    const jsonResponse = await api
      .asApp()
      .requestJira(
        // route`/rest/api/2/field/${resource}`
        route`/rest/api/2/field/search?startAt=${startAt}&maxResults=${maxResults}&type=custom`
        // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
      );
    // page = await AP.request(`/rest/api/2/field/${resource}`);
    // parsedPage = await JSON.parse(page.body);
    const parsedPage = await jsonResponse.json();
    customFields = [...customFields, ...parsedPage.values];
    startAt += parsedPage.values.length;
    isLast = parsedPage.isLast;
    // console.log({ parsedPage })
    // console.log(parsedPage.isLast)
    // console.log(parsedPage.values.length)
    // console.log(parsedPage.values.length)
    // console.log(startAt)
  } while (!isLast);
  // } while (startAt !== 10);

  // console.log(request);
  return customFields;
};

const getCurrentUser = async () => {
  const jsonResponse = await api.asUser().requestJira(route`/rest/api/3/myself`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const response = await jsonResponse.json();
  return response;
};

const getAProjectPage = async () => {
  const jsonResponse = await api
    .asUser()
    .requestJira(
      route`/rest/api/3/project/search?startAt=0&maxResults=50`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  const response = await jsonResponse.json();

  // console.log(response);
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  return response.values;
};

const getAllProjects = async () => {
  let projects = [];
  let startAt = 0;
  let isLast = false;
  const maxResults = 50;

  do {
    const jsonResponse = await api
      .asUser()
      .requestJira(
        route`/rest/api/3/project/search?startAt=${startAt}&maxResults=${maxResults}`
        // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
      );
    const response = await jsonResponse.json();

    projects = [...projects, ...response.values];
    isLast = response.isLast;
    startAt += response.values.length;

  } while (!isLast);

  // console.log(projects);
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  return projects;
};

const getTotalIssuesInInstance = async () => {
  const startAt = 0;
  const maxResults = 50;
  const jsonResponse = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?startAt=0&maxResults=1&fields=summary`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );


  const response = await jsonResponse.json();
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  return response.total;
};

export default function () {
  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);

  const [aProjectPage, setAProjectPage] = useState(async () => await getAProjectPage());

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
      customFieldResp,
      allProjectsResp,
      totalIssuesInInstanceResp,
      currentUserResp
    ] = await Promise.all([
      getCustomFieldInfo(),
      getAllProjects(),
      getTotalIssuesInInstance(),
      getCurrentUser(),
    ]);
    setCustomFieldInfo(customFieldResp);
    setAllProjects(allProjectsResp);
    setTotalIssuesInInstance(totalIssuesInInstanceResp);
    setCurrentUser(currentUserResp);
  }, []);

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
    setFormState(formData);
  };

  return (
    <GlobalPage>
      <Fragment>
        <Tabs>
          <Tab label="Welcome">
            <Text></Text>
            <Fragment>
              <Text>Hello <Strong>{currentUser?.displayName || 'loading...'}</Strong> from MyForgeLabGlobalPage</Text>
              {totalCommentedIssues
                ? (
                  <Text>Total issues found <Strong>{totalCommentedIssues || 'loading...'}</Strong> out of <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
                )
                : (
                  <Text>Total issues in your Jira instance: <Strong>{totalIssuesInInstance || 'loading...'}</Strong></Text>
                )}

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
                        <Text>{issue.key}</Text>
                      </Cell>
                      <Cell>
                        <Text>{issue.summary}</Text>
                      </Cell>
                    </Row>
                  ))}
                </Table>
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
                  {allProjects.map((project) => <Option label={project.name} value={project.key} />)}
                  {/* <Option label="Milestone 2" value="two" />
              <Option label="Milestone 3" value="three" /> */}
                </Select>
              </Form>
              <Button onClick={async () => {
                const resp = await getAllProjects();
                setAllProjects(resp)
              }} text="Change options" />
              {formState && <Text>{JSON.stringify(formState)}</Text>}
            </Fragment>
          </Tab>

          <Tab label="Rubbish">
            <Text></Text>
            {/* <Text>{JSON.stringify(allProjects)}</Text>
          <Text>{JSON.stringify(aProjectPage)}</Text> */}
            {/* {fakeProjects.map(project => <Text key={project.key}>{project.name}</Text>)} */}
            {/* {aProjectPage.map((project) => {
            <Text>{project.name}</Text>
          })} */}
            {/* {allProjects.map((project) => { <Text>{project.name}</Text> })} */}
            {allProjects.map(project => <Text>{project.name}</Text>)}
            {/* <Text>{JSON.stringify(allProjects)}</Text> */}
            <Text>{JSON.stringify(currentUser)}</Text>
          </Tab>
          <Tab label="Custom Fields info">
            <Text></Text>

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