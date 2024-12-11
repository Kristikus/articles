import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Article } from '../home.component';
import { ArticleService } from '../../../services/article.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input({ required: true }) article!: Article
  @Output() articleDeleted: EventEmitter<never> = new EventEmitter<never>()
  
  service: ArticleService = inject(ArticleService)

  delete() {
    this.service.delete(this.article.id).subscribe(() => {
      this.articleDeleted.emit()
    })
  }
}
