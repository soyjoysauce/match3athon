//Created by Soy on 11/24/17
//DOM event that would replace jquery
// Document.addEventListener('onload',init());
$(document).ready(function() {
  // board = new Board(this);
  const jewelTileGame = {
    board: new Board(this),
    controller: new Controller(this)
  };
  const { board, controller } = jewelTileGame;
  $(this.jewelTileGame).bind(this);
  console.log("board :", board);
  console.log("controller :", controller);
  // console.log("jewelTileGame:", jewelTileGame);
  console.log("init and things are made");
});
// Controller listens for clicks (2) moves
// first click: picks up the div id of the selected div and instantiates 'clickable divs'
// 'clickable divs' -- checks if the second click matches any of the four directions
// and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process
class Controller {
  constructor() {
    this.Board = new Board(this);
    var game_board = this.Board;
    this.Board.createTile();
    this.applyClickHandlers();
  }
  //function applies click handlers to the pieces on the board and the reset button
  applyClickHandlers() {
    // Board = this.board;
    // const game_Board = Board.___proto__;
    $(".game_grid_container").on("click", "div", function() {
      console.log("click", this);
      Controller.prototype.moveTile(
        $(this).attr("x"),
        $(this).attr("y"),
        $(this).attr("id")
      );
    });
    $(".game_grid_container").on("click", ".clickable", function() {
      console.log("click");
      Controller.prototype.moveTile(
        $(this).attr("x"),
        $(this).attr("y"),
        $(this).attr("id")
      );
    });
    // $(".game_grid_container").on("click", "div", this.moveTile.bind(this));
    // $(".game_grid_container").on(
    //   "click",
    //   ".clickable",
    //   this.moveTile.bind(this)
    // );
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
    let first_click = null;
    let second_click = null;
    let first_click_x = null;
    let second_click_x = null;
    let first_click_y = null;
    let second_click_y = null;
    let id_1 = null;
    let id_2 = null;
    let first_attr = null;
    let second_attr = null;
    let north_tile = null;
    let south_tile = null;
    let east_tile = null;
    let west_tile = null;

    //FIRST CLICK : the order of the statement is important
    //if first click and second click is empty
    if (first_click && second_click === null) {
      //new
      //assigns the first click x and y coordinates of the piece that was clicked
      first_click_x = x;
      first_click_y = y;
      first_attr = this.jewel_arr[x][y].tile;
      first_click = this.jewel_arr[x][y]; //saves the tile attribute for the first piece for the sway

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

      
    }
    //SECOND CLICK :if first click is not empty
    //and the clicked div has these class "clickable government"
    else if (
      this.controllerState["first_click"] !== null &&
      $(userInput).attr("class") === "clickable government"
    ) {
      //this captures the values of each div's x and y attributes
      this.controllerState["second_click"] = userInput;
      this.controllerState["id_2"] = $(userInput).attr("id");
      this.controllerState["second_attr"] = $(userInput).attr("tile");
      this.controllerState["second_click_x"] = Number($(userInput).attr("x"));
      this.controllerState["second_click_y"] = Number($(userInput).attr("y"));
      let firstClickX = null;
      let firstClickY = null;
      let secondClickY = this.controllerState["second_click_y"];
      let secondClickX = this.controllerState["second_click_x"];
      firstClickX = this.controllerState["first_click_x"];
      firstClickY = this.controllerState["first_click_y"];
      let second_tile = this.controllerState["second_attr"];
      // console.log("second_tile :", second_tile);
      // console.log("firstClickY :", firstClickY);
      // console.log("firstClickY :", firstClickY);
      // console.log("secondClickX :", secondClickX);
      // console.log("secondClickY :", secondClickY);
      // console.log("secondClick", this.controllerState["second_click"]);

      //this switches tile 1 from tile 2
      //after the two clicks and happen this switches the tile attribute which we'll tie to the board pieces
      console.log("1", firstAttr);
      console.log("1", secondAttr);
      this.jewel_arr[secondClickX][secondClickY].tile = firstAttr;
      this.jewel_arr[firstClickX][firstClickY].tile = secondAttr;
      secondAttr = [firstAttr, (firstAttr = secondAttr)][0];
      console.log("2", firstAttr);
      console.log("2", secondAttr);
      //this should be wrapped in a function
      //takes in the first and the second click switched array in this.jewel_arr
      // checks inside that array if the match happens
      // if it does do switch pieces

      let first_piece = this.controllerState["second_click"];
      let second_piece = this.controllerState["first_click"];
      let piece1 = first_piece;
      let piece2 = second_piece;
      let board = this.jewel_arr;
      this.jewel_arr = this.receiveStateSendState();
      // if(this.receiveStateSendState(piece1 = first_piece,piece2 = second_piece, board = this.jewel_arr) = true ){
      //   $("[id='" + id1 + "']").attr("tile", secondAttr);
      //   $("[id='" + id2 + "']").attr("tile", firstAttr);
      //   console.log('success!')
      // }
      // else{
      // // if the check array returns false
      // // remove class "clickable government"
      // // reset all the states to null
      // console.log('no match? error?')
      // $(".game_grid_container").removeClass(".clickable .government");
      // }
    }
  }

