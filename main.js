/**
 * Created by Chris / Shane / Soy on 8/9/17.
 **/

$(document).ready(function() {
  const jewelTileGame = {
    game_board: new Game_board(),
    controller: new Controller(),
    model: new Model()
  };

  const { game_board, controller, model } = jewelTileGame;
  $(jewelTileGame).bind(this);
  console.log("jewelTileGame:", jewelTileGame);
  console.log("init and things are made");

  // turned off the modulus because it got obnoxious will turn on later
  ///////////////////////////////////////////////////////////////////////////////////////
  // model.display_stats();
  // setTimeout(function(){
  //     alert("Out of time, but don't give up champ, we believe!");
  //     location.reload();
  // }, 30000);
});

class Controller {
  //click handlers for each piece that is clicked on
  constructor() {
    this.model = new Model(this);
    Game_board.create_pieces();
    this.clickHandlers();
  }

  clickHandlers() {
    $(".game_grid_container").on("click", "div", function() {
      console.log("click");
      Game_board.clicked(
        $(this).attr("x"),
        $(this).attr("y"),
        $(this).attr("id")
      );
    });
    $(".game_grid_container").on("click", ".clickable", function() {
      console.log("click");
      Game_board.clicked(
        $(this).attr("x"),
        $(this).attr("y"),
        $(this).attr("id")
      );
      //i feel like Model should also run?
    });
    $("#reset").on("click", function() {
      location.reload();
      Model.display_stats();
    });
    $(".game_reset_button").on("click", function() {
      location.reload();
      Model.display_stats();
    });
  }
  //   clickHandlers();
}

class Game_board {
  constructor() {
    let first_click = null;
    let second_click = null;

    let first_attr = null;
    let second_attr = null;

    let second_click_x = null;
    let second_click_y = null;

    let first_click_x = null;
    let first_click_y = null;

    let first_id = null;
    let second_id = null;

    this.jewel_arr = [];
    this.pieces_arr = [
      "blue-diamond-tile",
      "compass-tile",
      "flower-tile",
      "pink-diamond-tile",
      "purple-pentagon-tile",
      "red-flower-tile",
      "star-tile",
      "yellow-diamond-tile"
    ];
    this.create_pieces();
  }

  create_pieces() {
    let piecesArr = this.pieces_arr;
    let jewelArr = this.jewel_arr;
    let x_cord = 0;
    let counter = 1;
    //creation of the pieces
    for (let i = 0; i < 8; i++) {
      //first loop changes the x coordinates increments adds four to complete total number of requested pieces
      let multi_arr = []; //creation of the multi-array that holds the coordinates of each piece, created at the start of each the outer loop
      for (let j = 0; j < 8; j++) {
        //creation of the the inner multi-array objects
        let ran_num = Math.floor(Math.random() * piecesArr.length);
        let jewel_piece = {
          'x': x_cord,
          'y': j,
          'id': counter,
          'tile': piecesArr[ran_num], //tile is how we'll determine what piece to place on the boar
          'info': $('<div>', {
            //class to add along with the x and y attributes for each dom element creating
            tile: piecesArr[ran_num],
            x: x_cord,
            y: j,
            id: counter++
          })
        };

        $(".game_grid_container").append(jewel_piece.info.clone()); //actual appending of the dom element to the html body
        multi_arr.push(jewel_piece); //each iteration of the inner loop pushes the value to the inner array
      }
      jewelArr.push(multi_arr);
      x_cord++;
    }
  }

