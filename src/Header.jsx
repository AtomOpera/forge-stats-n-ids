import ForgeUI, {
  Tabs,
  Fragment,
	ButtonSet,
	Button,
  GlobalPage,
  useState,
  useEffect,
} from '@forge/ui';

export const Header = (props) => {
	return (
		<Fragment>
			<ButtonSet>
				<Button text="Get Custom Fields info" onClick={() => { }} />
				<Button text="danger" appearance="danger" onClick={() => { }} />
				<Button text="warning" appearance="warning" onClick={() => { }} />
				<Button text="link" appearance="link" onClick={() => { }} />
				<Button text="subtle" appearance="subtle" onClick={() => { }} />
				<Button text="subtle-link" appearance="subtle-link" onClick={() => { }} />
			</ButtonSet>
		</Fragment>
	);
};
