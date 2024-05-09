export interface UploadedFile {
  name: string;
  id: string;
  type: string;
  date: Date;
  inProgress: boolean;
  failed: boolean;
}
