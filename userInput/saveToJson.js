export function saveToJson(inputButtons) {
  var paintDimensions = {
    shortside: inputButtons.shortside.value,
    longside: inputButtons.longside.value,
    penaltyAreaHeight: inputButtons.penaltyAreaHeight.value,
    penaltyAreaWidth: inputButtons.penaltyAreaWidth.value,
    goalBoxHeight: inputButtons.goalBoxHeight.value,
    goalBoxWidth: inputButtons.goalBoxWidth.value,
    penaltyDotLength: inputButtons.penaltyDotLength.value,
    centerCircleDiameter: inputButtons.centerCircleDiameter.value,
    cornerArcRadius: inputButtons.cornerArcRadius.value,
    penaltyArcRadius: inputButtons.penaltyArcRadius.value,
    numCombLines: inputButtons.numCombLines.value,
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/save", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(paintDimensions));
}
