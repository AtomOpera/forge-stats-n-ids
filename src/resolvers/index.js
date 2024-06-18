import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
});

resolver.define('getIssues', async (req) => {
  const startAt = 0;
  const maxResults = 50;
  const result = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=project is not EMPTY&startAt=${startAt}&maxResults=${maxResults}&fields=summary,comment`       // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );

  console.log('startAt', startAt);
  console.log('maxResults', maxResults);
  // console.log('result', result);
  const json = await result.json();
  // console.log('json', json);
  // console.log(json);
  // setAllIssues(JSON.stringify(json, null, 2));
  console.log(json)
  return json;

  // const result = await fetch(
  //   "https://zenquotes.io/api/today"
  // );

  // const data = await result.json();
  // const quote = data[0].q;
  // console.log(quote);
  // return quote;
});


// const getAllIssues = async (startAt = 0, maxResults = 3) => {
//   // const allProjects = 'project is not EMPTY';
//   //  const startAt = 0;
//   //  const maxResults = 50;
//   // let count = 0;
//   // const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
//   // const KTProject = 'project = "KT"';
//   const result = await api
//     .asApp()
//     .requestJira(
//       route`/rest/api/3/search?jql=project is not EMPTY&startAt=${startAt}&maxResults=${maxResults}&fields=summary,comment`       // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
//     );

//   console.log('startAt', startAt);
//   console.log('maxResults', maxResults);
//   // console.log('result', result);
//   const json = await result.json();
//   // console.log('json', json);
//   // console.log(json);
//   // setAllIssues(JSON.stringify(json, null, 2));
//   return json;
// };

export const handler = resolver.getDefinitions();
