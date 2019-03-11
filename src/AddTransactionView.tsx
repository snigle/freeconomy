// @ts-ignore
import { TextField } from "carbon-ui";
import { History } from "history";
import * as _ from "lodash";
import * as React from "react";
import {
  AsyncStorage, Button, Picker, Platform,
  ScrollView, Text, TextInput, TextStyle, TouchableHighlight, View,
} from "react-native";
import { Colors, Header, Icon } from "react-native-elements";
import DatePicker from "./DatePicker";
import RepeatInput from "./formInputs/RepeatInput";
import { MyLink } from "./Link";
import Loading from "./Loading";
import * as Models from "./Models";
import t from "./translator";
import { ICategory, ITransaction, ITransactionInput } from "./Types";

interface IState extends ITransactionInput {
  Loading: boolean;
  PriceText: string;
  Categories: ICategory[];
  autocomplete: IAutoComplete[];
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
  PriceText: string;
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
export const styles: IStyle = {
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
      Repeat: null,
      Loading: true,
    };
  }

  public async componentDidMount() {
    const getTransactionPromise: Promise<ITransaction | null> = this.props.TransactionUUID ?
      Models.GetTransaction(this.props.TransactionUUID) :
      Promise.resolve(null)
      ;

    Promise.all([
      Models.GetCategories().then((categories) =>
        _.sortBy(_.uniqBy(categories, (category) => category.Name), "Name"),
      ),
      Models.GetAllTransactions(this.props.WalletUUID),
      getTransactionPromise,
    ]).then(([categories, transactions, transaction]) => {
      let defaultCategory = categories[0];
      if (this.state.CategoryUUID) {
        defaultCategory = categories.find((c) => c.UUID === this.state.CategoryUUID) || defaultCategory;
      }

      // Create map[beneficiary]categoryuuid to permits autocomplete beneficiary and category
      const autocomplete: IAutoComplete[] = _.values(
        _.mapValues(_.groupBy<ITransaction>(transactions, (tr) => tr.Beneficiary),
          (groupedTransactions, beneficiary) => {
            const result: IAutoComplete = {
              Beneficiary: beneficiary,
              CategoryUUID: "",
              Occurrencies: 0,
              PriceText: "-0",
            };
            const last = _.last(groupedTransactions);
            if (last) {
              result.CategoryUUID = last.CategoryUUID;
            }
            const maxPriceOccurence = _.first(_.maxBy(
              _.toPairs(_.countBy(_.map(groupedTransactions, (tr) => tr.Price), (e) => e)),
              (pair) => _.last(pair),
            ));
            if (maxPriceOccurence) {
              result.PriceText = `` + maxPriceOccurence;
            }
            result.Occurrencies = groupedTransactions.length;
            return result;
          },
        ),
      ).sort((a, b) => b.Occurrencies - a.Occurrencies);
      console.log("autocomplete", autocomplete);
      let state = {
        ...this.state,
        Categories: categories, CategoryUUID: categories[0].UUID, autocomplete, Loading: false,
      };
      if (transaction) {
        state = {
          ...state, Beneficiary: transaction.Beneficiary,
          CategoryUUID: transaction.CategoryUUID,
          Comment: transaction.Comment,
          Price: transaction.Price,
          PriceText: "" + transaction.Price,
          Date: transaction.Date,
          WalletUUID: transaction.WalletUUID,
          Repeat: transaction.Repeat,
        };
      }
      this.setState(state);
    });
  }

  public changeBenificiary(text: string) {
    this.setState({ ...this.state, Beneficiary: text });
  }
  public autoCompleteClick(autocomplete: IAutoComplete) {
    let categoryUUID = this.state.CategoryUUID;
    if (_.find(this.state.Categories, (c) => c.UUID === autocomplete.CategoryUUID)) {
      categoryUUID = autocomplete.CategoryUUID;
    }
    this.setState({
      ...this.state,
      Beneficiary: autocomplete.Beneficiary,
      CategoryUUID: categoryUUID,
      Price: parseFloat(autocomplete.PriceText),
      PriceText: autocomplete.PriceText,
    });
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
      content = <Loading Message={t.t("common.loading")} />;
    } else {
      const autocomplete: IAutoComplete[] = this.state.autocomplete.filter(
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
          keyboardType="phone-pad"
          onChangeText={(v: string) => this.changePrice(v)}
          value={this.state.PriceText} />

        <RepeatInput defaultValue={this.state.Repeat}
          setRepeat={(repeat) => {
            console.log("set repeat", repeat);
            this.setState({ ...this.state, Repeat: repeat });
          }} />
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
          containerStyle={{ height: 60 }}
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
        />
        <ScrollView
          style={{ flex: 1 }} keyboardShouldPersistTaps="always">
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
          this.props.history.replace(`/Wallet/${this.props.WalletUUID}/AddTransactionView`);
        }
      }).catch((err: any) => console.log("error", err));
  }
}

export default AddTransactionView;