  clicked(x, y, id) {
    //click handler function when the player clicks on a piece, passed the x and y values of the piece clicked
    Model.display_stats();
    if (first_click === null) {
      //assigns the first click x and y coordinates of the piece that was clicked
      first_click_x = x;
      first_click_y = y;
      first_attr = this.jewel_arr[x][y].tile;
      first_click = this.jewel_arr[x][y]; //saves the tile attribute for the first piece for the sway
      //this.off_click(x, y);
      first_id = id;
      $("[id='" + second_id + "']").removeClass("government");
      $("[id='" + (parseInt(second_id) + 1) + "']").removeClass("government");
      $("[id='" + (parseInt(second_id) + 8) + "']").removeClass("government");
      $("[id='" + (parseInt(second_id) - 1) + "']").removeClass("government");
      $("[id='" + (parseInt(second_id) - 8) + "']").removeClass("government");
      $("[id='" + first_id + "']").addClass("government");
      $("[id='" + (parseInt(first_id) + 1) + "']").addClass("government");
      $("[id='" + (parseInt(first_id) + 8) + "']").addClass("government");
      $("[id='" + (parseInt(first_id) - 1) + "']").addClass("government");
      $("[id='" + (parseInt(first_id) - 8) + "']").addClass("government");

      return;
    } else {
      //assigns the second click x and y coordinates of the piece that was clicked
      second_click_x = x;
      second_click_y = y;
      second_attr = this.jewel_arr[x][y].tile; //saves the tile attribute for the second for the sway
      second_click = this.jewel_arr[x][y];
      second_id = id;
      $("[id='" + first_id + "']").removeClass("government");
      $("[id='" + (parseInt(first_id) + 1) + "']").removeClass("government");
      $("[id='" + (parseInt(first_id) + 8) + "']").removeClass("government");
      $("[id='" + (parseInt(first_id) - 1) + "']").removeClass("government");
      $("[id='" + (parseInt(first_id) - 8) + "']").removeClass("government");
      $("[id='" + second_id + "']").addClass("government");
      $("[id='" + (parseInt(second_id) + 1) + "']").addClass("government");
      $("[id='" + (parseInt(second_id) + 8) + "']").addClass("government");
      $("[id='" + (parseInt(second_id) - 1) + "']").addClass("government");
      $("[id='" + (parseInt(second_id) - 8) + "']").addClass("government");
      if (this.off_click(first_click_x, first_click_y, second_id) === false) {
        first_click = second_click;
        second_click = null;
        $(".game_grid_container").off("click", "div");
        controller.clickHandlers();

        return;
      }
      // $('.game_grid_container > *').removeClass('clickable');
    }

    //after the two clicks and happen this switches the tile attribute which we'll tie to the board pieces
    this.jewel_arr[second_click_x][second_click_y].tile = first_attr;
    this.jewel_arr[first_click_x][first_click_y].tile = second_attr;
    $("[id='" + first_id + "']").attr("tile", second_attr);
    $("[id='" + second_id + "']").attr("tile", first_attr);
    //send the board state to shane which is the array!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $("[id='" + second_id + "']").removeClass("government");
    $("[id='" + (parseInt(second_id) + 1) + "']").removeClass("government");
    $("[id='" + (parseInt(second_id) + 8) + "']").removeClass("government");
    $("[id='" + (parseInt(second_id) - 1) + "']").removeClass("government");
    $("[id='" + (parseInt(second_id) - 8) + "']").removeClass("government");
    this.jewel_arr = model.receiveStateSendState(
      first_click,
      second_click,
      this.jewel_arr
    );

    first_click = null;
    second_click = null;
    controller.clickHandlers();
    this.piece_fill();
  }

  swap_attr(x, y) {
    let selectx = "[x='" + x + "']"; //baseline for where to start on the x coordinate for the pieces
    let selecty = "[y='" + y + "']"; //baseline for where to start on the y coordinate for the pieces
    $(selectx)
      .filter(select_left)
      .addClass("clickable"); //add click handler to left piece
    $(select_up)
      .filter(selecty)
      .addClass("clickable"); //add click handler to piece above
    $(select_down)
      .filter(selecty)
      .addClass("clickable"); //add click handler to piece below
  }

