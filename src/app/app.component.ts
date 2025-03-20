import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { WhatsappComponent } from "./components/whatsapp/whatsapp.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, WhatsappComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aem-webpage';
}