  //takes in a board state and the pieces acted upon by the player and sends the info to the evaluation portion
  receiveStateSendState(piece1, piece2, board) {
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
      $("[id='" + first_id + "']").attr("tile", p2tile);
      $("[id='" + second_id + "']").attr("tile", p1tile);
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
      model.matches += 1;
    }
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayYAxis.length > 2) {
      for (var i = 0; i < matchArrayYAxis.length; i++) {
        model.score += 1;
        var match_id = matchArrayYAxis[i].id;
        board[matchArrayYAxis[i].x][matchArrayYAxis[i].y].tile = null;
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    }
    //checks to see if the recorded matches align with the required amount of matches and if so destroys the pieces by setting
    //their defining value to null
    if (matchArrayXAxis.length > 2) {
      for (var i = 0; i < matchArrayXAxis.length; i++) {
        model.score += 1;
        var match_id = matchArrayXAxis[i].id;
        board[matchArrayXAxis[i].x][matchArrayXAxis[i].y].tile = null;
        $("[id='" + match_id + "']").attr("tile", "empty");
      }
    }

    //returns augmented board
    return board;
  }
  filterMatch() {}

  sendBoardUpdate() {}

  receiveAndRenderBoardState() {}

  displayStats() {}
}

// Board randomly generates pieces and sends the most current state of the board to Controller
// Board receives the updated state of the board from the Model
class Board {
  constructor() {
    this.jewel_arr = [];
    this.y_axis_array = [];
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

  //function takes the pieces and generates random with x/y coordinates and a id attribute.
  createTile() {
    //this is the finalized grouping of the y axis
    let finalYAxis = this.y_axis_array;
    let piecesArr = this.pieces_arr;
    let jewelArr = this.jewel_arr;
    let x_axis = 0;
    let y_axis = 0;
    let counter = 1;
    //this is all the y axis that will be pushed in the switch below
    let y_axis_0 = [];
    let y_axis_1 = [];
    let y_axis_2 = [];
    let y_axis_3 = [];
    let y_axis_4 = [];
    let y_axis_5 = [];
    let y_axis_6 = [];
    let y_axis_7 = [];

    //while the jewelArr length is less then 8 (*at start it is empty)
    while (jewelArr.length < 8) {
      let x_axis_arr = [];
      //pieces are randomized and pushed into arrays
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
        //somewhere here i have to make a y axis array
        //this array does not append to the dom first
        $(".game_grid_container").append(jewelPiece.info.clone());
        x_axis_arr.push(jewelPiece);
        // console.log("hello", jewelPiece.x);
        let x_val_piece = jewelPiece["x"];
        switch (x_val_piece) {
          case 0:
            y_axis_0.push(jewelPiece);
            // console.log("jewelPiece0", y_axis_0);
            break;
          case 1:
            y_axis_1.push(jewelPiece);
            // console.log("jewelPiece1", y_axis_1);
            break;
          case 2:
            y_axis_2.push(jewelPiece);
            // console.log("jewelPiece2", y_axis_2);
            break;
          case 3:
            y_axis_3.push(jewelPiece);
            // console.log("jewelPiece3", y_axis_3);
            break;
          case 4:
            y_axis_4.push(jewelPiece);
            // console.log("jewelPiece4", y_axis_4);
            break;
          case 5:
            y_axis_5.push(jewelPiece);
            // console.log("jewelPiece5", y_axis_5);
            break;
          case 6:
            y_axis_6.push(jewelPiece);
            // console.log("jewelPiece6", y_axis_6);
            break;
          case 7:
            y_axis_7.push(jewelPiece);
            // console.log("jewelPiece7", y_axis_7);
            break;
          // default:
          // console.log('default')
        }
        x_axis++;
        counter++;
      });
      jewelArr.push(x_axis_arr);
      y_axis++;
      //resets the x axis counter for horizontal count
      x_axis = 0;
    }
    //push the finalized arrays into the finalYAxis in the state
    finalYAxis.push(
      y_axis_0,
      y_axis_1,
      y_axis_2,
      y_axis_3,
      y_axis_4,
      y_axis_5,
      y_axis_6,
      y_axis_7
    );
    console.log("finalYAxis", finalYAxis);
    //assigns the constructor with the saved arrays of tiles randomized
    this.jewel_arr = jewelArr;
    //trying to send it to Controller with the jewlArr properties
    //this.jewel arr is essentially all the logged x axis;
    console.log("boardState = jewelArr", this.jewel_arr);
  }

  display_stats() {
    if (model.score > localStorage.personalBest) {
      localStorage.personalBest = model.score;
    }
    $("#personal_best_value").text(localStorage.personalBest);
    $("#score_value").text(model.score);
    $("#stats_value").text(model.matches + "/" + model.fails);
  }

  handleResetClick() {
    console.log("GET");
    this.matches = 0;
    this.fails = 0;
    this.score = 0;
  }
}

