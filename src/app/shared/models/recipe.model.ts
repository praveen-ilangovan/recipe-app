import { Ingredient } from './ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[] = [];
    public id: string;
    public updated: boolean = false;

    constructor(name: string, desc: string, imagePath: string, ingredients?: Ingredient[], id?: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        if (ingredients)
            this.ingredients = ingredients;
        else
            this.ingredients = [];
        this.id = id;
        this.updated = false;
    }
}
