import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from '../../services/state.service';
import {NavController} from '@ionic/angular';
import {combineLatest, Subject} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  h1 = '';
  h2 = '';

  constructor(
    private stateService: StateService,
    private navCtrl: NavController,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    combineLatest([this.stateService.img$, this.stateService.text$]).pipe(
      tap(([img, text]) => {
        if (!img) {
          this.navCtrl.navigateBack(['accueil']);
        }
      }),
      map(([img, text]) => text),
      filter(t => !!t),
      tap((text) => {
        this.h1 = text.h1;
        this.h2 = text.h2;
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  goToResult() {
    if (!this.h1 || !this.h2 || this.h1.length > 16 || this.h2.length > 20) {
      alert('Merci de saisir un verbe entre 1 et 15 caractères, ainsi qu\'un COD entre 1 et 20 caractères.');
      return;
    }
    this.stateService.text$.next({
      h1: this.h1,
      h2: this.h2,
    });
    this.navCtrl.navigateForward(['resultat']);
  }

}
