import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  faSpinner = faSpinner;
  @Input()
  loading = true;
  @Input()
  size: '2x' | '3x' | '4x' | '5x' | '6x' = '3x';
}
