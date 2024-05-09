import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiService } from '../../services/file-api/file-api.service';

@Component({
  selector: 'app-file-upload',
  template: `
    <div class="drop-area" (drop)="onDrop($event)" (dragover)="onDragOver($event)">
      <p *ngIf="(loading$ | async) === false">Drag & Drop files here</p>
      <clr-spinner *ngIf="(loading$ | async)">Loading data</clr-spinner>
    </div>
  `,
  styles: [
    `
    .drop-area {
      height: calc(100vh - 200px);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border: 1px solid gray;
      border-radius: 10%;
    }
  `,
  ],
})
export class FileUploadComponent {
  loading$: Observable<boolean>;

  constructor(private fileApiService: FileApiService) {
    this.loading$ = this.fileApiService.getLoading$();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.dataTransfer?.files);

    this.fileApiService.onFileUpload(event.dataTransfer?.files[0]);
  }
}
