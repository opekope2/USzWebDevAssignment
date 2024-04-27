import { Component, Input, OnInit } from '@angular/core';
import { RecipeManagerService } from '../shared/services/recipe-manager.service';
import { AuthService } from '../shared/services/auth.service';
import { Observable, filter, map, switchMap } from 'rxjs';
import { Recipe } from '../shared/data/recipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent implements OnInit {
  @Input() recipeId?: string;

  recipe$?: Observable<Recipe>;

  constructor(private recipeManagerService: RecipeManagerService, private authService: AuthService) { }

  ngOnInit() {
    this.recipe$ = this.authService.currentUser$.pipe(
      filter(Boolean),
      switchMap(user => this.recipeManagerService.getRecipe(user.uid, this.recipeId!)),
      filter(doc => doc.exists),
      map(document => document.data()!),
    )
  }

  editRecipe() {

  }

  deleteRecipe() {

  }
}
