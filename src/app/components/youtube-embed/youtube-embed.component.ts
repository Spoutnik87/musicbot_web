import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  templateUrl: './youtube-embed.component.html',
})
export class YoutubeEmbedComponent {
  @Input()
  width = 720;

  @Input()
  height = 480;

  @Input()
  set videoId(value) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + value);
  }

  videoURL: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}
}
