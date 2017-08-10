/**
 * Created by Chris on 8/9/17.
 */
$(document).ready(init);

function init() {
    controller = new Controller();
}

function Controller() {//click handlers for each piece that is clicked on
    this.game_board = new Game_board(this);
    this.model = new Model(this)

    this.game_board.create_pieces(16, 'blue_diamond');

    $('body > *').on('click',function(){
        game_board.clicked($(this).attr('x'), $(this).attr('y'));
    });
}

function Game_board(parent) {
    this.parent = parent;
    var first_click = null;
    var second_click = null;
    var x_cord = 0;
    var first_attr = null;
    var second_attr = null;
    var second_click_x = null;
    var second_click_y = null;
    var first_click_x = null;
    var first_click_y = null;
    this.jewel_arr = [];
    this.create_pieces = function (num,piece_class) {//creation of the pieces
        for (var i = 0; i < num; i += 4) {//first loop changes the x coordinates increments adds four to complete total number of requested pieces
            var multi_arr = [];//creation of the multi-array that holds the coordinates of each piece, created at the start of each the outer loop
            for(var j = 0; j < 4;j++ ) {//creation of the the inner multi-array objects
                this.jewel_piece = {
                    x: x_cord,
                    y: j,
                    color: 'white',//color is how we'll determine what piece to place on the board
                    info: $('<div>', {//class to add along with the x and y attributes for each dom element creating
                        class: piece_class,
                        x: x_cord,
                        y: j
                    }),
                    jewel_piece_img: $('<img>', {//test image I'm using to visualize the board, delete later
                        src: 'https://webadictos.com/media/2010/11/bejeweled-3.png'
                    })
                };
                $(this.jewel_piece.info).append(this.jewel_piece.jewel_piece_img);//append the image to the dom elements just for my visuals
                $('body').append(this.jewel_piece.info.clone());//actual appending of the dom element to the html body
                multi_arr.push(this.jewel_piece);//each iteration of the inner loop pushes the value to the inner array

            } this.jewel_arr.push(multi_arr);
            x_cord++;
        }
        this.piece_fill();

    };

    this.clicked = function(x,y) {//click handler function when the player clicks on a piece, passed the x and y values of the piece clicked
        debugger;
        if(first_click === null) {//assigns the first click x and y coordinates of the piece that was clicked
            first_click_x = x;
            first_click_y = y;
            first_attr = this.jewel_arr[x][y].color;
            first_click = this.jewel_arr[x][y];//saves the color attribute for the first piece for the sway
            this.off_click(x,y);
            console.log(this.jewel_arr[x][y].color)
            return
        } else {//assigns the second click x and y coordinates of the piece that was clicked
            second_click_x = x;
            second_click_y = y;
            second_attr = this.jewel_arr[x][y].color;//saves the color attribute for the second for the sway
            second_click = this.jewel_arr[x][y];
            $('body > .game_pieces').removeClass('clickable');//.game_pieces is a place holder class, removes the clickable feature of surronding pieces
        }
        //after the two clicks and happen this switches the color attribute which we'll tie to the board pieces
        this.jewel_arr[second_click_x][second_click_y].color = first_attr;
        this.jewel_arr[first_click_x][first_click_y].color = second_attr;


        //send the board state to shane which is the array!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.jewel_arr = this.parent.model.receiveStateSendState(first_click, second_click, this.jewel_arr);

    };

    this.off_click = function(x,y) {//this turns the click handler off all pieces and turns them on just for the adjacent pieces
        $('body > *').off('click');
        var selectx = "[x='" + x + "']";//baseline for where to start on the x coordinate for the pieces
        var selecty = "[y='" + y + "']";//baseline for where to start on the y coordinate for the pieces
        var select_up = "[x='" + (parseInt(x) - 1) + "']";//move up 1 spot to select the piece above
        var select_right = "[y='" + (parseInt(y) + 1) + "']";//move right 1 spot to select the piece above
        var select_down = "[x='" + (parseInt(x) + 1) + "']";//move down 1 spot to select the piece above
        var select_left = "[y='" + (parseInt(y) - 1) + "']";//move left 1 spot to select the piece above
        $(selectx).filter(select_right).addClass('clickable');//add click handler to right piece
        $(selectx).filter(select_left).addClass('clickable');//add click handler to left piece
        $(select_up).filter(selecty).addClass('clickable');//add click handler to piece above
        $(select_down).filter(selecty).addClass('clickable');//add click handler to piece below
    }

    this.piece_fill = function() {
        this.jewel_arr[3][0].color = null;
        this.jewel_arr[0][2].color = null;
        this.jewel_arr[1][3].color = null;
        this.jewel_arr[2][3].color = null;
        this.jewel_arr[3][3].color = null;
        debugger;
        for (var i = 3; i >= 0; i--) {
            for(var j = 3; j >= 0; j--) {
                if(this.jewel_arr[i][j].color === null) {
                    if(i === 0) {
                        this.jewel_arr[i][j].color = 'yellow';

                        return this.piece_fill()
                    }else {
                        this.jewel_arr[i][j].color = this.jewel_arr[i + 1][j];
                        return this.piece_fill()
                    }

                }
            }
        }
    }
}

