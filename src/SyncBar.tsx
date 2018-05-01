import * as React from "react"
import {View, Text, ActivityIndicator, TouchableHighlight, ViewStyle} from "react-native"
import {MyLink} from "./Link"
import {History} from "history"
import {connect} from "react-redux"
import {syncHide} from "./reducer/sync"
import {AnyAction} from "redux"
import {GoogleSync} from "./Sync"

interface PropsParams {
  history: History,
  refresh: () => void,
}

interface Props extends PropsParams{
  synced : boolean,
  syncing : boolean,
  error : boolean
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

const SyncBar =  (props : Props) => {
  let content : JSX.Element = <View />

  if (props.error) {
    content = <View style={styles.content}>
    <TouchableHighlight onPress={() => GoogleSync()}><Text style={styles.text}>Erreur lors de la Synchronisation, cliquez ici pour ré-essayer.</Text></TouchableHighlight>
    </View>
  } else if (props.synced) {
    content = <View style={styles.content}>
    <TouchableHighlight onPress={() => props.syncHide() && props.refresh()}><Text style={styles.text}>Synchronisation terminée, cliquez ici pour rafraichir.</Text></TouchableHighlight>
    </View>
  } else if (props.syncing) {
    content = <View style={styles.content}>
      <View style={{width:40}}>
      <ActivityIndicator size="small" color="#2689dc"/>
      </View>
      <View style={{}}>
      <Text style={styles.text}>Synchronisation en cours</Text>
      </View>
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
