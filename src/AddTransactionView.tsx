// @ts-ignore
import { TextField } from "carbon-ui";
import { History } from "history";
import * as _ from "lodash";
import * as React from "react";
import {
  AsyncStorage, Button, Picker, Platform,
  ScrollView, Text, TextInput, TextStyle, TouchableHighlight, View,
} from "react-native";
// @ts-ignore
import Autocomplete from "react-native-autocomplete-input";
import { Colors, Header, Icon } from "react-native-elements";
import DatePicker from "./DatePicker";
import { MyLink } from "./Link";
import * as Models from "./Models";
import t from "./translator";
import { ICategory, ITransaction, ITransactionInput } from "./Types";

interface IState extends ITransactionInput {
  Loading: boolean;
  PriceText: string;
  Categories: ICategory[];
  autocomplete: Autocomplete[];
}

interface IProps {
  WalletUUID: string;
  TransactionUUID?: string;
  history: History;
}

interface IAutoComplete {
  Beneficiary: string;
  CategoryUUID: string;
  Occurrencies: number;
}

function cleanTextToSearch(text: string): string {
  return text.toLowerCase().replace(/( |'|-)/g, "");
}

interface IStyle {
  label: TextStyle;
  input: TextStyle;
  borderGreen: string;
  borderRed: string;
}
const styles: IStyle = {
  label: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.38)",
    fontWeight: "300",
    marginTop: 10,
    marginBottom: 3,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 10,
  },
  borderGreen: "#00AA00",
  borderRed: "#AA0000",
};

class AddTransactionView extends React.Component<IProps, IState> {
  public scrollview: any | null = null;

  constructor(props: IProps) {
    super(props);
    const date = new Date();
    this.state = {
      Beneficiary: "",
      Comment: "",
      CategoryUUID: "",
      WalletUUID: props.WalletUUID,
      Price: 0,
      PriceText: "-0",
      Date: date,
      Categories: [],
      autocomplete: [],

      Loading: true,
    };
  }

  public async componentDidMount() {
    let getTransactionPromise: Promise<any>;
    if (this.props.TransactionUUID) {
      getTransactionPromise = Models.GetTransaction(this.props.TransactionUUID).then((transaction) => {
        this.setState({
          ...this.state,
          Beneficiary: transaction.Beneficiary,
          CategoryUUID: transaction.CategoryUUID,
          Comment: transaction.Comment,
          Price: transaction.Price,
          PriceText: "" + transaction.Price,
          Date: transaction.Date,
          WalletUUID: transaction.WalletUUID,
        });
      });
    } else {
      getTransactionPromise = Promise.resolve();
    }

    Promise.all([
      Models.GetCategories().then((categories) =>
        _.sortBy(_.uniqBy(categories, (category) => category.Name), "Name"),
      ),
      Models.GetAllTransactions(this.props.WalletUUID),
      getTransactionPromise,
    ]).then(([categories, transactions]) => {
      let defaultCategory = categories[0];
      if (this.state.CategoryUUID) {
        defaultCategory = categories.find((c) => c.UUID === this.state.CategoryUUID) || defaultCategory;
      }

      // Create map[beneficiary]categoryuuid to permits autocomplete beneficiary and category
      const autocomplete: Autocomplete[] = _.values(
        _.mapValues(_.groupBy<ITransaction>(transactions, (tr) => tr.Beneficiary),
          (groupedTransactions, beneficiary) => {
            const result: IAutoComplete = { Beneficiary: beneficiary, CategoryUUID: "", Occurrencies: 0 };
            const last = _.last(groupedTransactions);
            if (last) {
              result.CategoryUUID = last.CategoryUUID;
            }
            result.Occurrencies = groupedTransactions.length;
            return result;
          },
        ),
      ).sort((a, b) => b.Occurrencies - a.Occurrencies);
      console.log("autocomplete", autocomplete);
      this.setState({ ...this.state, Categories: categories, autocomplete, Loading: false });
    });
  }

  public changeBenificiary(text: string) {
    this.setState({ ...this.state, Beneficiary: text });
  }
  public autoCompleteClick(autocomplete: Autocomplete) {
    let categoryUUID = this.state.CategoryUUID;
    if (_.find(this.state.Categories, (c) => c.UUID === autocomplete.CategoryUUID)) {
      categoryUUID = autocomplete.CategoryUUID;
    }
    this.setState({ ...this.state, Beneficiary: autocomplete.Beneficiary, CategoryUUID: categoryUUID });
  }
  public changeComment(text: string) {
    this.setState({ ...this.state, Comment: text });
  }
  public changeCategory(uuid: string) {
    console.log("change category", uuid);
    this.setState({ ...this.state, CategoryUUID: uuid });
  }
  public changePrice(priceText: string) {
    const price = parseFloat(priceText);
    if (!price && priceText !== "-" && priceText !== "") {
      return;
    }
    this.setState({ ...this.state, Price: price || 0, PriceText: priceText });
  }
  public changeDate(date: Date) {
    this.setState({ ...this.state, Date: date });
  }
  public toggleIsIncome() {
    const price = -this.state.Price;
    this.setState({ ...this.state, PriceText: `${price}`, Price: price });
  }

