import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'panel-inventario-app';

  constructor( private authService: AuthService ) {
    this.authService.initAuthListener()
  }
}