var game_board = null;
var controller = null;





//BEGIN EVALUATION OF BOARD AREA INSIDE OF THIS SPACE BELOW THIS SPOT I AM HERE
function Model(parent){
    this.parent = parent;

//takes in a board state and the pieces acted upon by the player and sends the info to the evaluation portion
    this.receiveStateSendState = function(piece1, piece2, board){
        this.evaluateMove(piece1, board);
        var finalBoard = this.evaluateMove(piece2, board);
        if (piece1.color !== null || piece2.color!== null){
            var p1Color = piece1.color;
            var p2Color = piece2.color;
            piece2.color = p1Color;
            piece1.color = p2Color;
        }
        return finalBoard
    }

//takes in a piece and the board, evaluates the move made and then returns the augmented board
    this.evaluateMove = function(piece, board) {
        var matchArrayXAxis = [];
        var matchArrayYAxis = [];
        matchArrayXAxis.push(piece);
        matchArrayYAxis.push(piece);
//checks the position of the piece on the x coordinate plane and runs the check function that's appropriate
        switch(piece.x){
            case 0:
                checkDown(piece);
                break;
            case 1:
                checkDown(piece);
                checkUp(piece);
                break;
            case 2:
                checkDown(piece);
                checkUp(piece);
                break;
            case 3:
                checkUp(piece);
                break;
        }
//checks the position of the piece on the y coordinate plane and runs the check function that's appropriate
        switch(piece.y){
            case 0:
                checkRight(piece);
                break;
            case 1:
                checkRight(piece);
                checkLeft(piece);
                break;
            case 2:
                checkRight(piece);
                checkLeft(piece);
                break;
            case 3:
                checkLeft(piece);
                break;
        }
//checks for matches below the initial piece
        function checkDown(piece){
            if (board[piece.x+1] !== undefined && piece.color === board[piece.x+1][piece.y].color){
                matchArrayXAxis.push(board[piece.x+1][piece.y]);
                checkDown(board[piece.x+1][piece.y]);
            }
        }
//checks for matches above the initial piece
        function checkUp(piece) {
            if (board[piece.x - 1] !== undefined && piece.color === board[piece.x - 1][piece.y].color) {
                matchArrayXAxis.push(board[piece.x - 1][piece.y]);
                checkUp(board[piece.x - 1][piece.y]);
            }
        }
//checks for matches to the right the initial piece
        function checkRight(piece){
            if (board[piece.y+1] !== undefined && piece.color === board[piece.x][piece.y+1].color){
                matchArrayYAxis.push(board[piece.x][piece.y+1]);
                checkRight(board[piece.x][piece.y+1]);
            }
        }
//checks for matches to the left the initial piece
        function checkLeft(piece) {
            if (board[piece.y - 1] !== undefined && piece.color === board[piece.x][piece.y - 1].color) {
                matchArrayYAxis.push(board[piece.x][piece.y - 1]);
                checkLeft(board[piece.y - 1][piece.x]);
            }
        }
//checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
        //their defining value to null
        if(matchArrayYAxis.length > 2) {
            for (var i = 0; i < matchArrayYAxis.length; i++) {
                board[matchArrayYAxis[i].x][matchArrayYAxis[i].y].color = null;
            }
        }
//checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
        //their defining value to null
        if(matchArrayXAxis.length > 2){
            for (var i = 0; i < matchArrayXAxis.length; i++) {
                board[matchArrayXAxis[i].x][matchArrayXAxis[i].y].color = null;
            }
        }
        //returns augmented board
        return board;
    }

