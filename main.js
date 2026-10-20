
//REQUIRED BY THE ENGINE/////////////////////////////////////////////////////
import { Engine, Phiscis_Obj, Rendering_Engine, Phiscis_Tools, phisicsObjects, keys , GlobalContactPoints} from "./engine/newengine.js";
import { gravity_values, groundFriction, airResistacce, moveForce } from "./engine/settings.js";
import { mouse } from "./engine/mouseengine.js";
import { loadLevel, levels, generatePilars } from "./map%20definitions/map.js";
import { Shooter } from "./shooting.js";
import * as gameSettings from "./gamesettings.js";
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
//////////////////////////
let bird;
let birdData = {
    shot: false
};

let catapult = {
    x: 200,
    y: 350
};

let levelLoaded = false;
let launchPending = false;


document.addEventListener("keydown", function(event) {
    keys[event.key] = true;

    if(event.key === "e"){
        generatePilars(300, 8, 40, 300, 20, 10, 0.5, "red");
        loadLevel(0);
        bird = spawnPlayer(gameSettings.h,gameSettings.w,gameSettings.m,gameSettings.r,gameSettings.c);
        birdData.shot = false;
        launchPending = false;
        levelLoaded = true;
    }
});

canvas.addEventListener("click", function() {
    if(!levelLoaded || !bird || birdData.shot){
        return;
    }

    launchPending = true;
    birdData.shot = true;
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

    if(launchPending && bird){
        Shooter.shoot(bird,catapult.x,catapult.y);
        launchPending = false;
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
            Engine.resolveCollisionForPoints(A, B,dt);
            
        }
    }


    Engine.collisionResponse(GlobalContactPoints);
    Engine.clearGlobalPoints();
    
    

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
    if(!birdData.shot && levelLoaded){
        Shooter.keepUnshot(bird,catapult);
    }
    
}

function spawnPlayer(h,w,m,r,c){
    let pl = new Phiscis_Obj("cat",catapult.x,catapult.y,h,w,false,m,r,c);
    return pl;
}

start();