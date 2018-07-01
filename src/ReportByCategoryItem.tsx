import { History } from "history";
import * as React from "react";
import { Platform, ProgressBarAndroid, ProgressViewIOS, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { displayPrice, ICategory, ICurrency } from "./Types";

interface IProps {
  Category: ICategory;
  Total: number;
  TotalCategory: number;
  TotalMax: number;
  Color: string;
  Currency: ICurrency;
  history: History;
}

export default (props: IProps) => (
  <View style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
    <View style={{ width: 80 }}>
      <Icon name={props.Category.Icon.Name} type={props.Category.Icon.Type} color={props.Color} reverse />
    </View>
    <View style={{ flex: 1 }}>
      <View style={{ height: 14 }}>
        <Text style={{ fontSize: 10 }}>{props.Category.Name}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: props.TotalCategory, backgroundColor: props.Color, height: 20 }} />
        <View style={{ flex: props.TotalMax - props.TotalCategory }} />
      </View>
    </View>
    <View style={{ width: 110 }}>
      <Text
        style={{ textAlign: "right", fontSize: 18, color: props.TotalCategory > 0 ? "green" : "red" }}>{
          displayPrice(props.TotalCategory, props.Currency)}
      </Text>
    </View>
  </View>
);
