import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ServicoEnum,
  UrgenciaEnum,
} from '../../interfaces/solicitacoes.interface';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { AuthenticateUserService } from '../../services/authenticate-user.service';
import { UserDataInterface } from '../../interfaces/user.interface';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { addBusinessDays } from 'date-fns';
import { MatButtonModule } from '@angular/material/button';
import { SolicitationService } from '../../services/solicitation.service';
import { SweetAlertService } from '../../shared/services/sweet-alert-service.service';
import { Router } from '@angular/router';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';

@Component({
  selector: 'app-form-solicitation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
    LoadingScreenComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './form-solicitation.component.html',
  styleUrl: './form-solicitation.component.scss',
})
export class FormSolicitationComponent implements OnInit {
  solicitationForm!: FormGroup<any>;
  servicoOptions!: string[];
  urgenciaOptions!: string[];
  contadoresOptions!: UserDataInterface[];
  cliente: number = JSON.parse(sessionStorage.getItem('userData') ?? '');
  prazoDateISO!: Date;
  loadingText: string = 'Carregando formulário...';
  isLoading: boolean = true;

  selectedFileName: string = '';
  selectedFile!: File;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: AuthenticateUserService,
    private readonly solicitationService: SolicitationService,
    private readonly alertService: SweetAlertService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.servicoOptions = Object.values(ServicoEnum);
    this.urgenciaOptions = Object.values(UrgenciaEnum);
    this.initializeForm();
    this.getContadores();
    this.handleUrgenciaChanges();
  }

  initializeForm() {
    this.solicitationForm = this.fb.group({
      cliente: [this.cliente, Validators.required],
      contador: ['', Validators.required],
      servico: ['', Validators.required],
      urgencia: ['', Validators.required],
      prazo: ['', Validators.required],
      assunto: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  getContadores() {
    this.userService.getContadores().subscribe({
      next: (data) => {
        this.contadoresOptions = data;
        this.isLoading = false;
      },
    });
  }
  handleUrgenciaChanges() {
    this.solicitationForm
      .get('urgencia')
      ?.valueChanges.subscribe((urgencia) => {
        const today = new Date();
        let prazoDate: Date;

        switch (urgencia) {
          case UrgenciaEnum.BAIXA:
            prazoDate = addBusinessDays(today, 3);
            break;
          case UrgenciaEnum.MEDIA:
            prazoDate = addBusinessDays(today, 2);
            break;
          case UrgenciaEnum.ALTA:
            prazoDate = addBusinessDays(today, 1);
            break;
          default:
            prazoDate = today;
        }
        this.prazoDateISO = prazoDate;
        const formattedPrazo = prazoDate.toLocaleDateString('pt-BR');
        this.solicitationForm.get('prazo')?.setValue(formattedPrazo);
      });
  }

  handleClickSubmitButton() {
    this.solicitationForm.patchValue({
      prazo: this.prazoDateISO,
    });

    this.solicitationService
      .postNewSolicitation(this.solicitationForm.value,  this.selectedFile)
      .subscribe({
        next: (response) => {
          this.alertService.showSuccess(
            'Sua solicitação foi enviada com sucesso!'
          );
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.alertService.showError(error.error.message);
        },
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }
  
}
