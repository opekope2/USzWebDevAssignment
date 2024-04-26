import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
    name: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
};
