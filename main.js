/**
 * Created by Chris on 8/9/17.
 */

$(document).ready(init);

function init() {
    game_board = new Game_board();
    controller = new Controller();
    model = new Model();
    model.display_stats();
    setTimeout(function(){
        alert("Out of time, but don't give up champ, we believe!");
        location.reload();
    }, 30000);
}

function Controller() {//click handlers for each piece that is clicked on
    //this.model = new Model(this)

    game_board.create_pieces();


    this.clickHandlers = function() {

        $('.game_grid_container').on('click','div',function(){
            console.log('click')
            game_board.clicked($(this).attr('x'), $(this).attr('y'), $(this).attr('id'));
        });
        $('.game_grid_container').on('click','.clickable',function(){
            console.log('click')
            game_board.clicked($(this).attr('x'), $(this).attr('y'), $(this).attr('id'));
        });
        $('#reset').on('click', function(){
            location.reload();
            model.display_stats()
        });
        $('.game_reset_button').on('click', function(){
            location.reload();
            model.display_stats();
        })

    };
    this.clickHandlers();
}


function Game_board() {
    var first_click = null;
    var second_click = null;
    var x_cord = 0;
    var counter = 1;
    var first_attr = null;
    var second_attr = null;
    var second_click_x = null;
    var second_click_y = null;
    var first_click_x = null;
    var first_click_y = null;
    var first_id = null;
    var second_id = null;
    this.jewel_arr = [];
    this.pieces_arr = ['compass_tile', 'flower_tile', 'pentagon_tile', 'pinkx_tile', 'quilt_tile', 'redviolet_tile', 'sapphire_tile', 'yellow_tile'];
    this.create_pieces = function () {//creation of the pieces
        for (var i = 0; i < 8; i++) {//first loop changes the x coordinates increments adds four to complete total number of requested pieces
            var multi_arr = [];//creation of the multi-array that holds the coordinates of each piece, created at the start of each the outer loop
            for (var j = 0; j < 8; j++) {//creation of the the inner multi-array objects
                var ran_num = Math.floor(Math.random() * this.pieces_arr.length);
                this.jewel_piece = {
                    x: x_cord,
                    y: j,
                    id: counter,
                    tile: this.pieces_arr[ran_num],//tile is how we'll determine what piece to place on the boar
                    info: $('<div>', {//class to add along with the x and y attributes for each dom element creating
                        tile: this.pieces_arr[ran_num],
                        x: x_cord,
                        y: j,
                        id: counter++
                    })
                };

                $('.game_grid_container').append(this.jewel_piece.info.clone());//actual appending of the dom element to the html body
                // $('game_grid_container').append(this.jewel_piece.info.clone());//actual appending of the dom element to the html body
                multi_arr.push(this.jewel_piece);//each iteration of the inner loop pushes the value to the inner array
            }
            this.jewel_arr.push(multi_arr);
            x_cord++;
        }
    }
    this.clicked = function (x, y, id) {//click handler function when the player clicks on a piece, passed the x and y values of the piece clicked
        model.display_stats();
        if (first_click === null) {//assigns the first click x and y coordinates of the piece that was clicked
            first_click_x = x;
            first_click_y = y;
            first_attr = this.jewel_arr[x][y].tile;
            first_click = this.jewel_arr[x][y];//saves the tile attribute for the first piece for the sway
            //this.off_click(x, y);
            first_id = id;
            $("[id='" + second_id + "']").removeClass("government");
            $("[id='" + (parseInt(second_id)+ 1) + "']").removeClass("government");
            $("[id='" + (parseInt(second_id)+ 8) + "']").removeClass("government");
            $("[id='" + (parseInt(second_id)- 1) + "']").removeClass("government");
            $("[id='" + (parseInt(second_id)- 8) + "']").removeClass("government");
            $("[id='" + first_id + "']").addClass("government");
            $("[id='" + (parseInt(first_id)+ 1) + "']").addClass("government");
            $("[id='" + (parseInt(first_id)+ 8) + "']").addClass("government");
            $("[id='" + (parseInt(first_id)- 1) + "']").addClass("government");
            $("[id='" + (parseInt(first_id)- 8) + "']").addClass("government");

            return
        } else {//assigns the second click x and y coordinates of the piece that was clicked
            second_click_x = x;
            second_click_y = y;
            second_attr = this.jewel_arr[x][y].tile;//saves the tile attribute for the second for the sway
            second_click = this.jewel_arr[x][y];
            second_id = id;
            $("[id='" + first_id + "']").removeClass("government");
            $("[id='" + (parseInt(first_id)+ 1) + "']").removeClass("government");
            $("[id='" + (parseInt(first_id)+ 8) + "']").removeClass("government");
            $("[id='" + (parseInt(first_id)- 1) + "']").removeClass("government");
            $("[id='" + (parseInt(first_id)- 8) + "']").removeClass("government");
            $("[id='" + second_id + "']").addClass("government");
            $("[id='" + (parseInt(second_id)+ 1) + "']").addClass("government");
            $("[id='" + (parseInt(second_id)+ 8) + "']").addClass("government");
            $("[id='" + (parseInt(second_id)- 1) + "']").addClass("government");
            $("[id='" + (parseInt(second_id)- 8) + "']").addClass("government");
            if(this.off_click(first_click_x, first_click_y, second_id) === false ) {
                first_click = second_click;
                second_click = null;
                $('.game_grid_container').off('click', 'div')
                controller.clickHandlers()

                return
            }
            // $('.game_grid_container > *').removeClass('clickable');
        }

        //after the two clicks and happen this switches the tile attribute which we'll tie to the board pieces
        this.jewel_arr[second_click_x][second_click_y].tile = first_attr;
        this.jewel_arr[first_click_x][first_click_y].tile = second_attr;
        $("[id='" + first_id + "']").attr('tile', second_attr);
        $("[id='" + second_id + "']").attr('tile', first_attr);
        //send the board state to shane which is the array!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        $("[id='" + second_id + "']").removeClass("government");
        $("[id='" + (parseInt(second_id)+ 1) + "']").removeClass("government");
        $("[id='" + (parseInt(second_id)+ 8) + "']").removeClass("government");
        $("[id='" + (parseInt(second_id)- 1) + "']").removeClass("government");
        $("[id='" + (parseInt(second_id)- 8) + "']").removeClass("government");
        this.jewel_arr = model.receiveStateSendState(first_click, second_click, this.jewel_arr);

        first_click = null;
        second_click = null;
        controller.clickHandlers();
        this.piece_fill();

    };

    // this.swap_attr = function(x,y) {
    //     var selectx = "[x='" + x + "']";//baseline for where to start on the x coordinate for the pieces
    //     var selecty = "[y='" + y + "']";//baseline for where to start on the y coordinate for the pieces
    //     $(selectx).filter(select_left).addClass('clickable');//add click handler to left piece
    //     $(select_up).filter(selecty).addClass('clickable');//add click handler to piece above
    //     $(select_down).filter(selecty).addClass('clickable');//add click handler to piece below
    //
    // }

    this.off_click = function (x,y, id) {//this turns the click handler off all pieces and turns them on just for the adjacent pieces
        $('.game_grid_container').off('click', 'div');
        var selectx = "[x='" + x + "']";//baseline for where to start on the x coordinate for the pieces
        var selecty = "[y='" + y + "']";//baseline for where to start on the y coordinate for the pieces
        var select_up = "[x='" + (parseInt(x) - 1) + "']";//move up 1 spot to select the piece above
        var select_right = "[y='" + (parseInt(y) + 1) + "']";//move right 1 spot to select the piece above
        var select_down = "[x='" + (parseInt(x) + 1) + "']";//move down 1 spot to select the piece above
        var select_left = "[y='" + (parseInt(y) - 1) + "']";//move left 1 spot to select the piece above
        // $(selectx).filter(select_right).addClass('clickable');//add click handler to right piece
        // $(selectx).filter(select_left).addClass('clickable');//add click handler to left piece
        // $(select_up).filter(selecty).addClass('clickable');//add click handler to piece above
        // $(select_down).filter(selecty).addClass('clickable');//add click handler to piece below
        var right_id = $(selectx).filter(select_right).attr('id');
        var left_id = $(selectx).filter(select_left).attr('id');
        var up_id = $(select_up).filter(selecty).attr('id');
        var down_id = $(select_down).filter(selecty).attr('id');
        switch(id) {
            case right_id:
                return true;
            case left_id:
                return true;
            case up_id:
                return true;
            case down_id:
                return true
            default:
                return false

        }
    }

    this.piece_fill = function () {
        debugger;
        for (var i = 7; i >= 0; i--) {
            for (var j = 7; j >= 0; j--) {
                if (this.jewel_arr[i][j].tile === null) {
                    var ran_num = Math.floor(Math.random() * 7);
                    var match_id = this.jewel_arr[i][j].id;
                    this.jewel_arr[i][j].tile = this.pieces_arr[ran_num];
                    $("[id='" + match_id + "']").attr('tile', this.pieces_arr[ran_num]);
                    return this.piece_fill()
                }
                // if (this.jewel_arr[i][j].tile === null) {
                //     if (i === 0) {
                //         var ran_num = Math.floor(Math.random() * this.pieces_arr.length);
                //         var match_id = this.jewel_arr[i][j].id;
                //         this.jewel_arr[i][j].tile = this.pieces_arr[ran_num];
                //         $("[id='" + match_id + "']").attr('tile', this.pieces_arr[ran_num]);
                //         return this.piece_fill()
                //     } else {
                //         var match_id = this.jewel_arr[i][j].id;
                //         for(var k = i; k > 0; k--) {
                //             if(this.jewel_arr[k - 1][j].tile !== null) {
                //                 $("[id='" + match_id + "']").attr('tile', this.jewel_arr[k - 1][j].tile);
                //                 this.jewel_arr[k][j].tile = this.jewel_arr[k - 1][j].tile;
                //                 return this.piece_fill();
                //             }
                //         }
                //         var ran_num = Math.floor(Math.random() * 7);
                //         var match_id = this.jewel_arr[i][j].id;
                //         this.jewel_arr[i][j].tile = this.pieces_arr[ran_num];
                //         $("[id='" + match_id + "']").attr('tile', this.pieces_arr[ran_num]);
                //         return this.piece_fill()
                //     }
                // }
            }
        }
        return controller.clickHandlers();
    }
}


