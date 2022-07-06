import api, { route } from '@forge/api';
import Resolver from '@forge/resolver';

const getAllIssues = async (startAt = 0, maxResults = 3) => {
  const allProjects = 'project is not EMPTY';
  //  const startAt = 0;
  //  const maxResults = 50;
  let count = 0;
  const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
  const KTProject = 'project = "KT"';
  const result = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=project is not EMPTY&startAt=${startAt}&maxResults=${maxResults}&fields=summary,comment`       // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );

  console.log('startAt', startAt);
  console.log('maxResults', maxResults);
  console.log('result', result);
  const json = await result.json();
  console.log('json', json);
  // console.log(json);
  // setAllIssues(JSON.stringify(json, null, 2));
  return json;
};

resolver.define('getText', async (req) => {
  console.log(req);
  const { startAt, maxResults } = req.payload;
  console.log('startAt', startAt);
  console.log('maxResults', maxResults);
  const resp = await getAllIssues(startAt, maxResults);
  // return resp;
  return JSON.stringify(resp, null, 2);

  // return 'Hello, this is some data for the world!';
});

export const handler = resolver.getDefinitions();