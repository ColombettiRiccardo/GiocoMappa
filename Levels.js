import RawObject from "./RawObject.js";
import Level1 from "./Levels/Level1.js";
import GameArea from "./GameArea.js";

export default class Levels {
    level_width; //Altezza e larghezza dell livello (in tiles)
    level_height;
    tile_width; //Dimensione di ogni tile
    tile_height;
    path;//Mappa dei diversi livelli di tiles
    obstacles;
    details;
    tileMapImage //L'immagine da cui recuperare tutti i tile
    tileMapImgHeight; //Le dimensioni della mappa da cui recupero i tile
    tileMapImageWidth;
    constructor(level_width, level_height, tile_width, tile_height, path, obstacles, details , tileMapsrc, tileMapImgHeight, tileMapImageWidth) {
        this.level_width = level_width;
        this.level_height = level_height;
        this.tile_width = tile_width;
        this.tile_height = tile_height;
        this.path = path;
        this.obstacles = obstacles;
        this.details = details;
        this.tileMapImage = new Image(this.width, this.height);
        this.tileMapImage.src = tileMapsrc;
        this.tileMapImgHeight = tileMapImgHeight;
        this.tileMapImageWidth = tileMapImageWidth;

        //this.pushLayerObstacleVector(obstacles, tile_width, tile_height);
        //this.pushLayerObstacleVector(water, tile_width, tile_height);
    }

    draw(canvasContext) {
        //Disegno l'acqua
       this.drawLayer(this.path, canvasContext);
       this.drawLayer(this.obstacles, canvasContext);
       this.drawLayer(this.details, canvasContext);
    }

    drawLayer(layerMap, canvasContext)
    {
        for (let i = 0; i < layerMap.length; i++) {
            //Ottengo le coordinate sulla canvas
            let dx = (i % this.level_width) * 32;
            let dy = Math.floor(i / this.level_height) * 32;
            let tile = layerMap[i];
            
            //Ottengo le coordinate sulla tilemap
            let sx = ((tile  % (this.tileMapImageWidth/32))-1) * 32;
            let sy = Math.floor(tile / (this.tileMapImgHeight/32)) * 32;

            if (tile != 0) {
                canvasContext.drawImage(this.tileMapImage, sx, sy, this.tile_width, this.tile_height, dx, dy, this.tile_width, this.tile_height);
            }
        }
    }

    pushLayerObstacleVector(layerMap, tile_width, tile_height)
    {
      for (let i = 0; i < layerMap.length; i++) {
        if(layerMap[i] != 0)
        {
            //Ottengo le coordinate sulla canvas
            let dx = (i % this.level_width) * 32;
            let dy = Math.floor(i / this.level_height) * 32;
            
            let obstacle = new RawObject(dx, dy, tile_width, tile_height)
            this.obstaclesVector.push(obstacle);
        }
      }
    }
}