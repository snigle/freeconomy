import keys from "./type";

const en : typeof keys = {
  common: {
    title: "Freeconomy",
    cancel: "Cancel",
    name: "Name",
    description: "Description",
    icon: "Icon",
    save: "Save",
    saveAndNew: "Save and New",
    loading: "Loading",
    price: "Price",
    back: "Back",
    edit: "Edit",
    remove: "Remove",
    removeName: "Remove %{name} ?",
    update: "Update",
    loadingApplication: "Chargement de l'application",
    date:"Date",
    category:"Category",
    modify: "Modify",
    delete: "Delete",
    selected: "Selected",
    areYourSure: "Are you sure ?",
    color: "Color",
    result: "Result",
    eg: "eg: ",
  },
  login: {
    buttonWithGoogle: "Login with Google",
    line1: "Manage you money balance to know what you really have to spend.",
    line2: "Categorize your transactions to know your monthly budget!",
    locally: "Or Try the application locally, all datas will be removed at logout.",
    welcome: "Welcome in Freeconomy",
    downloading: "Downloading data from your google account",
    logging: "Logging to your google account",
  },
  sideBar: {
    home: "Home",
    categories: "Categories",
    categoryReport: "Report by Category",
    sync: "Synchronize",
    syncing: "Synchronizing",
    logout: "Logout",
    logoutConfirm: "Are you sure to logout ?",
    logoutConfirmText: "Are you sure to logout ?" +
      "All not synced data will be removed. Be sure to sync all your data before logout.",
  },
  walletsView: {
    loading: "Loading wallets",
    add: "Add wallet",
    wallets: "Wallets",
    viewArchive: "Display archives",
    hideArchive: "Hide archives",
    repeatable: "%{number} operations to come, click here to add it.",
    toCome: "to come",
  },
  walletListItem: {
    archive: "Archive",
    restore: "Restore",
  },
  addWalletView: {
    currencyCode: "Currency Code",
    symbol: "Symbol",
    solde: "Initial Balance",
  },
  transactionsView: {
    addTransaction: "Add Transaction",
    editTransaction: "Edit transaction",
    editTransfert: "Edit transfert",
    addTransfert: "Add Transfert",
    importFromCSV: "Import from CSV",
    loading: "Loading transactions",
    updateSolde: "Update current balance",
    transfert:"transfert",
    transaction:"transaction",
    deleteSelectionConfirm: "Are you sure to delete all the selection ?",
    transfertFrom: "Transfert from %{wallet}",
    transfertTo: "Transfert to %{wallet}",
  },
  addTransactionView: {
    beneficiary: "Bénéficiaire",
    comment: "Commentaire",
    beneficiaryHelp:"Name of the person/entity who takes/gives money.",
    priceHelp: "Negative number is an outcome (expense) and positive is an income."
  },
  addTransfertView: {
    from:"From",
    to:"To",
  },
  categoriesView: {
    loading: "Loading categories",
    addCategory: "Add Category",
  },
  defaultCategories: {
    insurance: "Insurance",
    healthInsurance: "Health Insurance",
    others: "Others",
    bank: "Bank",
    bar: "Bar",
    presentTo: "Presents - to",
    presentFrom: "Presents - from",
    cinema: "Cinema",
    donations: "Donations",
    fuel: "Fuel",
    studies: "Studies",
    groceries: "Groceries",
    party: "Party",
    hotel: "Hotel",
    tax: "Tax",
    interests: "Interests",
    game: "Game",
    laundry: "Laundry",
    leisure: "Leisure",
    rent: "Rent",
    home: "Home",
    parking: "Parking",
    income: "Income",
    meal: "Meal",
    restaurant: "Restaurant",
    shopping: "Shopping",
    care: "Personal Care",
    phone: "Phone",
    transport: "Transport",
    holidays: "Holidays",
    clothes: "Clothes",
    car: "Car",
    travel: "Travel",
  },
  defaultWallets: {
    cash: "Cash wallet",
    cashDescription: "Cash wallet",
    bank: "Bank",
    bankDescription: "Bank account with credit card",
  },
  deleteCategoryView: {
    areYouSure: "Are you sure to remove the category %{name} ?",
  },
  deleteWalletView: {
    areYouSure: "Are you sure to remove the account %{name} and all its transactions ?",
  },
  reportPie: {
    title: "Outcome report",
    thisMonth: "Current Month",
    lastMonth: "Last Month",
    thisYear: "This Year",
    lastYear: "Last Year",
    all: "All transactions",
  },
  updateSoldeView: {
    newBalance: "New Balance Value",
    currentBalance: "Current Balance : ",
    title: "Uptdate current balance of %{name}",
  },
  balanceReport: {
    title: "Balance Report",
    thisYear: "This Year",
    last2Years: "Last 2 Years",
    all: "All Years",
  },
  repeatInput: {
    recurrenceCheckbox: "Auto repeat the transaction",
    repeat: "Repeat every ",
    durations: {
      month: " Month",
      day: " Days",
      week: " Weeks",
      year: " Years",
    },
    infinite: "None stop.",
    during: "During ",
    repeatHelp: "Permit to auto create the same operation at next interval.",
  },
  repeatOperation: {
    title: "Recurring Operations",
    insertAll: "Save all",
    insertSelected: "Save selected",
  },
  errors: {
    invalidDate: "Date is invalid",
    invalidPrice:"Price is not a correct number",
    notFound: "Page not found",
    needCategoryToAddTransaction: "You have to add categories before adding transaction.",
    needWalletToDisplayTransactions: "You have to add a wallet to display transactions.",
    needWalletToAddTransfert: "You need to add wallet before adding a transfert.",
    saveError: "Issue when trying to save the element : %{err}",
    syncError: "There were an issue during the synchronisations.",
  },
};

export default en;