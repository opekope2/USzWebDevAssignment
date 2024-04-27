import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
    id?: string;
    name: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
};
