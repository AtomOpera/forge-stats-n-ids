import api, { route } from '@forge/api';

export const getInstance = async () => {
  // return "lalala";
  const response = await api
    .requestJira(route`/rest/applinks/latest/manifest`);
  const results = await response.text();
  const jurl = /\<url\>(.*)\<\/url\>/;
  return jurl.exec(results)[1];
}

export const getAllIssuesCommentedByUser = async (userAccountId, projects) => {
  const startAt = 0;
  const maxResults = 50;
  const projectsQuery = projects.length !== 0 ? `project in (${projects})` : 'project is not EMPTY';
  let count = 0;
  const paginated = `&startAt=${startAt}&maxResults=${maxResults}`;
  console.log(`/rest/api/3/search?jql=${projectsQuery}&startAt=0&maxResults=50&fields=summary,comment`);
  const result = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=${projectsQuery}&startAt=0&maxResults=50&fields=summary,comment`
    );
  const json = await result.json();
  const issuesCommented = getIssuesCommentedByUser(json.issues, userAccountId);
  const totalIssuesFound = issuesCommented.length;
  return { totalIssuesFound, issues: issuesCommented };
};

export const getIssuesCommentedByUser = (issues, userAccountId) => {
  const issuesCommentedByUser = issues.filter((issue) => {
    // console.log(issue.fields.comment);
    // console.log({ userAccountId });
    return issue.fields.comment.comments.some((comment) => {
      return comment.author.accountId === userAccountId;
    })
  });
  // console.log('issue.fields.comment.comments', issues[0].fields.comment.comments);
  // console.log('issuesCommentedByUser', issuesCommentedByUser);
  return issuesCommentedByUser;
};

export const getIssuesInTableFormat = (issues) => {
  //table format:
  // [
  //   {
  //     key: 'XEN-1',
  //     status: 'In Progress',
  //   },
  //   {
  //     key: 'XEN-2',
  //     status: 'To Do',
  //   },
  // ]
  // console.log(issues);
  const issuesInTableFormat = issues.reduce((accumulator, currentValue) => {
    return [...accumulator, { key: currentValue.key, summary: currentValue.fields.summary }];
  }, []);
  return issuesInTableFormat;
};

// TO DO: make this work, prob there is an error returned and this is not picking it up
export async function getCustomFieldCount(fieldId) {
  console.log(fieldId);
  const jsonResponse = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?jql=cf[${fieldId}]`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  console.log({jsonResponse});
  const response = await jsonResponse.json();
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  
  console.log({response});
  return response.total;
}

export async function getCustomFieldInfo() {
  const maxResults = 100; // 50;
  let startAt = 0;
  let resource;
  let fullResource;
  let customFields = [];
  let page;
  // let parsedPage = { isLast: false };
  let isLast = false;
  let prevInfLoop = 0;

  // Await in loop as next page depends on previous page.
  do {
    const jsonResponse = await api
      .asApp()
      .requestJira(
        // route`/rest/api/2/field/${resource}`
        // route`/rest/api/2/${resource}`
        // route is very picky 
        // find out more here: https://developer.atlassian.com/platform/forge/runtime-reference/product-fetch-api/#route
        route`/rest/api/2/field/search?startAt=${startAt}&maxResults=${maxResults}&type=custom` // ${resource}`
        // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
      );
    // page = await AP.request(`/rest/api/2/field/${resource}`);
    // parsedPage = await JSON.parse(page.body);
    const parsedPage = await jsonResponse.json();
    // console.log(route`/rest/api/2/${resource}`);
    // console.log(parsedPage.startAt);
    customFields = [...customFields, ...parsedPage.values];
    startAt += parsedPage.values.length;
    isLast = parsedPage.isLast;
    prevInfLoop += 1;
    console.log(prevInfLoop);
    // console.log({ parsedPage })
    // console.log(parsedPage.isLast)
    // console.log(parsedPage.values.length)
    // console.log(parsedPage.values.length)
    // console.log(startAt)
  } while (!isLast && prevInfLoop < 10);
  // } while (startAt !== 10);

  // console.log(request);
  return customFields;
};

// TO DO: finish this function
export async function getAllIssues() {
  const maxResults = 50; // 50;
  let startAt = 0;
  let resource;
  let fullResource;
  let customFields = [];
  let page;
  let isLast = false;
  let prevInfLoop = 0;

  // Await in loop as next page depends on previous page.
  do {
    const jsonResponse = await api
      .asApp()
      .requestJira(
        route`/rest/api/3/search?startAt=${startAt}&maxResults=${maxResults}`
      );
    const parsedPage = await jsonResponse.json();
    customFields = [...customFields, ...parsedPage.values];
    startAt += parsedPage.values.length;
    isLast = parsedPage.isLast;
    prevInfLoop += 1;
    console.log(prevInfLoop);
  } while (!isLast && prevInfLoop < 10);
  return customFields;
};

