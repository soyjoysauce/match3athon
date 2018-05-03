//Created by Soy on 11/24/17
//DOM event that would replace jquery
// Document.addEventListener('onload',init());
$(document).ready(function() {
  // const jewelTileGame = {
  // controller : new Controller(this),
  // game_board : new Game_board(this),
  // model : new Model(this)
  // }
  // const {controller, game_board , model } = jewelTileGame
  // $(this.jewelTileGame).bind(this);
  // console.log(this);
  controller = new Controller(this);
  game_board = new Game_board(this);
  model = new Model(this);
  console.log("game_board:", game_board);
  console.log("controller:", controller);
  console.log("model:", model);
  console.log("init and things are made");
});
// Controller listens for clicks (2) moves
// first click: picks up the div id of the selected div and instantiates 'clickable divs'
// 'clickable divs' -- checks if the second click matches any of the four directions
// and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process
class Controller {
  constructor() {
    this.model = new Model(this);
    this.game_board = new Game_board(this);
    var gameBoard = this.game_board;
    // this.jewel_Arr;
    this.applyClickHandlers();
    gameBoard.createTile();
    this.receiveAndRenderBoardState();
    //this links the createTile's memory of the board
    this.jewel_Arr = Controller.jewel_Arr;
    //assign global to the array
    let controllerBoard = null;
    controllerBoard = Controller.jewel_Arr;
  }
  applyClickHandlers() {
    $(".game_grid_container").on("click", "div", function() {
      $(this).bind(
        game_board.__proto__.moveTile(
          $(this).attr("x"),
          $(this).attr("y"),
          $(this).attr("id"),
          $(this).attr("class"),
          Controller.jewel_Arr,
          console.log("this :", this),
          console.log("controllerBoard :", Controller.jewel_Arr)
        )
      );
    });
    $(".game_grid_container").on("click", ".clickable government", function() {
      $(
        this.bind(
          game_board.__proto__.moveTile(
            $(this).attr("x"),
            $(this).attr("y"),
            $(this).attr("id"),
            $(this).attr("class"),
            Controller.jewel_Arr
          )
        )
      );
    });
    $("#reset").on("click", function() {
      location.reload();
      model.display_stats();
    });
    $(".game_reset_button").on("click", function() {
      location.reload();
      model.display_stats();
    });
  }
  filterMatch() {}

  sendBoardUpdate() {}

  receiveAndRenderBoardState() {
    //responsible for connecting game_board's createTile function jewel_arr'
    //for the controller spelling is jewel_Arr (A is caps)
    console.log("hi is this working???????");
    console.log("Controller.jewelArr", Controller.jewel_Arr);
  }

  displayStats() {}
}

// Model is a object which to draw .
// Removes and Replaces Y first and then x
// Also listens to the Board state and runs a check on every x and y axis
// Also in charge of keeping the state of the scores in the game

class Model {
  constructor() {
    this.score = 0;
    this.matches = 0;
    this.fails = 0;
    this.board_update = [];
    this.updated_board = [];
  }

  receiveControllerState() {}

  removeReplaceState() {}

  sendNewBoard() {}
}

// Board randomly generates pieces and sends the most current state of the board to Controller
// Board receives the updated state of the board from the Model
class Game_board {
  constructor() {
    this.score = 0;
    this.matches = 0;
    this.fails = 0;
    this.controllerState = {
      first_click: null,
      second_click: null,
      first_click_x: null,
      second_click_x: null,
      first_click_y: null,
      second_click_y: null,
      id_1: null,
      id_2: null,
      first_attr: null,
      second_attr: null,

      north_tile: null,
      south_tile: null,
      east_tile: null,
      west_tile: null,
      jewelTiles: null
    };
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
  }

  createTile() {
    let piecesArr = this.pieces_arr;
    let jewelArr = this.jewel_arr;
    let x_axis = 0;
    let y_axis = 0;
    let counter = 1;

    while (jewelArr.length < 8) {
      let axis_arr = [];

      piecesArr.map(function() {
        let randomNum = Math.floor(Math.random() * piecesArr.length);
        let jewelPiece = {
          x: x_axis,
          y: y_axis,
          id: counter,
          tile: piecesArr[randomNum],
          info: $("<div>", {
            tile: piecesArr[randomNum],
            x: x_axis,
            y: y_axis,
            id: counter
          })
        };
        $(".game_grid_container").append(jewelPiece.info.clone());
        axis_arr.push(jewelPiece);
        y_axis++;
        counter++;
      });
      this.jewel_arr.push(axis_arr);
      y_axis = 0;
      x_axis++;
    }
    //assigns the constructor with the saved arrays of tiles randomized
    this.jewel_arr = jewelArr;
    console.log("boardState = jewelArr", this.jewel_arr);
    //this assigns the newly created array within createTiles
    Controller.jewel_Arr = this.jewel_arr;
    console.log("Controller.jewelArr", Controller.jewel_Arr);
  }

