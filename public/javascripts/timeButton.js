// console.log("miau")

// document.querySelector("#timeButton").onclick = function() {
//   var gameDurationInSeconds = 5;
//   console.log("miau")
//   finishTime = moment()
//     .add(gameDurationInSeconds, "seconds")
//     .format("LTS");

//   const intervalID = setInterval(() => {
//     const currentTime = moment().format("LTS");

//     if (finishTime === currentTime) {
//       console.log("game over");
//       clearInterval(intervalID);
//     } else
//       console.log(
//         "todavia no es el fin del juego " + currentTime + " **** " + finishTime
//       );
//   }, 1000);
// };

let readyBtn = document.querySelectorAll(".ready");



readyBtn[0].addEventListener ("click", () => {
  readyBtn[0].remove()
})

readyBtn[1].addEventListener ("click", () => {
  readyBtn[1].remove()
})

readyBtn[2].addEventListener ("click", () => {
  readyBtn[2].remove()
})

