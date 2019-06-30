import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  /**
   * @param value Duration in miliseconds.
   */
  transform(value: number): string {
    value = Math.floor(value / 1000);
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = (value % 3600) - minutes * 60;
    let hoursString = '';
    if (hours > 0) {
      hoursString = `${hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:`;
    }
    return `${hoursString}${minutes.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    })}:${seconds.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    })}`;
  }
}
