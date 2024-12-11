import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../tools/abstract-form/abstract-form.component';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent extends AbstractFormComponent {

  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0, {validators: [Validators.required]}),
    src: new FormControl(''),
    alt: new FormControl('', {validators: [Validators.required]}),
    titre: new FormControl('', {validators: [Validators.required]}),
    description: new FormControl('', {validators: [Validators.required]})
  })

  constructor(private service: ArticleService, private router: Router, route: ActivatedRoute) {
    super()
    //plus besoin car dans app.routesdirectement (dans le resolve)
    // route.paramMap.subscribe(param => {
    //   const id: number = + param.get('id')!
    //   if(id) service.byId(id).subscribe({
    //     next: result => this.form.patchValue(result),
    //     complete: () => console.log("Fin des appels"),
    //     error: e => router.navigate(['/editor/0'])
    //   })
    // })

    route.data.subscribe(({ article }) => {
      if (article) this.form.patchValue(article)
      else this.form.reset({
        id: 0,
      })
    })
  }

  onSubmit$(): void {
    if (this.form.value.id) {
      this.service.update(this.form.value).subscribe(() => this.router.navigate(['/home']))
    }
    else {
      this.service.save(this.form.value).subscribe(() => this.router.navigate(['/home']))
    }
  }
}
