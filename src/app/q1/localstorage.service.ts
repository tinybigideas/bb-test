import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _list$ = new BehaviorSubject<Map<string, string>>(new Map());

  constructor() {
    localStorage.clear();
  }

  public add(key: string, value: string): boolean {
    if (!this._keyExists(key)) {
      localStorage.setItem(String(key), String(value));
      this._list$.next(this._mapLocalStorage());
      return true;
    } else {
      return false;
    }
  }

  public update(key: string, value: string): string | null {
    if (this._keyExists(key)) {
      const oldValue = this.get(key);
      localStorage.setItem(key, String(value));
      this._list$.next(this._mapLocalStorage());
      return oldValue;
    } else {
      return null;
    }
  }

  public remove(key: string): string | null {
    if (this._keyExists(key)) {
      const oldValue = this.get(key);
      localStorage.removeItem(key);
      this._list$.next(this._mapLocalStorage());
      return oldValue;
    } else {
      return null;
    }
  }

  public get(key: string): string | null {
    if (this._keyExists(key)) {
      return String(localStorage.getItem(String(key)));
    } else {
      return null;
    }
  }

  public list(): Observable<Map<string, string>> {
    return this._list$;
  }

  private _keyExists(key: string): boolean {
    return Boolean(key) && localStorage.getItem(String(key)) !== null;
  }

  private _mapLocalStorage(): Map<string, string> {
    return Object.keys(localStorage).reduce(
      (newMap, key) => newMap.set(String(key), String(this.get(key))),
      new Map<string, string>()
    );
  }
}
