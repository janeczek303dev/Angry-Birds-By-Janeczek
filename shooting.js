import { Engine, Phiscis_Obj, Rendering_Engine, phisicsObjects,Phiscis_Tools} from "../engine/newengine.js";
import { mouse } from "./engine/mouseengine.js";
import { shootingPower, maxDistanceFromCatapult } from "./gamesettings.js";
const canvas = document.getElementById("sex");
const ctx = canvas.getContext("2d");

export class Shooter {
    static calculateDistance(x,y){
        let distance = Math.sqrt(Math.pow(x - mouse.x,2) + Math.pow(y - mouse.y, 2));
        return distance;
    }
    static calculatePower(x,y){
        let distance = this.calculateDistance(x,y);
        let pow = shootingPower * distance;
        return pow;
    }
    static calculateDirection(x,y){
        let dir = {
            dx: x - mouse.x,
            dy: y - mouse.y
        };

        let distance = this.calculateDistance(x,y);

        dir.dx = dir.dx/distance;
        dir.dy = dir.dy/distance;

        return dir;    
    }
    static shoot(object,x,y){
        let dir = this.calculateDirection(x,y);
        let pow = this.calculatePower(x,y);
        Phiscis_Tools.addForceAlongNormalisedVector(object,dir.dx,dir.dy,pow);
    }

    static keepUnshot(object,catapult){
        Engine.resetAcceleration(object);
        Engine.resetRotationalAcceleration(object);
        let distance = this.calculateDistance(catapult.x,catapult.y);

        if(distance < maxDistanceFromCatapult){
            object.x = mouse.x;
            object.y = mouse.y;
        
        }
        if(distance >= maxDistanceFromCatapult){
            let dir = this.calculateDirection(catapult.x,catapult.y);
            object.x = catapult.x - dir.dx * maxDistanceFromCatapult;
            object.y = catapult.y - dir.dy * maxDistanceFromCatapult;
        }
        object.avel = 0;
        object.xvel = 0;
        object.yvel = 0;
    }
}