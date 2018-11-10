import { History } from "history";
import * as React from "react";
import { Platform, ProgressBarAndroid, ProgressViewIOS, Text, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { displayPrice, ICategory, ICurrency } from "../Types";

interface IProps {
  Name: string;
  Balance: number;
  Total: number;
  TotalMax: number;
  Currency: ICurrency;
}

export default (props: IProps) => {
  const color = props.Total < 0 ? "#FF0000" : "#00FF00";
  const icon = props.Total < 0 ? "arrow-drop-down" : "arrow-drop-up";
  return (
    <View
      style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 80 }}>
        <Icon name={icon} type="material" color={color} reverse />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ height: 16 }}>
          <Text style={{ fontSize: 12 }}>{props.Name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: Math.abs(props.Total), backgroundColor: color, height: 20 }} />
          <View style={{ flex: props.TotalMax - Math.abs(props.Total) }} />
        </View>
      </View>
      <View style={{ width: 110 }}>
        <Text
          style={{
            textAlign: "right",
            fontSize: 18,
            color,
          }}>
          {displayPrice(props.Total, props.Currency)}
        </Text>
        <Text
          style={{ textAlign: "right", fontSize: 10 }}>
          {displayPrice(props.Balance, props.Currency)}
        </Text>
      </View>
    </View>
  );
};
