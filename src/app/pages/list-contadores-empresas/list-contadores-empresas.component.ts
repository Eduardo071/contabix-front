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
    MatPaginatorModule
  ],
  templateUrl: './list-contadores-empresas.component.html',
  styleUrl: './list-contadores-empresas.component.scss'
})
export class ListContadoresEmpresasComponent implements OnInit {
  isContador!: boolean;

  displayedColumns: string[] = ['name', 'acoes',];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  userData: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/** Builds and returns a new User. */
function createNewUser(id: number): any {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
  };
}