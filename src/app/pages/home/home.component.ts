import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import { AgendaAsideComponent } from '../../components/agenda-aside/agenda-aside.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ComponentsModule, MatIconModule, AgendaAsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
