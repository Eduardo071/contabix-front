import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  fontIconSolicitation!: string;
  userData: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    if (this.userData) {
      this.userData.tipoUsuario?.descricao === 'contador'
        ? this.setFontIcon('visibility')
        : this.setFontIcon('add');
    }
  }

  navigateToCalendar() {
    this.router.navigate(['/calendar']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToSolicitation() {
    this.router.navigate(['/solicitation']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/user-auth']);
  }

  setFontIcon(fontIcon: string) {
    this.fontIconSolicitation = fontIcon;
  }
}
