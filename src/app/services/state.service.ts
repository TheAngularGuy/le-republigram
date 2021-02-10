import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  isDesktop$ = new BehaviorSubject<boolean>(this.platform.is('desktop') || this.platform.is('mobileweb'));
  img$ = new BehaviorSubject<File>(null);
  text$ = new BehaviorSubject<{ h1: string, h2: string }>(null);

  constructor(private platform: Platform) {
  }
}
