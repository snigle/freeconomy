import * as React from "react"
import {History} from "history"
import {Button, Text, View, Modal} from "react-native"
import * as Models from "./Models"
//@ts-ignore
import { FlatButton, Dialog } from "carbon-ui"
interface Props {
  Name : string,
  WalletUUID : string,
  history : History,
}
export default (props : Props) => <View>
<Modal
          animationType="slide"
          transparent={false}
          visible
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
          >
<Text>{`Supprimer ${props.Name} ?`}</Text>
<Text>{`Êtes vous sûr de vouloir supprimer le wallet ${props.Name} et toute ses transactions ?`}</Text>
<Button title="Cancel" onPress={() => props.history.goBack()}/>
<Button title="Ok" onPress={() => Models.DeleteWallet(props.WalletUUID).then(() => props.history.goBack())} />
</Modal>
</View>
/*
export default (props : Props) => <View>
<Dialog
  title={`Supprimer ${props.Name} ?`}
  active
  onOverlayPress={() => props.history.goBack()}
  actions={[
    <FlatButton><Button title="Cancel" onPress={() => props.history.goBack()}/></FlatButton>,
    <FlatButton><Button title="Ok" onPress={() => Models.DeleteWallet(props.WalletUUID).then(() => props.history.goBack())} /></FlatButton>
  ]}
>
  <Text>{`Êtes vous sûr de vouloir supprimer le wallet ${props.Name} et toute ses transactions ?`}</Text>
</Dialog>
</View>
*/
