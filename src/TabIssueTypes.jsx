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
  Image,
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
  getAllIssueTypesForUser,
  getAvatar,
} from './restApiCalls';

export const TabIssueTypes = () => {



  const handleGetIssueTypesInfo = async () => {
    const allIssueTypes = (await getAllIssueTypesForUser())
    // console.log({ allIssueTypes });
    // let allProjectsSorted = [];
    // allProjects.sort((a, b) => (a.insight.lastIssueUpdateTime > b.insight.lastIssueUpdateTime) ? 1 : -1);
    // console.log(allProjects);
    // let allAvatars = [];
    // for (const issueType of allIssueTypes) {
    //   const avatar = await getAvatar(issueType.id);
    //   allAvatars = [...allAvatars, { [issueType.id]: avatar }];
    // }
    // // const allAvatars = allIssueTypes.map(async (issueType) => {
    // //   const avatar = await getAvatar(issueType.id);
    // //   return { [issueType.id]: avatar };
    // // })
    // setAvatars(allAvatars);
    setIssueTypes(allIssueTypes);
  };

  const [issueTypes, setIssueTypes] = useState(async () => []);
  const [avatars, setAvatars] = useState(async () => []);
  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);
  const [domain, setDomain] = useState(undefined);

  const mapIconUrl = (avatarId) => {
    if (!domain || !avatarId) return;
    const iconUrl = `${domain}/rest/api/3/universal_avatar/view/type/issuetype/avatar/${avatarId}?size=xsmall&format=png`;
    return iconUrl;
  };

  useEffect(async () => {
    const domain = await getInstance();
    console.log(domain);
    setDomain(domain);
  }, []);

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

  // const Healthy = ({ project }) => {
  //   if (project.insight.lastIssueUpdateTime === "2019-10-07T12:37:11.744+0100")
  //     return <Text><StatusLozenge text="Too old man!" appearance="removed" /></Text>
  //   if (project.insight.totalIssueCount === 0)
  //     return <Text><StatusLozenge text="This project is empty!" appearance="moved" /></Text>
  //   return <Text><StatusLozenge text="As healthy as eating veggies" appearance="success" /></Text>
  // };

  return (
    <Tab label="🧮 Issue Types">
      <Text></Text>
      <ButtonSet>
        <Button text="Get Issue types info" icon="retry" iconPosition="before" onClick={handleGetIssueTypesInfo} />
        <Button text="Sort by oldest" appearance="subtle" icon="filter" iconPosition="after" onClick={handleGetIssueTypesInfo} />
        <Button text="Sort by number of issues" appearance="subtle" icon="filter" iconPosition="after" onClick={handleGetIssueTypesInfo} />
      </ButtonSet>
      <Form onSubmit={onSubmit} submitButtonText="🔎 Search" actionButtons={actionButtons}>
        <TextField name="search" label="Search" />
      </Form>
      {formState && <Text>{JSON.stringify(formState)}</Text>}
      <Table>
        <Head>
          <Cell>
            <Text>Icon</Text>
          </Cell>
          <Cell>
            <Text>Issue Type Name</Text>
          </Cell>
          <Cell>
            <Text>Id</Text>
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
        {issueTypes?.map((issueType, i) => (
          <Row>
            <Cell>
              <Image
                // src={issueType.iconUrl}
                src={mapIconUrl(issueType.avatarId) || issueType.iconUrl}
                // src={async () => await getAvatar(issueType.id)}
                alt="icon"
                size="xlarge"
              />
              {console.log(JSON.stringify(issueType, null, 2))}
            </Cell>
            <Cell>
              <Text>
                {issueType.name}
              </Text>
            </Cell>
            <Cell>
              <Text>{issueType.id}</Text>
            </Cell>
            <Cell>
              <Text>0</Text>
              {/* <Text>{issueType.insight.totalIssueCount}</Text> */}
            </Cell>
            <Cell>
              <Text>??</Text>
              {/* <Text>{issueType.insight.lastIssueUpdateTime}</Text> */}
            </Cell>
            <Cell>
              <Text>Yes</Text>
              {/* <Healthy project={project} /> */}
            </Cell>
          </Row>
        ))}
      </Table>

      {/* {customFieldInfo.map(customField => <Text>{customField.name}</Text>)} */}

    </Tab>
  );

};