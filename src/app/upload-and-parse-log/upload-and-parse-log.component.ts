import { Component } from '@angular/core';
import { LogParserService, LogEntry } from '../services/log-parser.service';

@Component({
  selector: 'upload-and-parse-log',
  templateUrl: './upload-and-parse-log.component.html',
  styleUrls: ['./upload-and-parse-log.component.scss'],
})
export class UploadAndParseLogComponent {
  logEntries: LogEntry[] = [];
  unparsedLines: string[] = [];

  constructor(private logParserService: LogParserService) {}

  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const parseResult = this.logParserService.parseLogFile(fileReader.result as string);
        this.logEntries = parseResult.logEntries;
        this.unparsedLines = parseResult.unparsedLines;
        this.logParserService.updateLogEntries(this.logEntries);
        this.logParserService.setSelectedFileName(file.name);
        this.logParserService.setSelectedFileSize(file.size);
      };

      fileReader.readAsText(file);
    }
  }
}

