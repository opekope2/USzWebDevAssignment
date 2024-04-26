import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { RecipeManagerService } from '../shared/services/recipe-manager.service';
import { Observable, filter, map, switchMap } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Recipe } from '../shared/data/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {
  recipes$?: Observable<QueryDocumentSnapshot<Recipe>[]>;

  constructor(private recipeManagerService: RecipeManagerService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.recipes$ = this.authService.currentUser$.pipe(
      filter(Boolean),
      switchMap(user => this.recipeManagerService.getRecipes(user.uid)),
      map(snapshot => snapshot.docs),
    )
  }

  createRecipe() {

  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(["login"]);
  }
}
