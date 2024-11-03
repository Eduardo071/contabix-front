import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-list-arquivos',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './list-arquivos.component.html',
  styleUrl: './list-arquivos.component.scss'
})
export class ListArquivosComponent {

}
