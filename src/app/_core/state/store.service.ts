import { Injectable } from "@angular/core";
import { StoreType } from "../constants/store-type.enum";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor() { }

  public put(key: string, value: any, type: StoreType) {
    if (type === StoreType.SESSION) {
      this.putSessionStore(key, value);
    } else if (type === StoreType.LOCAL) {
      this.putLocalStore(key, value);
    }
  }
  public get(key: string, type: StoreType): any {
    if (type === StoreType.SESSION) {
      return this.getValueFromSessionStore(key);
    } else if (type === StoreType.LOCAL) {
      return this.getValueLocalStoreValue(key);
    }
    return undefined;
  }
  public delete(key: string, type: StoreType): any {
    if (type === StoreType.SESSION) {
      return this.deleteValueFormSessionStore(key);
    } else if (type === StoreType.LOCAL) {
      return this.deleteValueFormLocalStore(key);
    }
    return undefined;
  }
  public clear(type: StoreType) {
    if (type === StoreType.SESSION) {
      return this.clearSessionStore();
    } else if (type === StoreType.LOCAL) {
      return this.clearLocalStore();
    }
  }

  public putSessionStore(key: string, value: any) {
    window.sessionStorage.setItem(key, value);
  }
  public putLocalStore(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }
  public getValueFromSessionStore(key: string) {
    return window.sessionStorage.getItem(key);
  }
  public getValueLocalStoreValue(key: string) {
    return window.localStorage.getItem(key);
  }
  public deleteValueFormSessionStore(key: string) {
    window.sessionStorage.removeItem(key);
  }
  public deleteValueFormLocalStore(key: string) {
    window.localStorage.removeItem(key);
  }
  public clearSessionStore() {
    window.sessionStorage.clear();
  }
  public clearLocalStore() {
    window.localStorage.clear();
  }
}