export const getTotalCustomFieldsInInstance = async () => {
  const jsonResponse = await api
    .asApp()
    .requestJira(
      // route`/rest/api/2/field/${resource}`
      // route`/rest/api/2/${resource}`
      // route is very picky 
      // find out more here: https://developer.atlassian.com/platform/forge/runtime-reference/product-fetch-api/#route
      route`/rest/api/2/field/search?startAt=0&maxResults=1&type=custom` // ${resource}`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  // page = await AP.request(`/rest/api/2/field/${resource}`);
  // parsedPage = await JSON.parse(page.body);
  const parsedPage = await jsonResponse.json();
  return parsedPage.total;

};

export const getTotalFiltersInInstance = async () => {
  const jsonResponse = await api
    .asApp()
    .requestJira(
      // route`/rest/api/2/field/${resource}`
      // route`/rest/api/2/${resource}`
      // route is very picky 
      // find out more here: https://developer.atlassian.com/platform/forge/runtime-reference/product-fetch-api/#route
      route`/rest/api/3/filter/search` // ${resource}`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  // page = await AP.request(`/rest/api/2/field/${resource}`);
  // parsedPage = await JSON.parse(page.body);
  const parsedPage = await jsonResponse.json();
  return parsedPage.total;

};

export const getTotalBoardsInInstance = async () => {
  const jsonResponse = await api
    .asApp()
    .requestJira(
      // route`/rest/api/2/field/${resource}`
      // route`/rest/api/2/${resource}`
      // route is very picky 
      // find out more here: https://developer.atlassian.com/platform/forge/runtime-reference/product-fetch-api/#route
      route`/rest/agile/1.0/board/` // ${resource}`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  // page = await AP.request(`/rest/api/2/field/${resource}`);
  // parsedPage = await JSON.parse(page.body);
  const parsedPage = await jsonResponse.json();
  return parsedPage.total;
};

export const getTotalScreensInInstance = async () => {
  const jsonResponse = await api
    .asApp()
    .requestJira(
      // route`/rest/api/2/field/${resource}`
      // route`/rest/api/2/${resource}`
      // route is very picky 
      // find out more here: https://developer.atlassian.com/platform/forge/runtime-reference/product-fetch-api/#route
      route`/rest/api/2/screens` // ${resource}`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  // page = await AP.request(`/rest/api/2/field/${resource}`);
  // parsedPage = await JSON.parse(page.body);
  const parsedPage = await jsonResponse.json();
  return parsedPage.total;
};

export const getTotalWorkflowsInInstance = async () => {
  const jsonResponse = await api
    .asApp()
    .requestJira(
      // route`/rest/api/2/field/${resource}`
      // route`/rest/api/2/${resource}`
      // route is very picky 
      // find out more here: https://developer.atlassian.com/platform/forge/runtime-reference/product-fetch-api/#route
      route`/rest/api/2/workflow/search` // ${resource}`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  // page = await AP.request(`/rest/api/2/field/${resource}`);
  // parsedPage = await JSON.parse(page.body);
  const parsedPage = await jsonResponse.json();
  return parsedPage.total;
};

export const getCurrentUser = async () => {
  const jsonResponse = await api.asUser().requestJira(route`/rest/api/3/myself`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const response = await jsonResponse.json();
  return response;
};

export const getAProjectPage = async () => {
  const jsonResponse = await api
    .asUser()
    .requestJira(
      route`/rest/api/3/project/search?startAt=0&maxResults=50`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  const response = await jsonResponse.json();

  // console.log(response);
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  return response.values;
};

export const getAllProjects = async () => {
  let projects = [];
  let startAt = 0;
  let isLast = false;
  const maxResults = 50;

  do {
    const jsonResponse = await api
      .asUser()
      .requestJira(
        route`/rest/api/3/project/search?startAt=${startAt}&maxResults=${maxResults}`
        // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
      );
    const response = await jsonResponse.json();

    projects = [...projects, ...response.values];
    isLast = response.isLast;
    startAt += response.values.length;

  } while (!isLast);

  // console.log(projects);
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  return projects;
};

export const getTotalProjectsInInstance = async () => {
  const jsonResponse = await api
    .asUser()
    .requestJira(
      route`/rest/api/3/project/search?startAt=0&maxResults=1`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );
  const response = await jsonResponse.json();
  return response.total;
};

export const getTotalIssuesInInstance = async () => {
  const startAt = 0;
  const maxResults = 50;
  const jsonResponse = await api
    .asApp()
    .requestJira(
      route`/rest/api/3/search?startAt=0&maxResults=1&fields=summary`
      // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
    );


  const response = await jsonResponse.json();
  // console.log(json);
  // setAllIssues(JSON.stringify(response, null, 2));
  return response.total;
};
