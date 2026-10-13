
//REQUIRED BY THE ENGINE/////////////////////////////////////////////////////
import { Engine, Phiscis_Obj, Rendering_Engine, Phiscis_Tools, phisicsObjects, keys } from "./engine/newengine.js";
import { gravity_values, groundFriction, airResistacce, moveForce } from "./engine/settings.js";
import { mouse } from "./engine/mouseengine.js";
const canvas = document.getElementById("sex");
const ctx = canvas.getContext("2d");
ctx.fillStyle='Black';
// Frame timing
let lastTime = 0;
let deltaTime = 0;
let gameTime = 0;
// Physics timing
const fixedDeltaTime = 1 / 60;
let physicsAccumulator = 0;
//BOUNDARIES OF THE CANVAS
const floor_obj = new Phiscis_Obj(0,498,30,1000,false,0,0.1,"Black");
const roof_obj = new Phiscis_Obj(0,-28,30,1000,false,0,0.1,"Black");
const left_wall_obj = new Phiscis_Obj(-28,0,1000,30,false,0,0.1,"Black");
const right_wall_obj = new Phiscis_Obj(998,0,1000,30,false,0,0.1,"Black");

//////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

function start() {
    requestAnimationFrame(gameLoop);

    //calculates the invmass
    for(let object of phisicsObjects){
        if(object.mass != 0){
            object.invmass = 1/object.mass;
        }
        else{
            object.invmass = 0;
        }
        
    }
}

//delta time system
function gameLoop(currentTime) { 


    // Convert milliseconds to seconds
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Prevent huge time jumps
    if (deltaTime > 0.1) {
        deltaTime = 0.1;
    }

    gameTime += deltaTime;

    // Add frame time to physics accumulator
    physicsAccumulator += deltaTime;

    // Run physics at a fixed 60 FPS
    while (physicsAccumulator >= fixedDeltaTime) {

        fixedUpdate(fixedDeltaTime);

        physicsAccumulator -= fixedDeltaTime;
    }

    // Normal game update
    update(deltaTime);

    // Render
    Rendering_Engine.draw();

    requestAnimationFrame(gameLoop);
}


function fixedUpdate(dt) {

    for(let object of phisicsObjects){
        //PHASE 1: preparation of all the data slay
        Engine.getPivot(object);
        Engine.calculateMomentOfInteria(object);
        Engine.getRotatedCorners(object);
        Engine.getEdges(object);
        Engine.getAxes(object);
        Engine.resetAcceleration(object);
        Engine.resetRotationalAcceleration(object);
    }


    for(let object of phisicsObjects){
        //PHASE 2: apply forces bitch
        Engine.gravity(object,gravity_values);
        Engine.friction(object,groundFriction,airResistacce,dt);
    }


    for(let object of phisicsObjects){
    //     Phase 2.5: player movement
        if(object.isInteractable){
            Engine.issiueMovement(object,moveForce);
        }
    }


    for(let object of phisicsObjects){
        //phase 3: calculations and stuff
        Engine.calculateRotationalAcceleration(object);
        Engine.calculateRotationalVelocity(object, dt);
        Engine.calculateVelocity(object,dt);
    }



    //PHASE 4: collisions
    for (let i = 0; i < phisicsObjects.length; i++) {

        for (let j = i + 1; j < phisicsObjects.length; j++) {
            
            let A = phisicsObjects[i];
            let B = phisicsObjects[j];
            Engine.resolveCollision(A, B);
        }
    }
    
    

    for(let object of phisicsObjects){
        //Phase 5: Move shit around
        Engine.doRotation(object,dt);
        Engine.moveObject(object,dt);
    }


    for(let object of phisicsObjects){
        //Phase 6: cleanUp
        Engine.avoidSmallNums(object);
    }
    
}


function update(dt) {

}

start();