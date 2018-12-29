import _ from "lodash";
import moment from "moment";
import * as Papa from "papaparse";
import * as queryString from "querystring";
import * as React from "react";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { RouteComponentProps } from "react-router";
import { v4 } from "uuid";
import GroupTransactionsByDay from "./GroupTransactionsByDay";
import { MyLink } from "./Link";
import * as Models from "./Models";
import { DefaultIcon, ICategory, ICategoryInput, ITransaction, IWallet } from "./Types";

interface IState {
  WalletUUID: string;
  Lines: string[][];
  Categories: ICategory[];
  Wallets: IWallet[];

  // Computed
  CategoriesToImport: ICategoryInput[];
  TransactionsToImport: ITransaction[];

  // Inputs
  CategoryName: string;
  Beneficiary: string;
  Date: string;
  Price: string;
  Comment: string;
  DateFormat: string;
}

const keys: Keys[] = ["CategoryName", "Beneficiary", "Date", "Price", "Comment"];
const mandatory: Keys[] = ["CategoryName", "Date", "Price"];

type Keys = "CategoryName" | "Beneficiary" | "Date" | "Price" | "Comment";
export default class extends React.Component<RouteComponentProps<any>, IState> {
  constructor(props: RouteComponentProps<any>) {
    super(props);
    console.log("props", props);
    const state = {
      WalletUUID: "",
      Lines: [],
      CategoryName: "",
      Beneficiary: "",
      Date: "",
      Price: "",
      DateFormat: "YYYY/MM/DD",
      Comment: "",
      CategoriesToImport: [],
      TransactionsToImport: [],
      Categories: [],
      Wallets: [],
    };
    if (props.location) {
      const toto = queryString.parse(props.location.search.replace("?", ""));
      state.WalletUUID = Array.isArray(toto.walletUUID) ? toto.walletUUID[0] : toto.walletUUID;
    }
    this.state = state;
  }

  public async componentDidMount() {
    Promise.all([
      Models.GetCategories().then((categories) => this.setState({ ...this.state, Categories: categories })),
      Models.GetWallets().then((wallets) => this.setState({ ...this.state, Wallets: wallets })),
      AsyncStorage.getItem("csv").then((result) => result && this.handleCSVContent(result)),
    ]);
  }

  public bindInput(key: Keys, value: string) {
    const state = { ...this.state };
    const numberValue = parseInt(value, 10);
    if (!this.state.Lines[0]) {
      return;
    }
    // Nombre entre 1 et n : ok
    if (numberValue >= 0 && numberValue < this.state.Lines[0].length) {
      state[key] = "" + numberValue;
    }
    // Vide => vide
    if (value === "") {
      state[key] = "";
    }
    this.setState(state);
  }

  public render() {
    let content: JSX.Element;

    if (this.state.TransactionsToImport.length) {
      content = (
        <View style={{ flex: 1 }}>
          <Text> Voulez vous importer toutes ces transactions ? </Text>
          <Button title="Importer" onPress={() => this.import()} />
          <GroupTransactionsByDay
            Filters={{}}
            WalletUUID={this.state.WalletUUID}
            Transfert={[]}
            Wallets={this.state.Wallets}
            Categories={this.state.Categories}
            Transactions={this.state.TransactionsToImport}
            history={this.props.history}
            Currency={{ Code: "EUR", Symbol: "€" }} />
        </View>
      );
    } else if (this.state.Lines.length) {
      content = (
        <View>
          <Text>Associate importation fields with a column number of your CSV</Text>
          <View>
            {keys.map((k) => (
              <View style={{ flexDirection: "row" }}>
                <Text>{k} : </Text>
                <TextInput
                  key={k}
                  keyboardType="numeric"
                  onChangeText={(e) => this.bindInput(k, e)}
                  placeholder="Column Name"
                  value={this.state[k]} />
              </View>
            ))}
            <View style={{ flexDirection: "row" }}>
              <Text>Date Format : </Text>
              <TextInput
                keyboardType="decimal-pad"
                onChangeText={(e) => this.setState({ ...this.state, DateFormat: e })}
                placeholder="YYYY/MM/DD"
                value={this.state.DateFormat} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button title="Cancel" onPress={() => this.cancel()} />
              </View>
              <View style={{ flex: 1 }}>
                <Button title="Import" onPress={() => this.generateTransactions()} />
              </View>

            </View>
          </View>
          <Text>Your CSV file : </Text>
          <View style={{ flex: 10, flexDirection: "column" }}>
            <View style={{ flexDirection: "row", alignSelf: "stretch" }}>
              {this.state.Lines[0] && this.state.Lines[0].map((l, i) =>
                <Text style={{ flex: 1, textAlign: "center" }} key={i}>{i}</Text>,
              )}
            </View>
            {this.state.Lines.slice(0, 15).map((l, i) =>
              <View style={{ flexDirection: "row", alignSelf: "stretch" }} key={i}>
                {l.map((m, j) =>
                  <Text style={{ flex: 1, textAlign: "center" }} key={j}>{m}</Text>,
                )}
              </View>,
            )}
          </View>
        </View>
      );
    } else {
      content = <input
        style={{ flex: 1 }}
        type="file"
        accept=".csv"
        onChange={(event) => event.target.files && this.handleFile(event.target.files[0])} />;
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
          centerComponent={{
            text: `Import in wallet ${this.state.WalletUUID}`,
            style: { fontSize: 20, color: "#fff" },
          }}
        />
        {content}
      </View>);
  }

