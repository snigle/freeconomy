import store from "../appVue/store";
import * as GoogleDriver from "./googlesync";
// tslint:disable-next-line:no-duplicate-imports
import { ICollection } from "./googlesync";
import * as Models from "./models";
import * as OAuth from "./oauth";
import { $t } from "./translator";

import { ICategory, ILogin, ITransaction, ITransfert, IWallet } from "./types";

let syncPromise: Promise<any> = Promise.resolve();

interface ISyncResult { newData: boolean; }
export function GoogleSync(): Promise<any> {
  const syncResult: ISyncResult = { newData: false };
  syncPromise = syncPromise.then(() => {
    store.commit.syncStart();
    return OAuth.login()
      .then((login) => {
        const download = (collectionName: string): Promise<ICollection[]> => GoogleDriver.downloadFileSafe(login, collectionName)
        const upload = (collectionName: string, data: ICollection[]): Promise<void> => GoogleDriver.uploadFileSafe(login, collectionName, data).then()
        // Synchronisation
        return syncCollection<ICollection>("deleted", Models.GetAllDeleted, Models.SaveDeleted, {}, syncResult, download, upload)
          .then((deleted): { [key: string]: boolean } => {
            const result: { [key: string]: boolean } = {};
            deleted.forEach((element) => result[element.UUID] = true);
            return result;
          })
          .then((deleted) => Promise.all([
            syncCollection<IWallet>("wallets", Models.GetWallets, Models.SaveWallets, deleted, syncResult, download, upload),
            syncCollection<ITransaction>(
              "transactions",
              Models.GetAllTransactions,
              Models.SaveTransactions,
              deleted,
              syncResult,
              download,
              upload
            ),
            syncCollection<ITransfert>(
              "transfert",
              Models.GetTransferts,
              Models.SaveTransferts,
              deleted,
              syncResult,
              download,
              upload
            ),
            syncCollection<ICategory>(
              "categories",
              Models.GetCategories,
              Models.SaveCategories,
              deleted,
              syncResult,
              download,
              upload,
            ),
          ]))
          .then(([wallets, transactions, transfert, categories]) => Models.RefreshAllTotalWallet(transactions, transfert).then(() => {
            store.dispatch.loadData();
          }))
          .then(() => Models.CleanDeleted());
      })
      .then(() => {
        console.log("sync terminate");
        store.commit.syncTerminate();
        setTimeout(() => store.commit.syncHide(), 5000);
      });
  }).catch((err) => {
    console.log("error sync", err);
    store.commit.syncError();
    store.commit.showError({ text: $t($t.keys.errors.syncError), err });
    // return store.dispatch.logout();
  });
  return syncPromise;
}

export interface IFileData {
  deleted:      ICollection[]
  wallets:      ICollection[]
  transactions: ICollection[]
  transfert: ICollection[]
  categories: ICollection[]
}
export function FileSync(data: IFileData): Promise<any> {
  const syncResult: ISyncResult = { newData: false };
  syncPromise = syncPromise.then(() => {
    store.commit.syncStart();
    const download = (collectionName: CollectionName): Promise<ICollection[]> => Promise.resolve(data[collectionName] as ICollection[])
    const upload = (collectionName: CollectionName, data: ICollection[]): Promise<void> => Promise.resolve()
    // Synchronisation
    return syncCollection<ICollection>("deleted", Models.GetAllDeleted, Models.SaveDeleted, {}, syncResult, download, upload)
      .then((deleted): { [key: string]: boolean } => {
        const result: { [key: string]: boolean } = {};
        deleted.forEach((element) => result[element.UUID] = true);
        return result;
      })
      .then((deleted) => Promise.all([
        syncCollection<IWallet>("wallets", Models.GetWallets, Models.SaveWallets, deleted, syncResult, download, upload),
        syncCollection<ITransaction>(
          "transactions",
          Models.GetAllTransactions,
          Models.SaveTransactions,
          deleted,
          syncResult,
          download,
          upload
        ),
        syncCollection<ITransfert>(
          "transfert",
          Models.GetTransferts,
          Models.SaveTransferts,
          deleted,
          syncResult,
          download,
          upload
        ),
        syncCollection<ICategory>(
          "categories",
          Models.GetCategories,
          Models.SaveCategories,
          deleted,
          syncResult,
          download,
          upload,
        ),
      ]))
      .then(([wallets, transactions, transfert, categories]) => Models.RefreshAllTotalWallet(transactions, transfert).then(() => {
        store.dispatch.loadData();
      }))
      .then(() => Models.CleanDeleted());
  })
    .then(() => {
      console.log("sync terminate");
      store.commit.syncTerminate();
      setTimeout(() => store.commit.syncHide(), 5000);
    });
  return syncPromise;
}

type CollectionName = 'deleted' | 'wallets' | 'transactions' | 'transfert' | 'categories';
async function syncCollection<CollectionType extends ICollection>(
  collectionName: CollectionName,
  GetModels: () => Promise<CollectionType[]>,
  SaveModels: (a: CollectionType[]) => Promise<CollectionType[]>,
  deleted: { [key: string]: boolean },
  syncResult: ISyncResult,
  download: (collectionName: CollectionName) => Promise<ICollection[]>,
  upload: (collectionName: CollectionName, data: ICollection[]) => Promise<void>,
): Promise<CollectionType[]> {
  console.log("sync collection", collectionName, deleted);
  return download(collectionName)
    .then((collection) => {
      if (!collection) {
        throw new Error((`fail to get collection ${collectionName} from the sync provider`));
      }
      return collection;
    }).then((collection) => collection.filter((e) => e.UUID && !deleted[e.UUID]))
    .then((collection) =>
      GetModels().then((collections) => collections.filter((e) => e.UUID && !deleted[e.UUID]))
        .then((elements): { locals: ICollection[], onlines: ICollection[] } =>
          ({ locals: elements, onlines: collection }),
        ),
    ).then(({ locals, onlines }) => {
      const localByUUIDs: { [key: string]: ICollection } = {};
      locals.forEach((c) => localByUUIDs[c.UUID] = c);
      const onlineByUUIDs: { [key: string]: ICollection } = {};
      onlines.forEach((c) => onlineByUUIDs[c.UUID] = c);
      const uuids: string[] = Object.keys({ ...localByUUIDs, ...onlineByUUIDs });
      // console.log("local", collectionName, locals, localByUUIDs);
      // console.log("online", collectionName, onlines, onlineByUUIDs);
      // console.log("uuids", uuids);
      // Update local data
      const result: ICollection[] = [];
      uuids.forEach((uuid) => {
        const local = localByUUIDs[uuid];
        const online = onlineByUUIDs[uuid];
        if ((local && !online) || (local && local.LastUpdate >= online.LastUpdate)) {
          if (collectionName === "categories") {
            console.log("keep local", local, online);
          }
          result.push(local);
        } else {
          result.push(online);
          syncResult.newData = true;
        }
      });
      console.log("result", result);
      return result;
    })
    .then((result) => Promise.all([
      SaveModels(result as CollectionType[]),
      upload(collectionName, result).catch((err) => console.log("error", err)),
    ])
      .then(([first]) => first));
}

