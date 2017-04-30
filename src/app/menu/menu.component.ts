import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  headerClass : string;
  constructor(private router : Router) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && (<NavigationEnd>val).url == "" || (<NavigationEnd>val).url == "/") {
        this.headerClass = 'alt';
      }
      else {
        this.headerClass = '';
      }
    });
  }

}
