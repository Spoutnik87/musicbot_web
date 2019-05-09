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
