import * as React from "react"
import {Text} from "react-native"
import {getLogin} from "./GoogleSync"
import * as Models from "./Models"
import * as Sync from "./Sync"

export default (props:any) : JSX.Element => {
  console.log("props", props)
  getLogin(props.location.hash).then(login => {
    console.log("login ok 2 : ", login);
    return Models.SaveLogin(login);
  })
  .then(() => {
    console.log("login done")
    props.history.replace("/");
    Sync.GoogleSync()
  })
  return <Text>Loading...</Text>
}
