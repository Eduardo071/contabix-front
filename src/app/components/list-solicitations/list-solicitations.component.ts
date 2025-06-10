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

  constructor(private readonly solicitationService: SolicitationService) { }

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

  // baixarArquivo(url: string) {
  //   const nome = this.getNomeArquivo(url);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = nome;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  getNomeArquivo(url: string): string {
    const decodedUrl = decodeURIComponent(url); // transforma %20 em espaço
    const partes = decodedUrl.split('/');
    const ultimaParte = partes[partes.length - 1]; // "arquivos/login documento.pdf?alt=media"
    const nomeComQuery = ultimaParte.split('?')[0]; // remove ?alt=media
    return nomeComQuery.split('%2F').pop() ?? 'arquivo';
  }

  baixarArquivo(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = ''; // força o download
    link.target = '_blank'; // abre a caixa "Salvar como..."
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
