import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ComponentsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
