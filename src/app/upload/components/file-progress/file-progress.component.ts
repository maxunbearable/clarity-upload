import { Component } from '@angular/core';
import { FileApiService } from '../../services/file-api/file-api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UploadedFile } from '../../models';

@Component({
  selector: 'app-file-progress',
  template: `
  <div class="files-container">
    <div *ngFor="let file of (filesInProgress$ | async)" class="file-container">
      <div class="file-info">
        <div>
          <clr-icon shape="folder" class="folder-icon"></clr-icon>
        </div>
        <div class="file-labels">
          <span>{{file.name}}</span>
          <span>{{file.type}}</span>
          <span>{{file.date | date}}</span>
          <span>Page 1</span>
        </div>
      </div>
      <clr-progress-bar class="progress-bar" clrValue="50" clrLoop clrFlash clrLoop clrCompact clrFade></clr-progress-bar>
    </div>
  </div>
  `,
  styleUrls: [`./file-progress.component.scss`],
})
export class FileProgressComponent {
  filesInProgress$: Observable<UploadedFile[]>;
  constructor(private fileApiService: FileApiService) {
    this.filesInProgress$ = this.fileApiService.files
      .asObservable()
      .pipe(map((files) => files.filter((file) => file.inProgress)));
  }
}
