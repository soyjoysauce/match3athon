//Created by Soy on 11/24/17
//DOM event that would replace jquery
// Document.addEventListener('onload',init());
$(document).ready(function() {
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
      var class_name = null;
      class_name = $(this).attr("class");
      $(this).bind(
        game_board.__proto__.moveTile(
          $(this).attr("x"),
          $(this).attr("y"),
          $(this).attr("id"),
          class_name,
          Controller.jewel_Arr,
          console.log("this :", this),
          console.log("class_name:", class_name),
          console.log("Controller.jewel_Arr :", Controller.jewel_Arr)
        )
      );
    });
    $(".game_grid_container").on("click", ".clickable government", function() {
      $(this).bind(
        game_board.__proto__.moveTile(
          $(this).attr("x"),
          $(this).attr("y"),
          $(this).attr("id"),
          (class_name = $(this).attr("class")),
          Controller.jewel_Arr
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
  removeReplaceState() {}

  sendNewBoard() {}

  //takes in a board state and the pieces acted upon by the player and sends the info to the evaluation portion
  receiveControllerState(piece1, piece2, board) {
    console.log("receiveControllerState piece1 :", piece1);
    console.log("receiveControllerState piece2 :", piece2);
    console.log("receiveControllerState board :", board);
    this.evaluateMove(piece1, board);
    var finalBoard = this.evaluateMove(piece2, board);
    if (piece1.tile !== null && piece2.tile !== null) {
      this.fails += 1;
      this.display_stats();
      var p1tile = piece1.tile;
      var p2tile = piece2.tile;
      var id_1 = piece1.id;
      var id_2 = piece2.id;
      piece2.tile = p2tile;
      piece1.tile = p1tile;
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
    console.log("board", board);
    switch (piece) {
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
    switch (piece) {
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
      //if the piece that is below is not undefined
      //and the tile im matching with matches the next one      
      if (
        board[piece.x + 1][piece.y] !== undefined &&
        piece.tile === board[piece.x + 1][piece.y].tile
      ) {
        console.log(piece.keys);
        matchArrayYAxis.push(board[piece.x + 1][piece.y]);
        checkDown(board[piece.x + 1][piece.y]);
      }
      // }else{
      //   //sort the array 
      // }
    }

    //checks for matches above the initial piece
    function checkUp(piece) {
      console.log("Up piece", piece);
      console.log("board", board);
      if (
        board[piece.x - 1][piece.y] !== undefined &&
        piece.tile === board[piece.x - 1][piece.y].tile
      ) {
        matchArrayYAxis.push(board[piece.x - 1][piece.y]);
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
        matchArrayXAxis.push(board[piece.x][piece.y + 1]);
        checkRight(board[piece.x][piece.y + 1]);
      }
    }

    //checks for matches to the left the initial piece
    function checkLeft(piece) {
      console.log("Left piece", piece);
      //make a forloop that will take first one and add it to the 
      if (
        board[piece.x][piece.y - 1] !== undefined &&
        piece.tile === board[piece.x][piece.y - 1].tile
      ) {
        matchArrayXAxis.push(board[piece.x][piece.y - 1]);
        checkLeft(board[piece.y - 1][piece.x]);
      }
    }
    //INCREMENT MATCH COUNTER
    if (matchArrayYAxis.length > 2 || matchArrayXAxis.length > 2) {
      console.log('matchArrayYAxis :', matchArrayYAxis);
      console.log('matchArrayXAxis :', matchArrayXAxis);
      
      this.matches += 1;
    }

    //I need to make a function that takes int the Y and X axis array matched
    //arrange the y axis [biggest id -> lowest id]
    //arrange the x axis [lowest id -> highest id]


    //take the manipulated array and splice 

    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayYAxis.length > 2) {
      for (var i = 0; i < matchArrayYAxis.length; i++) {
        this.score += 1;
        var match_id = matchArrayYAxis[i].id;
        //this is the actual object during the loop
        board[matchArrayYAxis[i].x][matchArrayYAxis[i].y] = null;
        //this is where they made it "dissapear" by changing the attribute to empty
        //but we are goign to make it so that every match id is paired
        //with the topmost unmatched tile and append
        //if there is no more on the board, create random piece
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    }
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayXAxis.length > 2) {
      for (var i = 0; i < matchArrayXAxis.length; i++) {
        this.score += 1;
        var match_id = matchArrayXAxis[i].id;
        board[matchArrayXAxis[i].x][matchArrayXAxis[i].y] = null;
        //this is where they made it "dissapear" by changing the attribute to empty
        //but we are goign to make it so that every match id is paired
        //with the topmost unmatched tile and append
        //if there is no more on the board, create random piece
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

// Board randomly generates pieces and sends the most current state of the board to Controller
// Board receives the updated state of the board from the Model
class Game_board {
  constructor() {
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
    //if the second click is not any of relational to 1st clickd area
    else if (
      game_board.off_click(firstClickX, firstClickY, id) === true &&
      class_name === "clickable government"
    ) {
      // else {
      console.log("second click");
      //if first click is not empty and the clicked div has these class "clickable government"
      game_board.controllerState["id_2"] = id;
      game_board.controllerState["second_click_x"] = x;
      game_board.controllerState["second_click_y"] = y;

      let secondClickX = game_board.controllerState["second_click_x"];
      let secondClickY = game_board.controllerState["second_click_y"];
      console.log("secondClickX:", secondClickX);
      console.log("secondClickY:", secondClickY);
      // save the second click actual bject
      game_board.controllerState["second_click"] =
        board[secondClickX][secondClickY];
      // save tile attribute
      game_board.controllerState["second_attr"] =
        board[secondClickX][secondClickY].tile;

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

      // after the two clicks switch the tile attributes with jquery
      //this switches tile 1 from tile 2
      // secondAttr = [ firstAttr, (firstAttr = secondAttr)][0];
      console.log("BEFORE board :", board);
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
      tile_board[game_board.controllerState["second_click_x"]][
        game_board.controllerState["second_click_y"]
      ].tile = first_attr;
      tile_board[game_board.controllerState["first_click_x"]][
        game_board.controllerState["first_click_y"]
      ].tile = second_attr;

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
      let piece1 = game_board.controllerState["second_click"];
      let piece2 = game_board.controllerState["second_click"];
      board = board;
      //send the board state to the model to check and complete the task
      model.__proto__.receiveControllerState(piece1, piece2, board);
     
    }
    // if you click outside the range of first
    else if (game_board.off_click(firstClickX, firstClickY, id) === false) {
      //render first clicks all null and return!
      console.log('clicked outside the range');
      //removed the classes in first clicked attr
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
      //reset all valuues null
      game_board.controllerState["id_1"] = null;
      game_board.controllerState["first_click_x"] = null;
      game_board.controllerState["first_click_y"] = null;
      //firstClick in the array
      game_board.controllerState["first_click"] = null;
      //firstAttr tile
      game_board.controllerState["first_attr"] = null;
      //resets the clickhandlers that off-click turned off
      // $(".game_grid_container").on("click", "div");
      return controller.applyClickHandlers();
    }
  }
  //this turns the click handler off all pieces and turns them on just for the adjacent pieces
  off_click(x, y, id) {
    console.log("offclick work!!!!");
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

    console.log("right_id :", right_id);
    console.log("left_id :", left_id);
    console.log("up_id :", up_id);
    console.log("down_id :", down_id);
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
}

var game_board = null;
var controller = null;
var model = null;

//this is so that when i click something outside of the possible move
//let id = game_board.controllerState["id_2"];
// if(game_board.off_click(firstClickX, firstClickY , id) === false){
//   console.log('off click works?');
//   game_board.controllerState["first_click"] = game_board.controllerState["second_click"];
//   game_board.controllerState["second_click"] = null ;

//   game_board.controllerState["first_click_x"] = game_board.controllerState["first_click_y"] ;
//   game_board.controllerState["first_click_y"] = null ;

//   game_board.controllerState["second_click_x"] = game_board.controllerState["second_click_y"] ;
//   game_board.controllerState["second_click_y"] = null ;

//   game_board.controllerState["id_1"] = game_board.controllerState["id_2"] ;
//   game_board.controllerState["id_2"] = null ;

//   game_board.controllerState["first_attr"] = game_board.controllerState["second_attr"] ;
//   game_board.controllerState["second_attr"] = null ;

//   $(".game_grid_container").off("click", "div");
//   controller.applyClickHandlers();
//   return;
// }


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