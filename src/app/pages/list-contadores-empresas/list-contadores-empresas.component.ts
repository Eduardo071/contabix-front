import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';
import { UserDataInterface } from '../../interfaces/user.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListaContadoresEmpresasService } from '../../services/lista-contadores-empresas.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAvaliacaoComponent } from './modal-avaliacao/modal-avaliacao.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importa o MatSnackBar

@Component({
  selector: 'app-list-contadores-empresas',
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule, // Inclui o MatSnackBar aqui
  ],
  templateUrl: './list-contadores-empresas.component.html',
  styleUrl: './list-contadores-empresas.component.scss',
})
export class ListContadoresEmpresasComponent implements OnInit {
  isContador!: boolean;

  displayedColumns: string[] = ['nome', 'acoes'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userData: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );

  constructor(
    private service: ListaContadoresEmpresasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Injeta o MatSnackBar
  ) {
    // if (this.isContador) {
    //   this.buscarEmpresa();
    // } else {
    //   this.buscarContadores();
    // }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    if (this.userData) {
      if (this.userData.tipoUsuario?.descricao === 'contador') {
        this.setUserType('contador');
        this.buscarEmpresa();
      } else {
        this.setUserType('empresa');
        this.buscarContadores();
      }
    }
  }

  setUserType(userType: string) {
    if (userType === 'contador') {
      this.isContador = true;
    } else if (userType === 'empresa') {
      this.isContador = false;
    }
  }

  buscarContadores() {
    this.service.getContadores().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  buscarEmpresa() {
    this.service.getEmpresas().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  copiarEmail(email: string): void {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        console.log('E-mail copiado:', email);
        this.snackBar.open(
          'E-mail copiado para a área de transferência!',
          'Fechar',
          {
            duration: 2000, // 2 segundos de duração
            verticalPosition: 'top', // Exibe no topo da tela
            horizontalPosition: 'center', // Exibe centralizado
          }
        );
      })
      .catch((err) => {
        console.error('Erro ao copiar o e-mail:', err);
      });
  }

  abrirModalAvalicao(data?: any) {
    const modal = this.dialog.open(ModalAvaliacaoComponent, {
      data: {
        id: data.idUsuario,
        avaliacao: data.avaliacao,
      },
      width: '25vw',
      height: '10vw',
      panelClass: 'custom-modal',
    });
  }
}
