//Created by Soy on 11/24/17
//DOM event that would replace jquery
// Document.addEventListener('onload',init());
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

// Board randomly generates pieces and sends the most current state of the board to Controller 
// Board receives the updated state of the board from the Model 
class Board {
    constructor(){
        this.jewel_arr = [ ];
        this.pieces_arr = ['blue-diamond-tile','compass-tile','flower-tile', 'pink-diamond-tile', 'purple-pentagon-tile','red-flower-tile','star-tile','yellow-diamond-tile']; 
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

// Controller listens for clicks (2) moves
// first click: picks up the div id of the selected div and instantiates 'clickable divs'
// 'clickable divs' -- checks if the second click matches any of the four directions 
// and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process 
/** this is the outline of the boardState or how it should be
    this.boardState = {
     this.first_click = null;
     this.second_click = null;
     this.correctTiles = [
        north:takes the y axis of tile clicked and +1,
        south:takes the y axis of tile clicked and -1,
        east:takes the x axis of tile clicked and -1,
        west:takes the x axis of tile clicked and +1,
     ]

    }
 */

class Controller extends Board {
    constructor(){
        super(constructor);
        this.boardState = {
            first_click : null,
            second_click : null,
            correctTiles : this.correctTiles = {
               north:function (first_click,northTile) {return first_click/** this returns position of the tile north of the first click **/},
               south:function(first_click, southTile) {return first_click/** this returns position of the tile south of the first click **/},
               east:function(first_click, eastTile) {return first_click/** this returns position of the tile east of the first click **/},
               west:function(first_click, westTile) {return first_click/** this returns position of the tile wast of the first click **/},
            } 
        };  
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
        let user_input = event.target.outerHTML;        
        console.log('user_input', user_input);

        //if var first_click is empty assign user_input to the first click 
        Board.boardState['first_click'] === null ? Board.boardState['first_click'] = user_input : Board.boardState['second_click'] = user_input ;
            console.log('first_click', Board.boardState['first_click'] );
        //if se
        // this.second_click === null ? this.second_click = this.user_input : 'something inside second click';
            console.log('second_click', Board.boardState['second_click']);       
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

class Model extends Controller {
    constructor(){
        super(constructor);
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