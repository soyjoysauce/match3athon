$(document).ready(init);

function init(){
    board = new Board();
    constroller = new Controller();
    model = new Model();
    console.log('init and things are made');
}

// Board randomly generates pieces. 
// Board sends the most current state of the board to Controller 
// Board recieves the updated state of the board from the Model 
class Board {
    constructor(){
        this.jewel_arr = [];
        this.pieces_arr = ['blue-diamond-tile','compass-tile','flower-tile', 'pink-diamond-tile', 'purple-pentagon-tile','red-flower-tile','star-tile','yellow-diamond-tile'];
        this.createPieces();
    }

    createPieces(){
        let x_axis = 0;
        let y_axis = 0;
        let tile = null;        
        let counter = 1;
        let piecesArr = this.pieces_arr;
        this.randomNum = Math.floor(Math.random() * this.pieces_arr.length);        
        
        this.jewelPiece = {
            x: x_axis,
            y : y_axis,
            id : counter , 
            tile : tile,
            info : $('<div>', {
                tile: tile,
                x: x_axis,
                y: y_axis,
                id: counter
            })
        };

        while(this.jewel_arr.length < 64 ){
            let item = piecesArr[this.randomNum]            
            piecesArr.forEach(function(item,jewelPiece){ 
                let axisArr = [];
                console.log('item', item);
                this.jewelPiece.attr(tile) = item ;
                $('.game_grid_container').append(this.jewelPiece.info.clone());
                axisArr.push(this.jewelPiece);
                this.jewel_arr.push(axisArr); 
                x_axis++;  
                y_axis++;
                counter++;                               
             })
        }        
    }

    displayBoard(){
        
    }

    sendControllerBoardState(){

    }


}

// Controller listens for clicks (2) moves and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process 
class Controller {
    constructor(){
        this.clickHandlers();
        this.first_click = null;
        this.second_click = null;
    }
    
    clickHandlers(){

    }

    recieveBoardState(){

    }

    filterMatch(){

    }

    sendBoardUpdate(){

    }
}

// Model takes the tiles matched from Controller and removes/replaces them. 
// Removes and Replaces Y first and then x
// Also listens to the Board state and runs a check on every x and y axis
class Model {
    constructor(){
        this.board_update= [];
        this.updated_board = [];

    }

    recieveControllerState(){

    }

    removeReplaceState(){

    }

    sendNewBoard(){

    }

}

let board = null;
let controller = null;
let model = null; 