  public render() {
    let content: any;
    if (this.state.Loading) {
      content = <Text>Chargement des categories</Text>;
    } else {
      const autocomplete = _.filter(this.state.autocomplete,
        (auto) => cleanTextToSearch(auto.Beneficiary).match(cleanTextToSearch(this.state.Beneficiary)),
      ).slice(0, 10);
      console.log("display", this.state);
      content = <View>
        <TextField
          placeholder={t.t("addTransactionView.beneficiary")}
          onChangeText={(v: string) => this.changeBenificiary(v)} value={this.state.Beneficiary} />
        {(autocomplete.length === 1 && autocomplete[0].Beneficiary === this.state.Beneficiary) ||
          autocomplete.map((e) =>
            <TouchableHighlight
              key={e.Beneficiary}
              onPress={() => this.autoCompleteClick(e)}
              style={{ backgroundColor: "#2689dc0f", padding: 2 }}>
              <Text>{e.Beneficiary}</Text>
            </TouchableHighlight>)
        }
        <TextField
          placeholder={t.t("addTransactionView.comment")}
          onChangeText={(v: string) => this.changeComment(v)} value={this.state.Comment} />
        <Picker
          style={{ marginTop: 10 }}
          mode="dropdown"
          selectedValue={this.state.CategoryUUID}
          onValueChange={(itemValue, itemIndex) => this.changeCategory(itemValue)}>
          {
            this.state.Categories.map((category) =>
              <Picker.Item key={category.UUID} label={category.Name} value={category.UUID} />,
            )
          }
        </Picker>
        <View style={{ marginTop: 10 }}>
          <DatePicker value={this.state.Date} callback={(date: Date) => this.changeDate(date)} />
        </View>
        <Text style={styles.label}>{t.t("common.price")}</Text>
        <TextInput
          style={{
            ...styles.input,
            borderColor: this.state.Price <= 0 ? styles.borderRed : styles.borderGreen,
          }}
          keyboardType="numeric"
          onChangeText={(v: string) => this.changePrice(v)}
          onFocus={() => Platform.OS !== "web" && this.scrollview && this.scrollview.scrollToEnd()}
          value={this.state.PriceText} />
        <View style={{ flexDirection: "row" }} >
          <View style={{ flex: 1, padding: 5 }}>
            <Button title={t.t("common.save")} onPress={() => this.save()} />
          </View>
          <View style={{ flex: 1, padding: 5 }}>
            <Button title={t.t("common.saveAndNew")} onPress={() => this.save(true)} />
          </View>
        </View>
      </View>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: 60 }}
          leftComponent={
            <MyLink to={`/TransactionsView?walletUUID=${this.state.WalletUUID}`}>
              <Icon name="arrow-back" />
            </MyLink>
          }
          centerComponent={{ text: t.t("transactionsView.addTransaction"), style: { fontSize: 20, color: "#fff" } }}
          rightComponent={
            this.props.TransactionUUID ? <View /> :
              <MyLink to="AddTransfertView" replace><Icon name="sync" /></MyLink>
          }
        />;
        <ScrollView ref={(scrollview) => this.scrollview = scrollview}
          style={{ flex: 1 }} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
          {content}
        </ScrollView>
      </View>
    );
  }

  public save(andNew: boolean = false) {
    this.setState({ ...this.state, Loading: true });
    const savePromise: Promise<any> = this.props.TransactionUUID ?
      Models.UpdateTransaction(this.props.TransactionUUID, this.state) :
      Models.CreateTransaction(this.state);
    Promise.all([
      AsyncStorage.setItem("redirect_path", `/TransactionsView?walletUUID=${this.state.WalletUUID}`),
      savePromise,
    ])
      .then(() => {
        if (!andNew) {
          this.props.history.goBack();
        } else {
          this.setState({
            ...this.state,
            Beneficiary: "",
            Comment: "",
            Price: 0,
            PriceText: "-0",
            Loading: false,
          });
        }
      }).catch((err: any) => console.log("error", err));
  }
}

export default AddTransactionView;
