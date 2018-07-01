import { History } from "history";
import * as React from "react";
import { ActivityIndicator, Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { MyLink } from "./Link";
import { syncHide } from "./reducer/sync";
import { GoogleSync } from "./Sync";

interface IPropsParams {
  history: History;
  refresh: () => void;
}

interface IProps extends IPropsParams {
  synced: boolean;
  syncing: boolean;
  error: boolean;
  syncHide: any;
}

const styles: { text: TextStyle, content: ViewStyle } = {
  text: {
    color: "#4e4e4ed1",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
  },
};

const SyncBar = (props: IProps) => {
  let content: JSX.Element = <View />;

  if (props.error) {
    content = <View style={styles.content}>
      <TouchableHighlight onPress={() => GoogleSync()}>
        <Text style={styles.text}>Erreur lors de la Synchronisation, cliquez ici pour ré-essayer.</Text>
      </TouchableHighlight>
    </View>;
  } else if (props.synced) {
    content = <View style={styles.content}>
      <TouchableHighlight onPress={() => props.syncHide() && props.refresh()}>
        <Text style={styles.text}>Synchronisation terminée, cliquez ici pour rafraichir.</Text>
      </TouchableHighlight>
    </View>;
  } else if (props.syncing) {
    content = <View style={styles.content}>
      <View style={{ width: 40 }}>
        <ActivityIndicator size="small" color="#2689dc" />
      </View>
      <View style={{}}>
        <Text style={styles.text}>Synchronisation en cours</Text>
      </View>
    </View>;
  }

  if (!props.synced && !props.syncing) {
    return <View />;
  }
  return <View style={{ padding: 3, backgroundColor: "#ffc90745" }}>
    {content}
  </View>;
};

export default connect((state: any, props: IPropsParams): IProps => ({
  ...state.sync,
  history: props.history,
}), { syncHide })(SyncBar);
