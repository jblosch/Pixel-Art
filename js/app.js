$(function() {

  let rows,
      columns,
      color,
      bgcolor,
      grid,
      eraser,
      toggle,
      brushFG,
      brushBG,
      eraseFG,
      eraseBG;
  let mouseButtonDown = false;
  const artboard = makeGrid(20, 20); // makes starter grid

  $("table").append(artboard); // renders grid to screen

  // Checks if data is already stored. If not, stores and assigns values.
  // Otherwise, just assigns values.
  if(!localStorage.getItem("rows")) {
    setupStorage();
  } else {
    retrieveStorage();
  }

  /**
    @description Stores data from the site in localStorage and executes
    retrieveStorage
  */

  function setupStorage() {
    localStorage.setItem("rows", $("#rows").val());
    localStorage.setItem("columns", $("#columns").val());
    localStorage.setItem("color", $("#color").val());
    localStorage.setItem("bgcolor", $("#color").css("background-color"));
    localStorage.setItem("fgcolor", $("#color").css("color"));
    localStorage.setItem("brushFG", $("#paintbrush").css("color"));
    localStorage.setItem("brushBG", $("#paintbrush").css("background-color"));
    localStorage.setItem("eraseFG", $("#eraser").css("color"));
    localStorage.setItem("eraseBG", $("#eraser").css("background-color"));
    localStorage.setItem("grid", $("table").html());

    retrieveStorage();
  }

  /**
    @description Assigns the values from localStorage to the relevant
    features of the site
  */

  function retrieveStorage() {
    rows = localStorage.getItem("rows");
    columns = localStorage.getItem("columns");
    color = localStorage.getItem("color");
    bgcolor = localStorage.getItem("bgcolor");
    fgcolor = localStorage.getItem("fgcolor");
    brushFG = localStorage.getItem("brushFG");
    brushBG = localStorage.getItem("brushBG");
    eraseFG = localStorage.getItem("eraseFG");
    eraseBG = localStorage.getItem("eraseBG");
    grid = localStorage.getItem("grid");

    $("#rows").val(rows);
    $("#columns").val(columns);
    $("#color").val(color);
    $("#color").css("background-color", bgcolor);
    $("#color").css("color", fgcolor);
    $("#paintbrush").css("color", brushFG);
    $("#paintbrush").css("background-color", brushBG);
    $("#eraser").css("color", eraseFG);
    $("#eraser").css("background-color", eraseBG);
    $("table").find("*").remove();
    $("table").append(grid);
  }

  /**
    @description Creates the rows (<tr>) and columns (<td>) of a table
    @param {number} rows
    @param {number} columns
    @returns {string} table
  */

  function makeGrid(rows, columns) {
    let table = "";

    $("table").find("*").remove();

    for(let i = 0; i < rows; i++) {
      table += "<tr>";
      for(let j = 0; j < columns; j++) {
        table += "<td></td>";
      }
      table += "</tr>";
    }
    return table;
  }

  /**
    @description Reassigns row / column numbers if > 50 or < 1
    @param {number} input - the row or column data
  */

  function limitNumbers(input) {
    if(input.val() > 50) {
      input.val(50);
    }

    if(input.val() < 1) {
      input.val(1);
    }
  }


  /****************
   EVENT LISTENERS
  *****************/

  // listens for a change of color
  $("#color").on("change", function(e) {
    setupStorage();
  });

  // allows a change of the the cell background color when the mouse clicks on it
  $("table").on("mousedown", "td", function(e){
     mouseButtonDown = true;
     if(eraser) {
       $(e.target).css("background-color", "transparent");
     } else {
       $(e.target).css("background-color", "#" + color);
     }
  });

  // allows the user to drag and draw pixels when mouse button is held down
  $("table").on("mouseover", "td", function(e) {
    if(mouseButtonDown) {
      if(eraser) {
        $(e.target).css("background-color", "transparent");
      } else {
        $(e.target).css("background-color", "#" + color);
      }
    }
  });

  // turns off drag and draw feature when button is not pressed
  $(document).on("mouseup", function(e){
     mouseButtonDown = false;
     setupStorage();
  });

  // styles paintbrush icon as selected and allows user to draw on canvas
  $("#paintbrush").on("click", function(e) {
    eraser = false;
    $("#paintbrush").css({
      "background-color" : "rgb(84, 72, 72)",
      "color" : "#fff"
    });

    $("#eraser").css({
      "background-color" : "transparent",
      "color" : "#000"
    });
    setupStorage();
  });

  // styles eraser icon as selected and allows user to erase pixels
  $("#eraser").on("click", function(e) {
    eraser = true;
    $("#eraser").css({
      "background-color" : "rgb(84, 72, 72)",
      "color" : "#fff"
    });

    $("#paintbrush").css({
      "background-color" : "transparent",
      "color" : "#000"
    });
    setupStorage();
  });

  // button used to generate a new grid to draw on
  $("#makeGridButton").on("click", function(e) {

    limitNumbers($("#rows"));
    limitNumbers($("#columns"));

    let tableData = makeGrid($("#rows").val(), $("#columns").val());
    $("table").append(tableData);
    setupStorage();
  });

  /***********************
   END OF EVENT LISTENERS
  ***********************/

  // tests to see if the paintbrush or eraser should be active
  if($("#paintbrush").css("color") === "rgb(255, 255, 255)") {
    eraser = false;
  } else {
    eraser = true;
  }
});
