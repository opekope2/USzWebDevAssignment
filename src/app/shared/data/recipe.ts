import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
    id?: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    instructions: Instruction[];
};
