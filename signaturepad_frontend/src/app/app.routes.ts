import { Routes } from '@angular/router';
import { SignaturepadComponent } from './signaturepad/signaturepad.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signature', pathMatch: 'full' },
  { path: 'signature', component: SignaturepadComponent },
];
