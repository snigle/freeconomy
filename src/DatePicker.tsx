import moment from "moment";
import * as React from "react";
import {
  DatePickerAndroid, DatePickerAndroidDateSetAction, DatePickerAndroidOpenReturn,
  TextInput, TouchableHighlight,
} from "react-native";
import { Text } from "react-native-elements";

interface IProps {
  callback: (date: Date) => void;
  value: Date;
}

const formatDate = (date: Date) => moment(date).format("L");
// `${date.getFullYear()}-${(date.getMonth() + 1) % 12}-${date.getDate()}`;

async function selectDate(defaultDate: Date, f: (date: Date) => void): Promise<void> {
  return DatePickerAndroid.open({ date: defaultDate }).then((date: DatePickerAndroidOpenReturn) => {
    if (date.action !== DatePickerAndroid.dismissedAction) {
      const { action, year, month, day } = date as DatePickerAndroidDateSetAction;
      console.log("set new date", year, month, day);
      // Selected year, month (0-11), day
      return f(new Date(
        year,
        month,
        day,
      ));
    }
  }).catch(({ code, message }) =>
    console.warn("Cannot open date picker", message),
  );
}

export default function(props: IProps): JSX.Element {
  return <TouchableHighlight
    onPress={() => selectDate(props.value, props.callback)}
    style={{ height: 18 }}>
    <Text style={{ fontSize: 14 }}>{formatDate(props.value)}</Text>
  </TouchableHighlight>;
}
