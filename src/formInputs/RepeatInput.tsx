import * as React from "react";
import { Picker, Text, TextInput, TextStyle, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import t from "../translator";
import { IRepeat, RepeatDurationType } from "../Types";

interface IState {
    checked: boolean;
    Repeat: IRepeat;
}
interface IProps {
    setRepeat: (repeat: IRepeat | null) => void;
    defaultValue: IRepeat | null;
}

const styles: {
    text: TextStyle,
    input: TextStyle,
} = {
    text: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        textAlign: "right",
        width: 40,
    },
};

export default class extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            checked: this.props.defaultValue ? true : false,
            Repeat: this.props.defaultValue || {
                Duration: 1,
                MaxOccurrence: -1,
                DurationType: "month",
            },
        };
    }

    public onCheckPressed() {
        this.props.setRepeat(this.state.Repeat);
        this.setState({ ...this.state, checked: !this.state.checked });
    }

    public toggleInfinite() {
        this.setState({
            ...this.state, Repeat: {
                ...this.state.Repeat,
                MaxOccurrence: this.state.Repeat.MaxOccurrence === -1 ? 1 : -1,
            },
        });
        this.props.setRepeat(this.state.Repeat);
    }

    public updateDuration(text: string) {
        const repeat = {
            ...this.state.Repeat,
            Duration: parseInt(text, 10) || 0,
        };
        this.setState({
            ...this.state, Repeat: repeat,
        });
        this.props.setRepeat(repeat);
    }

    public updateDurationType(text: RepeatDurationType) {
        const repeat = {
            ...this.state.Repeat,
            DurationType: text,
        };
        this.setState({
            ...this.state, Repeat: repeat,
        });
        this.props.setRepeat(repeat);
    }

    public updateMaxOccurence(text: string) {
        const repeat = {
            ...this.state.Repeat,
            MaxOccurrence: parseInt(text, 10) || 0,
        };
        this.setState({
            ...this.state, Repeat: repeat,
        });
        this.props.setRepeat(repeat);
    }

    public render() {
        return <View>
            <CheckBox
                title={t.t("repeatInput.recurrenceCheckbox")}
                onPress={() => this.onCheckPressed()}
                checked={this.state.checked}
            />
            {
                this.state.checked ?
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.text}>{t.t("repeatInput.repeat")} </Text>
                            <View style={{ width: 40 }}>
                                <TextInput onChangeText={(text: string) => this.updateDuration(text)}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                    defaultValue={`${this.state.Repeat.Duration}`} />
                            </View>
                            <Picker
                                style={{ flex: 1 }}
                                mode="dropdown"
                                selectedValue={this.state.Repeat.DurationType}
                                onValueChange={(itemValue) => this.updateDurationType(itemValue)}>
                                <Picker.Item label={t.t("repeatInput.durations.day")} value={"day"} />
                                <Picker.Item label={t.t("repeatInput.durations.week")} value={"week"} />
                                <Picker.Item label={t.t("repeatInput.durations.month")} value={"month"} />
                                <Picker.Item label={t.t("repeatInput.durations.year")} value={"year"} />
                            </Picker>
                        </View>
                        <CheckBox
                            title={t.t("repeatInput.infinite")}
                            onPress={() => this.toggleInfinite()}
                            checked={this.state.Repeat.MaxOccurrence === -1}
                        />
                        {
                            (this.state.Repeat.MaxOccurrence !== -1) ?
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.text}>
                                        {t.t("repeatInput.during")}
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="number-pad"
                                        onChangeText={(text: string) => this.updateMaxOccurence(text)}
                                        defaultValue={`${this.state.Repeat.MaxOccurrence}`} />
                                    <Text style={styles.text}>
                                        {t.t("repeatInput.durations." +
                                            this.state.Repeat.DurationType)}
                                    </Text>
                                </View>
                                : undefined
                        }
                    </View>
                    : undefined
            }
        </View>;
    }
}
