import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangerService {
  private theme: boolean;
  constructor() {
  }

  setTheme(theme) {
    this.theme = theme;
    console.log(this.theme);
  }
  getTheme() {
    return this.theme;
  }
}
