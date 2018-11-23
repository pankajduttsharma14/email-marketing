import {Component, Input, OnDestroy, Inject, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-Loader',
    template: `<div class="preloader" *ngIf="isSpinnerVisible">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    </div>`,
    encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnDestroy {
    public isSpinnerVisible = true;
   
  

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
    }
}
