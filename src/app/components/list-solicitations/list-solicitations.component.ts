import { Component, OnInit } from '@angular/core';
import { SolicitationService } from '../../services/solicitation.service';
import { CommonModule } from '@angular/common';
import { SolicitacoesDataInterface } from '../../interfaces/solicitacoes.interface';
import { UserDataInterface } from '../../interfaces/user.interface';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { NgxMaskPipe } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-solicitations',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent, NgxMaskPipe, MatTooltipModule],
  templateUrl: './list-solicitations.component.html',
  styleUrl: './list-solicitations.component.scss',
})
export class ListSolicitationsComponent implements OnInit {
  isLoading: boolean = true;
  loadingText: string = 'Carregando solicitações...';
  solicitationList!: SolicitacoesDataInterface[];
  user: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );

  constructor(private readonly solicitationService: SolicitationService) {}

  ngOnInit(): void {
    this.getSolicitationsByUser();
  }

  getSolicitationsByUser() {
    this.solicitationService.getSolicitationsByUser(this.user).subscribe({
      next: (data) => {
        this.solicitationList = data;
        this.isLoading = false;
      },
    });
  }
}
