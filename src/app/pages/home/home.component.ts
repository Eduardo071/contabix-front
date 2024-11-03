import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { AgendaAsideComponent } from '../../components/agenda-aside/agenda-aside.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListArquivosComponent } from '../../components/list-arquivos/list-arquivos.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    ComponentsModule,
    MatIconModule,
    AgendaAsideComponent,
    MatCardModule,
    MatButtonModule,
    ListArquivosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
