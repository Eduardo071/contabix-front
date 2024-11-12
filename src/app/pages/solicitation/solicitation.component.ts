import { Component, OnInit } from '@angular/core';
import { FormSolicitationComponent } from '../../components/form-solicitation/form-solicitation.component';
import { ListSolicitationsComponent } from '../../components/list-solicitations/list-solicitations.component';
import { UserDataInterface } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitation',
  standalone: true,
  imports: [FormSolicitationComponent, ListSolicitationsComponent, CommonModule],
  templateUrl: './solicitation.component.html',
  styleUrl: './solicitation.component.scss',
})
export class SolicitationComponent implements OnInit {
  userData: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );
  isContador!: boolean;

  ngOnInit(): void {
    if (this.userData) {
      this.userData.tipoUsuario?.descricao === 'contador'
        ? this.setUserType('contador')
        : this.setUserType('empresa');
    }
  }

  setUserType(userType: string) {
    if (userType === 'contador') {
      this.isContador = true;
    } else if (userType === 'empresa') {
      this.isContador = false;
    }
  }
}
