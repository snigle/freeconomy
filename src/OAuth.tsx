import * as React from "react";
// @ts-ignore
import OAuthManager from "react-native-oauth";
import * as Driver from "./GoogleSync";
import * as Models from "./Models";
import * as Sync from "./Sync";
import { ILogin } from "./Types";

const manager = new OAuthManager("freeconomy");
const config = {
  google: {
    callback_url: "http://localhost/" + Driver.getMatchURL,
    client_id: Driver.jsonClientID.web.client_id,
    client_secret: Driver.jsonClientID.web.client_secret,
  },
};
manager.configure(config);
export async function login(): Promise<ILogin> {
  console.log("loginnnnn ");
  return manager.authorize("google", { scopes: "https://www.googleapis.com/auth/drive.appfolder" })
    .then(({ response }: any) => {
      console.log("response", response);
      const today = new Date();
      const loginResponse: ILogin = {
        id: response.credentials.idToken,
        token: response.credentials.accessToken,
        expires: new Date(today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1),
      };
      console.log("save login", loginResponse);
      return Models.SaveLogin(loginResponse);
    });
}
