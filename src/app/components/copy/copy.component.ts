import { Component, Input } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { copyToClipboard } from 'src/app/utils';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css'],
})
export class CopyComponent {
  faCopy = faCopy;
  copied = false;

  @Input()
  value: string;

  onClick(value: string) {
    this.copied = true;
    copyToClipboard(value);
  }
}
