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

  async createRecipe(uid: string, recipe: Recipe): Promise<string> {
    const id = this.firestore.createId();

    await this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection(RECIPES_COLLECTION_NAME)
      .doc(id)
      .set({ ...recipe, id });
    return id;
  }

  getRecipe(uid: string, recipeId: string) /* : AngularFire is retarded */ {
    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection<Recipe>(RECIPES_COLLECTION_NAME)
      .doc(recipeId)
      .get();
  }

  getRecipes(uid: string): Observable<QuerySnapshot<Recipe>> {
    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection<Recipe>(RECIPES_COLLECTION_NAME, collection => collection.orderBy("name"))
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

  deleteRecipe(uid: string, recipeId: string): Promise<void> {
    return this.firestore
      .collection(USERS_COLLECTION_NAME)
      .doc(uid)
      .collection(RECIPES_COLLECTION_NAME)
      .doc(recipeId)
      .delete();
  }
}