  off_click(x, y, id) {
    //this turns the click handler off all pieces and turns them on just for the adjacent pieces
    $(".game_grid_container").off("click", "div");
    let selectx = "[x='" + x + "']"; //baseline for where to start on the x coordinate for the pieces
    let selecty = "[y='" + y + "']"; //baseline for where to start on the y coordinate for the pieces
    let select_up = "[x='" + (parseInt(x) - 1) + "']"; //move up 1 spot to select the piece above
    let select_right = "[y='" + (parseInt(y) + 1) + "']"; //move right 1 spot to select the piece above
    let select_down = "[x='" + (parseInt(x) + 1) + "']"; //move down 1 spot to select the piece above
    let select_left = "[y='" + (parseInt(y) - 1) + "']"; //move left 1 spot to select the piece above
    // $(selectx).filter(select_right).addClass('clickable');//add click handler to right piece
    // $(selectx).filter(select_left).addClass('clickable');//add click handler to left piece
    // $(select_up).filter(selecty).addClass('clickable');//add click handler to piece above
    // $(select_down).filter(selecty).addClass('clickable');//add click handler to piece below
    let right_id = $(selectx)
      .filter(select_right)
      .attr("id");
    let left_id = $(selectx)
      .filter(select_left)
      .attr("id");
    let up_id = $(select_up)
      .filter(selecty)
      .attr("id");
    let down_id = $(select_down)
      .filter(selecty)
      .attr("id");
    switch (id) {
      case right_id:
        return true;
      case left_id:
        return true;
      case up_id:
        return true;
      case down_id:
        return true;
      default:
        return false;
    }
  }

  piece_fill() {
    for (let i = 7; i >= 0; i--) {
      for (let j = 7; j >= 0; j--) {
        if (this.jewel_arr[i][j].tile === null) {
          let ran_num = Math.floor(Math.random() * 7);
          let match_id = this.jewel_arr[i][j].id;
          this.jewel_arr[i][j].tile = this.pieces_arr[ran_num];
          $("[id='" + match_id + "']").attr("tile", this.pieces_arr[ran_num]);
          return this.piece_fill();
        }
        // if (this.jewel_arr[i][j].tile === null) {
        //     if (i === 0) {
        //         let ran_num = Math.floor(Math.random() * this.pieces_arr.length);
        //         let match_id = this.jewel_arr[i][j].id;
        //         this.jewel_arr[i][j].tile = this.pieces_arr[ran_num];
        //         $("[id='" + match_id + "']").attr('tile', this.pieces_arr[ran_num]);
        //         return this.piece_fill()
        //     } else {
        //         let match_id = this.jewel_arr[i][j].id;
        //         for(let k = i; k > 0; k--) {
        //             if(this.jewel_arr[k - 1][j].tile !== null) {
        //                 $("[id='" + match_id + "']").attr('tile', this.jewel_arr[k - 1][j].tile);
        //                 this.jewel_arr[k][j].tile = this.jewel_arr[k - 1][j].tile;
        //                 return this.piece_fill();
        //             }
        //         }
        //         let ran_num = Math.floor(Math.random() * 7);
        //         let match_id = this.jewel_arr[i][j].id;
        //         this.jewel_arr[i][j].tile = this.pieces_arr[ran_num];
        //         $("[id='" + match_id + "']").attr('tile', this.pieces_arr[ran_num]);
        //         return this.piece_fill()
        //     }
        // }
      }
    }
    
    return clickHandlers();
  }
}

//BEGIN EVALUATION OF BOARD AREA INSIDE OF THIS SPACE BELOW THIS SPOT I AM HERE
class Model {
  constructor() {
    this.score = 0;
    this.matches = 0;
    this.fails = 0;
    this.piece1 = null; 
    this.piece2 = null;
    this.board = null;
    this.receiveStateSendState();
  }

