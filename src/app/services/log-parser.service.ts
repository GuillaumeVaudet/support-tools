import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface LogEntry {
  lineNumber: number;
  date: string;
  time: string;
  level: string;
  column1: string;
  thread: string;
  message: string;
  stackTrace: string[];
  showStackTrace?: boolean;
}

export interface ParseResult {
  logEntries: LogEntry[];
  unparsedLines: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LogParserService {
  private logEntriesSource = new BehaviorSubject<LogEntry[]>([]);
  logEntries$ = this.logEntriesSource.asObservable();
  private selectedFileName!: string;
  private selectedFileSize!: number;
  private selectedLevelFilter: string | null = null;

  constructor(private http: HttpClient) {}
  updateLogEntries(logEntries: LogEntry[]): void {
    this.logEntriesSource.next(logEntries);
  }
  parseLogFile(logFileContent: string): ParseResult {
    const logEntries: LogEntry[] = [];
    const unparsedLines: string[] = [];
    const logLines = logFileContent.split('\n');

    const logPattern = /(?<date>\d{4}-\d{2}-\d{2})\s+(?<time>\d{2}:\d{2}:\d{2},\d{3})\s+(?<level>INFO|ERROR|WARN|DEBUG|TRACE)\s+(?<column1>\[.+?\])\s+(?<thread>\[.*?\])\s+(?<classname>[a-zA-Z0-9._$]+)\s+\[(?<filename>.*?)\]/;

    let currentEntry: LogEntry | null = null;
    let lineNumber = 1;

    for (const line of logLines) {
      const match = logPattern.exec(line);

      if (match) {
        if (currentEntry) {
          logEntries.push(currentEntry);
          currentEntry = null;
        }

        currentEntry = {
          lineNumber: lineNumber,
          date: match.groups?.['date'] || '',
          time: match.groups?.['time'] || '',
          level: match.groups?.['level'] || '',
          column1: match.groups?.['column1'] || '',
          thread: match.groups?.['thread'] || '',
          message: match.groups?.['classname'] + ' [' + match.groups?.['filename'] + '] ',
          stackTrace: [],
        };
      } else if (currentEntry) {
        if (/^\s+at\s.+/.test(line)) {
          currentEntry.stackTrace.push(line.trim());
        } else {
          currentEntry.message += '\n' + line;
        }
      } else {
        unparsedLines.push(line);
      }
      lineNumber++;
    }

    if (currentEntry) {
      logEntries.push(currentEntry);
    }
    return { logEntries, unparsedLines };
  }

  setSelectedFileName(fileName: string): void {
    this.selectedFileName = fileName;
  }
  getSelectedFileName(): string {
    return this.selectedFileName;
  }
  setSelectedFileSize(fileSize: number): number{
    return this.selectedFileSize = fileSize;
  }
  getSelectedFileSize(): number{
    return this.selectedFileSize;
  }
  countEntriesByLevel(level: string): number {
    const logEntries = this.logEntriesSource.getValue();
    return logEntries.filter(entry => entry.level === level).length;
  }
  setSelectedLevelFilter(level: string): void {
    this.selectedLevelFilter = level;
  }
  getSelectedLevelFilter(): string | null {
    return this.selectedLevelFilter;
  }
  clearSelectedLevelFilter(): void {
    this.selectedLevelFilter = null;
  }
}
