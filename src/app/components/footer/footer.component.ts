import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { NewMembershipDialogComponent } from '../new-membership-dialog/new-membership-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public dialog: MatDialog) {}  // Inject MatDialog

  openDialog(): void {
    this.dialog.open(NewMembershipDialogComponent, {
      width: '300px'
    });
  }
}
