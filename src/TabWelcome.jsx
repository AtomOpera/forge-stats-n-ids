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

export const TabWelcome = () => {

  return (
    <Tab label="Welcome">
      <Text></Text>
      <Fragment>
        <Text>Hello, this is MyForgeLabGlobalPage.jsx</Text>

      </Fragment>
    </Tab>
  );

};