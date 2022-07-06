import ForgeUI, {
  ProjectPage,
  Tabs,
  Tab,
  Text,
  Code,
  SectionMessage,
  Fragment,
  IssueGlance,
  GlobalPage,
  useAction,
  useState,
  useEffect,
  Button,
} from '@forge/ui';
import api, { route } from '@forge/api';

const getAllIssues = async (allIssues, setAllIssues) => {
  const currentIssues = [...allIssues];
  const allProjects = 'project is not EMPTY';
  const startAt = 0;
  const maxResults = 1;
  let count = 0;
  const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
  const KTProject = 'project = "KT"';
  while (count < 5){
    // const result = await api
    // .asApp()
    // .requestJira(
    //   route`/rest/api/3/search?jql=${allProjects}&startAt=${count}&maxResults=${maxResults}&fields=summary,comment`
    // );
    // const json = await result.json();
    // console.log(json);
    count += 1;
    await new Promise((r) => setTimeout(r, 1000));
    setAllIssues(count);
    // return json;
  }
  // const result = await api
  //   .asApp()
  //   .requestJira(
  //     route`/rest/api/3/search?jql=${allProjects}${paginated}&fields=summary,comment`
  //   );


  // const json = await result.json();
  // console.log(json);
  // return json;
};

const reTryCatch = async (allIssues, setAllIssues) => {
  let output;
  let count = 0;
  const maxTries = 3;
  while (count < maxTries) {
    setAllIssues(allIssues + ' ' + `running attempt ${count + 1}...`);
    console.log(`running attempt ${count + 1}...`);
    // const result = await api
    //   .asApp()
    //   .requestJira(
    //     route`/rest/api/3/search?jql=${allProjects}${paginated}&fields=summary,comment`
    //   );
    // await new Promise((r) => setTimeout(r, 1000));
    count = count+1;
  }
  // setAllIssues(`finish at ${count + 1}...`);
};

const Countdown = ({ seconds }) => {
  const [countdownValue, setCountdownValue] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(
      () => setCountdownValue((time) => time - 1),
      1000
    );

    return function clear() {
      console.log("out!");
      clearInterval(interval);
    };
  }, []);

  return <Text>{countdownValue}</Text>;
};

export default function () {
  const [seconds, setSeconds] = useState("120");
  const [isCountdownVisible, setCountdownVisible] = useState(true);

  const [allIssues, setAllIssues] = useState('loading...');
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   // const allIssues = 
  //   // await getAllIssues(allIssues, setAllIssues);
  //   reTryCatch(allIssues, setAllIssues);

  //   // setAllIssues(allIssues);
  // }, []);

  // setAllIssues(getAllIssues());
  console.log('hello there!');
  console.log(allIssues);

  return (
    <GlobalPage>
      <Fragment>
          {!isCountdownVisible && (
            <Button text={'Start'} onClick={() => setCountdownVisible(true)} />
          )}
          {isCountdownVisible && (
            <Button text={'Stop'} onClick={() => setCountdownVisible(false)} />
          )}
        <Text>
          Hello, world from MyLabGlobalPage!
          {seconds}
          {JSON.stringify(isCountdownVisible)} 
        </Text>
        <Countdown seconds={seconds} />
        <Text>Hello, world from MyLabGlobalPage!</Text>
        <Text>{allIssues}</Text>
        {/* <Text><Code text={JSON.stringify(allIssues, null, 2)} /></Text> */}
        <Button
          text={`Count is ${count}`}
          onClick={() => {
            setCount(count + 1);
          }}
        />
      </Fragment>
    </GlobalPage>
  );
};