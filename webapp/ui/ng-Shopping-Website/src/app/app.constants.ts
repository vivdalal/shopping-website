import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {
  public readonly API_ROOT = 'http://localhost:5000/api';
}
