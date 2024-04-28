import { Component, Input, OnInit } from '@angular/core';
import { RecipeManagerService } from '../shared/services/recipe-manager.service';
import { AuthService } from '../shared/services/auth.service';
import { Observable, filter, from, map, switchMap, take } from 'rxjs';
import { Recipe } from '../shared/data/recipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { TranslateService } from '../shared/services/translate.service';
import { DialogService } from '../shared/services/dialog.service';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent implements OnInit {
  @Input() recipeId?: string;

  recipe$?: Observable<Recipe>;

  constructor(
    private recipeManagerService: RecipeManagerService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.recipe$ = this.authService.currentUser$.pipe(
      take(1),
      filter(Boolean),
      switchMap(user => this.recipeManagerService.getRecipe(user.uid, this.recipeId!)),
      filter(doc => doc.exists),
      map(document => document.data()!),
    )
  }

  deleteRecipe() {
    this.dialogService.confirm(
      this.translateService.translate("DeleteRecipe"),
      this.translateService.translate("ConfirmDeleteRecipe")
    ).pipe(
      take(1),
      filter(Boolean),
      switchMap(() => this.authService.currentUser$),
      filter(Boolean),
      switchMap(user => this.recipeManagerService.deleteRecipe(user.uid, this.recipeId!)),
    ).subscribe(() => {
      this.snackBar.open(this.translateService.translate("RecipeDeleted"), undefined, { duration: 4000 });
      this.router.navigate(["recipe"]);
    });
  }
}
