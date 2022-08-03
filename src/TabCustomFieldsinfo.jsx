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
} from './restApiCalls';

export const TabCustomFieldsinfo = () => {

  const handleGetCustomFieldInfo = async () => {
    const customFieldInfo = await getCustomFieldInfo();
    setCustomFieldInfo(customFieldInfo);
  };

  const [customFieldInfo, setCustomFieldInfo] = useState(async () => []);

  return (
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
  );

};