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

  console.log(response);
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

  console.log(projects);
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

const getAllIssues = async (allIssues, setAllIssues) => {
  const currentIssues = [...allIssues];
  const allProjects = 'project is not EMPTY';
  const startAt = 0;
  const maxResults = 50;
  let count = 0;
  const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
  const KTProject = 'project = "KT"';
  const jsonResponse = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=project is not EMPTY&startAt=0&maxResults=50&fields=summary,comment`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );


  const response = await jsonResponse.json();
  // console.log(json);
  setAllIssues(JSON.stringify(response, null, 2));
  return response;
};

const getIssuesCommentedByUser = (issues, userAccountId) => {
  const issuesCommentedByUser = issues.filter((issue) => {
    return issue.fields.comment.comments.some((comment) => {
      return comment.author.accountId === userAccountId;
    })
  });
  return issuesCommentedByUser;
};

const getIssuesInTableFormat = (issues) => {
  //table format:
  // [
  //   {
  //     key: 'XEN-1',
  //     status: 'In Progress',
  //   },
  //   {
  //     key: 'XEN-2',
  //     status: 'To Do',
  //   },
  // ]
  const issuesInTableFormat = issues.reduce((accumulator, currentValue) => {
    return [...accumulator, { key: currentValue.key, summary: currentValue.fields.summary }];
  }, []);
  return issuesInTableFormat;
};

export default function () {
  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);
  const [allProjects, setAllProjects] = useState(async () => await getAllProjects());
  const [aProjectPage, setAProjectPage] = useState(async () => await getAProjectPage());
  const [totalIssuesInInstance, setTotalIssuesInInstance] = useState(async () => await getTotalIssuesInInstance());
  const [currentUser, setCurrentUser] = useState(async () => await getCurrentUser());

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

  // useEffect(async () => {
  // const currentIssues = await getAllIssues(allIssues, setAllIssues);
  // setTotalIssues(currentIssues.issues.length);
  // const currentUserResp = await getCurrentUser();
  // setCurrentUser(currentUserResp);
  // const currentTotalIssuesInInstance = await getTotalIssuesInInstance();
  // setTotalIssuesInInstance(currentTotalIssuesInInstance);
  // const currentProjects = await getAllProjects();
  // setAllProjects(currentProjects);
  // console.log(currentProjects);

  // const currentIssuesCommentedByUser = getIssuesCommentedByUser(currentIssues.issues, currentUserResp.accountId);
  // setIssuesCommentedByUser(currentIssuesCommentedByUser);
  // setTotalComentedIssues(currentIssuesCommentedByUser.length);

  // const currentIssuesInTableFormat = getIssuesInTableFormat(currentIssuesCommentedByUser);
  // setIssuesInTableFormat(currentIssuesInTableFormat);
  // }, []);

  const issues = [
    {
      key: 'XEN-1',
      summary: 'In Progress',
    },
    {
      key: 'XEN-2',
      summary: 'To Do',
    },
  ];

  const fakeProjects = [
    {
      name: 'project 1',
      key: 'P',
    },
    {
      name: 'project 2',
      key: 'PP',
    },
  ];


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
        <Fragment>
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
          <Text>{JSON.stringify(currentUser)}</Text>
          {/* <Text>{JSON.stringify(allProjects)}</Text>
          <Text>{JSON.stringify(aProjectPage)}</Text> */}
          {/* {fakeProjects.map(project => <Text key={project.key}>{project.name}</Text>)} */}
          {/* {aProjectPage.map((project) => {
            <Text>{project.name}</Text>
          })} */}
          {/* {allProjects.map((project) => { <Text>{project.name}</Text> })} */}
          {allProjects.map(project => <Text>{project.name}</Text>)}
          {/* <Text>{JSON.stringify(allProjects)}</Text> */}
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
      </Fragment>
    </GlobalPage>
  );
};