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

export function drawBackground(numCombLines) {
  ctx.fillStyle = "#008000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const combLen = (canvas.width - 2 * margin) / (1 * numCombLines);
  console.log(combLen);
  ctx.fillStyle = "#005500";
  for (let i = 0; i < numCombLines / 2; i++) {
    ctx.fillRect(
      margin + 2 * i * combLen,
      margin,
      combLen,
      canvas.height - 2 * margin
    );
  }
}
export function paintLines() {
  // drawBackground(20);
  // Draw white lines
  ctx.beginPath();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 6;
  // draw outer lines
  drawSquare(
    margin,
    margin,
    canvas.width - 2 * margin,
    canvas.height - 2 * margin
  );
  //draw center line
  drawLine(center_x, margin, center_x, canvas.height - margin);
  //draw penalty areas
  drawSquare(
    margin,
    center_y - penalty_area_height / 2,
    penalty_area_width,
    penalty_area_height
  );
  drawSquare(
    canvas.width - margin - penalty_area_width,
    center_y - penalty_area_height / 2,
    penalty_area_width,
    penalty_area_height
  );
  //draw goal boxes
  drawSquare(
    margin,
    center_y - goal_box_height / 2,
    goal_box_width,
    goal_box_height
  );
  drawSquare(
    canvas.width - margin - goal_box_width,
    center_y - goal_box_height / 2,
    goal_box_width,
    goal_box_height
  );
  //draw penalty dots
  drawArc(
    margin + penalty_dot,
    center_y,
    margin + penalty_dot,
    center_y,
    5,
    0,
    2 * Math.PI
  );
  drawArc(
    canvas.width - margin - penalty_dot,
    center_y,
    canvas.width - margin - penalty_dot,
    center_y,
    5,
    0,
    2 * Math.PI
  );
  //draw corner arcs
  drawArc(margin, margin, margin, margin, corner_arc_radius, 0, 0.5 * Math.PI);
  drawArc(
    margin,
    canvas.height - margin,
    margin,
    canvas.height - margin,
    corner_arc_radius,
    1.5 * Math.PI,
    2 * Math.PI
  );
  drawArc(
    canvas.width - margin,
    margin,
    canvas.width - margin,
    margin,
    corner_arc_radius,
    0.5 * Math.PI,
    Math.PI
  );
  drawArc(
    canvas.width - margin,
    canvas.height - margin,
    canvas.width - margin,
    canvas.height - margin,
    corner_arc_radius,
    Math.PI,
    1.5 * Math.PI
  );
  //draw center circle
  drawArc(
    center_x,
    center_y,
    center_x + center_circle_radius,
    center_y,
    center_circle_radius,
    0,
    2 * Math.PI
  );

  // draw penalty area arc
  drawArc(
    margin + penalty_dot,
    center_y,
    margin + penalty_dot + Math.cos(theta) * penalty_arc_radius,
    center_y + Math.sin(theta) * penalty_arc_radius,
    penalty_arc_radius,
    -theta,
    theta
  );
  drawArc(
    canvas.width - margin - penalty_dot,
    center_y,
    canvas.width - margin - penalty_dot - Math.cos(theta) * penalty_arc_radius,
    center_y + Math.sin(theta) * penalty_arc_radius,
    penalty_arc_radius,
    Math.PI - theta,
    Math.PI + theta
  );
  ctx.stroke();
  ctx.closePath();
}

function drawLine(x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}
function drawSquare(x, y, width, height) {
  ctx.moveTo(x, y);
  ctx.rect(x, y, width, height);
}
function drawArc(x_mid, y_mid, x_start, y_start, radius, startAngle, endAngle) {
  ctx.moveTo(x_start, y_start);
  ctx.arc(x_mid, y_mid, radius, startAngle, endAngle);
  ctx.stroke();
}
