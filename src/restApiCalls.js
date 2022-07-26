import api, { route } from '@forge/api';

export async function getCustomFieldInfo() {
  const maxResults = 100; // 50;
  let startAt = 0;
  let resource;
  let customFields = [];
  let page;
  // let parsedPage = { isLast: false };
  let isLast = false;

  // Await in loop as next page depends on previous page.
  do {
    // eslint-disable-next-line no-await-in-loop
    // resource = `search?startAt=${startAt}&maxResults=${maxResults}&type=custom`
    const jsonResponse = await api
      .asApp()
      .requestJira(
        // route`/rest/api/2/field/${resource}`
        route`/rest/api/2/field/search?startAt=${startAt}&maxResults=${maxResults}&type=custom`
        // route`/rest/api/3/search?jql=${allProjects}` // ${paginated}&fields=summary,comment`
      );
    // page = await AP.request(`/rest/api/2/field/${resource}`);
    // parsedPage = await JSON.parse(page.body);
    const parsedPage = await jsonResponse.json();
    customFields = [...customFields, ...parsedPage.values];
    startAt += parsedPage.values.length;
    isLast = parsedPage.isLast;
    // console.log({ parsedPage })
    // console.log(parsedPage.isLast)
    // console.log(parsedPage.values.length)
    // console.log(parsedPage.values.length)
    // console.log(startAt)
  } while (!isLast);
  // } while (startAt !== 10);

  // console.log(request);
  return customFields;
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