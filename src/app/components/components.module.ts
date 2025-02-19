import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class ComponentsModule { }
