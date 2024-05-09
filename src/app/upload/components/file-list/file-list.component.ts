import { Component } from '@angular/core';
import { FileApiService } from '../../services/file-api/file-api.service';
import { Observable } from 'rxjs';
import { UploadedFile } from '../../models';

@Component({
  selector: 'app-file-list',
  template: `
    <div class="file-list">
      <clr-tree-node *ngFor="let file of (files$ | async); let i = index" class="list-item">
        <clr-icon shape="folder"></clr-icon>
        {{ file.isInProgress  }}
        <span class="clr-tree-node-content">{{ file.name }} - {{ file.inProgress ? 'pending' : 'uploaded'}}</span>
      </clr-tree-node>
    </div>
  `,
  styles: [
    `
    .file-list {
      margin-top: 20px;
    }
    .list-item {
    }
  `,
  ],
})
export class FileListComponent {
  files$: Observable<UploadedFile[]>;

  constructor(private fileApiService: FileApiService) {
    this.files$ = this.fileApiService.files.asObservable();
  }
}
