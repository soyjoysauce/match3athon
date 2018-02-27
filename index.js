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
  $(this.jewelTileGame).bind(this);
  console.log("jewelTileGame:", jewelTileGame);
  console.log("init and things are made");
});

// Board randomly generates pieces and sends the most current state of the board to Controller
// Board receives the updated state of the board from the Model
class Board {
  constructor() {
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
        // console.log("jewelPiece:", jewelPiece);
        // console.log("axis_arr:", axis_arr);
        x_axis++;
        y_axis++;
        counter++;
      });
      jewelArr.push(axis_arr);
      // console.log("axis_arr", axis_arr);
      // console.log("jewelArr", jewelArr);
    }
    // console.log('xAxis',xAxis);
    let board_state = jewelArr;
    console.log("board_state", board_state);
    this.sendControllerBoardState(board_state);
  }

  sendControllerBoardState(board_state) {
    //if there is something in the jewelArr -- send this to controller state
    this.controllerState = board_state;
    console.log("controllerState:", this.controllerState);
    // controllerState !== null ? Controller.controllerState = board_state : 'error';
    // console.log('Controller.controllerState:',Controller.controllerState);
  }
}

// Controller listens for clicks (2) moves
// first click: picks up the div id of the selected div and instantiates 'clickable divs'
// 'clickable divs' -- checks if the second click matches any of the four directions
// and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process
/** this is the outline of the controllerState or how it should be
    this.controllerState = {
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
  constructor() {
    super(constructor);
    this.controllerState = {
      first_click: null,
      second_click: null,
      north_tile: null,
      south_tile: null,
      east_tile: null,
      west_tile: null,
      correctTiles: {
        north: function north(first_click, north_tile) {
          return first_click; /** this returns position of the tile north of the first click **/
        },
        south: function south(first_click, south_tile) {
          return first_click; /** this returns position of the tile south of the first click **/
        },
        east: function east(first_click, east_tile) {
          return first_click; /** this returns position of the tile east of the first click **/
        },
        west: function west(first_click, west_tile) {
          return first_click; /** this returns position of the tile wast of the first click **/
        }
      }
    };
    this.applyClickHandlers();
  }

  applyClickHandlers() {
    $(".game_grid_container").on("click", "div", this.moveTile.bind(this));
    
    $(".game_grid_container").on(
      "click",
      ".clickable",
      this.moveTile.bind(this)
    );

    $("#reset").on("click", function() {
      location.reload();
      model.display_stats();
    });
    $(".game_reset_button").on("click", function() {
      location.reload();
      model.display_stats();
    });
  }

  moveTile() {
    let user_input = event.target.outerHTML;
    console.log("user_input", $(user_input).attr("id"));
    // let northTile = this.controllerState["north_tile"] ;
    // let southTile = this.controllerState["south_tile"] ;
    // let eastTile = this.controllerState["east_tile"] ;
    // let westTile = this.controllerState["west_tile"] ;

    let id_1 = null;
    let id_2 = null;
    let tile_1 = null;  
    let tile_2 = null; 

    if (this.controllerState["first_click"] === null) {
      this.controllerState["first_click"] = user_input;
      let id_1 = $(user_input).attr("id");
      console.log('id',id_1);
      let tile_1 = $(user_input).attr("tile");
      console.log('tile',tile_1);
      console.log("first_click", this.controllerState["first_click"]);
      let northTile = $("[id='" + (parseInt(id_1) - 8) + "']").addClass("clickable government");
      console.log('northTile',northTile);
      let southTile = $("[id='" + (parseInt(id_1) + 8) + "']").addClass("clickable government");
      console.log('southTile',southTile);
      let eastTile =  $("[id='" + (parseInt(id_1) + 1) + "']").addClass("clickable government");
      console.log('eastTile',eastTile);
      let westTile =  $("[id='" + (parseInt(id_1) - 1) + "']").addClass("clickable government");
      console.log('westTile',westTile);
    } 
    //controller state takes the first click and establishes the clickables. 
    else if(this.controllerState["first_click"] !== null && $(this.user_input).attr("class") === "clickable government") {
      //second click assignement will take the controller state and switch the arrtibutes of thev id img
      //
      this.controllerState["second_click"] = user_input;
      let id_2 = $(user_input).attr("id");
      console.log('id',id_2);
      let tile_2 = $(user_input).attr("tile");
      console.log('tile',tile_2);
      // 
      console.log('before = tile_1',tile_1);
      console.log('before = tile_2',tile_2);
      tile_2 = tile_1 ;
      // tile_1 = tile_2 ;
      console.log('aftr = tile_1',tile_1);
      console.log('aftr = tile_2',tile_2);

      console.log("second_click", this.controllerState["second_click"]);
      let northTile = $("[id='" + (parseInt(id_2) - 8) + "']").addClass("government");
      console.log('northTile',northTile);
      let southTile = $("[id='" + (parseInt(id_2) + 8) + "']").addClass("government");
      console.log('southTile',southTile);
      let eastTile =  $("[id='" + (parseInt(id_2) + 1) + "']").addClass("government");
      console.log('eastTile', eastTile);
      let westTile =  $("[id='" + (parseInt(id_2) - 1) + "']").addClass("government");
      console.log('westTile', westTile);
    }
  }

  receiveAndRenderBoardState() {

  }

  filterMatch() {}

  sendBoardUpdate() {}

  displayStats() {}
}

// Model takes the tiles matched from Controller and removes/replaces them.
// Removes and Replaces Y first and then x
// Also listens to the Board state and runs a check on every x and y axis
// Also in charge of keeping the state of the scores in the game

class Model extends Controller {
  constructor() {
    super(constructor);
    this.board_update = [];
    this.updated_board = [];
  }

  receiveControllerState() {}

  removeReplaceState() {}

  sendNewBoard() {}
}
