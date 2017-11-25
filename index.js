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
        let jewelArr = this.jewel_arr;
        
        
    while(jewelArr.length < 64 ){
        piecesArr.map(function(){ 
            let randomNum = Math.floor(Math.random() * piecesArr.length);                                        
            let tile = piecesArr[randomNum];                            
            let axisArr = [];

            let jewelPiece = {
                'x': x_axis,
                'y' : y_axis,
                'id' : counter , 
                'tile' : tile,
                'info' : $('<div>', {
                    'tile' : tile,
                    'x' : x_axis,
                    'y' : y_axis,
                    'id' : counter
                })
            };

            console.log('tile', tile);
            console.log('jewelPiece', jewelPiece);
            $('.game_grid_container').append(jewelPiece.info.clone());
            axisArr.push(jewelPiece);
            jewelArr.push(axisArr); 
            x_axis++;  
            y_axis++;
            counter++;                               
            })
            return jewelArr;
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
        $('.game_grid_container').on('click','div',function(){
            console.log('click')
            game_board.clicked($(this).attr('x'), $(this).attr('y'), $(this).attr('id'));
        });
        $('.game_grid_container').on('click','.clickable',function(){
            console.log('click')
            game_board.clicked($(this).attr('x'), $(this).attr('y'), $(this).attr('id'));
        });
        $('.game_reset_button').on('click', function(){
            location.reload();
            model.displayStats();
        });
    }

    recieveBoardState(){

    }

    filterMatch(){

    }

    sendBoardUpdate(){

    }

    displayStats(){
        
    }
}

// Model takes the tiles matched from Controller and removes/replaces them. 
// Removes and Replaces Y first and then x
// Also listens to the Board state and runs a check on every x and y axis
// Also in charge of keeping the state of the scores in the game 

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
