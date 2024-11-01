import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  UserDataInterface,
  UserTypesInterface,
} from '../../interfaces/user.interface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticateUserService } from '../../services/authenticate-user.service';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../shared/services/sweet-alert-service.service';

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
    NgxMaskDirective,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    ReactiveFormsModule,
    CommonModule,
    HttpClient,
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
  usuarioMask: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authenticateUserService: AuthenticateUserService,
    private readonly sweetAlertService: SweetAlertService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.handleFormMode();
    if (this.isLogin && this.usuarioMask === null) {
      this.userAuthForm.get('usuario')?.valueChanges.subscribe((value) => {
        this.updateUsuarioMask(value);
      });
    }
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
      this.usuarioMask = null;
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
      if (!this.userAuthForm.contains('email')) {
        this.userAuthForm.addControl('email', this.fb.control(null));
      }
      if (this.userAuthForm?.contains('cnpj') && clearUnusedAtributes) {
        this.userAuthForm.removeControl('cnpj');
      }
    } else if (this.userAuthForm?.get('id_tipo_usuario')?.value == 2) {
      if (!this.userAuthForm.contains('cnpj')) {
        this.userAuthForm.addControl('cnpj', this.fb.control(null));
      }
      if (this.userAuthForm?.contains('email') && clearUnusedAtributes) {
        this.userAuthForm.removeControl('email');
      }
    }
  }

  updateUsuarioMask(value: string) {
    const isNumeric = /\d/.test(value);
    this.usuarioMask = isNumeric ? '00.000.000/0000-00' : null;
  }

  handleClickFlowChangeButton() {
    this.isLogin = !this.isLogin;
    this.handleFormMode();

    if (this.isLogin && this.usuarioMask === null) {
      this.userAuthForm.get('usuario')?.valueChanges.subscribe((value) => {
        this.updateUsuarioMask(value);
      });
    }
  }

  handleClickSubmitButton() {
    let userData: Partial<UserDataInterface> = {};

    if (this.isLogin) {
      const usuarioValue = this.userAuthForm.get('usuario')?.value;
      if (this.usuarioMask === '00.000.000/0000-00') {
        userData = {
          cnpj: usuarioValue,
          senha: this.userAuthForm.get('senha')?.value,
        };
      } else {
        userData = {
          email: usuarioValue,
          senha: this.userAuthForm.get('senha')?.value,
        };
      }
    } else {
      const idTipoUsuario = this.userAuthForm.get('id_tipo_usuario')?.value;
      userData = {
        id_tipo_usuario: idTipoUsuario,
        nome: this.userAuthForm.get('nome')?.value,
        senha: this.userAuthForm.get('senha')?.value,
      };

      if (idTipoUsuario === 1) {
        userData.email = this.userAuthForm.get('email')?.value;
      } else if (idTipoUsuario === 2) {
        userData.cnpj = this.userAuthForm.get('cnpj')?.value;
      }
    }
    this.authenticateUserService
      .authenticateUser(userData as UserDataInterface)
      .subscribe({
        next: (response: UserDataInterface) => {
          if (this.isLogin) {
            sessionStorage.setItem('userData', JSON.stringify(response));

            this.router.navigate(['/home']);

            this.sweetAlertService.showSuccess('Login realizado com sucesso!');
          } else if (!this.isLogin) {
            this.sweetAlertService.showSuccess(
              'Cadastro realizado com sucesso! Faça o login para continuar.'
            );

            this.isLogin = !this.isLogin;
          }
        },
        error: (error) => {
          this.sweetAlertService.showError(error.message);
        },
      });
  }
}
