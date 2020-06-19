import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { SingleArticleComponent } from './single-article/single-article.component';

const routes: Routes = [
    {
        path: '',
        component: ArticleComponent
    },
    {
      path: 'edit/:id',
      component: SingleArticleComponent
    },
    {
      path: 'new',
      component: SingleArticleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule {}
