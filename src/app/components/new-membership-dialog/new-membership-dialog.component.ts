import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-membership-dialog',
  imports: [MaterialModule],
  templateUrl: './new-membership-dialog.component.html',
  styleUrls: ['./new-membership-dialog.component.css']
})
export class NewMembershipDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<NewMembershipDialogComponent>, // Inject MatDialogRef
    private router: Router
  ) {}

  // Continue button handler
  continue() {
    // Close the dialog
    this.dialogRef.close();

    // Redirect to the New Membership Application page
    window.open('https://system.mycoop.co.za/account/login', '_blank');
  }
}