var game_board = null;

// class Model {
//   constructor() {

//     this.pieces_arr = [
//       "blue-diamond-tile",
//       "compass-tile",
//       "flower-tile",
//       "pink-diamond-tile",
//       "purple-pentagon-tile",
//       "red-flower-tile",
//       "star-tile",
//       "yellow-diamond-tile"
//     ];
//     this.updated_board = [];
//   }

//   receiveControllerState() {}

//   removeReplaceState() {}

//   sendNewBoard() {}
// }


//old first click function 
      //this captures the values first_clicks attributes and saves them into state
      // this.controllerState["first_click"] = userInput;
      // this.controllerState["id_1"] = $(userInput).attr("id");
      // this.controllerState["first_attr"] = $(userInput).attr("tile");
      // this.controllerState["first_click_x"] = Number($(userInput).attr("x"));
      // this.controllerState["first_click_y"] = Number($(userInput).attr("y"));
      // console.log("first_click :", this.controllerState["first_click"]);
      // console.log("first input_x:", this.controllerState["first_click_x"]);
      // console.log("first input_y:", this.controllerState["first_click_y"]);
      // let id1 = this.controllerState["id_1"];
      //this is where first click establishes the clickable second tiles
      // north_tile = $("[id='" + (parseInt(id1) - 8) + "']").toggleClass(
      //   "clickable government"
      // );
      // south_tile = $("[id='" + (parseInt(id1) + 8) + "']").toggleClass(
      //   "clickable government"
      // );
      // east_tile = $("[id='" + (parseInt(id1) + 1) + "']").toggleClass(
      //   "clickable government"
      // );
      // west_tile = $("[id='" + (parseInt(id1) - 1) + "']").toggleClass(
      //   "clickable government"
      // );
      // console.log("northTile :", this.controllerState["north_tile"]);
      // console.log("southTile :", this.controllerState["south_tile"]);
      // console.log("eastTile :", this.controllerState["east_tile"]);
      // console.log("westTile :", this.controllerState["west_tile"]);
      // const first_tile = $(userInput).attr("tile");
      // console.log("first_tile :", first_tile);


      //create a filter function for the tiles when clicked;
  // const directions = {
  //   north: "north",
  //   south: "south",
  //   east: "east",
  //   west: "west"
  // };
  // const { north, south, east, west } = directions;
  // const clickableFilter = {
  //   north: function(id, tile) {
  //     if (id <= 8) {
  //       return (tile = null);
  //     } else {
  //       return (tile = id - 8);
  //     }
  //   },
  //   south: function(id, tile) {
  //     if (id > 51) {
  //       return (tile = null);
  //     } else {
  //       return (tile = id + 8);
  //     }
  //   },
  //   east: function(id, tile) {
  //     if (((id - 1) / 8) % 2 === 0 || 1) {
  //       return (tile = null);
  //     } else {
  //       return (tile = id + 1);
  //     }
  //   },
  //   west: function(id, tile) {
  //     if ((id / 8) % 2 === 0 || 1) {
  //       return (tile = null);
  //     } else {
  //       return (tile = id - 1);
  //     }
  //   }
  // };

  //old moveTile var
    //event targeting the click
    // this.user_input = event.target.outerHTML;
    // console.log("this.user_input", this.user_input);
    // let userInput = this.user_input;
    // console.log("Input", userInput);
    //variables for this function to access the state
    // let id1 = this.controllerState["id_1"];
    // let id2 = this.controllerState["id_2"];
    // let firstAttr = this.controllerState["first_attr"];
    // let secondAttr = this.controllerState["second_attr"];