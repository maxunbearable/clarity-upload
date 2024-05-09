import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { UploadedFile } from '../../models';

@Injectable({ providedIn: 'root' })
export class FileApiService {
  loading = new BehaviorSubject<boolean>(false);
  files = new BehaviorSubject<UploadedFile[]>([]);

  constructor() {
    this.observeProgressChange();
    this.observeLoadingChange();
  }

  getLoading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getFiles$(): Observable<UploadedFile[]> {
    return this.files.asObservable();
  }

  onFileUpload({ name, type, size }: File): void {
    this.loading.next(true);
    this.files.next([
      ...this.files.value,
      {
        name,
        type,
        size,
        date: new Date(),
        id: new Date().toString(),
        inProgress: true,
        failed: false,
      } as UploadedFile,
    ]);
  }

  private observeProgressChange(): void {
    this.getFiles$()
      .pipe(
        delay(10000),
        tap(() => {
          const fileInProgress = this.files.value.find(
            (file) => file.inProgress
          );
          if (fileInProgress) {
            this.files.next([
              ...this.files.value.filter(
                (file) => file.id !== fileInProgress.id
              ),
              { ...fileInProgress, inProgress: false },
            ]);
          }
        })
      )
      .subscribe();
  }

  private observeLoadingChange(): void {
    this.getLoading$()
      .pipe(
        delay(3000),
        filter((loading) => loading),
        tap(() => this.loading.next(false))
      )
      .subscribe();
  }
}