  //takes in a board state and the pieces acted upon by the player and sends the info to the evaluation portion
  receiveStateSendState(piece1, piece2, board) {
    console.log('RECIEVE_SENDSTATE : piece1',piece1);
    console.log('RECIEVE_SENDSTATE : piece2', piece2);
    console.log('RECIEVE_SENDSTATE : board', board);
    this.evaluateMove(piece1, board);
    let finalBoard = this.evaluateMove(piece2, board);
    if (piece1.tile !== null && piece2.tile !== null) {
      this.fails += 1;
      model.display_stats();
      let p1tile = piece1.tile;
      let p2tile = piece2.tile;
      let first_id = piece1.id;
      let second_id = piece2.id;
      piece2.tile = p1tile;
      piece1.tile = p2tile;
      $("[id='" + first_id + "']").attr("tile", p2tile);
      $("[id='" + second_id + "']").attr("tile", p1tile);
    }
    return finalBoard;
  }

  //takes in a piece and the board, evaluates the move made and then returns the augmented board
  evaluateMove(piece, board) {
    let matchArrayXAxis = [];
    let matchArrayYAxis = [];
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
    };
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
    };
    //checks for matches below the initial piece
    function checkDown(piece) {
      if (
        board[piece.x + 1] !== undefined &&
        piece.tile === board[piece.x + 1][piece.y].tile
      ) {
        matchArrayXAxis.push(board[piece.x + 1][piece.y]);
        checkDown(board[piece.x + 1][piece.y]);
      }
    };

    //checks for matches above the initial piece
    function checkUp(piece) {
      if (
        board[piece.x - 1] !== undefined &&
        piece.tile === board[piece.x - 1][piece.y].tile
      ) {
        matchArrayXAxis.push(board[piece.x - 1][piece.y]);
        checkUp(board[piece.x - 1][piece.y]);
      }
    };

    //checks for matches to the right the initial piece
    function checkRight(piece) {
      if (
        board[piece.x][piece.y + 1] !== undefined &&
        piece.tile === board[piece.x][piece.y + 1].tile
      ) {
        matchArrayYAxis.push(board[piece.x][piece.y + 1]);
        checkRight(board[piece.x][piece.y + 1]);
      }
    };

    //checks for matches to the left the initial piece
    function checkLeft(piece) {
      if (
        board[piece.x][piece.y - 1] !== undefined &&
        piece.tile === board[piece.x][piece.y - 1].tile
      ) {
        matchArrayYAxis.push(board[piece.x][piece.y - 1]);
        checkLeft(board[piece.y - 1][piece.x]);
      }
    };
    
    //INCREMENT MATCH COUNTER
    if (matchArrayYAxis.length > 2 || matchArrayXAxis.length > 2) {
      model.matches += 1;
    };
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayYAxis.length > 2) {
      for (let i = 0; i < matchArrayYAxis.length; i++) {
        model.score += 1;
        let match_id = matchArrayYAxis[i].id;
        board[matchArrayYAxis[i].x][matchArrayYAxis[i].y].tile = null;
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    };
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayXAxis.length > 2) {
      for (let i = 0; i < matchArrayXAxis.length; i++) {
        model.score += 1;
        let match_id = matchArrayXAxis[i].id;
        board[matchArrayXAxis[i].x][matchArrayXAxis[i].y].tile = null;
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    };

    //returns augmented board
    return board;
  }

  display_stats() {
    if (model.score > localStorage.personalBest) {
        localStorage.personalBest = model.score;
    }
    $("#personal_best_value").text(localStorage.personalBest);
    $("#score_value").text(model.score);
    $("#stats_value").text(model.matches + "/" + model.fails);
  };

  // this.handleResetClick = function(){
  //     console.log("GET")
  //     this.matches = 0;
  //     this.fails = 0;
  //     this.score = 0;
  //
  // }
}

// let game_board = null;
// let controller = null;
// let model = null;

//***************************************************************
// reset tiles

// let stats = 0;
// let round = 0;
// let points = 0;

// function reset_stats(){
//     stats = 0 ;
//     round = 0 ;
//     points = 0 ;
// }
