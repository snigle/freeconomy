import * as Models from "./Models"
import * as Driver from "./GoogleSync"
import {Wallet, Login, Transaction} from "./Types"
import {Collection} from "./GoogleSync"
import * as OAuth from "./OAuth"

export function GoogleSync() : Promise<any> {
  return Models.GetLogin().then(login => {
    console.log("let's go to sync !", login)
    if (login.expires < new Date()) {
      console.log("expired token");
      return OAuth.login();
    }
    return login;
  })
  .then(login => {
    // Synchronisation
    return syncCollection<Collection>(login, "deleted", Models.GetAllDeleted, Models.SaveDeleted, {})
    .then((deleted) : {[key:string] : boolean} => {
    const result : {[key:string] : boolean} = {};
    deleted.forEach(deleted => result[deleted.UUID] = true);
    return result;
    })
    .then(deleted => Promise.all([
      syncCollection<Wallet>(login, "wallets", Models.GetWallets, Models.SaveWallets, deleted),
      syncCollection<Transaction>(login, "transactions", Models.GetAllTransactions, Models.SaveTransactions, deleted),
    ]))
    .then(([wallets, transactions]) => Models.RefreshAllTotalWallet(transactions))
    .then(() => Models.CleanDeleted());
  }).catch(() => OAuth.login());
}

async function syncCollection<CollectionType extends Collection>(
  login : Login,
  collectionName : string,
  GetModels : () => Promise<CollectionType[]>,
  SaveModels : (a : CollectionType[]) => Promise<CollectionType[]>,
  deleted : {[key:string]:boolean},
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
      if ((local && !online) || (local && local.LastUpdate > online.LastUpdate)) {
        result.push(local);
      } else {
        result.push(online);
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
