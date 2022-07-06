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
} from '@forge/ui';
import api, { route } from '@forge/api';

const getCurrentUser = async () => {
  const response = await api.asUser().requestJira(route`/rest/api/3/myself`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  // console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(await response.json());
  const userJson = await response.json();
  return userJson;
};

const getAllIssues = async (allIssues, setAllIssues) => {
  const currentIssues = [...allIssues];
  const allProjects = 'project is not EMPTY';
  const startAt = 0;
  const maxResults = 50;
  let count = 0;
  const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
  const KTProject = 'project = "KT"';
  const result = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=project is not EMPTY&startAt=0&maxResults=10&fields=summary,comment`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );


  const json = await result.json();
  // console.log(json);
  setAllIssues(JSON.stringify(json, null, 2));
  return json;
};

const getIssuesCommentedByUser = (issues, userAccountId) => {
  const issuesCommentedByUser = issues.filter((issue) => {
    return issue.fields.comment.comments.some((comment) => {
      return comment.author.accountId === userAccountId;
    })
  });
  // console.log('issue.fields.comment.comments', issues[0].fields.comment.comments);
  // console.log('issuesCommentedByUser', issuesCommentedByUser);
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
  const [allIssues, setAllIssues] = useState('loading...');
  const [issuesCommentedByUser, setIssuesCommentedByUser] = useState('loading...');
  const [issuesInTableFormat, setIssuesInTableFormat] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [count, setCount] = useState(0);

  useEffect(async () => {
    // const allIssues = 
    const currentIssues = await getAllIssues(allIssues, setAllIssues);

    const currentUserResp = await getCurrentUser();
    setCurrentUser(currentUserResp);

    const currentIssuesCommentedByUser = getIssuesCommentedByUser(currentIssues.issues, currentUserResp.accountId);
    setIssuesCommentedByUser(currentIssuesCommentedByUser);

    const currentIssuesInTableFormat = getIssuesInTableFormat(currentIssuesCommentedByUser);
    setIssuesInTableFormat(currentIssuesInTableFormat);
    // console.log('currentIssuesInTableFormat', currentIssuesInTableFormat);
    // reTryCatch(allIssues, setAllIssues);

    // setAllIssues(allIssues);
  }, []);

  // setAllIssues(getAllIssues());
  // console.log('hello there!');
  // console.log(allIssues);

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

  return (
    <GlobalPage>
      <Fragment>
        <Text>Hello <Strong>{currentUser?.displayName || 'loading...'}</Strong> from MyForgeLabGlobalPage</Text>
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
        <Button
          text={`Count is ${count}`}
          onClick={() => {
            setCount(count + 1);
          }}
        />
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