import { Engine, Phiscis_Obj, Rendering_Engine, phisicsObjects } from "../engine/newengine.js";

export const levels_container = [];
export const levels = [];

let container_index = 0;
let unique_ids = [];

class Level {
    constructor(index, obj_index){
        this.index = index;
        this.obj_index = obj_index;

        levels_container[this.index] = this;
    }

}

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

const boundaries = [
    new Level_Obj("floor",0,498,30,1000,false,0,0.1,"Black"),
    new Level_Obj("b",0,-28,30,1000,false,0,0.1,"Black"),
    new Level_Obj("b",-28,0,1000,30,false,0,0.1,"Black"),
    new Level_Obj("b",998,0,1000,30,false,0,0.1,"Black")
];



export function generatePilars(start,vertical, amount, density,height,width,mass,restitution,color){
    let current_level = [];
    let current_pos;
    let first_ite = true;

    for(let i = 0; i<amount; i++){
        if(first_ite){
            let obj = new Level_Obj("pilar",start,vertical,height,width,false,mass,restitution,color);
            first_ite = false;
            current_level.push(obj);
            current_pos = obj.x;
        }
        else{
            let x = current_pos += density;
            let obj = new Level_Obj("pilar",x,vertical,height,width,false,mass,restitution,color);
            current_level.push(obj);
            current_pos = obj.x;
        }
    }
    return current_level;
}

export function generateBuildings(amount,density,height,width,mass,color,target_lvl){
    let objects = [];
    let current_pos =  300 + my_random(-20,20);
    let density_s = 200 + my_random(-40,40);
    let mass_s = 4 + my_random(-1,2);

    for(let i = 0; i < amount; i++){
        let building_base = generatePilars(current_pos, 500-height * 4.5/10, 2, density_s, height * 2/5, width * 4/10, mass_s, 0.1,color);
        console.log("base created");
        for(let obj of building_base){objects.push(obj);}

        let intersection = createMapObject("obj",current_pos,(500 - height * 5.5/10),height * 1/10, density_s + width * 4/10, mass_s,0.1,"red");
        objects.push(intersection);

        let building_floor2 = generatePilars(current_pos,(500-height), 2, density_s, height * 4.5/10, width * 4/10, mass_s, 0.1,color);
        for(let obj of building_floor2){objects.push(obj);}

        let intersection2 = createMapObject("obj",current_pos,(500 - height * 11/10),height * 1/10, density_s + width * 4/10, mass_s,0.1,"red");
        objects.push(intersection2);

        current_pos += density;
    }
    insertIntoExisting(objects,target_lvl)  
}


export function createMapObject(t,x,y,h,w,m,r,c){
    let obj = new Level_Obj(t,x,y,h,w,false,m,r,c);
    return obj;
}


function insertIntoExisting(objects, container_index){
    if (!levels_container[container_index]) {
        createLevel(objects);
        return 0;
    }

    let id = levels_container[container_index].index;

    for(let object of objects){
        levels[id].push(object);
    }
}


function createLevel(objects){
    console.log("started creating lvl");
    let maximum = 30000;
    let minimum = 10;
    
    let id_found = false;
    let found_id;

    while(!id_found){
        let new_id = Math.floor(Math.random() * (maximum - minimum)) + minimum;
        let duplicate = false;
        for(let id of unique_ids){
            if(new_id === id){
                duplicate = true;
                break;
            }
        }
        if(!duplicate){
            id_found = true;
            unique_ids.push(new_id);
            found_id = new_id;
        }
    }

    levels[found_id] = objects;

    new Level(container_index,found_id);

    container_index++;
}

function my_random(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}


export function loadLevel(x) {
    console.log("Loading level...");
    Engine.removePhisicsObjects(true);
    Rendering_Engine.clearTheCanvas();

    if (!levels_container[x]) {
        console.error(`Error: Level at index ${x} does not exist in levels_container.`);
        return;
    }

    let id_to_load = levels_container[x].obj_index;

    if (!levels[id_to_load]) {
        console.error(`Error: Level with id ${id_to_load} does not exist in levels.`);
        return;
    }

    for (let boundary of boundaries) {
        new Phiscis_Obj(boundary.tag, boundary.x, boundary.y, boundary.height, boundary.width, boundary.isInteractable, boundary.mass, boundary.restitution, boundary.color);
    }

    for (let obj of levels[id_to_load]) {
        new Phiscis_Obj(obj.tag, obj.x, obj.y, obj.height, obj.width, obj.isInteractable, obj.mass, obj.restitution, obj.color);
    }
    console.log("Level loaded!");
}