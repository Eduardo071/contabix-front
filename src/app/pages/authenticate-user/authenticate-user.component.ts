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
import { CNPJ_MASK } from '../../shared/constants/constants';
import { TiposUsuarioService } from '../../services/tipos-usuario.service';

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
  selectOptions!: UserTypesInterface[];
  userAuthForm!: FormGroup;
  labelFlowChangeButton!: string;
  labelSubmitButton!: string;
  usuarioMask: string | null = null;
  cnpjMask: string = CNPJ_MASK;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authenticateUserService: AuthenticateUserService,
    private readonly tiposUsuarioService: TiposUsuarioService,
    private readonly sweetAlertService: SweetAlertService,
    private readonly router: Router
  ) {
    tiposUsuarioService.getTiposUsuario().subscribe({
      next: (data: UserTypesInterface[]) => {
        this.selectOptions = data;
      },
    });
  }

  ngOnInit(): void {
    this.setupForm();

    if (this.isLogin && this.usuarioMask === null) {
      this.userAuthForm.get('usuario')?.valueChanges.subscribe((value) => {
        this.updateUsuarioMask(value);
      });
    }
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
    this.usuarioMask = isNumeric ? CNPJ_MASK : null;
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
      tipoUsuario: [null, Validators.required],
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
            this.sweetAlertService.showSucessToaster(
              'Login realizado com sucesso!'
            );
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

  private buildLoginData(): Partial<UserDataInterface> {
    const usuario = this.userAuthForm.get('usuario')?.value;
    return {
      email: this.usuarioMask ? undefined : usuario,
      cnpj: this.usuarioMask ? this.limparCNPJ(usuario) : undefined,
      senha: this.userAuthForm.get('senha')?.value,
    };
  }

  private buildRegisterData(): Partial<UserDataInterface> {
    return {
      nome: this.userAuthForm.get('nome')?.value,
      senha: this.userAuthForm.get('senha')?.value,
      tipoUsuario: this.userAuthForm.get('tipoUsuario')?.value,
      email: this.userAuthForm.get('email')?.value,
      cnpj: this.userAuthForm.get('cnpj')?.value,
    };
  }

  limparCNPJ(cnpj: string): string {
    return cnpj.replace(/\D/g, '');
  }
}
