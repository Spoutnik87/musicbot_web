import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ChangeContext, LabelType, Options } from 'ng5-slider';
import { interval, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ContentStatusModel } from 'src/app/models/content-status.model';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

@Component({
  selector: 'app-server-status-slider',
  templateUrl: './server-status-slider.component.html',
  styleUrls: ['./server-status-slider.component.css'],
})
export class ServerStatusSliderComponent implements OnInit, OnDestroy {
  _playing: ContentStatusModel;

  refreshSubscription: Subscription;
  manualRefresh: EventEmitter<void> = new EventEmitter<void>();

  selecting = false;

  stepElapsed = 0;

  @Input()
  set playing(playing: ContentStatusModel) {
    if (playing == null) {
      this.options = {
        floor: 0,
        ceil: 0,
        showSelectionBar: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        step: 1,
      };
      this.value = 0;
      return;
    }
    if (this.refreshSubscription != null) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
    this._playing = playing;
    this.stepElapsed = 250;
    const ceil = Math.floor(this._playing.duration / 250);
    this.options = {
      floor: 0,
      ceil,
      showSelectionBar: true,
      hidePointerLabels: true,
      step: 1,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Floor:
            if (this.value != null && this.value !== 0) {
              return this.durationPipe.transform(this.value * this.stepElapsed);
            } else {
              return '';
            }
          case LabelType.Ceil:
            if (value != null) {
              return this.durationPipe.transform(value * this.stepElapsed);
            } else {
              return '';
            }
          default:
            return value.toString();
        }
      },
    };
    if (this.playing.position == null) {
      this.value = 0;
    } else {
      this.value = this.playing.position / 250;
    }

    if (!this._playing.paused) {
      this.refreshSubscription = interval(this.stepElapsed).subscribe(() => {
        this.value++;
        if (!this.selecting) {
          this.manualRefresh.emit();
        }
        if (this.value > ceil) {
          this.onEnd(this._playing.id);
        }
      });
    }
  }

  get playing(): ContentStatusModel {
    return this._playing;
  }

  @Output()
  change = new EventEmitter<{
    id: string;
    position: number;
  }>();

  @Output()
  end = new EventEmitter<string>();

  options: Options;

  value = 0;

  positionSubject: Subject<number>;
  positionChangeSubscription: Subscription;

  constructor(private durationPipe: DurationPipe) {}

  ngOnInit() {
    this.positionSubject = new Subject();
    this.positionChangeSubscription = this.positionSubject.pipe(debounceTime(300)).subscribe(position => {
      this.change.emit({
        id: this.playing.id,
        position,
      });
    });
  }

  ngOnDestroy() {
    if (this.positionChangeSubscription != null) {
      this.positionChangeSubscription.unsubscribe();
      this.positionChangeSubscription = null;
    }
    if (this.refreshSubscription != null) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
  }

  onUserChangeStart(changeContext: ChangeContext): void {
    this.selecting = true;
  }

  onUserChangeEnd(changeContext: ChangeContext) {
    this.selecting = false;
    this.positionSubject.next(changeContext.value * this.stepElapsed);
  }

  onEnd(id: string) {
    this.playing = null;
    this.end.emit(id);
  }
}
