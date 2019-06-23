import { Observable, Observer } from 'rxjs';

export const isFetchRequired = () => {
  return (source: Observable<number>) =>
    new Observable((observer: Observer<boolean>) => {
      const subscription = source.subscribe(
        updatedAt => {
          if (updatedAt == null) {
            observer.next(true);
          } else {
            if (Date.now() - updatedAt < 120000) {
              observer.next(false);
            } else {
              observer.next(true);
            }
          }
        },
        error => observer.error(error),
        () => observer.complete()
      );
      return subscription;
    });
};

export const copyToClipboard = value => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = value;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};
