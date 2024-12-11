import { Component, inject } from '@angular/core';
import { ArticleComponent } from "./article/article.component";
import { ArticleService } from '../../services/article.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  auth: AuthService = inject(AuthService)

  // articles: Observable<Article[]>
  // constructor(service: ArticleService) {
  //   this.articles = service.all()
  // }

  protected service = inject(ArticleService)
  private route = inject(ActivatedRoute)
  data = this.route.data
    .pipe(
      map(({articles}) => articles)
    )
}

export interface Article {
  id: number;
  src?: string;
  alt: string;
  titre: string;
  description: string;
}