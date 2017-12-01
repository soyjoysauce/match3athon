
//moving away from jquery
// Document.addEventListener('onload',init());

// Board randomly generates pieces. 
// Board sends the most current state of the board to Controller 
// Board receives the updated state of the board from the Model 
class Board {
    constructor(){
        this.jewel_arr = [ ];
        this.pieces_arr = ['blue-diamond-tile','compass-tile','flower-tile', 'pink-diamond-tile', 'purple-pentagon-tile','red-flower-tile','star-tile','yellow-diamond-tile'];
        this.boardState = []; 
        this.createTile();
    }
 
    createTile(){
        let piecesArr = this.pieces_arr;
        let jewelArr = this.jewel_arr;
        let x_axis = 0;
        let y_axis = 0;
        let counter = 1;
        
        while(jewelArr.length < 8 ){ 
            let axis_arr = [ ];
            
            piecesArr.map(function(){ 
                let randomNum = Math.floor(Math.random() * piecesArr.length);                                                    
                let jewelPiece = {
                    'x': x_axis,
                    'y' : y_axis,
                    'id' : counter , 
                    'tile' : piecesArr[randomNum],
                    'info' : $('<div>', {
                        tile : piecesArr[randomNum],
                        x : x_axis,
                        y : y_axis,
                        id : counter
                    })
                };
                $('.game_grid_container').append(jewelPiece.info.clone());                
                axis_arr.push(jewelPiece);
                console.log('jewelPiece:', jewelPiece);
                console.log('axis_arr:',axis_arr);
                x_axis++;  
                y_axis++;
                counter++;   
            })     
            jewelArr.push(axis_arr);
            console.log('axis_arr',axis_arr); 
            console.log('jewelArr',jewelArr);           
        }
        // console.log('xAxis',xAxis);
        let board_state = jewelArr;
        console.log('board_state',board_state);
        this.sendControllerBoardState(board_state);
    }


    sendControllerBoardState(board_state){
        //if there is something in the jewelArr -- send this to controller state
        this.boardState = board_state;
        console.log('boardState:',this.boardState);
        // boardState !== null ? Controller.boardState = board_state : 'error';
        // console.log('Controller.boardState:',Controller.boardState);
    }

    


}

// Controller listens for clicks (2) moves and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process 
class Controller {
    constructor(){
        this.first_click = null;
        this.second_click = null;
        this.boardState = [];
        this.applyClickHandlers(); 
    }

    applyClickHandlers(){
        $('.game_grid_container').on('click','div',this.moveTile.bind(this));
            
        //   $(this).attr('x'), $(this).attr('y'), $(this).attr('id').bind(this);
        //   console.log('this',this);
       
        $('.game_reset_button').on('click', function(){
            location.reload();
            Model.displayStats();
        });
    }
    
    moveTile(){
        this.user_input = event.target.outerHTML;        
        console.log('moveTile Clicked');
        console.log('user_input',user_input);
        let firstClick = null;
        let secondClick = null;
        console.log('1firstClick',firstClick);
        console.log('1secondClick',secondClick);      
        // console.log('this.first_click:',this.first_click);
        // console.log('this.second_click:',this.second_click);
        this.first_click === null ? this.user_input = firstClick : this.user_input = secondClick ;
        console.log('this.user',this.user_input);
        console.log('2firstClick',firstClick);
        console.log('2secondClick',secondClick);        
    }

    receiveAndRenderBoardState(){

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

// let board = null;
// let controller = null;
// let model = null;



$(document).ready(function(){
    
   const jewelTileGame = {
       board : new Board(),
       controller :  new Controller(),
       model : new Model(),
   }
   const {board,controller,model} = jewelTileGame;
   $(jewelTileGame).bind(this);
   console.log('jewelTileGame:', jewelTileGame);
   console.log('init and things are made');
});