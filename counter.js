function showAvailableClicks(button, maxClicks = 0) {
  let buttonText = button.innerText;
  return function () {
      console.log(maxClicks);
      button.innerText = `${buttonText} [${maxClicks}]`;
      maxClicks--;
      if (maxClicks < 0) {
          button.disabled = true;
      }
  }
}

export default showAvailableClicks;
