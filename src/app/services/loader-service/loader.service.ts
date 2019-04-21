import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loading$ = new Subject<boolean>();

  public toggle(value: boolean): void {
    this.loading$.next(value);
  }

  public getLoadingStatus(): Observable<boolean> {
    return this.loading$;
  }
}
