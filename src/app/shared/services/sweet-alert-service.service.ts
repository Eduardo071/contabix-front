import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: message,
      confirmButtonText: 'Ok',
    });
  }

  showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message,
      confirmButtonText: 'Ok',
    });
  }

  showInfo(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Informação',
      text: message,
      confirmButtonText: 'Ok',
    });
  }

  showWarning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção!',
      text: message,
      confirmButtonText: 'Ok',
    });
  }
}
