import { Engine, Phiscis_Obj, Rendering_Engine, phisicsObjects } from "../engine/newengine.js";

class Level_Obj {
    constructor(x,y,height,width,isInteractable,mass,restitution,color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.isInteractable = isInteractable;
        this.mass = mass;
        this.restitution = restitution;
        this.color = color;
    }
}

export const levels = [];

export function loadLevel(level){
    console.log("Loading level...");
    Engine.removePhisicsObjects(true);
    Rendering_Engine.clearTheCanvas();
    for(let boundary of boundaries){
        new Phiscis_Obj(boundary.x,boundary.y,boundary.height,boundary.width,boundary.isInteractable,boundary.mass,boundary.restitution,boundary.color);
    }
    for(let object of level){
        new Phiscis_Obj(object.x,object.y,object.height,object.width,object.isInteractable,object.mass,object.restitution,object.color);
    }
    console.log("Level loaded!");
}




const boundaries = [
    new Level_Obj(0,498,30,1000,false,0,0.1,"Black"),
    new Level_Obj(0,-28,30,1000,false,0,0.1,"Black"),
    new Level_Obj(-28,0,1000,30,false,0,0.1,"Black"),
    new Level_Obj(998,0,1000,30,false,0,0.1,"Black")
];
let level1 = [
    new Level_Obj(800,300,200,30,false,5,0, "#895129"),
    new Level_Obj(700,300,200,30,false,5,0, "#895129"),
    new Level_Obj(700,300,30,130,false,3,0, "#895129"),
    new Level_Obj(700,70,200,30,false,2,0, "#895129"),
    new Level_Obj(800,70,200,30,false,2,0, "#895129"),
    new Level_Obj(700,30,30,130,false,3,0, "#895129"),
    
];
let level2 = [
    new Level_Obj(300,300,20,100,false,3,0.05, "red"),
];
levels.push(level1,level2);