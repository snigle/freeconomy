import * as Models from "./Models"
import * as Driver from "./GoogleSync"
import {Wallet, Login, Transfert, Transaction, Category} from "./Types"
import {Collection} from "./GoogleSync"
import * as OAuth from "./OAuth"
import {AsyncStorage} from "react-native"
import {store} from "./App"
import {syncStart, syncTerminate, syncHide, syncError} from "./reducer/sync"

let syncPromise : Promise<any> = Promise.resolve();

interface SyncResult { newData : boolean}
export function GoogleSync() : Promise<any> {
  const syncResult : SyncResult = {newData : false}
  syncPromise = syncPromise.then(() => {
  store.dispatch(syncStart());
  return Models.GetLogin().then(login => {
    console.log("let's go to sync !", login)
    if (login.expires < new Date()) {
      console.log("expired token");
      return OAuth.login();
    }
    return login;
  }, () => OAuth.login())
  .then(login => {
    // Enable synchronisation auto when update models.
    AsyncStorage.setItem("autosync", "ok");
    // Synchronisation
    return syncCollection<Collection>(login, "deleted", Models.GetAllDeleted, Models.SaveDeleted, {}, syncResult)
      .then((deleted) : {[key:string] : boolean} => {
      const result : {[key:string] : boolean} = {};
      deleted.forEach(deleted => result[deleted.UUID] = true);
      return result;
    })
    .then(deleted => Promise.all([
      syncCollection<Wallet>(login, "wallets", Models.GetWallets, Models.SaveWallets, deleted, syncResult),
      syncCollection<Transaction>(login, "transactions", Models.GetAllTransactions, Models.SaveTransactions, deleted, syncResult),
      syncCollection<Transfert>(login, "transfert", Models.GetTransferts, Models.SaveTransferts, deleted, syncResult),
      syncCollection<Category>(login, "categories", Models.GetCategories, Models.SaveCategories, deleted, syncResult),
    ]))
    .then(([wallets, transactions, transfert]) => Models.RefreshAllTotalWallet(transactions, transfert))
    .then(() => Models.CleanDeleted());
  })
  .then(() => syncResult.newData ? store.dispatch(syncTerminate()) : store.dispatch(syncHide()))
  }).catch((err) => console.log("error sync", err) || store.dispatch(syncError()));
  return syncPromise;
}

async function syncCollection<CollectionType extends Collection>(
  login : Login,
  collectionName : string,
  GetModels : () => Promise<CollectionType[]>,
  SaveModels : (a : CollectionType[]) => Promise<CollectionType[]>,
  deleted : {[key:string]:boolean},
  syncResult : SyncResult,
) : Promise<CollectionType[]> {
  console.log("sync collection", collectionName, deleted)
  return Driver.downloadFileSafe(login, collectionName)
    .then((collection) => {
    if(!collection){
      throw(`fail to get collection ${collectionName} from the sync provider`);
    }
    return collection;
  }).then(collection => collection.filter(e => e.UUID && !deleted[e.UUID]))
  .then(collection =>
    GetModels().then(collection => collection.filter(e => e.UUID && !deleted[e.UUID]))
    .then((elements) : {local : Collection[], online : Collection[]} => ({ local : elements, online : collection}))
  )
  .then(({local, online})=> {
    const localByUUIDs : {[key : string] : Collection} = {}
    local.forEach(c => localByUUIDs[c.UUID] = c)
    const onlineByUUIDs : {[key : string] : Collection} = {}
    online.forEach(c => onlineByUUIDs[c.UUID] = c)
    const uuids : string[] = Object.keys({...localByUUIDs, ...onlineByUUIDs})
    console.log("local", local, localByUUIDs)
    console.log("online", online, onlineByUUIDs)
    console.log("uuids", uuids);
    //Update local data
    const result : Collection[] = [];
    uuids.forEach(uuid => {
      const local = localByUUIDs[uuid]
      const online = onlineByUUIDs[uuid]
      if ((local && !online) || (local && local.LastUpdate >= online.LastUpdate)) {
        if (collectionName === "categories") {
          console.log("keep local", local, online);
        }
        result.push(local);
      } else {
        result.push(online);
        syncResult.newData = true
      }
    })
    console.log("result", result);
    return result;
  })
  .then(result => Promise.all([
    SaveModels(result as CollectionType[]),
    Driver.uploadFileSafe(login, collectionName, result).catch(err => console.log("error", err)),
  ])
  .then(([result]) => result));
}

function updateSigninStatus(result : boolean) {
  console.log("result ", result)
}