//BEGIN EVALUATION OF BOARD AREA INSIDE OF THIS SPACE BELOW THIS SPOT I AM HERE
function Model() {
    this.score = 0;
    this.matches = 0;
    this.fails = 0;


//takes in a board state and the pieces acted upon by the player and sends the info to the evaluation portion
    this.receiveStateSendState = function (piece1, piece2, board) {
        this.evaluateMove(piece1, board);
        var finalBoard = this.evaluateMove(piece2, board);
        if (piece1.tile !== null && piece2.tile !== null) {
            this.fails += 1;
            model.display_stats();
            var p1tile = piece1.tile;
            var p2tile = piece2.tile;
            var first_id = piece1.id;
            var second_id = piece2.id;
            piece2.tile = p1tile;
            piece1.tile = p2tile;
            $("[id='" + first_id + "']").attr('tile', p2tile);
            $("[id='" + second_id + "']").attr('tile', p1tile);

        }

        return finalBoard;

    }

//takes in a piece and the board, evaluates the move made and then returns the augmented board
    this.evaluateMove = function (piece, board) {
        var matchArrayXAxis = [];
        var matchArrayYAxis = [];
        matchArrayXAxis.push(piece);
        matchArrayYAxis.push(piece);
//checks the position of the piece on the x coordinate plane and runs the check function that's appropriate
        switch (piece.x) {
            case 0:
                checkDown(piece);
                break;
            case 7:
                checkUp(piece);
                break;
            default:
                checkDown(piece);
                checkUp(piece);
                break;
        }
//checks the position of the piece on the y coordinate plane and runs the check function that's appropriate
        switch (piece.y) {
            case 0:
                checkRight(piece);
                break;
            case 7:
                checkLeft(piece);
                break;
            default:
                checkRight(piece);
                checkLeft(piece);
                break;
        }
//checks for matches below the initial piece
        function checkDown(piece) {
            if (board[piece.x + 1] !== undefined && piece.tile === board[piece.x + 1][piece.y].tile) {
                matchArrayXAxis.push(board[piece.x + 1][piece.y]);
                checkDown(board[piece.x + 1][piece.y]);
            }
        }

//checks for matches above the initial piece
        function checkUp(piece) {
            if (board[piece.x - 1] !== undefined && piece.tile === board[piece.x - 1][piece.y].tile) {
                matchArrayXAxis.push(board[piece.x - 1][piece.y]);
                checkUp(board[piece.x - 1][piece.y]);
            }
        }

//checks for matches to the right the initial piece
        function checkRight(piece) {
            if (board[piece.x][piece.y + 1] !== undefined && piece.tile === board[piece.x][piece.y + 1].tile) {
                matchArrayYAxis.push(board[piece.x][piece.y + 1]);
                checkRight(board[piece.x][piece.y + 1]);
            }
        }

//checks for matches to the left the initial piece
        function checkLeft(piece) {
            if (board[piece.x][piece.y - 1] !== undefined && piece.tile === board[piece.x][piece.y - 1].tile) {
                matchArrayYAxis.push(board[piece.x][piece.y - 1]);
                checkLeft(board[piece.y - 1][piece.x]);
            }
        }
//INCREMENT MATCH COUNTER
        if (matchArrayYAxis.length > 2 || matchArrayXAxis.length > 2){
            model.matches +=1
        }
//checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
        //their defining value to null
        if (matchArrayYAxis.length > 2) {
            for (var i = 0; i < matchArrayYAxis.length; i++) {
                model.score += 1;
                var match_id = matchArrayYAxis[i].id;
                board[matchArrayYAxis[i].x][matchArrayYAxis[i].y].tile = null;
                $("[id='" + match_id + "']").attr('tile', 'empty');
            }
        }
//checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
        //their defining value to null
        if (matchArrayXAxis.length > 2) {
            for (var i = 0; i < matchArrayXAxis.length; i++) {
                model.score += 1;
                var match_id = matchArrayXAxis[i].id;
                board[matchArrayXAxis[i].x][matchArrayXAxis[i].y].tile = null;
                $("[id='" + match_id + "']").attr('tile', 'empty');
            }
        }

        //returns augmented board
        return board;
    }






    this.display_stats = function (){
        if(model.score > localStorage.personalBest){
            localStorage.personalBest = model.score
        }
        $('#personal_best_value').text(localStorage.personalBest)
        $('#score_value').text(model.score);
        $('#stats_value').text(model.matches + '/' + model.fails)
    }

    // this.handleResetClick = function(){
    //     console.log("GET")
    //     this.matches = 0;
    //     this.fails = 0;
    //     this.score = 0;
    //
    // }

}

var game_board = null;
var controller = null;
var model = null;


//***************************************************************
// reset tiles



// var stats = 0;
// var round = 0;
// var points = 0;



// function reset_stats(){
//     stats = 0 ;
//     round = 0 ;
//     points = 0 ;
// }

