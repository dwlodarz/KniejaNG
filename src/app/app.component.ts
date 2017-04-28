import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app works!';
  headerClass = '';
  
  constructor(private router: Router) { 

  }

  ngOnInit() {
    
    this.router.events.subscribe((val) => {
        if(val instanceof NavigationEnd && (<NavigationEnd> val).url == "" || (<NavigationEnd> val).url=="/")
        {
          this.headerClass = 'alt';
        }
        else
        {
          this.headerClass = '';
        }
    });
  }
}
