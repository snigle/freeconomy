import * as React from "react"
import * as Driver from "./GoogleSync"
import {Login} from "./Types"
import * as Models from "./Models"
import * as Sync from "./Sync"
//@ts-ignore
import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('freeconomy')
const config =  {
  google: {
    callback_url: "http://localhost/" + Driver.getMatchURL,
    client_id: Driver.jsonClientID.web.client_id,
    client_secret: Driver.jsonClientID.web.client_secret,
  }
}
manager.configure(config);
export async function login():Promise<Login> {
  return manager.authorize('google', {scopes: "https://www.googleapis.com/auth/drive.appfolder"})
  .then(({response}:any) => {
    console.log("response", response)
    const today = new Date();
    const login: Login = {id : response.credentials.idToken, token : response.credentials.accessToken, expires : new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)}
    console.log("save login", login);
    return Models.SaveLogin(login).then(login => Sync.GoogleSync()).then(() => login)
  })
}
