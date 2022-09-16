import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  Strong,
  Code,
  Badge,
  StatusLozenge,
  SectionMessage,
  Fragment,
  IssueGlance,
  GlobalPage,
  useAction,
  useState,
  useEffect,
} from '@forge/ui';

export const HowLongAgo = (props) => {
  const { time } = props;

  return (
    <Text>Last scan: 50 minutes ago</Text>
  );
}
