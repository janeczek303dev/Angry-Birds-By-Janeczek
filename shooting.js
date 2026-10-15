import { Engine, Phiscis_Obj, Rendering_Engine, phisicsObjects,Phiscis_Tools} from "../engine/newengine.js";
import { mouse } from "./engine/mouseengine.js";
import { shootingPower } from "./gamesettings.js";
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
        Phiscis_Tools.addForceAlongNormalisedVector(object,dir.x,dir.y,pow);
    }
}