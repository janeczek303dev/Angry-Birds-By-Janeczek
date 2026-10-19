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
class Pig_obj {
    constructor(x,y,mass,restitution,color){
        this.tag = "pig";
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.isInteractable = false;
        this.mass = mass;
        this.restitution = restitution;
        this.color = color;
    }
}

export const levels = [];
export const pigs = [];


export function loadLevel(x){
    console.log("Loading level...");
    Engine.removePhisicsObjects(true);
    Rendering_Engine.clearTheCanvas();
    for(let boundary of boundaries){
        new Phiscis_Obj(boundary.tag,boundary.x,boundary.y,boundary.height,boundary.width,boundary.isInteractable,boundary.mass,boundary.restitution,boundary.color);
    }
    for(let object of levels[x]){
        new Phiscis_Obj(object.tag,object.x,object.y,object.height,object.width,object.isInteractable,object.mass,object.restitution,object.color);
    }
    for(let pig of pigs[x]){
        new Phiscis_Obj(pig.tag,pig.x,pig.y,pig.height,pig.width,pig.isInteractable,pig.mass,pig.restitution,pig.color);
    }
    console.log("Level loaded!");
}

let pigs_level_1 = [
    //enew Pig_obj(740,40,2,0.7, "Green"),
    new Pig_obj(740,0,0.5,0.9,"Green")
];

const boundaries = [
    new Level_Obj("floor",0,498,30,1000,false,0,0.1,"Black"),
    new Level_Obj("b",0,-28,30,1000,false,0,0.1,"Black"),
    new Level_Obj("b",-28,0,1000,30,false,0,0.1,"Black"),
    new Level_Obj("b",998,0,1000,30,false,0,0.1,"Black")
];
let level1 = [
    new Level_Obj("lev",800,300,200,50,false,1,0.1, "#895129"),
    new Level_Obj("lev",650,300,200,50,false,1,0.1, "#895129"),
    new Level_Obj("lev",650,300,30,220,false,0.5,0.1, "#895129"),
    new Level_Obj("lev",700,140,100,30,false,0.2,0.1, "#895129"),
    new Level_Obj("lev",800,140,100,30,false,0.2,0.1, "#895129"),
    new Level_Obj("lev",700,110,30,130,false,0.2,0.1, "#895129"),
    
];
let level2 = [
    new Level_Obj("lev",300,300,20,100,false,3,0.05, "red"),
];
levels.push(level1,level2);
pigs.push(pigs_level_1);