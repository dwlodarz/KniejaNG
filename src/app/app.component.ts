import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { NewsService } from './services/news.service';
import {NewsModel} from './services/news.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NewsService]
})
export class AppComponent {
  title = 'app works!';
  headerClass = '';
  news : NewsModel[];

  constructor(private newsService: NewsService, private router: Router) { 

  }

  ngOnInit() {
    var a = this.newsService.getAll().subscribe(n=>this.news = n);
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
