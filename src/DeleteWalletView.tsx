import {History} from "history";
import * as React from "react";
import {Button, Modal, Text, View} from "react-native";
import * as Models from "./Models";
import t from "./translator";

interface IProps {
  Name: string;
  WalletUUID: string;
  history: History;
}
export default (props: IProps) => <View>
<Modal
          animationType="slide"
          transparent={false}
          visible
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
          >
<Text>{t.t("common.removeName", { name : props.Name})}</Text>
<Text>{t.t("deleteWalletView.areYouSure", { name : props.Name })}</Text>
<Button title={t.t("common.cancel")} onPress={() => props.history.goBack()}/>
<Button
  title={t.t("common.remove")}
  onPress={() => Models.DeleteWallet(props.WalletUUID).then(() => props.history.goBack())} />
</Modal>
</View>;
