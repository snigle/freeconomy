import * as React from "react";
import { Text, View } from "react-native";

export default class DisplayDay extends React.PureComponent<{ title: string }> {
    public render() {
        return <View>
            <Text style={{ backgroundColor: "rgb(130, 130, 130)", color: "white" }}>{this.props.title}</Text>
        </View>;
    }
}
