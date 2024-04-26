import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Recipe } from '../data/recipe';
import { RECIPES_COLLECTION_NAME, USERS_COLLECTION_NAME } from '../consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeManagerService {
  constructor(private firestore: AngularFirestore) { }

  createRecipe(uid: string, recipe: Recipe): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection(RECIPES_COLLECTION_NAME)
      .doc(id)
      .set({ ...recipe, id });
  }

  getRecipes(uid: string): Observable<QuerySnapshot<Recipe>> {
    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection<Recipe>(RECIPES_COLLECTION_NAME)
      .get();
  }

  updateRecipe(uid: string, recipe: Recipe): Promise<void> {
    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection<Recipe>(RECIPES_COLLECTION_NAME)
      .doc(recipe.id)
      .set(recipe);
  }

  deleteRecipe(uid: string, recipe: Recipe): Promise<void> {
    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection(RECIPES_COLLECTION_NAME)
      .doc(recipe.id)
      .delete();
  }
}
