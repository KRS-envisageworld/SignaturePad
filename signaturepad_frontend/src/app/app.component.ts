import { Component,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, VERSION } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signaturepad_frontend';
  version = VERSION.full
  private router: Router = inject(Router)
}
