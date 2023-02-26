const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas width and height to match the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const margin = 100; // 50 pixels margin
const center_x = canvas.width / 2;
const center_y = canvas.height / 2;
const penalty_area_width = 200;
const penalty_area_height = 300;
const goal_box_width = 50;
const goal_box_height = 100;
const corner_arc_radius = 40;
const center_circle_radius = 75;
const penalty_dot = 100;
const penalty_arc_radius = 125;
const theta = 36 * (Math.PI / 180);

function textInput(
  x,
  y,
  placeholderValue,
  labelInnerHTML,
  rotation = 0,
  offset = 30,
  size = 100
) {
  x_input = x - size / 2;
  x_label = x - size / 2;
  y_input = y - offset;
  y_label = y - 1.7 * offset;
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

const shortside = textInput(
  margin,
  center_y,
  "65",
  "Shortside length",
  -90,
  30
);
const longside = textInput(center_x, margin, "105", "Longside length");

const penaltyAreaHeight = textInput(
  margin + penalty_area_width / 2,
  center_y - penalty_area_height / 2,
  "16.5",
  "Penalty area length"
);
const penaltyAreaWidth = textInput(
  canvas.width - margin - penalty_area_width - 30,
  center_y,
  "40.3",
  "Penalty area width",
  -90
);
const goalBoxHeight = textInput(
  canvas.width - (margin + goal_box_width / 2),
  center_y - goal_box_height / 2,
  "5.5",
  "Goal box height",
  0,
  30,
  40
);
const goalBoxWidth = textInput(
  canvas.width - (margin + goal_box_width),
  center_y,
  "18.3",
  "Goal box width",
  -90,
  50
);
const penaltyDotLength = textInput(
  margin + penalty_dot / 2 + 10,
  center_y - penalty_area_height / 4.5,
  "11",
  "Lenght to penalty dot",
  0,
  30,
  80
);
const centerCircleDiameter = textInput(
  center_x - center_circle_radius - 10,
  center_y,
  "9.15",
  "Center circle diameter",
  -90,
  30,
  120
);
const cornerArcRadius = textInput(
  margin + corner_arc_radius / 2,
  margin,
  "1",
  "Corner arc radius",
  0,
  30,
  40
);
const penaltyArcRadius = textInput(
  margin + penalty_area_width * 0.8,
  center_y,
  "9.15",
  "Penalty arc radius",
  0,
  30,
  100
);

function nextButton() {
  // Add "next" button
  const button = document.createElement("button");
  button.innerHTML = "Next";
  button.style.position = "absolute";
  button.style.bottom = "40px";
  button.style.right = "100px";
  document.body.appendChild(button);
  // Add click event listener to button
  button.addEventListener("click", function () {
    // Execute function when button is clicked
    console.log("Next button clicked!");
    savePaintDimensionsToJson();
  });
}
console.log("nextButton");
// Draw green background
ctx.fillStyle = "#008000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw white lines
ctx.beginPath();
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 6;

// Draw outside lines
ctx.rect(margin, margin, canvas.width - 2 * margin, canvas.height - 2 * margin);

// Draw center line
ctx.moveTo(center_x, margin);
ctx.lineTo(center_x, canvas.height - margin);

// Draw penalty area
ctx.moveTo(margin, center_y - penalty_area_height / 2);
ctx.rect(
  margin,
  center_y - penalty_area_height / 2,
  penalty_area_width,
  penalty_area_height
);
ctx.rect(
  canvas.width - margin - penalty_area_width,
  center_y - penalty_area_height / 2,
  penalty_area_width,
  penalty_area_height
);

// Draw goal box
ctx.rect(
  margin,
  center_y - goal_box_height / 2,
  goal_box_width,
  goal_box_height
);
ctx.rect(
  canvas.width - margin - goal_box_width,
  center_y - goal_box_height / 2,
  goal_box_width,
  goal_box_height
);

// Draw penalty spots
ctx.moveTo(margin + penalty_dot, center_y);
ctx.arc(margin + penalty_dot, center_y, 5, 0, 2 * Math.PI);
ctx.fill();
ctx.moveTo(canvas.width - margin - penalty_dot, center_y);
ctx.arc(canvas.width - margin - penalty_dot, center_y, 5, 0, 2 * Math.PI);
ctx.fill();

// Draw corner arcs

ctx.moveTo(margin, margin);
ctx.arc(margin, margin, corner_arc_radius, 0, 0.5 * Math.PI);
ctx.stroke();

ctx.moveTo(margin, canvas.height - margin);
ctx.arc(
  margin,
  canvas.height - margin,
  corner_arc_radius,
  1.5 * Math.PI,
  2 * Math.PI
);
ctx.stroke();

ctx.moveTo(canvas.width - margin, margin);
ctx.arc(
  canvas.width - margin,
  margin,
  corner_arc_radius,
  0.5 * Math.PI,
  Math.PI
);
ctx.stroke();

ctx.moveTo(canvas.width - margin, canvas.height - margin);
ctx.arc(
  canvas.width - margin,
  canvas.height - margin,
  corner_arc_radius,
  Math.PI,
  1.5 * Math.PI
);
ctx.stroke();

// draw penalty area arc
ctx.moveTo(
  margin + penalty_dot + Math.cos(theta) * penalty_arc_radius,
  center_y + Math.sin(theta) * penalty_arc_radius
);
ctx.arc(margin + penalty_dot, center_y, penalty_arc_radius, -theta, theta);
ctx.stroke();
ctx.moveTo(
  canvas.width - (margin + penalty_dot + Math.cos(theta) * penalty_arc_radius),
  center_y + Math.sin(theta) * penalty_arc_radius
);
ctx.arc(
  canvas.width - (margin + penalty_dot),
  center_y,
  penalty_arc_radius,
  Math.PI - theta,
  Math.PI + theta
);
ctx.stroke();

// Draw center circle
ctx.moveTo(center_x + center_circle_radius, center_y);
ctx.arc(center_x, center_y, center_circle_radius, 0, 2 * Math.PI);
ctx.stroke();

ctx.closePath();

nextButton();
function savePaintDimensionsToJson() {
  paintDimensions = {
    shortside: shortside.value,
    longside: longside.value,
    penaltyAreaHeight: penaltyAreaHeight.value,
    penaltyAreaWidth: penaltyAreaWidth.value,
    goalBoxHeight: goalBoxHeight.value,
    goalBoxWidth: goalBoxWidth.value,
    penaltyDotLength: penaltyDotLength.value,
    centerCircleDiameter: centerCircleDiameter.value,
    cornerArcRadius: cornerArcRadius.value,
    penaltyArcRadius: penaltyArcRadius.value,
  };
  console.log(paintDimensions["penaltyAreaHeight"].value);
  const jsonString = JSON.stringify(paintDimensions);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/save", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(paintDimensions));
}
