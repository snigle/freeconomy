import * as React from "react"
import {Text} from "react-native"
import {getLogin} from "./GoogleSync"
import * as Models from "./Models"
import * as Sync from "./Sync"

export default (props:any) : JSX.Element => {
  console.log("props", props)
  getLogin(props.location.hash).then(login => {
    console.log("login ok : ", login);
    return Models.SaveLogin(login);
  })
  .then(() => Sync.GoogleSync() && props.history.push("/"))
  return <Text>Loading...</Text>
}
