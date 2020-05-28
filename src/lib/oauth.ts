import * as Driver from "./googlesync";
import * as Models from "./models";
import * as Sync from "./sync";
import { ILogin } from "./types";
 
export async function login(): Promise<ILogin> {
  const loginConfig = {
    'scope': 'https://www.googleapis.com/auth/drive.appdata', // for browser
    'scopes': 'https://www.googleapis.com/auth/drive.appdata', // for android
    // offline:true,
    // webClientId: ""
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