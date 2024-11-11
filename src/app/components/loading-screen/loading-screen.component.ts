import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent implements OnChanges {
  @Input({ required: true }) loadingText!: string;
  @Input({ required: true }) show!: boolean;

  fadeOut: boolean = false;

  render: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      if (!this.show) {
        setTimeout(() => {
          this.fadeOut = true;
          this.render = false;
        }, 2500);
      } else {
        this.render = true;
        this.fadeOut = false;
      }
    }
  }
}
