import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jsloader',
  templateUrl: './jsloader.component.html',
  styleUrls: ['./jsloader.component.css']
})
export class JsloaderComponent implements OnInit {
  private loadAPI: Promise<unknown>;

  constructor() { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      console.log('resolving promise...');
      this.loadScript();
    });
  }
  public loadScript() {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = '../../../assets/scripts/temp.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }


}
