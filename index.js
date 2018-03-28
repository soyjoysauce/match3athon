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
  constructor(jewel_arr) {
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
        y_axis++;
        counter++;
      });
      jewelArr.push(axis_arr);
      y_axis = 1;
      x_axis++;
    }
    //assigns the constructor with the saved arrays of tiles randomized
    this.jewel_arr = jewelArr;
    console.log("boardState = jewelArr", this.jewel_arr);
    this.sendControllerBoardState(jewelArr);
  }

  sendControllerBoardState(arrays) {
    
  }
}

// Controller listens for clicks (2) moves
// first click: picks up the div id of the selected div and instantiates 'clickable divs'
// 'clickable divs' -- checks if the second click matches any of the four directions
// and checks the x y axis for match
// finds the x and y axis of the matches and sends to Model to process
class Controller extends Board{
  constructor() {
    super(jewel_arr);
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

    console.log('this.jewel_arr',this.jewel_arr);
  }

  moveTile() {
    this.user_input = event.target.outerHTML;
    // let user_input = this.user_input;
    let jewelArr = Board.jewel_arr ;
    let id1 = this.controllerState["id_1"];
    let id2 = this.controllerState["id_2"];
    let firstAttr = this.controllerState["first_attr"];
    let secondAttr = this.controllerState["second_attr"];

    const input_id = $(this.user_input).attr("id");
    const input_tile = $(this.user_input).attr("tile");
    const input_x = Number($(this.user_input).attr("x"));
    const input_y = Number($(this.user_input).attr("y"));

    console.log("const input_tile:", input_tile);
    console.log("const input_x:", input_x);
    console.log("const input_y:", input_y);
    console.log("const input_id:", input_id);

    if (this.controllerState["first_click"] === null) {
      this.controllerState["first_click"] = this.user_input;
      let id1 = input_id;
      console.log("id1 from input_id:", id1);
      this.switchAttributes(input_x, input_y, jewelArr);

      this.controllerState["north_tile"] = $(
        "[id='" + (parseInt(id1) - 8) + "']"
      ).addClass("clickable government");
      // console.log("northTile", northTile);
      this.controllerState["south_tile"] = $(
        "[id='" + (parseInt(id1) + 8) + "']"
      ).addClass("clickable government");
      // console.log("southTile", southTile);
      this.controllerState["east_tile"] = $(
        "[id='" + (parseInt(id1) + 1) + "']"
      ).addClass("clickable government");
      // console.log("eastTile", eastTile);
      this.controllerState["west_tile"] = $(
        "[id='" + (parseInt(id1) - 1) + "']"
      ).addClass("clickable government");
      // console.log("westTile", westTile);
    } else if (
      this.controllerState["first_click"] !== null &&
      $(this.user_input).attr("class") === "clickable government"
    ) {
      //controller state takes the first click and establishes the clickables.
      //second click assignement will take the controller state and switch the arrtibutes of the id img
      this.controllerState["second_click"] = this.user_input;
      let id2 = input_id;
      console.log("id2 from input_id:", id2);


      let tile1 = this.controllerState["first_click"];
      let tile2 = this.controllerState["second_click"];
      console.log("before tile1:", tile1);
      console.log("before tile2:", tile2);
      //this switches tile 1 from tile 2
      tile2 = [tile1, (tile1 = tile2)][0];
      console.log("aftr tile1:", this.controllerState["first_click"]);
      console.log("aftr tile2:", this.controllerState["second_click"]);
      this.jewel_arr[second_click_x][second_click_y].tile = first_attr;
      this.jewel_arr[first_click_x][first_click_y].tile = second_attr;
      $("[id='" + id1 + "']").attr("tile", tile2);
      $("[id='" + id2 + "']").attr("tile", tile1);
    }
  }

  switchAttributes(input_x, input_y, jewelArr) {
    let x = input_x;
    let y = input_y;
    let jewelArr =this.jewel_Arr
    console.log(jewelArr);
    let firstAttr = jewel_Arr[x][y].tile;
    console.log("firstAttr:", firstAttr);
  }

  filterMatch() {}

  sendBoardUpdate() {}

  receiveAndRenderBoardState() {}

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
