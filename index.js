// $(document).ready(init);
// function init(){
//     board = new Board();
//     controller = new Controller();
//     model = new Model();
//     console.log('init and things are made');
// }
//moving away from jquery
document.addEventListener('onload',init());

function init() {
// Board randomly generates pieces. 
// Board sends the most current state of the board to Controller 
// Board receives the updated state of the board from the Model 
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

        // let containerDiv = document.documentElement.getElementsById('gameTile');
        let containerDiv = document.documentElement.getElementsByClassName('grid-div')
        console.log('containerDiv:', containerDiv);
        let game_grid = document.documentElement.querySelectorAll('.game_grid_container');
        console.log('game_grid:',game_grid);
        while(jewelArr.length < 64 ){
            piecesArr.map(function(){ 
                let randomNum = Math.floor(Math.random() * piecesArr.length);                                        
                let tile = piecesArr[randomNum];                            
                let axisArr = [];                
                let jewelPiece = {
                    'x': x_axis,
                    'y' : y_axis,
                    'id' : counter , 
                    'tile' : piecesArr[randomNum],
                    'class': piecesArr[randomNum],
                    'info' : {
                        'tile' : piecesArr[randomNum],
                        'x' : x_axis,
                        'y' : y_axis,
                        'id' : counter
                    }
                };
                console.log('jewelPiece:', jewelPiece);
                let newDiv  = document.createElement('div',tile);
                // let jewelClone = Object.assign(newDiv, jewelPiece);
                console.log('newDiv:',newDiv);
                // let newDiv = document.createElement(jewelClone);
                // console.log('newDiv:',newDiv);
                document.body.insertBefore(newDiv,containerDiv);
                // $('.game_grid_container').append(jewelPiece.info.clone());
                axisArr.push(jewelPiece);
                jewelArr.push(axisArr); 
                x_axis++;  
                y_axis++;
                counter++;                               
            }) 
        }
        let board_state = [...jewelArr];
        this.sendControllerBoardState(board_state);        

    }

    displayBoard(){
        
    }

    sendControllerBoardState(board_state){
        //if there is something in the jewelArr -- send this to controller state
        let boardState = [...board_state];
        boardState !== null ? Controller.boardState = board_state : 'error';
        console.log('Controller.boardState:',Controller.boardState);
    }


}

// Controller listens for clicks (2) moves and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process 
class Controller {
    constructor(){
        this.clickHandlers();
        this.first_click = null;
        this.second_click = null;
        this.boardState = [];
        
    }
    
    clickHandlers(){
        // $('.game_grid_container').on('click','div',function(){
        //     console.log('click')
        //     board.clicked($(this).attr('x'), $(this).attr('y'), $(this).attr('id'));
        // });
        // $('.game_reset_button').on('click', function(){
        //     location.reload();
        //     model.displayStats();
        // });
    }

    receiveBoardState(){

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

    receiveControllerState(){

    }

    removeReplaceState(){

    }

    sendNewBoard(){

    }

}

let board = this.board = new Board;
let controller = this.controller = new Controller;
let model = this.model = new Model;

console.log('init and things are made');

};