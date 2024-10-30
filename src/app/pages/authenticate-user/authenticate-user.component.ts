import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-authenticate-user',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './authenticate-user.component.html',
  styleUrl: './authenticate-user.component.scss',
})
export class AuthenticateUserComponent {}
