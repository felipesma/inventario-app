import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit{

  userName: string = '';
  store$!: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store$ = this.store.select('auth').subscribe(({user}) => {
      this.userName = user?.name as string;
    })
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.store$.unsubscribe();
  }

}