  public handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => this.handleCSVContent(reader.result as string);
    reader.readAsText(file);
  }

  public handleCSVContent(stringValue: string) {
    console.log("handle csv", stringValue);
    AsyncStorage.setItem("csv", stringValue);
    const csv = Papa.parse(stringValue, { dynamicTyping: true });
    this.setState({ ...this.state, Lines: csv.data });
    console.log("file read", csv.data.slice(0, 5));
  }

  public cancel() {
    AsyncStorage.removeItem("csv");
    this.setState({ Lines: [] });
  }

  public generateTransactions() {
    if (!mandatory.reduce((agg, current) => (agg && this.state[current] !== ""), true)) {
      console.log("missing mandatory field");
      return;
    }

    const state = { ...this.state };

    // Get list of category to import and create map Name => UUID
    Models.GetCategories().then((categories) => {
      const alreadyImportedMap: { [key: string]: string } = {};
      categories.forEach((t) => alreadyImportedMap[t.Name] = t.UUID);
      return alreadyImportedMap;
    }).then((alreadyImportedMap) => {
      const categories: ICategory[] = [];
      const categoryAdded: { [key: string]: string } = {};
      this.state.Lines.forEach((line) => {
        const categoryName = line[parseInt(this.state.CategoryName, 10)];
        if (categoryAdded[categoryName] || alreadyImportedMap[categoryName]) {
          return;
        }
        const c = {
          UUID: v4(),
          Icon: DefaultIcon({ Name: "shopping-cart", Color: "#517fa4", Type: "material" }),
          LastUpdate: new Date(),
          Name: categoryName,
        };
        categories.push(c);
        categoryAdded[c.Name] = c.UUID;
      });
      state.CategoriesToImport = categories;
      return { ...alreadyImportedMap, ...categoryAdded };
    }).then((categoryNameToUUID) => {
      return Models.GetAllTransactions(this.state.WalletUUID).then(
        (transactions) => {
          const alreadyImportedMap: { [key: string]: boolean } = {};
          // Add transaction in +/- 6 days to not import transaction already created 2 days before.
          transactions.forEach((t) => {
            for (let i = -5; i < 6; i++) {
              const tmp = { ...t, Date: moment(t.Date).add(i, "days").toDate() };
              alreadyImportedMap[this.transactionHash(tmp)] = true;
            }
          });
          // console.log("already imported", alreadyImportedMap);
          return alreadyImportedMap;
        },
      ).then((alreadyImportedMap) => {
        let transactions: ITransaction[] = this.state.Lines.map((line): ITransaction => ({
          UUID: v4(),
          WalletUUID: this.state.WalletUUID,
          CategoryUUID: categoryNameToUUID[line[parseInt(this.state.CategoryName, 10)]],
          LastUpdate: new Date(),
          Beneficiary: this.state.Beneficiary && line[parseInt(this.state.Beneficiary, 10)],
          Date: moment(line[parseInt(this.state.Date, 10)], this.state.DateFormat).toDate(),
          Price: parseFloat(_.replace(line[parseInt(this.state.Price, 10)], ",", ".")),
          Comment: this.state.Comment && line[parseInt(this.state.Comment, 10)],
          Repeat: null,
        }));
        console.log("transactions from csv", transactions);
        transactions = transactions.filter((t) => !alreadyImportedMap[this.transactionHash(t)] && t.Price);
        // console.log("to import", transactions.map((t) => this.transactionHash(t)));
        console.log("transactions to import", transactions);
        state.TransactionsToImport = transactions;
      });
    }).then(() => {
      this.setState(state);
    });

  }

  public import() {
    Models.CreateCategory(...this.state.CategoriesToImport).then(() =>
      Models.CreateTransaction(...this.state.TransactionsToImport),
    ).then(() => AsyncStorage.removeItem("csv")).then(() => this.props.history.push("/"));
  }

  private transactionHash(t: ITransaction) {
    if (this.state.Beneficiary) {
      return `${moment(t.Date).format("YYYY/MM/DD")}#${t.Price}#${t.Beneficiary}`;
    } else {
      return `${moment(t.Date).format("YYYY/MM/DD")}#${t.Price}`;
    }
  }
}
