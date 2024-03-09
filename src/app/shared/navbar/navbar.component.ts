import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  userName: string = '';
  store$!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store$ = this.store.select('auth').subscribe(({user}) => {
      this.userName = user?.name as string;
    })
  }

  ngOnDestroy(): void {
    this.store$.unsubscribe();
  }

}