  //moveTile() takes in the first and second click and switches it first.
  //check starts to see if any horizontal or vertical matches are happening while loop possibly
  //console.log('',);
  moveTile(x, y, id, class_name, board) {
    console.log("x :", x);
    console.log("y :", y);
    console.log("id :", id);
    console.log("class_name :", class_name);
    console.log("board :", board);
    let tile_board = board;
    //rendering reference pointers for
    let secondClickX = null;
    let secondClickY = null;
    let firstClickX = null;
    let firstClickY = null;

    secondClickX = game_board.controllerState["second_click_x"];
    secondClickY = game_board.controllerState["second_click_y"];
    firstClickX = game_board.controllerState["first_click_x"];
    firstClickY = game_board.controllerState["first_click_y"];
    // let id1 = game_board.controllerState["id_1"];
    // let id2 = game_board.controllerState["id_2"];
    //this assigns clicks based on their turns. the order of the statement is important
    if (
      game_board.controllerState["first_click"] === null &&
      game_board.controllerState["second_click"] === null
    ) {
      console.log("first click");
      //if first click and second click is empty
      //this captures the values of each div's x and y attributes
      game_board.controllerState["id_1"] = id;
      game_board.controllerState["first_click_x"] = x;
      game_board.controllerState["first_click_y"] = y;
      // console.log(
      //   'game_board.controllerState["id_1"] :',
      //   game_board.controllerState["id_1"]
      // );
      // console.log(
      //   'game_board.controllerState["first_click_x"] :',
      //   game_board.controllerState["first_click_x"]
      // );
      // console.log(
      //   'game_board.controllerState["first_click_y"] :',
      //   game_board.controllerState["first_click_y"]
      // );

      let firstClickX = null;
      let firstClickY = null;
      firstClickX = game_board.controllerState["first_click_x"];
      firstClickY = game_board.controllerState["first_click_y"];
      console.log("firstClickX", firstClickX);
      console.log("firstClickY", firstClickY);

      //firstClick in the array
      game_board.controllerState["first_click"] =
        board[firstClickX][firstClickY];
      //firstAttr tile
      game_board.controllerState["first_attr"] =
        board[firstClickX][firstClickY].tile;
      console.log("firstClick :", game_board.controllerState["first_click"]);
      console.log("firstAttr :", game_board.controllerState["first_attr"]);
      // console.log("id2", id2);
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) + 8) + "']"
      ).removeClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) - 1) + "']"
      ).removeClass("clickable government");
      $("[id='" + game_board.controllerState["id_2"] + "']").removeClass(
        "clickable government"
      );
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) + 1) + "']"
      ).removeClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) - 8) + "']"
      ).removeClass("clickable government");
      $("[id='" + game_board.controllerState["id_1"] + "']").addClass(
        "clickable government"
      );
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) - 8) + "']"
      ).addClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) + 8) + "']"
      ).addClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) + 1) + "']"
      ).addClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) - 1) + "']"
      ).addClass("clickable government");

      return;
    }
    //  else if (
    //   game_board.controllerState["first_click"] !== null &&
    //   class_name === "clickable government"
    // ) {
    else {
      console.log("second click");
      //if first click is not empty and the clicked div has these class "clickable government"
      game_board.controllerState["id_2"] = id;
      game_board.controllerState["second_click_x"] = x;
      game_board.controllerState["second_click_y"] = y;

      let secondClickX = game_board.controllerState["second_click_x"];
      let secondClickY = game_board.controllerState["second_click_y"];
      console.log("secondClickX:", secondClickX);
      console.log("secondClickY:", secondClickY);
      // save the second click
      game_board.controllerState["second_click"] =
        tile_board[secondClickX][secondClickY];
      // save tile attribute
      game_board.controllerState["second_attr"] =
        tile_board[secondClickX][secondClickY].tile;

      $("[id='" + game_board.controllerState["id_1"] + "']").removeClass(
        "clickable government"
      );
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) + 1) + "']"
      ).removeClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) + 8) + "']"
      ).removeClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) - 1) + "']"
      ).removeClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_1"]) - 8) + "']"
      ).removeClass("clickable government");
      $("[id='" + game_board.controllerState["id_2"] + "']").addClass(
        "clickable government"
      );
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) + 1) + "']"
      ).addClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) + 8) + "']"
      ).addClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) - 1) + "']"
      ).addClass("clickable government");
      $(
        "[id='" + (parseInt(game_board.controllerState["id_2"]) - 8) + "']"
      ).addClass("clickable government");
    //this is so that when i click something outside of the possible move
      if(this.off_click(firstClickX, firstClickY ,(game_board.controllerState["id_2"])) === false){
        game_board.controllerState["first_click"] = game_board.controllerState["second_click"];
        game_board.controllerState["second_click"] = null ;

        game_board.controllerState["first_click_x"] = game_board.controllerState["first_click_y"] ; 
        game_board.controllerState["first_click_y"] = null ;

        game_board.controllerState["second_click_x"] = game_board.controllerState["second_click_y"] ; 
        game_board.controllerState["second_click_y"] = null ;

        game_board.controllerState["id_1"] = game_board.controllerState["id_2"] ; 
        game_board.controllerState["id_2"] = null ; 

        game_board.controllerState["first_attr"] = game_board.controllerState["second_attr"] ; 
        game_board.controllerState["second_attr"] = null ; 

        $(".game_grid_container").off("click", "div");
        controller.applyClickHandlers();
        return;
      }
    
    }
    // after the two clicks switch the tile attributes with jquery

    
    //this switches tile 1 from tile 2
    // secondAttr = [ firstAttr, (firstAttr = secondAttr)][0];
    console.log("BEFORE :", board);
    console.log(
      'BEFORE ["first_attr"] :',
      game_board.controllerState["first_click"]
    );
    console.log(
      'BEFORE ["second_attr"] :',
      game_board.controllerState["second_click"]
    );
    //after the two clicks and happen this switches the tile attribute which we'll tie to the board pieces
    let first_attr = game_board.controllerState["first_attr"];
    let second_attr = game_board.controllerState["second_attr"];
    // tile_board[secondClickX][secondClickY].tile = first_attr;
    // tile_board[firstClickX][firstClickY].tile = second_attr;

    tile_board[secondClickX][secondClickY].tile = [
      tile_board[firstClickX][firstClickY].tile,
      (tile_board[firstClickX][firstClickY].tile =
        tile_board[secondClickX][secondClickY].tile)
    ][0];
    //jquery to actually change the tiles
    $("[id='" + game_board.controllerState["id_1"] + "']").attr(
      "tile",
      second_attr
    );
    $("[id='" + game_board.controllerState["id_2"] + "']").attr(
      "tile",
      first_attr
    );
    //remove class
    $("[id='" + game_board.controllerState["id_2"] + "']").removeClass(
      "clickable government"
    );
    $(
      "[id='" + (parseInt(game_board.controllerState["id_2"]) + 1) + "']"
    ).removeClass("clickable government");
    $(
      "[id='" + (parseInt(game_board.controllerState["id_2"]) + 8) + "']"
    ).removeClass("clickable government");
    $(
      "[id='" + (parseInt(game_board.controllerState["id_2"]) - 1) + "']"
    ).removeClass("clickable government");
    $(
      "[id='" + (parseInt(game_board.controllerState["id_2"]) - 8) + "']"
    ).removeClass("clickable government");
    console.log("AFTER :", board);
    console.log(
      'AFTER ["first_attr"] :',
      game_board.controllerState["first_click"]
    );
    console.log(
      'AFTER ["second_attr"] :',
      game_board.controllerState["second_click"]
    );

    //send the board state to the model to check and complete the task
    // this.receiveStateSendState(
    //   //piece1

    //   //piece2

    //   //board
    // );
  }

  //this turns the click handler off all pieces and turns them on just for the adjacent pieces
  off_click(x, y, id) {
    $(".game_grid_container").off("click", "div");
    let selectx = "[x='" + x + "']"; //baseline for where to start on the x coordinate for the pieces
    let selecty = "[y='" + y + "']"; //baseline for where to start on the y coordinate for the pieces
    let select_up = "[x='" + (parseInt(x) - 1) + "']"; //move up 1 spot to select the piece above
    let select_right = "[y='" + (parseInt(y) + 1) + "']"; //move right 1 spot to select the piece above
    let select_down = "[x='" + (parseInt(x) + 1) + "']"; //move down 1 spot to select the piece above
    let select_left = "[y='" + (parseInt(y) - 1) + "']"; //move left 1 spot to select the piece above
    
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

  //takes in a board state and the pieces acted upon by the player and sends the info to the evaluation portion
  receiveStateSendState(piece1, piece2, board) {
    this.evaluateMove(piece1, board);
    var finalBoard = this.evaluateMove(piece2, board);
    if (piece1.tile !== null && piece2.tile !== null) {
      this.fails += 1;
      this.display_stats();
      var p1tile = piece1.tile;
      var p2tile = piece2.tile;
      var id_1 = piece1.id;
      var id_2 = piece2.id;
      piece2.tile = p1tile;
      piece1.tile = p2tile;
      $("[id='" + id_1 + "']").attr("tile", p2tile);
      $("[id='" + id_2 + "']").attr("tile", p1tile);
    }
    return finalBoard;
  }

  //takes in a piece and the board, evaluates the move made and then returns the augmented board
  evaluateMove(piece, board) {
    var matchArrayXAxis = [];
    var matchArrayYAxis = [];
    matchArrayXAxis.push(piece);
    matchArrayYAxis.push(piece);
    //checks the position of the piece on the x coordinate plane and runs the check function that's appropriate
    console.log("piece.x", piece.x);
    console.log("piece.y", piece.y);
    console.log("piece", piece);

    //the switch statements are being ignored.
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
      console.log("Down piece", piece);
      console.log("board", board);
      if (
        board[piece.x + 1] !== undefined &&
        piece.tile === board[piece.x + 1][piece.y].tile
      ) {
        matchArrayXAxis.push(board[piece.x + 1][piece.y]);
        checkDown(board[piece.x + 1][piece.y]);
      }
    }

    //checks for matches above the initial piece
    function checkUp(piece) {
      console.log("Up piece", piece);

      if (
        board[piece.x - 1] !== undefined &&
        piece.tile === board[piece.x - 1][piece.y].tile
      ) {
        matchArrayXAxis.push(board[piece.x - 1][piece.y]);
        checkUp(board[piece.x - 1][piece.y]);
      }
    }

    //checks for matches to the right the initial piece
    function checkRight(piece) {
      console.log("Right piece", piece);

      if (
        board[piece.x][piece.y + 1] !== undefined &&
        piece.tile === board[piece.x][piece.y + 1].tile
      ) {
        matchArrayYAxis.push(board[piece.x][piece.y + 1]);
        checkRight(board[piece.x][piece.y + 1]);
      }
    }

    //checks for matches to the left the initial piece
    function checkLeft(piece) {
      console.log("Left piece", piece);

      if (
        board[piece.x][piece.y - 1] !== undefined &&
        piece.tile === board[piece.x][piece.y - 1].tile
      ) {
        matchArrayYAxis.push(board[piece.x][piece.y - 1]);
        checkLeft(board[piece.y - 1][piece.x]);
      }
    }
    //INCREMENT MATCH COUNTER
    if (matchArrayYAxis.length > 2 || matchArrayXAxis.length > 2) {
      this.matches += 1;
    }
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayYAxis.length > 2) {
      for (var i = 0; i < matchArrayYAxis.length; i++) {
        this.score += 1;
        var match_id = matchArrayYAxis[i].id;
        board[matchArrayYAxis[i].x][matchArrayYAxis[i].y].tile = null;
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    }
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayXAxis.length > 2) {
      for (var i = 0; i < matchArrayXAxis.length; i++) {
        this.score += 1;
        var match_id = matchArrayXAxis[i].id;
        board[matchArrayXAxis[i].x][matchArrayXAxis[i].y].tile = null;
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    }

    //returns augmented board
    return board;
  }
  display_stats() {
    if (this.score > localStorage.personalBest) {
      localStorage.personalBest = this.score;
    }
    $("span #personal_best_value").text(localStorage.personalBest);
    $("span #score_value").text(this.score);
    $("span #stats_value").text(this.matches + "/" + this.fails);
  }

  handleResetClick() {
    console.log("GET");
    this.matches = 0;
    this.fails = 0;
    this.score = 0;
  }
}

var game_board = null;
var controller = null;
var model = null;

//event targeting the click
// this.user_input = event.target.outerHTML;
// let userInput = this.user_input;
// console.log("Input", userInput);
// let eventAttr = $(userInput).attr("tile");

// game_board.controllerState["id_1"] = $(this.user_input).attr("id");
// game_board.controllerState["first_click_x"] = parseInt(
//   $(this.user_input).attr("x")
// );
// game_board.controllerState["first_click_y"] = parseInt(
//   $(this.user_input).attr("y")
// );
// console.log(
//   'game_board.controllerState["id_1"] :',
//   game_board.controllerState["id_1"]
// );
// console.log(
//   '1 game_board.controllerState["first_click_x"] :',
//   game_board.controllerState["first_click_x"]
// );
// console.log(
//   '1 game_board.controllerState["first_click_y"] :',
//   game_board.controllerState["first_click_y"]
// );

// this.jewel_arr[secondClickX][secondClickY].tile = game_board.controllerState[
//   "first_attr"
// ];
// this.jewel_arr[firstClickX][firstClickY].tile = game_board.controllerState[
//   "second_attr"
// ];
