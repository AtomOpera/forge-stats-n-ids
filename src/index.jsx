import ForgeUI, { render, Fragment, Text, IssuePanel, GlobalPage } from '@forge/ui';
import api, { route } from '@forge/api';
import Resolver from '@forge/resolver';
import MyLabProjectPage from './MyLabProjectPage';
import MyLabIssuePage from './MyLabIssuePage';
import MyLabGlancePage from './MyLabGlancePage';
import MyLabGlobalPage from './MyLabGlobalPage';
import { Queue } from '@forge/events';

/**
 * Always start with;
 * forge login
 * 
 * And then to start the app if you haven't already done it before:
 * Run forge register to register a new copy of this app to your developer account
 * Run npm install to install your dependencies
 * Run forge deploy to deploy the app into the default environment
 * Run forge install and follow the prompts to install the app -OR- forge install --upgrade
 *  * No need to repeat the above if already done
 * 
 * forge tunnel to see changes live after install (needs docker to be running)!
 * 
 * and can use "forge logs" to debug
 */

const resolver = new Resolver();

const getAllUsersForPicker = async () => {
  const response = await api.asApp().requestJira(route`/rest/api/2/user/picker?query={query}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  // console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(await response.json());
}

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
  // console.log('result', result);
  const json = await result.json();
  // console.log('json', json);
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

resolver.define('getQueueProgress', async (req) => {
  const { jobId } = req.payload;

  // const queue = new Queue({ key: 'queue-name' });
  console.log('req', req);
  console.log('newJobId', jobId);

  const jobProgress = Queue.getJob(jobId);
  console.log('jobProgress', jobProgress);
  // Get stats of a particular job
  const response = await jobProgress.getStats();

  const jsonResp = await response.json();
  console.log('jsonResp', jsonResp);
  // return resp;
  return jsonResp;

  // return 'Hello, this is some data for the world!';
});

resolver.define('createQueue', async (req) => {
  const queue = new Queue({ key: 'queue-name' });
  const newJobId = await queue.push('hello world');

  const jobProgress = queue.getJob(newJobId);
  // Get stats of a particular job
  const response = await jobProgress.getStats();
  const jsonResp = await response.json();
  // return resp;
  return newJobId; // JSON.stringify(resp, null, 2);

  // return 'Hello, this is some data for the world!';
});

export const handler = resolver.getDefinitions();

export const Project = render(
  <MyLabProjectPage />
);

export const Glance = render(
  <MyLabGlancePage />
);

export const Issue = render(
  <MyLabIssuePage />
);

export const Global = render(
  <MyLabGlobalPage />
);
