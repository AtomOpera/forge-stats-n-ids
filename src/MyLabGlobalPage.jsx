import ForgeUI, {
  Tabs,
  Fragment,
  GlobalPage,
  useState,
  useEffect,
} from '@forge/ui';
import {
  getTotalIssuesInInstance,
  getTotalProjectsInInstance,
  getTotalCustomFieldsInInstance,
  getTotalFiltersInInstance,
  getTotalBoardsInInstance,
  getTotalScreensInInstance,
  getTotalWorkflowsInInstance,
} from './restApiCalls';
import { TabIssuesCommentedBy } from './TabIssuesCommentedBy';
import { TabWelcome } from './TabWelcome';
import { TabWelcomeAlt } from './TabWelcomeAlt';
import { TabCustomFieldsinfo } from './TabCustomFieldsinfo';

export default function () {
  const [state, setState] = useState({
    totalIssues: 'Scan to load...',
    totalProjects: 'Scan to load...',
    totalCustomFields: 'Scan to load...',
    totalFilters: 'Scan to load...',
    totalBoards: 'Scan to load...',
    totalScreens: 'Scan to load...',
    totalWorkflows: 'Scan to load...',
  });
  const handleGetSystemInfo = async () => {
    const totalIssues = await getTotalIssuesInInstance();
    const totalProjects = await getTotalProjectsInInstance();
    const totalCustomFields = await getTotalCustomFieldsInInstance();
    const totalFilters = await getTotalFiltersInInstance();
    const totalBoards = await getTotalBoardsInInstance();
    const totalScreens = await getTotalScreensInInstance();
    const totalWorkflows = await getTotalWorkflowsInInstance();
    setState({
      totalIssues,
      totalProjects,
      totalCustomFields,
      totalFilters,
      totalBoards,
      totalScreens,
      totalWorkflows,
    });
  };
  useEffect(async () => { await handleGetSystemInfo(); }, []);

  return (
    <GlobalPage>
      <Fragment>
        <Tabs>
          <TabWelcome handleGetSystemInfo={handleGetSystemInfo} state={state} />
          <TabWelcomeAlt handleGetSystemInfo={handleGetSystemInfo} state={state} />
          <TabIssuesCommentedBy />
          <TabCustomFieldsinfo />
        </Tabs>
      </Fragment>
    </GlobalPage>
  );
};