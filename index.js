//Created by Soy on 11/24/17
//DOM event that would replace jquery
// Document.addEventListener('onload',init());
$(document).ready(function() {
  const jewelTileGame = {
    board: new Board(),
    controller: new Controller(),
    model: new Model()
  };
  const { board, controller, model } = jewelTileGame;
  // $(this.jewelTileGame).bind(this);
  // console.log(this);
  console.log("jewelTileGame:", jewelTileGame);
  console.log("init and things are made");
});

// Controller listens for clicks (2) moves
// first click: picks up the div id of the selected div and instantiates 'clickable divs'
// 'clickable divs' -- checks if the second click matches any of the four directions
// and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process
class Controller {
  constructor() {}

  filterMatch() {}

  sendBoardUpdate() {}

  receiveAndRenderBoardState() {}

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
class Board {
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
    this.createTile();
    this.applyClickHandlers();
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

    //trying to send it to Controller with the jewlArr properties
    console.log("boardState = jewelArr", this.jewel_arr);

    Controller.jewel_Arr = this.jewel_arr;
    console.log("Controller.jewelArr", Controller.jewel_Arr);
  }

  applyClickHandlers() {
    let board = Board();
    $(".game_grid_container").on("click", "div", function() {
      $(
        this.bind(
          board.__proto__.moveTile(
            $(this).attr("x"),
            $(this).attr("y"),
            $(this).attr("id"),
            console.log("this :", this)
          )
        )
      );
    });
    $(".game_grid_container").on("click", ".clickable government", function() {
      $(
        this.bind(
          Board.__proto__.moveTile(
            $(this).attr("x"),
            $(this).attr("y"),
            $(this).attr("id"),
            console.log("this :", this)
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

  //moveTile() takes in the first and second click and switches it first.
  //check starts to see if any horizontal or vertical matches are happening while loop possibly
  //console.log('',);
  moveTile(x, y, id) {
    // let x = null ;
    // let y = null ;
    // let id = null ;
    console.log("x", x);
    console.log("y", y);
    console.log("id", id);
    //event targeting the click
    this.user_input = event.target.outerHTML;
    let userInput = this.user_input;
    console.log("Input", userInput);
    let eventAttr = $(userInput).attr("tile");
    let id1 = this.controllerState["id_1"];
    let id2 = this.controllerState["id_2"];
    //this assigns clicks based on their turns. the order of the statement is important
    if (
      this.controllerState["first_click"] === null &&
      this.controllerState["second_click"] === null
    ) {
      //if first click and second click is empty
      //this captures the values of each div's x and y attributes
      this.controllerState["id_1"] = $(this.user_input).attr("id");
      this.controllerState["first_click_x"] = parseInt(
        $(this.user_input).attr("x")
      );
      this.controllerState["first_click_y"] = parseInt(
        $(this.user_input).attr("y")
      );
      console.log(
        'this.controllerState["id_1"] :',
        this.controllerState["id_1"]
      );
      console.log(
        '1 this.controllerState["first_click_x"] :',
        this.controllerState["first_click_x"]
      );
      console.log(
        '1 this.controllerState["first_click_y"] :',
        this.controllerState["first_click_y"]
      );
      let firstClickX = null;
      let firstClickY = null;
      firstClickX = this.controllerState["first_click_x"];
      console.log("firstClickX", firstClickX);
      firstClickY = this.controllerState["first_click_y"];
      console.log("firstClickY", firstClickY);

      //firstClick in the array
      this.controllerState["first_click"] = this.jewel_arr[firstClickX][
        firstClickY
      ];
      //firstAttr tile
      this.controllerState["first_attr"] = this.jewel_arr[firstClickX][
        firstClickY
      ].tile;

      console.log("firstClick", this.controllerState["first_click"]);
      console.log("firstattr", this.controllerState["first_attr"]);

      console.log("id2", id2);
      $("[id='" + (parseInt(id2) + 8) + "']").removeClass(
        "clickable government"
      );
      $("[id='" + (parseInt(id2) - 1) + "']").removeClass(
        "clickable government"
      );
      $("[id='" + id2 + "']").removeClass("clickable government");
      $("[id='" + (parseInt(id2) + 1) + "']").removeClass(
        "clickable government"
      );
      $("[id='" + (parseInt(id2) - 8) + "']").removeClass(
        "clickable government"
      );
      let id1 = this.controllerState["id_1"];
      $("[id='" + id1 + "']").addClass("clickable government");
      $("[id='" + (parseInt(id1) - 8) + "']").addClass("clickable government");
      $("[id='" + (parseInt(id1) + 8) + "']").addClass("clickable government");
      $("[id='" + (parseInt(id1) + 1) + "']").addClass("clickable government");
      $("[id='" + (parseInt(id1) - 1) + "']").addClass("clickable government");
    } else if (
      this.controllerState["first_click"] !== null &&
      $(this.user_input).attr("class") === "clickable government"
    ) {
      //if first click is not empty and the clicked div has these class "clickable government"
      // console.log("secondClick", this.controllerState["second_click"]);
      this.controllerState["id_2"] = $(this.user_input).attr("id");
      this.controllerState["second_click_x"] = parseInt(
        $(this.user_input).attr("x")
      );
      this.controllerState["second_click_y"] = parseInt(
        $(this.user_input).attr("y")
      );
      let secondClickX = this.controllerState["second_click_x"];
      let secondClickY = this.controllerState["second_click_y"];
      console.log("secondClickX:", secondClickX);
      console.log("secondClickY:", secondClickY);
      // secondClick in array
      this.controllerState["second_click"] = this.jewel_arr[secondClickX][
        secondClickY
      ];
      //secondAttr tile
      this.controllerState["second_attr"] = this.jewel_arr[secondClickX][
        secondClickY
      ].tile;
      // this.controllerState["second_click"] = userInput;
      // this.controllerState["second_attr"] = $(userInput).attr("tile");
      console.log("secondClickX:", secondClickX);
      console.log("secondClickY:", secondClickY);
      let firstClickX = null;
      firstClickX = this.controllerState["first_click_x"];
      let firstClickY = null;
      firstClickY = this.controllerState["first_click_y"];
      console.log("array before change :", this.jewel_arr);
      //this switches tile 1 from tile 2
      // secondAttr = [ firstAttr, (firstAttr = secondAttr)][0];
      //after the two clicks and happen this switches the tile attribute which we'll tie to the board pieces
      this.jewel_arr[secondClickX][secondClickY].tile = [
        this.jewel_arr[firstClickX][firstClickY].tile,
        (this.jewel_arr[firstClickX][firstClickY].tile = this.jewel_arr[
          secondClickX
        ][secondClickY].tile)
      ][0];
      //
      console.log("newly changed array(i hope) :", this.jewel_arr);

      // this.jewel_arr[secondClickX][secondClickY].tile = this.controllerState[
      //   "first_attr"
      // ];
      // this.jewel_arr[firstClickX][firstClickY].tile = this.controllerState[
      //   "second_attr"
      // ];

      console.log(
        'this.controllerState["first_attr"]:',
        this.controllerState["first_attr"]
      );
      console.log(
        'this.controllerState["second_attr"]:',
        this.controllerState["second_attr"]
      );
      let firstAttr = this.controllerState["first_attr"];
      let secondAttr = this.controllerState["second_attr"];
      secondAttr = [firstAttr, (firstAttr = secondAttr)][0];
      console.log("tis.newaee", this.jewel_arr);

      this.jewel_arr = this.receiveStateSendState(
        (this.piece1 = this.controllerState["first_click"]),
        (this.piece2 = this.controllerState["second_click"]),
        (this.board = this.jewel_arr)
      );

      //Last left off: i connected th
      // this is where i call in the newly updated array and evaluate
      //if {
      //function goes here
      //}
      //jquery to actually change the tiles
      $("[id='" + id1 + "']").attr("tile", this.controllerState["second_attr"]);
      $("[id='" + id2 + "']").attr("tile", this.controllerState["first_attr"]);
      // remove class "clickable government"
      this.controllerState["north_tile"];
      $("div.clickable government").toggleClass("clickable government");
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


