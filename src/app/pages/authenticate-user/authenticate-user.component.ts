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
  selectOptions: UserTypesInterface[] = [
    { idTipoUsuario: 1, descricao: 'Contador' },
    { idTipoUsuario: 2, descricao: 'Empresa' },
  ];
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
    this.setupForm();
  }

  setupForm(): void {
    this.setTextActionForm();
    this.setButtonLabels();
    this.userAuthForm = this.isLogin
      ? this.buildLoginForm()
      : this.buildRegisterForm();
  }

  setTextActionForm(): void {
    this.textActionForm = this.isLogin ? 'Bem Vindo(a)!' : 'Criar conta';
  }

  setButtonLabels(): void {
    this.labelSubmitButton = this.isLogin ? 'ENTRAR' : 'CRIAR';
    this.labelFlowChangeButton = this.isLogin
      ? 'Não possui conta ainda? Cadastre-se!'
      : 'Já possui conta? Entre!';
  }

  handleClickFlowChangeButton() {
    this.isLogin = !this.isLogin;
    this.setButtonLabels();
    this.setupForm();
    if (this.isLogin && this.usuarioMask === null) {
      this.userAuthForm.get('usuario')?.valueChanges.subscribe((value) => {
        this.updateUsuarioMask(value);
      });
    }
  }

  updateUsuarioMask(value: string) {
    const isNumeric = /\d/.test(value);
    this.usuarioMask = isNumeric ? '00.000.000/0000-00' : null;
  }

  buildLoginForm(): FormGroup {
    return this.fb.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required],
    });
  }

  buildRegisterForm(): FormGroup {
    return this.fb.group({
      nome: [null, Validators.required],
      senha: [null, Validators.required],
      idTipoUsuario: [null, Validators.required],
      email: [null],
      cnpj: [null],
    });
  }

  handleFormToggle(): void {
    this.isLogin = !this.isLogin;
    this.setupForm();
  }

  handleClickSubmitButton(): void {
    if (this.userAuthForm.invalid) return;

    const userData: Partial<UserDataInterface> = this.isLogin
      ? this.buildLoginData()
      : this.buildRegisterData();

    this.authenticateUserService
      .authenticateUser(userData as UserDataInterface)
      .subscribe({
        next: (response: UserDataInterface) => {
          if (this.isLogin) {
            sessionStorage.setItem('userData', JSON.stringify(response));
            this.router.navigate(['/home']);
            this.sweetAlertService.showSuccess('Login realizado com sucesso!');
          } else {
            this.sweetAlertService.showSuccess(
              'Cadastro realizado com sucesso! Faça o login para continuar.'
            );
            this.handleFormToggle();
          }
        },
        error: (error) => {
          this.sweetAlertService.showError(error.error.message);
        },
      });
  }

  handleUserTypeSelection(clearUnusedAtributes?: boolean) {
    if (this.userAuthForm?.get('idTipoUsuario')?.value == 1) {
      if (!this.userAuthForm.contains('email')) {
        this.userAuthForm.addControl('email', this.fb.control(null));
      }
      if (this.userAuthForm?.contains('cnpj') && clearUnusedAtributes) {
        this.userAuthForm.removeControl('cnpj');
      }
    } else if (this.userAuthForm?.get('idTipoUsuario')?.value == 2) {
      if (!this.userAuthForm.contains('cnpj')) {
        this.userAuthForm.addControl('cnpj', this.fb.control(null));
      }
      if (this.userAuthForm?.contains('email') && clearUnusedAtributes) {
        this.userAuthForm.removeControl('email');
      }
    }
  }

  private buildLoginData(): Partial<UserDataInterface> {
    const usuario = this.userAuthForm.get('usuario')?.value;
    return {
      email: this.usuarioMask ? undefined : usuario,
      cnpj: this.usuarioMask ? usuario : undefined,
      senha: this.userAuthForm.get('senha')?.value,
    };
  }

  private buildRegisterData(): Partial<UserDataInterface> {
    return {
      nome: this.userAuthForm.get('nome')?.value,
      senha: this.userAuthForm.get('senha')?.value,
      idTipoUsuario: this.userAuthForm.get('idTipoUsuario')?.value,
      email: this.userAuthForm.get('email')?.value,
      cnpj: this.userAuthForm.get('cnpj')?.value,
    };
  }
}
