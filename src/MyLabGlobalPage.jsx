import ForgeUI, {
  Tabs,
  Fragment,
  GlobalPage,
  useState,
  useEffect,
} from '@forge/ui';
import { storage, startsWith } from '@forge/api';
import api from "@forge/api";
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
import { TabProjectsInfo } from './TabProjectsInfo';

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
    const stored = await storage.get('abriTest000');
    if (stored) { console.log({ stored }); setState(stored); return; }
    const totalIssues = await getTotalIssuesInInstance();
    const totalProjects = await getTotalProjectsInInstance();
    const totalCustomFields = await getTotalCustomFieldsInInstance();
    const totalFilters = await getTotalFiltersInInstance();
    const totalBoards = await getTotalBoardsInInstance();
    const totalScreens = await getTotalScreensInInstance();
    const totalWorkflows = await getTotalWorkflowsInInstance();
    const newState = {
      totalIssues,
      totalProjects,
      totalCustomFields,
      totalFilters,
      totalBoards,
      totalScreens,
      totalWorkflows,
    };
    setState(newState);
    storage.set('abriTest000', newState);
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
          <TabProjectsInfo />
        </Tabs>
      </Fragment>
    </GlobalPage>
  );
};