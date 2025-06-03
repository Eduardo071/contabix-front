import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListaContadoresEmpresasService } from '../../../services/lista-contadores-empresas.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-avaliacao',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './modal-avaliacao.component.html',
  styleUrl: './modal-avaliacao.component.scss'
})
export class ModalAvaliacaoComponent {

  rating = 0;
  stars = Array(5).fill(0);


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ListaContadoresEmpresasService,
    public dialogRef: MatDialogRef<ModalAvaliacaoComponent>,
    private snackBar: MatSnackBar // Injeta o MatSnackBar
  ) {
    this.rating = data.avaliacao ?? 0
    console.log(data)
  }

  setRating(value: number) {
    this.rating = value;


    this.service.avaliar(value, this.data.id).subscribe({
      next: () => {

        this.snackBar.open('Avaliação enviada!', 'Fechar', {
          duration: 2000, // 2 segundos de duração
          verticalPosition: 'top', // Exibe no topo da tela
          horizontalPosition: 'center' // Exibe centralizado
        });
      },
      error: () => {

      }
    })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
