import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-agenda-aside',
  standalone: true,
  imports: [MatIconModule, MatDividerModule],
  templateUrl: './agenda-aside.component.html',
  styleUrl: './agenda-aside.component.scss',
})
export class AgendaAsideComponent {}
