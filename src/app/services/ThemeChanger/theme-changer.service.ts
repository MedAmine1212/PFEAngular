import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangerService {
  private theme: boolean;
  constructor() {
  }

  setTheme(theme) {
    if (this.theme !== theme) {
    this.theme = theme;
    }
  }
  getTheme() {
    return this.theme;
  }
}
