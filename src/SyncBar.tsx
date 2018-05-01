import * as React from "react"
import {View, Text, ActivityIndicator, TouchableHighlight, ViewStyle} from "react-native"
import {MyLink} from "./Link"
import {History} from "history"
import {connect} from "react-redux"
import {syncHide} from "./reducer/sync"
import {AnyAction} from "redux"

interface PropsParams {
  history: History,
}

interface Props extends PropsParams{
  synced : boolean,
  syncing : boolean,
  syncHide : any,
}

const styles = {
  text : {
    color:"#4e4e4ed1",
  },
  content : {
    flexDirection:"row",
    justifyContent:"center",
  } as ViewStyle,
};

const refresh = (props : Props) => {
  const previousLocation = `${props.history.location.pathname}${props.history.location.search ? "?"+props.history.location.search : ""}`
  props.history.replace("/")
  props.history.replace(previousLocation)
}
const SyncBar =  (props : Props) => {
  let content : JSX.Element = <View />
  if (props.syncing) {
    content = <View style={styles.content}>
      <View style={{width:40}}>
      <ActivityIndicator size="small" color="#2689dc"/>
      </View>
      <View style={{}}>
      <Text style={styles.text}>Synchronisation en cours</Text>
      </View>
    </View>
  }
  if (props.synced) {
    // Remove bar at route change.
    const unlisten = props.history.listen(() => {
      props.syncHide()
      unlisten()
    })
    content = <View style={styles.content}>
    <TouchableHighlight onPress={() => refresh(props)}><Text style={styles.text}>Synchronisation terminée, cliquez ici pour rafraichir.</Text></TouchableHighlight>
    </View>
  }
  if (!props.synced && !props.syncing) {
    return <View />;
  }
  return <View style={{padding:3, backgroundColor:"#ffc90745"}}>
    {content}
  </View>
}

export default connect((state : any, props : PropsParams) : Props => ({
  ...state.sync,
  history: props.history,
}), { syncHide : syncHide })(SyncBar);
