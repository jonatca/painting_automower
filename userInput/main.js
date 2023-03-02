import { drawBackground, paintLines } from "./paintLines.js";
import { getUserInput } from "./getUserInput.js";
import { submitButton } from "./submitButton.js";
import { saveToJson } from "./saveToJson.js";

main();
function main() {
  let numCombLines = 20;
  drawBackground(numCombLines);
  paintLines();
  var button = submitButton();
  var inputButtons = getUserInput();
  button.addEventListener("click", function () {
    console.log("Next button clicked!");
    saveToJson(inputButtons);
  });
}
