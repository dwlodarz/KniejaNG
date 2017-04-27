import { Component, OnInit } from '@angular/core';
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
  news : NewsModel[];

  constructor(private newsService: NewsService) { 

  }

  ngOnInit() {
    var a = this.newsService.getAll().subscribe(n=>this.news = n);
  }
}
