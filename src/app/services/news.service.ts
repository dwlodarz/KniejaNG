import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NewsModel } from './news.model';

@Injectable()
export class NewsService {
  private baseUrl: string = 'https://knieja3.cba.pl';
  private news:NewsModel[];
  constructor(private http : Http) { }

  getAll(): Observable<NewsModel[]>{
    let news$ = this.http
      .get(`${this.baseUrl}/news2.php`, this.getHeaders())
      .map(data=>{
        console.log('Parsed news: ', data.json());
        return data.json();
      });
      return news$;
  }

private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return headers;
  }

  private toNewsModel(r : any):NewsModel{
    let news = <NewsModel>({
      id: r.id,
      subject: r.subject,
      readCount: r.readCount,
      timestamp: r.timestamp,
      username: r.username
    });

    console.log('Parsed news: ', news);

    return news;
  }
}
