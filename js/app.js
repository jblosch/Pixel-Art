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
  const artboard = makeGrid(20, 20);

  $("table").append(artboard);

  if(!localStorage.getItem("rows")) {
    setupStorage();
  } else {
    retrieveStorage();
  }

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

  // EVENT LISTENERS
  $("#color").on("change", function(e) {
    setupStorage();
  });

  $("table").on("mousedown", "td", function(e){
     mouseButtonDown = true;
     if(eraser) {
       $(e.target).css("background-color", "transparent");
     } else {
       $(e.target).css("background-color", "#" + color);
     }
  });

  $("table").on("mouseover", "td", function(e) {
    if(mouseButtonDown) {
      if(eraser) {
        $(e.target).css("background-color", "transparent");
      } else {
        $(e.target).css("background-color", "#" + color);
      }
    }
  });

  $(document).on("mouseup", function(e){
     mouseButtonDown = false;
     setupStorage();
  });

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

  $("#makeGridButton").on("click", function(e) {
    let tableData = makeGrid($("#rows").val(), $("#columns").val());
    $("table").append(tableData);
    setupStorage();
  });

  // GENERATES GRID
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
  if($("#paintbrush").css("color") === "rgb(255, 255, 255)") {
    eraser = false;
  } else {
    eraser = true;
  }
});
