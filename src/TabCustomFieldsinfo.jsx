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

export const TabCustomFieldsinfo = () => {

  const handleGetCustomFieldInfo = async () => {
    const customFieldInfo = await getCustomFieldInfo();
    // const issues = await getAllIssues();
    // let cfCount = 0;

    // const fullCFI = customFieldInfo.map((cf) => {
    //   let cfCount = 0;
    //   issues.forEach((issue) => {
    //     if (issue.fields[cf.id] !== null) cfCount += 1;
    //   });
    //   return { ...cf, count: cfCount };
    // });
    // console.log(customFieldInfo)

    let customFieldFullInfo = [];
    let firstOnes = 0;

    for (const customField of customFieldInfo) {
      firstOnes += 1;
      console.log(customField);
      if (customField?.schema?.customId) {
        const count = await getCustomFieldCount(customField.schema.customId);
        console.log(count);
        customFieldFullInfo = [...customFieldFullInfo, count];
        console.log(customFieldFullInfo);
      }
      if (firstOnes >= 15) break;
    }
    // console.log(customFieldInfo);
    console.log({ customFieldFullInfo });
    // console.log(fullCFI);
    setCustomFieldInfo(customFieldInfo);
    setCustomFieldNumbers(customFieldFullInfo);
  };

  const [customFieldInfo, setCustomFieldInfo] = useState(async () => []);
  const [customFieldNumbers, setCustomFieldNumbers] = useState(async () => []);

  return (
    <Tab label="☰ Custom Fields info">
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
              <Text>{customFieldNumbers[i] || ''}</Text>
            </Cell>
          </Row>
        ))}
      </Table>

      {customFieldInfo.map(customField => <Text>{customField.name}</Text>)}

    </Tab>
  );

};