import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

const reTryCatch = async (output, setOutput) => {
  // let output;
  let count = 0;
  const maxTries = 3;
  while (count < maxTries) {
    setOutput(`running attempt ${count + 1}...`);
    console.log(`running attempt ${count + 1}...`);
    // const result = await api
    //   .asApp()
    //   .requestJira(
    //     route`/rest/api/3/search?jql=${allProjects}${paginated}&fields=summary,comment`
    //   );
    await new Promise((r) => setTimeout(r, 1000));
    count = count+1;
  }
  setOutput(`finished at ${count + 1} attempts`);
};

function App() {
  const [data, setData] = useState(null);
  const [allIssues, setAllIssues] = useState('loading...');

  // useEffect(() => {
  //   invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  // }, []);

  useEffect(() => {
      // const allIssues = 
      // await getAllIssues(allIssues, setAllIssues);
      reTryCatch(allIssues, setAllIssues);
  
      // setAllIssues(allIssues);
    }, []);

  return (
    <div>
      <h2>There is going to be data here:</h2>
      {data ? data : 'Loading...'}
      <div>
        {allIssues}
      </div>
    </div>
  );
}

export default App;
