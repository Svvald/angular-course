import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoaderService } from '../../services/loader-service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {

  constructor(private loaderService: LoaderService) { }

  public loading: boolean;
  private unsubscribe$ = new Subject();

  ngOnInit() {
    this.loaderService.getLoadingStatus().pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(
      res => this.loading = res,
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
