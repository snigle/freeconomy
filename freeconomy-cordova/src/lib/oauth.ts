import * as Driver from "./googlesync";
import * as Models from "./models";
import * as Sync from "./sync";
import { ILogin } from "./types";
 
export async function login(): Promise<ILogin> {
  // return new Promise((resolve, reject) => reject("toto"));
  console.log("gplus plugin", (window as any).plugins.googleplus);
  const loginConfig = {
    'scope': 'https://www.googleapis.com/auth/drive.appdata', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'scopes': 'https://www.googleapis.com/auth/drive.appdata', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    // offline:true,
    // webClientId: "136643286294-tq30lcaqafpkph4hb9muohe6ctt1291i.apps.googleusercontent.com",
    // 'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  } 
  return new Promise<ILogin>((resolve, reject) => 
    (window as any).plugins.googleplus.trySilentLogin(
      loginConfig,
      (credentials: any) => resolve(loginSuccess(credentials)),
      (msg: string) => {
        console.log("fail to silent login", msg);
        resolve();
      })
  )
  .then(login => (login || new Promise((resolve, reject) =>
    (window as any).plugins.googleplus.login(
      loginConfig,
      (credentials: any) => resolve(loginSuccess(credentials)), 
      (msg: string) => {
        console.log("fail to login", msg)
        reject(`fail to login : ${msg}`);
      }
    ))
    )
    );
};

const loginSuccess = (credentials: any) : ILogin => {
  // console.log(JSON.stringify(credentials)); // do something useful instead of alerting
  console.log("login success", credentials);
  const today = new Date();
  return {
    expires: new Date(today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1),
    id: credentials.idToken,
    token: credentials.accessToken,
  };
}