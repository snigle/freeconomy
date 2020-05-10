import _ from "lodash";

const keys = {
    common: {
      title: "",
      cancel: "",
      name: "",
      description: "",
      icon: "",
      save: "",
      saveAndNew: "",
      loading: "",
      price: "",
      back: "",
      edit: "",
      remove: "",
      removeName: "",
      update: "",
      loadingApplication: "",
      date:"",
      category:"",
      modify: "",
      delete: "",
      selected: "" as string | {one: string, other:string},
      areYourSure: "",
      color: "",
      result: "",
    },
    login: {
      buttonWithGoogle: "",
      line1: "",
      line2: "",
      locally: "",
      welcome: "",
      downloading: "",
      logging: "",
    },
    sideBar: {
      home: "",
      categories: "",
      categoryReport: "",
      sync: "",
      syncing: "",
      logout: "",
      logoutConfirm: "",
      logoutConfirmText: "",
    },
    walletsView: {
      loading: "",
      add: "",
      wallets: "",
      viewArchive: "",
      hideArchive: "",
      repeatable: "",
    },
    walletListItem: {
      archive: "",
      restore: "",
    },
    addWalletView: {
      currencyCode: "",
      symbol: "",
      solde: "",
    },
    transactionsView: {
      addTransaction: "",
      editTransaction: "",
      editTransfert: "",
      addTransfert: "",
      importFromCSV: "",
      loading: "",
      updateSolde: "",
      transfert:"",
      transaction:"",
      deleteSelectionConfirm: "",
    },
    addTransactionView: {
      beneficiary: "",
      comment: "",
      beneficiaryHelp:"",
      priceHelp:"",
    },
    addTransfertView: {
      from:"",
      to:"",
    },
    categoriesView: {
      loading: "",
      addCategory: "",
    },
    defaultCategories: {
      insurance: "",
      healthInsurance: "",
      others: "",
      bank: "",
      bar: "",
      presentTo: "",
      presentFrom: "",
      cinema: "",
      donations: "",
      fuel: "",
      studies: "",
      groceries: "",
      party: "",
      hotel: "",
      tax: "",
      interests: "",
      game: "",
      laundry: "",
      leisure: "",
      rent: "",
      home: "",
      parking: "",
      income: "",
      meal: "",
      restaurant: "",
      shopping: "",
      care: "",
      phone: "",
      transport: "",
      holidays: "",
      clothes: "",
      car: "",
      travel: "",
    },
    defaultWallets: {
      cash: "",
      cashDescription: "",
      bank: "",
      bankDescription: "",
    },
    deleteCategoryView: {
      areYouSure: "",
    },
    deleteWalletView: {
      areYouSure: "",
    },
    reportPie: {
      title: "",
      thisMonth: "",
      lastMonth: "",
      thisYear: "",
      lastYear: "",
      all: "",
    },
    updateSoldeView: {
      newBalance: "",
      currentBalance: "",
      title: "",
    },
    balanceReport: {
      title: "",
      thisYear: "",
      last2Years: "",
      all: "",
    },
    repeatInput: {
      recurrenceCheckbox: "",
      repeat: "",
      durations: {
        month: "",
        day: "",
        week: "",
        year: "",
      },
      infinite: "",
      during: "",
      repeatHelp:"",
    },
    repeatOperation: {
      title: "",
      insertAll: "",
      insertSelected: "",
    },
    errors: {
      invalidDate: "",
      invalidPrice:"",
      notFound:"",
      needCategoryToAddTransaction:"",
      needWalletToDisplayTransactions: "",
      needWalletToAddTransfert: "",
      saveError: "",
      syncError: "",
    },
  };
  
  // Fill keys with absolute path to get i18n scope. (eg: keys.errors.invalidDate == 'errors.invalidDate')
  function parseKeys(value : {[key:string]: any}, absolutePath: string) {
    _.forEach(value, (v,key )=> {
        const path = absolutePath? `${absolutePath}.${key}` : key;
        if (_.isObject(v)) {
            parseKeys(v, path);
        }
        if (_.isString(v)) {
            value[key] = path;
        }
    })
  }
  parseKeys(keys, "");

  export default keys;
