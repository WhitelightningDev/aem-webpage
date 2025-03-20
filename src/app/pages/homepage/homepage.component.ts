import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  // Share Options
  showShareOptions = false;
  canShareViaWhatsApp = false;
  canShareViaEmail = false;
  canShareViaSMS = false;
  currentURL = encodeURIComponent(window.location.href);

  constructor() {
    this.detectDevice();
  }

  detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
    const isDesktop = !isMobile;

    this.canShareViaWhatsApp = isMobile || isDesktop;
    this.canShareViaEmail = true;
    this.canShareViaSMS = isMobile;
  }

  openShareOptions() {
    this.showShareOptions = !this.showShareOptions;
  }

  // Close dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const dropdownButton = document.querySelector('.btn.btn-light');
    const dropdownMenu = document.querySelector('.share-options');

    // If the click is outside the button and dropdown, close the dropdown
    if (
      dropdownButton && !dropdownButton.contains(clickedElement) &&
      dropdownMenu && !dropdownMenu.contains(clickedElement)
    ) {
      this.showShareOptions = false;
    }
  }

  // Share via different methods
  shareViaWhatsApp() {
    const whatsappURL = `https://wa.me/?text=${this.currentURL}`;
    window.open(whatsappURL, '_blank');
    this.showShareOptions = false; // Close the dropdown after selection
  }

  shareViaEmail() {
    const mailtoLink = `mailto:?subject=Check%20this%20out&body=${this.currentURL}`;
    window.open(mailtoLink, '_blank');
    this.showShareOptions = false; // Close the dropdown after selection
  }

  shareViaSMS() {
    const smsLink = `sms:?body=${this.currentURL}`;
    window.open(smsLink, '_blank');
    this.showShareOptions = false; // Close the dropdown after selection
  }
}
