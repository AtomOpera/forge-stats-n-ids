import ForgeUI, { GlobalPage, render, Text } from '@forge/ui';

const App = () => {
    return (
        <GlobalPage>
            <Text>Hello, world from global.jsx!</Text>
        </GlobalPage>
    );
};
export const run = render(<App/>);