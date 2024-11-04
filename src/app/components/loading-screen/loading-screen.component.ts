import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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

  @HostBinding('class.fade-out') fadeOut = false;

  render: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      if (!this.show) {
        setTimeout(() => {
          this.fadeOut = true;
          this.render = false;
        }, 3000);
      }
    }
  }
}
