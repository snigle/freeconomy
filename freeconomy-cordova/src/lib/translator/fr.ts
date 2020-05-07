import keys from "./type";

const fr : typeof keys = {
  common: {
    title: "Freeconomy",
    cancel: "Annuler",
    name: "Nom",
    description: "Description",
    icon: "Icone",
    save: "Enregistrer",
    saveAndNew: "Enrg. et Nouveau",
    loading: "Chargement",
    price: "Prix",
    back: "Retour",
    edit: "Modifier",
    remove: "Supprimer",
    removeName: "Supprimer %{name} ?",
    update: "Mettre à jour",
    loadingApplication: "Chargement de l'application",
    date:"Date",
    category:"Catégorie",
    modify: "Modifier",
    delete: "Supprimer",
    selected: {one: "Sélectionné", other: "Sélectionnés" },
    areYourSure: "Êtes-vous sûr ?",
  },
  login: {
    buttonWithGoogle: "Connexion avec Google",
    line1: "Gérez vos comptes et sachez exactement ce que vous dépensez.",
    line2: "Categorisez vos transactions pour connaître vos budgets mensuels !",
    locally: "Ou utilisez l'application localement, toutes vos données seront supprimées lors de la deconnexion.",
    welcome: "Bienvenue dans Freeconomy",
    downloading: "Téléchargement des données depuis votre compte google",
    logging: "Connexion à votre compte google",
  },
  sideBar: {
    home: "Accueil",
    categories: "Catégories",
    categoryReport: "Total par catégorie",
    sync: "Synchroniser",
    logout: "Déconnexion",
    logoutConfirm: "Se déconnecter ?",
    logoutConfirmText: `Êtes-vous sûr de vouloir vous déconnecter ?
    Toutes les données non synchronisées seront supprimées.
    Vérifiez d'avoir synchronisé une dernière fois avant de vous déconnecter.`,
  },
  walletsView: {
    loading: "Chargement de comptes",
    add: "Ajouter un Compte",
    wallets: "Comptes",
    viewArchive: "Afficher les archives",
    hideArchive: "Cacher les archives",
    repeatable: "%{number} opérations à venir, cliquer ici pour les ajouter.",
  },
  walletListItem: {
    archive: "Archiver",
    restore: "Restorer",
  },
  addWalletView: {
    currencyCode: "Nom de la monnaie",
    symbol: "Symbole",
    solde: "Solde Initial",
  },
  transactionsView: {
    addTransaction: "Ajouter une opération",
    editTransaction: "Modifier une opération",
    editTransfert: "Modifier un virement",
    addTransfert: "Ajouter un virement",
    importFromCSV: "Importer depuis un CSV",
    loading: "Chargement des transactions",
    updateSolde: "Modifier le total",
    transfert: "Virement",
    transaction: "Opération",
    deleteSelectionConfirm: "Êtes-vous sûr de vouloir supprimer la sélection ?",
  },
  addTransactionView: {
    beneficiary: "Bénéficiaire",
    comment: "Description",
    beneficiaryHelp:"Nom de la personne/entreprise qui donne ou récupère l'argent.",
    priceHelp: "Un nombre négatif enregistre une dépense et un positif une recette."
  },
  addTransfertView: {
    from:"Depuis",
    to:"Vers",
  },
  categoriesView: {
    loading: "Chargement des catégories",
    addCategory: "Ajouter une Catégorie",
  },
  defaultCategories: {
    insurance: "Assurance",
    healthInsurance: "Assurance-Maladie",
    others: "Autres",
    bank: "Banque",
    bar: "Bar",
    presentTo: "Cadeaux - offerts",
    presentFrom: "Cadeaux - reçus",
    cinema: "Cinema",
    donations: "Dons",
    fuel: "Essence",
    studies: "Études",
    groceries: "Faire les courses",
    party: "Fête",
    hotel: "Hôtel",
    tax: "Impôts",
    interests: "Intérêts",
    game: "Jeux d'argent",
    laundry: "Linge",
    leisure: "Loisir",
    rent: "Loyer",
    home: "Maison",
    parking: "Parking",
    income: "Recettes",
    meal: "Repas",
    restaurant: "Restaurant",
    shopping: "Shopping",
    care: "Soin personnels",
    phone: "Téléphone",
    transport: "Transport",
    holidays: "Vacances",
    clothes: "Vêtements",
    car: "Voiture",
    travel: "Voyage",
  },
  defaultWallets: {
    cash: "Porte Monnaie",
    cashDescription: "Porte Monnaie",
    bank: "Compte courant",
    bankDescription: "Compte avec carte de crédit",
  },
  deleteCategoryView: {
    areYouSure: "Êtes vous sûr de vouloir supprimer la catégorie %{name} ?",
  },
  deleteWalletView: {
    areYouSure: "Êtes vous sûr de vouloir supprimer le compte %{name} et toute ses opérations ?",
  },
  reportPie: {
    title: "Rapport des dépenses",
    thisMonth: "Ce mois-ci",
    lastMonth: "Le mois dernier",
    thisYear: "Cette année",
    lastYear: "L'année dernière",
    all: "Toute les opérations",
  },
  updateSoldeView: {
    newBalance: "Nouveau total",
    currentBalance: "Solde total courant : ",
    title: "Mettre à jour le total du compte %{name}",
  },
  balanceReport: {
    title: "Évolution du solde",
    thisYear: "Cette année",
    last2Years: "Les 2 dernières années",
    all: "Toute les années",
  },
  repeatInput: {
    recurrenceCheckbox: "Répéter l'opération",
    repeat: "Répéter tous les ",
    durations: {
      month: " Mois",
      day: " Jours",
      week: " Semaines",
      year: " Ans",
    },
    infinite: "à l'infini.",
    during: "Pendant ",
    repeatHelp: "Permet de créer automatiquement une opération équivalente à chaque interval.",
  },
  repeatOperation: {
    title: "Opération Récurrentes",
    insertAll: "Enregistrer tout",
    insertSelected: "Enregistrer la sélection",
  },
  errors: {
    invalidDate: "Le champs date est mal écrit.",
    invalidPrice:"Le prix n'est pas un nombre correct",
    notFound: "L'élément recherché n'existe pas.",
    needCategoryToAddTransaction: "Vous devez ajouter des catégories avant de pouvoir créer une opération.",
    needWalletToDisplayTransactions: "Vous devez ajouter un compte pour afficher les opérations.",
    needWalletToAddTransfert:"Vous devez ajouter un compte pour pouvoir créer un virement.",
    saveError:"Bug lors de l'enregistrement de l'élément %{err}"
  },
} ;

export default fr;