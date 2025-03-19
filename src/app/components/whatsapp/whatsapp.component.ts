import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-whatsapp',
  imports: [MaterialModule],
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent {
  whatsappNumber: string = '+27833759003'; // WhatsApp number to contact

  constructor() {}

  // Open WhatsApp link
  openWhatsApp() {
    const whatsappURL = `https://wa.me/${this.whatsappNumber}`;
    window.open(whatsappURL, '_blank');
  }
}
