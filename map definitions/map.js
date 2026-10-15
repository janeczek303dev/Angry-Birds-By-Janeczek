import { Engine, Phiscis_Obj, Rendering_Engine, phisicsObjects } from "../engine/newengine.js";

class Level_Obj {
    constructor(tag,x,y,height,width,isInteractable,mass,restitution,color){
        this.tag = tag;
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
        new Phiscis_Obj(boundary.tag,boundary.x,boundary.y,boundary.height,boundary.width,boundary.isInteractable,boundary.mass,boundary.restitution,boundary.color);
    }
    for(let object of level){
        new Phiscis_Obj(object.tag,object.x,object.y,object.height,object.width,object.isInteractable,object.mass,object.restitution,object.color);
    }
    console.log("Level loaded!");
}




const boundaries = [
    new Level_Obj("floor",0,498,30,1000,false,0,0.1,"Black"),
    new Level_Obj("b",0,-28,30,1000,false,0,0.1,"Black"),
    new Level_Obj("b",-28,0,1000,30,false,0,0.1,"Black"),
    new Level_Obj("b",998,0,1000,30,false,0,0.1,"Black")
];
let level1 = [
    new Level_Obj("lev",800,300,200,30,false,1,0, "#895129"),
    new Level_Obj("lev",700,300,200,30,false,1,0, "#895129"),
    new Level_Obj("lev",700,300,30,130,false,1,0, "#895129"),
    new Level_Obj("lev",700,70,200,30,false,1,0, "#895129"),
    new Level_Obj("lev",800,70,200,30,false,1,0, "#895129"),
    new Level_Obj("lev",700,30,30,130,false,1,0, "#895129"),
    
];
let level2 = [
    new Level_Obj("lev",300,300,20,100,false,3,0.05, "red"),
];
levels.push(level1,level2);