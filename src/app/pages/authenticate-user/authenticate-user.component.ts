import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { UserTypesInterface } from '../../interfaces/user.interface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-authenticate-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './authenticate-user.component.html',
  styleUrl: './authenticate-user.component.scss',
})
export class AuthenticateUserComponent implements OnInit {
  textActionForm: string = '';
  isLogin: boolean = true;
  selectOptions!: Array<UserTypesInterface>;
  userAuthForm!: FormGroup;
  labelFlowChangeButton!: string;
  labelSubmitButton!: string;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.handleFormMode();
  }

  setTextActionForm(text: string) {
    this.textActionForm = text;
  }

  setLabelSubmitButton(text: string) {
    this.labelSubmitButton = text;
  }

  setLabelFlowChangeButton(text: string) {
    this.labelFlowChangeButton = text;
  }

  setSelectOptions() {
    this.selectOptions = [
      { id_tipo_usuario: 1, descricao: 'Contador' },
      { id_tipo_usuario: 2, descricao: 'Empresa' },
    ];
  }

  handleFormMode() {
    if (this.isLogin) {
      this.setTextActionForm('Bem Vindo(a)!');
      this.setLabelSubmitButton('ENTRAR');
      this.setLabelFlowChangeButton('Não possui conta ainda? Cadastre-se!');
      this.userAuthForm = this.fb.group({
        usuario: [null, Validators.required],
        senha: [null, Validators.required],
      });
    } else if (!this.isLogin) {
      this.setTextActionForm('Criar conta');
      this.setLabelSubmitButton('CRIAR');
      this.setLabelFlowChangeButton('Já possui conta? Entre!');
      this.setSelectOptions();
      this.userAuthForm = this.fb.group({
        nome: [null, Validators.required],
        senha: [null, Validators.required],
        id_tipo_usuario: [null, Validators.required],
        email: [null],
        cnpj: [null],
      });
    }
  }

  handleUserTypeSelection(clearUnusedAtributes?: boolean) {
    if (this.userAuthForm?.get('id_tipo_usuario')?.value == 1) {
      this.userAuthForm.addControl('email', this.fb.control(null));
      if (this.userAuthForm?.contains('cnpj') && clearUnusedAtributes) {
        this.userAuthForm.removeControl('cnpj');
      }
    } else if (this.userAuthForm?.get('id_tipo_usuario')?.value == 2) {
      this.userAuthForm.addControl('cnpj', this.fb.control(null));
      if (this.userAuthForm?.contains('email') && clearUnusedAtributes) {
        this.userAuthForm.removeControl('email');
      }
    }
  }

  handleClickFlowChangeButton() {
    this.isLogin = !this.isLogin;
    this.handleFormMode();
  }

  handleClickSubmitButton() {
    throw new Error('Method not implemented.');
  }
}
