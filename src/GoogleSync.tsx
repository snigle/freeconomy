interface Login {
  id: string;
  token: string;
  expires: Date;
}

export interface Collection {
  UUID: string;
  LastUpdate: Date;
}

export const jsonClientID = require("../client_id.json");
export const GOOGLE_CLIENT_ID = jsonClientID.web.client_id;

interface File {
  id: string;
}

export const getURL = (id?: string): string => {
  const redirect_uri = window.location.origin + window.location.pathname;
  // TODO add path in callback parameter as query
  let url = "https://accounts.google.com/o/oauth2/v2/auth?scope=" + encodeURIComponent("https://www.googleapis.com/auth/drive.appfolder email profile") + "&state=drive&redirect_uri=" + encodeURIComponent(redirect_uri) + "&response_type=token&client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) + "&include_granted_scopes=true";
  if (id) {
    url += "&login_hint=" + encodeURIComponent(id);
  }
  return url;
};

export const getMatchURL = "oauthCallback";

export const getLogin = (pathname: string): Promise<Login> => {
  return Promise.resolve().then(() => {
    const regex = /.*access_token=([^&]+)&.*/;
    const match = pathname.match(regex);
    let access_token = "";
    if (!match) {
      throw new Error("can't get login : access_token not found");
    } else if (match.length !== 2) {
      throw new Error("can't get login : error when getting access_token");
    } else {
      access_token = match[1];
    }
    return access_token;
  }).then((access_token) => fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + access_token).then((response) => {
    return response.json();
  }, (error) => {
    throw error;
  }).then((json) => {
    if (json.aud !== GOOGLE_CLIENT_ID) {
      throw new Error("google id doesn't correspond");
    }
    return { token : access_token, id : json.email, expires : new Date(parseInt(json.exp, 10) * 1000) };
  }));
};

export const getFileFromName = (login: Login, filename: string, noCache: boolean): Promise<File> => {
  let params = "spaces=appDataFolder";
  params += "&q=" + encodeURIComponent(`name='${filename.replace(/'/g, "\'")}'`);
  params += "&orderBy=createdTime desc";
  return fetch("https://www.googleapis.com/drive/v3/files?" + params, {
    headers : new Headers({
      Authorization : `Bearer ${login.token}`,
    }),
    cache : noCache ? "reload" : "force-cache",
  }).then((response) => response.json())
  .then((json) => ((json.files && json.files.length) || null) && json.files[0]);
};

export const downloadFile = (login: Login, id: string): Promise<Collection[]> => {
  return fetch("https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(id) + "?alt=media", {
    headers : new Headers({
      Authorization : `Bearer ${login.token}`,
      Accept : "application/json",
    }),
  })
  .then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.text();
  })
  .then((text: string): Collection[] => {
    return text ? JSON.parse(text) : [];
  }, (e) => { throw e; })
  .then((collection) => collection.map((c) => ({...c, LastUpdate : new Date(c.LastUpdate)})));
};

export const uploadFile = (login: Login, id: string, json: Collection[]): Promise<any> => {
  return fetch("https://www.googleapis.com/upload/drive/v3/files/" + encodeURIComponent(id) + "?uploadType=media", {
    method : "PATCH",
    headers : new Headers({
      "Authorization" : `Bearer ${login.token}`,
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }),
    body : JSON.stringify(json),
  }).then((response) => response.json());
};

export const createFile = (login: Login, filename: string): Promise<File> => {
  return fetch("https://content.googleapis.com/drive/v3/files", {
    method : "POST",
    headers : new Headers({
      "Authorization" : `Bearer ${login.token}`,
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    }),
    body : JSON.stringify({
      name : filename,
      parents : ["appDataFolder"],
    }),
  })
  .then((response) => response.json())
  .then((json) => getFileFromName(login, filename, true));
};

export const downloadFileSafe = (login: Login, filename: string): Promise<Collection[]> => {
  // Check if file exist and get it's ID
  return getFileFromName(login, filename, false)
  .then((file) => !file ? createFile(login, filename) : file)
  .then((file) => downloadFile(login, file.id));
};

export const uploadFileSafe = (login: Login, filename: string, json: Collection[]): Promise<File> => {
  // Check if file exist and get it's ID
  return getFileFromName(login, filename, false)
  .then((file) => !file ? createFile(login, filename) : file)
  .then((file) => uploadFile(login, file.id, json));
};

// export default {
//   getURL : getURL, //Give url to redirect the user to enter login/password
//   getMatchURL : getMatchURL, //Regex to match the callback url sent by google
//   getLogin : getLogin, // Login object created from google answer
//   download : downloadFileSafe, //Synchronise json file in the cloud
//   upload : uploadFileSafe,
// };
