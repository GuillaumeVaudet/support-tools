import {Component, Inject, Input} from '@angular/core';
import { LogEntry } from '../services/log-parser.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-lines-view',
  templateUrl: './lines-view.component.html',
  styleUrls: ['./lines-view.component.css']
})

export class LinesViewComponent {
  constructor(    public dialogRef: MatDialogRef<LinesViewComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: { selectedEntry: LogEntry }) {}

  @Input() selectedEntry!: LogEntry;
}
