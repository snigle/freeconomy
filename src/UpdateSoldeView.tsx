// @ts-ignore
import { TextField } from "carbon-ui";
import { History } from "history";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { Divider, Overlay } from "react-native-elements";
import * as Models from "./Models";
import t from "./translator";
import { displayPrice, IWallet } from "./Types";

interface IState {
    Wallet?: IWallet;
    solde: number;
    soldeEdit: string;
    error?: string;
}

interface IProps {
    WalletUUID: string;
    history: History;
}
class UpdateSoldeView extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            Wallet: undefined,
            solde: 0,
            soldeEdit: "0",
        };
    }

    public componentDidMount() {
        console.log("props", this.props);
        Models.GetWallet(this.props.WalletUUID).then((wallet) => {
            const solde = wallet.TotalPerYear.reduce((previous, current) => previous + current.Total, wallet.Solde);
            this.setState({
                Wallet: wallet,
                solde,
                soldeEdit: `${Math.round(solde * 100) / 100}`,
            });
        });
    }

    public changeSolde(text: string) {
        this.setState({ ...this.state, soldeEdit: text });
    }

    public render() {
        if (!this.state.Wallet) {
            return null;
        }
        return <Overlay
            containerStyle={{ margin: 0, padding: 0 }}
            isVisible
            onBackdropPress={() => this.goBack()}>
            <View>
                <View style={{
                    height: 40,
                    backgroundColor: "#eeee",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    marginBottom: 10,
                }}>
                    <Text style={{ fontSize: 18, flex: 1 }}>
                        {t.t("updateSoldeView.title", { name: this.state.Wallet.Name })}
                    </Text>
                </View  >
                {this.state.error && <Text>{this.state.error}</Text>}
                <Text>
                    {t.t("updateSoldeView.currentBalance")}
                    {displayPrice(this.state.solde, this.state.Wallet.Currency)}
                </Text>
                <TextField placeholder={t.t("updateSoldeView.newBalance")} type="number" value={this.state.soldeEdit}
                    onChangeText={(text: string) => this.changeSolde(text)} />
                <Button onPress={() => this.updateSolde()} title={t.t("common.update")} />
            </View>
        </Overlay>;
    }

    public goBack() {
        this.props.history.replace(`/TransactionsView?walletUUID=${this.props.WalletUUID}`);
    }

    public updateSolde() {
        if (!this.state.Wallet) {
            return;
        }
        this.state.Wallet.Solde = this.state.Wallet.Solde + (parseFloat(this.state.soldeEdit) - this.state.solde);
        this.state.Wallet.Solde = Math.round(this.state.Wallet.Solde * 100) / 100;
        Models.UpdateWallet(this.props.WalletUUID, this.state.Wallet)
            .then(() => this.goBack())
            .catch(() => this.setState({ ...this.state, error: "fail to update wallet solde" }));
    }
}

export default UpdateSoldeView;
