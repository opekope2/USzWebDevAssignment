import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../shared/services/auth.service';
import { RecipeManagerService } from '../shared/services/recipe-manager.service';
import { filter, from, map, switchMap } from 'rxjs';
import { Ingredient } from '../shared/data/ingredient';
import { Instruction } from '../shared/data/instruction';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe } from '../shared/data/recipe';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss'
})
export class EditRecipeComponent implements OnInit {
  @Input() recipeId?: string;

  recipe?: Recipe;

  addIngredientForm = new FormGroup({
    amount: new FormControl(0),
    unit: new FormControl(""),
    ingredient: new FormControl(""),
  });
  addInstructionControl = new FormControl("");

  constructor(private authService: AuthService, private recipeManagerService: RecipeManagerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const subscription = this.authService.currentUser$.pipe(
      filter(Boolean),
      switchMap(user => this.recipeManagerService.getRecipe(user.uid, this.recipeId!)),
      filter(doc => doc.exists),
      map(document => document.data()!),
    ).subscribe(recipe => {
      this.recipe = recipe;
      subscription.unsubscribe();
    });
  }

  addIngredient() {
    const { amount, unit, ingredient } = this.addIngredientForm.value;

    this.recipe?.ingredients?.push({
      amount: amount!,
      unit: unit!,
      ingredient: ingredient!
    });

    this.addIngredientForm.setValue({
      amount: 0,
      unit: "",
      ingredient: ""
    })
  }

  removeIngredientAt(index: number) {
    this.recipe?.ingredients?.splice(index, 1);
  }

  addInstruction() {
    const instruction = this.addInstructionControl.value;

    this.recipe?.instructions?.push({
      instruction: instruction!
    });

    this.addInstructionControl.setValue("");
  }

  removeInstructionAt(index: number) {
    this.recipe?.instructions?.splice(index, 1);
  }

  save() {
    const subscription = this.authService.currentUser$.pipe(
      filter(Boolean),
      switchMap(user => from(this.recipeManagerService.updateRecipe(user.uid, this.recipe!))),
    ).subscribe(() => {
      subscription.unsubscribe();
      alert("Saved successfully");
      this.router.navigate([".."], { relativeTo: this.route });
    });
  }
}
