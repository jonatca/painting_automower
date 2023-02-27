import { drawBackground, paintLines } from "./paintLines.js";

import {
  ctx,
  canvas,
  center_x,
  center_y,
  margin,
  penalty_area_width,
  penalty_area_height,
  goal_box_width,
  goal_box_height,
  corner_arc_radius,
  center_circle_radius,
  penalty_dot,
  penalty_arc_radius,
  theta,
} from "./pixelConstants.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export function getUserInput() {
  const shortside = makeInputBox(
    margin,
    center_y,
    "65",
    "Shortside length",
    -90,
    30
  );
  const longside = makeInputBox(center_x, margin, "105", "Longside length");
  const penaltyAreaHeight = makeInputBox(
    margin + penalty_area_width / 2,
    center_y - penalty_area_height / 2,
    "16.5",
    "Penalty area length"
  );
  const penaltyAreaWidth = makeInputBox(
    canvas.width - margin - penalty_area_width - 30,
    center_y,
    "40.3",
    "Penalty area width",
    -90
  );
  const goalBoxHeight = makeInputBox(
    canvas.width - (margin + goal_box_width / 2),
    center_y - goal_box_height / 2,
    "5.5",
    "Goal box height",
    0,
    30,
    40
  );
  const goalBoxWidth = makeInputBox(
    canvas.width - (margin + goal_box_width),
    center_y,
    "18.3",
    "Goal box width",
    -90,
    50
  );
  const penaltyDotLength = makeInputBox(
    margin + penalty_dot / 2 + 10,
    center_y - penalty_area_height / 4.5,
    "11",
    "Lenght to penalty dot",
    0,
    30,
    80
  );
  const centerCircleDiameter = makeInputBox(
    center_x - center_circle_radius - 10,
    center_y,
    "9.15",
    "Center circle diameter",
    -90,
    30,
    120
  );
  const cornerArcRadius = makeInputBox(
    margin + corner_arc_radius / 2,
    margin,
    "1",
    "Corner arc radius",
    0,
    30,
    40
  );
  const penaltyArcRadius = makeInputBox(
    margin + penalty_area_width * 0.8,
    center_y,
    "9.15",
    "Penalty arc radius",
    0,
    30,
    100
  );
  const numCombLines = makeInputBox(
    canvas.width - (margin + penalty_area_width),
    margin,
    "20",
    "Number of combing lines"
  );
  // Event listener for text input
  numCombLines.addEventListener("input", () => {
    var combLinesValue = parseFloat(numCombLines.value);
    if (isNaN(combLinesValue)) {
      combLinesValue = 0;
    }
    console.log("Number of combing lines: " + combLinesValue);
    drawBackground(numCombLines.value);
    paintLines();
  });
  var inputButtons = {
    shortside: shortside,
    longside: longside,
    penaltyAreaHeight: penaltyAreaHeight,
    penaltyAreaWidth: penaltyAreaWidth,
    goalBoxHeight: goalBoxHeight,
    goalBoxWidth: goalBoxWidth,
    penaltyDotLength: penaltyDotLength,
    centerCircleDiameter: centerCircleDiameter,
    cornerArcRadius: cornerArcRadius,
    penaltyArcRadius: penaltyArcRadius,
    numCombLines: numCombLines,
  };
  return inputButtons;
}

function makeInputBox(
  x,
  y,
  placeholderValue,
  labelInnerHTML,
  rotation = 0,
  offset = 30,
  size = 100
) {
  let x_input = x - size / 2;
  let x_label = x - size / 2;
  let y_input = y - offset;
  let y_label = y - 1.7 * offset;
  if (rotation === -90) {
    x_input = x - 2.5 * offset;
    x_label = x - 2.5 * offset - 33;
    y_input = y - size / 2 + margin / 2;
    y_label = y - size / 2 + margin / 2;
  }
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholderValue;
  input.value = placeholderValue;
  input.style.position = "absolute";
  input.style.left = `${x_input}px`;
  input.style.top = `${y_input}px`;
  input.style.width = size + "px";
  input.style.transform = "rotate(" + rotation + "deg)";

  const label = document.createElement("label");
  label.innerHTML = labelInnerHTML;
  label.style.position = "absolute";
  label.style.left = `${x_label}px`;
  label.style.top = `${y_label}px`;
  label.style.transform = "rotate(" + rotation + "deg)";

  document.body.appendChild(label);
  document.body.appendChild(input);

  // Variable to store the float
  //delete this
  let userFloat = null;
  // Event listener for text input
  input.addEventListener("input", () => {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      userFloat = value;
      console.log(userFloat);
    } else {
      console.log(value);
    }
  });
  return input;
}
