import ForgeUI, {
  Tabs,
  Fragment,
  GlobalPage,
} from '@forge/ui';
import { TabIssuesCommentedBy } from './TabIssuesCommentedBy';
import { TabWelcome } from './TabWelcome';
import { TabCustomFieldsinfo } from './TabCustomFieldsinfo';

export default function () {
  return (
    <GlobalPage>
      <Fragment>
        <Tabs>
          <TabWelcome />
          <TabIssuesCommentedBy />
          <TabCustomFieldsinfo />
        </Tabs>
      </Fragment>
    </GlobalPage>
  );
};