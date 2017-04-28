import { Component, OnInit } from '@angular/core';
import { NewsService } from './../services/news.service';
import { NewsModel } from './../services/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  news: NewsModel[];
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAll().subscribe(n => this.news = n);
  }
}
