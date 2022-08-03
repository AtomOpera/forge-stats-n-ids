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
import { TabWelcome } from './TabWelcome';
import { TabCustomFieldsinfo } from './TabCustomFieldsinfo';




export default function () {
  // useState is a UI kit hook we use to manage the form data in local state
  // const [formState, setFormState] = useState(undefined);

  // const [aProjectPage, setAProjectPage] = useState(async () => await getAProjectPage());

  // const [instance, setInstance] = useState(undefined);

  // NON parallelize all REST API calls to Jira
  // const [customFieldInfo, setCustomFieldInfo] = useState(async () => await getCustomFieldInfo());
  // const [allProjects, setAllProjects] = useState(async () => wait getAllProjects());
  // const [totalIssuesInInstance, setTotalIssuesInInstance] = useState(async () => await getTotalIssuesInInstance());
  // const [currentUser, setCurrentUser] = useState(async () => await getCurrentUser());

  // parallelize all REST API calls to Jira
  // const [customFieldInfo, setCustomFieldInfo] = useState(async () => []); // await getCustomFieldInfo());
  // const [allProjects, setAllProjects] = useState(async () => []); // await getAllProjects());
  // const [totalIssuesInInstance, setTotalIssuesInInstance] = useState(async () => []); // await getTotalIssuesInInstance());
  // const [currentUser, setCurrentUser] = useState(async () => { }); // await getCurrentUser());
  // const [options, setOptions] = useState();
  // useEffect(async () => {
  //   const [
  //     // customFieldResp,
  //     allProjectsResp,
  //     totalIssuesInInstanceResp,
  //     currentUserResp,
  //     currentinstance,
  //     // currentProjects,
  //   ] = await Promise.all([
  //     // getCustomFieldInfo(),
  //     getAllProjects(),
  //     getTotalIssuesInInstance(),
  //     getCurrentUser(),
  //     getInstance(),
  //     // getAllProjects(),
  //   ]);
  //   // setCustomFieldInfo(customFieldResp);
  //   setAllProjects(allProjectsResp);
  //   setTotalIssuesInInstance(totalIssuesInInstanceResp);
  //   setCurrentUser(currentUserResp);
  //   setInstance(currentinstance);
  //   // const projs = currentProjects.map((project) => {
  //   //   return { label: project.name, value: project.key };
  //   // });
  //   // setOptions(projs);
  // }, []);



  // const [options, setOptions] = useState(
  //   async () => {
  //     const projects = await getAllProjects();
  //     return projects.map((project) => {
  //       return { label: project.name, value: project.key };
  //     });
  //   }
  //   // [
  //   //   { label: 'first', value: 'first' },
  //   //   { label: 'second', value: 'second' },
  //   //   { label: 'third', value: 'third' },
  //   // ]
  // )

  // const [allIssues, setAllIssues] = useState('loading...');
  // const [issuesCommentedByUser, setIssuesCommentedByUser] = useState('loading...');
  // const [issuesInTableFormat, setIssuesInTableFormat] = useState();
  // const [count, setCount] = useState(0);
  // const [startAt, setstartAt] = useState(0);
  // const [totalIssues, setTotalIssues] = useState(0);
  // const [totalCommentedIssues, setTotalComentedIssues] = useState(0);

  // const actionButtons = [
  //   <Button
  //     text={!issuesInTableFormat ? 'Search for issues I have commented on...' : `Load more results ${startAt}`}
  //     onClick={() => {
  //       setstartAt(startAt + 50);
  //     }}
  //   />,
  //   <Button text="Cancel" onClick={() => { }} />,
  // ];

  // const onSubmit = async (formData) => {
  //   /**
  //    * formData:
  //    * {
  //    *    username: 'Username',
  //    *    products: ['jira']
  //    * }
  //    */
  //   // {"search":"one","user":"5d19ec2b0fa0030d15fc5ee2","projects":["GSP","FT"]}
  //   // console.log(formData.projects);
  //   const commentedByUser = await getAllIssuesCommentedByUser(currentUser.accountId, formData.projects);
  //   setFormState(formData);
  //   setTotalComentedIssues(commentedByUser.totalIssuesFound);
  //   // getIssuesInTableFormat(commentedByUser.issues);
  //   setIssuesInTableFormat(getIssuesInTableFormat(commentedByUser.issues));
  // };

  // console.log(formState && formState.projects.some((project) => "FT" === project));
  // console.log(formState);

  return (
    <GlobalPage>
      <Fragment>
        <Tabs>
          <TabWelcome />

          <TabIssuesCommentedBy />

          <TabCustomFieldsinfo />

          <Tab label="Rubbish">
            <Text></Text>
            {/* <Text>{JSON.stringify(allProjects)}</Text>
          <Text>{JSON.stringify(aProjectPage)}</Text> */}
            {/* {fakeProjects.map(project => <Text key={project.key}>{project.name}</Text>)} */}
            {/* {aProjectPage.map((project) => {
            <Text>{project.name}</Text>
          })} */}
            {/* {allProjects.map((project) => { <Text>{project.name}</Text> })} */}
            {/* {allProjects.length !== 0 && allProjects.map(project => <Text>{project.name}</Text>)} */}
            {/* <Text>{JSON.stringify(allProjects)}</Text> */}
            {/* <Text>{JSON.stringify(currentUser)}</Text> */}
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