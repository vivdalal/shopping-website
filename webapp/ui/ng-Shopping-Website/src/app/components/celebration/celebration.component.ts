import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import 'confetti-js';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { nextTick } from 'q';

@Component({
  selector: 'app-celebration',
  templateUrl: './celebration.component.html',
  styleUrls: ['./celebration.component.scss']
})
export class CelebrationComponent implements OnInit, AfterViewInit {

  @Input() private user: string;

  @Output() private closed = new EventEmitter();

  private confetti: Confetti;
  private readonly confettiSettings: ConfettiSettings = {
    target: 'confetti-container',
    max: 200,
    clock: 50,
    rotate: true
  };

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    if (typeof ConfettiGenerator === 'function') {
      this.confetti = new ConfettiGenerator(this.confettiSettings);
    } else {
      this.confetti = {
        render: () => {
        },
        clear: () => {
        }
      };
    }
  }

  ngAfterViewInit(): void {
    nextTick(this.renderConfetti.bind(this));
  }

  renderConfetti(): void {
    this.confetti.render();
    this.dialog.open(DialogueComponent, {
      width: '450px',
      data: { user: this.user }
    })
      .afterClosed()
      .subscribe(this.removeConfetti.bind(this));
  }

  removeConfetti(): void {
    this.confetti.clear();
    this.closed.emit();
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})
export class DialogueComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogueComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CelebrationDialogData
  ) {
  }

  close(): void {
    this.dialogRef.close();
  }
}
