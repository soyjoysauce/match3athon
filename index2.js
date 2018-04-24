//Created by Soy on 11/24/17
//DOM event that would replace jquery
// Document.addEventListener('onload',init());
$(document).ready(function() {
  const jewelTileGame = {
    board: new Board(),
    controller: new Controller()
  };
  const { board, controller } = jewelTileGame;
  $(this.jewelTileGame).bind(this);
  console.log("jewelTileGame:", jewelTileGame);
  console.log("init and things are made");
});
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
      west_tile: null
    };
    this.applyClickHandlers();
    this.createTile();
  }
  //function applies click handlers to the pieces on the board and the reset button
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
  //function takes the pieces and generates random with x/y coordinates and a id attribute.
  createTile() {
    let piecesArr = this.pieces_arr;
    let jewelArr = this.jewel_arr;
    //this is the finalized grouping of the y axis
    let finalYAxis = this.y_axis_array;
    let x_axis = 0;
    let y_axis = 7;
    let counter = 1;
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
        console.log("hello", jewelPiece.x);
        let x_val_piece = jewelPiece["x"];
        switch (x_val_piece) {
          case 0:
            y_axis_0.push(jewelPiece);
            console.log("jewelPiece0", y_axis_0);

            break;
          case 1:
            y_axis_1.push(jewelPiece);
            console.log("jewelPiece1", y_axis_1);
            break;
          case 2:
            y_axis_2.push(jewelPiece);
            console.log("jewelPiece2", y_axis_2);
            break;
          case 3:
            y_axis_3.push(jewelPiece);
            console.log("jewelPiece3", y_axis_3);
            break;
          case 4:
            y_axis_4.push(jewelPiece);
            console.log("jewelPiece4", y_axis_4);
            break;
          case 5:
            y_axis_5.push(jewelPiece);
            console.log("jewelPiece5", y_axis_5);
            break;
          case 6:
            y_axis_6.push(jewelPiece);
            console.log("jewelPiece6", y_axis_6);
            break;
          case 7:
            y_axis_7.push(jewelPiece);
            console.log("jewelPiece7", y_axis_7);
            break;
          // default:
          // console.log('default')
        }
        x_axis++;
        counter++;
      });
      jewelArr.push(x_axis_arr);
      y_axis--;
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

  //moveTile() takes in the first and second click and switches it first.
  //check starts to see if any horizontal or vertical matches are happening while loop possibly
  //console.log('',);
  moveTile() {
    //event targeting the click
    this.user_input = event.target.outerHTML;
    console.log("this.user_input", this.user_input);
    let userInput = this.user_input;
    console.log("Input", userInput);

    //variables for this function to access the state
    let id1 = this.controllerState["id_1"];
    let id2 = this.controllerState["id_2"];
    let firstAttr = this.controllerState["first_attr"];
    let secondAttr = this.controllerState["second_attr"];

    //create a filter function for the tiles when clicked;
    const directions = {
      north: "north",
      south: "south",
      east: "east",
      west: "west"
    };
    const { north, south, east, west } = directions;
    const clickableFilter = {
      north: function(id, tile) {
        if (id <= 8) {
          return (tile = null);
        } else {
          return (tile = id - 8);
        }
      },
      south: function(id, tile) {
        if (id > 51) {
          return (tile = null);
        } else {
          return (tile = id + 8);
        }
      },
      east: function(id, tile) {
        if (((id - 1) / 8) % 2 === 0 || 1) {
          return (tile = null);
        } else {
          return (tile = id + 1);
        }
      },
      west: function(id, tile) {
        if ((id / 8) % 2 === 0 || 1) {
          return (tile = null);
        } else {
          return (tile = id - 1);
        }
      }
    };
    //FIRST CLICK : the order of the statement is important
    if (
      this.controllerState["first_click"] === null &&
      this.controllerState["second_click"] === null
    ) {
      //if first click and second click is empty
      this.controllerState["first_click"] = userInput;
      this.controllerState["id_1"] = $(userInput).attr("id");
      this.controllerState["first_attr"] = $(userInput).attr("tile");
      //this captures the values of each div's x and y attributes
      this.controllerState["first_click_x"] = Number($(userInput).attr("x"));
      this.controllerState["first_click_y"] = Number($(userInput).attr("y"));
      console.log("first input_x:", this.controllerState["first_click_x"]);
      console.log("first input_y:", this.controllerState["first_click_y"]);

      let id1 = this.controllerState["id_1"];
      //this is where first click establishes the clickable second tiles
      this.controllerState["north_tile"] = $(
        "[id='" + (parseInt(id1) - 8) + "']"
      ).toggleClass("clickable government");
      this.controllerState["south_tile"] = $(
        "[id='" + (parseInt(id1) + 8) + "']"
      ).toggleClass("clickable government");
      this.controllerState["east_tile"] = $(
        "[id='" + (parseInt(id1) + 1) + "']"
      ).toggleClass("clickable government");
      this.controllerState["west_tile"] = $(
        "[id='" + (parseInt(id1) - 1) + "']"
      ).toggleClass("clickable government");

      console.log("northTile", this.controllerState["north_tile"]);
      console.log("southTile", this.controllerState["south_tile"]);
      console.log("eastTile", this.controllerState["east_tile"]);
      console.log("westTile", this.controllerState["west_tile"]);

      const first_tile = $(userInput).attr("tile");

      console.log("firstClick", this.controllerState["first_click"]);
    }
    //SECOND CLICK :
    else if (
      this.controllerState["first_click"] !== null &&
      $(userInput).attr("class") === "clickable government"
    ) {
      //if first click is not empty and the clicked div has these class "clickable government"
      this.controllerState["second_click"] = userInput;
      console.log("secondClick", this.controllerState["second_click"]);
      this.controllerState["id_2"] = $(userInput).attr("id");
      this.controllerState["second_attr"] = $(userInput).attr("tile");

      //this captures the values of each div's x and y attributes
      this.controllerState["second_click_x"] = Number($(userInput).attr("x"));
      this.controllerState["second_click_y"] = Number($(userInput).attr("y"));

      let secondClickY = this.controllerState["second_click_y"];
      let secondClickX = this.controllerState["second_click_x"];

      let firstClickX = null;
      firstClickX = this.controllerState["first_click_x"];
      let firstClickY = null;
      firstClickY = this.controllerState["first_click_y"];
      console.log("secondClickX:", secondClickX);
      console.log("secondClickY:", secondClickY);
      const second_tile = $(userInput).attr("tile");

      //this switches tile 1 from tile 2
      // secondAttr = [ firstAttr, (firstAttr = secondAttr)][0];
      //after the two clicks and happen this switches the tile attribute which we'll tie to the board pieces
      this.jewel_arr[secondClickX][secondClickY].tile = firstAttr;
      this.jewel_arr[this.controllerState["first_click_x"]][
        this.controllerState["first_click_y"]
      ].tile = secondAttr;
      $("[id='" + id1 + "']").attr("tile", secondAttr);
      $("[id='" + id2 + "']").attr("tile", firstAttr);
      // remove class "clickable government"
      this.controllerState["north_tile"];

      $("div.clickable government").toggleClass("clickable government");
    }
  }
}

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

// let input_x = Number($(this.user_input).attr("x"));
// let input_y = Number($(this.user_input).attr("y"));
// console.log("const input_x:", input_x);
// console.log("const input_y:", input_y);
// const input_id = $(this.user_input).attr("id");
// const input_tile = $(this.user_input).attr("tile");
// console.log("const input_id:", input_id);
// console.log("const input_tile:", input_tile);

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
