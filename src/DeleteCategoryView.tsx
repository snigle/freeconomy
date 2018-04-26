import * as React from "react"
import {History} from "history"
import {Button, Text, View, Modal} from "react-native"
import * as Models from "./Models"
//@ts-ignore
import { FlatButton, Dialog } from "carbon-ui"
interface Props {
  Name : string,
  CategoryUUID : string,
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
<Text>{`Êtes vous sûr de vouloir supprimer la catégorie ${props.Name} ?`}</Text>
<Button title="Cancel" onPress={() => props.history.goBack()}/>
<Button title="Ok" onPress={() => Models.DeleteCategory(props.CategoryUUID).then(() => props.history.goBack())} />
</Modal>
</View>
