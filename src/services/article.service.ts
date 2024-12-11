import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Article } from '../views/home/home.component';
import { AbstractService } from '../tools/abstract-service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends AbstractService<Article> {
  
  protected ENDPOINT: string = "/664/articles"

}
