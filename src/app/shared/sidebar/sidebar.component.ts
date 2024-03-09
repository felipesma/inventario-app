import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  async logout() {
    await this.authService.logout();
    console.log('SE CERRO SESION CORRECTAMENTE')
    this.router.navigate(['/login']);
  }

}
