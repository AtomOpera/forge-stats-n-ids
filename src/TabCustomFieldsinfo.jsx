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
  getCustomFieldsInfo,
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

export const TabCustomFieldsinfo = () => {
  // const [issues, setIssues] = useState([]);
  // useEffect(async () => { const allCurrentIissues = await getAllIssues(); setIssues(allCurrentIissues) }, []);


  const handleGetCustomFieldsInfo = async () => {
    const customFieldsInfo = await getCustomFieldsInfo();
    const CFItemsToLoad = customFieldsInfo.slice(0, 10);
    // const issues = await getAllIssues();
    // let cfCount = 0;

    // const fullCFI = customFieldsInfo.map((cf) => {
    //   let cfCount = 0;
    //   issues.forEach((issue) => {
    //     if (issue.fields[cf.id] !== null) cfCount += 1;
    //   });
    //   return { ...cf, count: cfCount };
    // });
    // console.log(customFieldsInfo)

    let customFieldsFullInfo = [];
    let firstOnes = 0;

    // console.log(customFieldsInfo);
    // console.log(customFieldsInfo.slice(0, 10));

    // // Start timing now
    // var t0 = new Date();
    // customFieldsInfo.slice(0, 10).map((CF) => {
    //   let cfCount = 0;
    //   issues.forEach((issue) => {
    //     if (issue.fields[CF.id] !== null) cfCount += 1;
    //     console.log(cfCount);
    //     customFieldsFullInfo = [...customFieldsFullInfo, cfCount];
    //   });
    // });
    // // ... and stop.
    // var t1 = new Date();
    // console.log("Call to Promise.all took " + (t1 - t0) + " milliseconds.");

    // Start timing now
    var t0 = new Date();
    await Promise.all(customFieldsInfo.slice(0, 10).map(async (CF) => {
      console.log(CF.schema.customId);
      if (CF?.schema?.customId) {
        console.log(CF.schema.customId);
        const countForItem = await getCustomFieldCount(CF.schema.customId);
        console.log(countForItem);
        customFieldsFullInfo = [...customFieldsFullInfo, countForItem];
      }
    }));
    // ... and stop.
    var t1 = new Date();
    console.log("Call to Promise.all took " + (t1 - t0) + " milliseconds.");

    // for (const customField of customFieldsInfo) {
    //   firstOnes += 1;
    //   console.log(customField);
    //   if (customField?.schema?.customId) {
    //     const count = await getCustomFieldCount(customField.schema.customId);
    //     console.log(count);
    //     customFieldFullInfo = [...customFieldFullInfo, count];
    //     console.log(customFieldFullInfo);
    //   }
    //   if (firstOnes >= 15) break;
    // }
    // console.log(customFieldInfo);
    console.log({ customFieldsFullInfo });
    // console.log(fullCFI);
    setCustomFieldInfo(customFieldsInfo);
    setCustomFieldNumbers(customFieldsFullInfo);
  };

  const [customFieldInfo, setCustomFieldInfo] = useState(async () => []);
  const [customFieldNumbers, setCustomFieldNumbers] = useState(async () => []);

  return (
    <Tab label="☰ Custom Fields info">
      <Text></Text>

      <ButtonSet>
        <Button text="Get Custom Fields info" onClick={handleGetCustomFieldsInfo} />
        <Button text="danger" appearance="danger" onClick={() => { }} />
        <Button text="warning" appearance="warning" onClick={() => { }} />
        <Button text="link" appearance="link" onClick={() => { }} />
        <Button text="subtle" appearance="subtle" onClick={() => { }} />
        <Button text="subtle-link" appearance="subtle-link" onClick={() => { }} />
      </ButtonSet>
      <Table rowsPerPage={10}>
        <Head>
          <Cell>
            <Text>Custom Field Name</Text>
          </Cell>
          <Cell>
            <Text>CustomField Id</Text>
          </Cell>
          <Cell>
            <Text>Number of issues</Text>
          </Cell>
        </Head>
        {customFieldInfo?.map((customField, i) => (
          <Row>
            <Cell>
              <Text>{customField.name}</Text>
            </Cell>
            <Cell>
              <Text>{customField.id}</Text>
            </Cell>
            <Cell>
              <Text>{customFieldNumbers[i] === undefined ? 'N/A' : customFieldNumbers[i]}</Text>
            </Cell>
          </Row>
        ))}
      </Table>

      {customFieldInfo.map(customField => <Text>{customField.name}</Text>)}

    </Tab>
  );

};