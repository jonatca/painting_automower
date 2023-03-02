export function submitButton() {
  const button = document.createElement("button");
  button.innerHTML = "Submit";
  button.style.position = "absolute";
  button.style.bottom = "10";
  button.style.right = "200";
  document.body.appendChild(button);
  return button;
}
