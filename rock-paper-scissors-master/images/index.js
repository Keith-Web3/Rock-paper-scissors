const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
const rockAdvanced = document.getElementById("rock-1")
const paperAdvanced = document.getElementById("paper-1")
const scissorsAdvanced = document.getElementById("scissors-1")
const lizard = document.getElementById("lizard")
const spock = document.getElementById("spock")
const playerOptions = document.querySelectorAll(".step-1 > .option-container, .step-1-advanced > .option-container")
const score = document.getElementById("score")
const annouceWinner = document.querySelector(".annouce-winner-text")
const stepOne = document.querySelector(".step-1")
const stepOneAdvanced = document.querySelector(".step-1-advanced")
const stepTwo = document.querySelector(".step-2")
const playAgainBtn = document.querySelector(".play-again-btn")
const aside = document.querySelector("aside")
const closeRules = document.querySelector(".close-rules")
const rulesBtn = document.querySelector(".rules-btn")
const rulesImg = document.querySelector(".rules-img")
const advanceBtn = document.querySelector(".advanced")
const headerImg = document.querySelector("header > img")
let playerSelect = document.querySelector(".player-pick").lastElementChild
let computerSelect = document.querySelector(".computer-pick").lastElementChild

closeRules.addEventListener("click", function() {
  aside.style.zIndex = "-1"
  aside.style.opacity = "0"
})
rulesBtn.addEventListener("click", function() {
  aside.style.zIndex = "0"
  aside.style.opacity = "1"
})

let hasClickedAdvanced = false
advanceBtn.addEventListener("click", function() {
  if (hasClickedAdvanced === false) {
    stepOneAdvanced.classList.add('step-1-advanced-minimize')
    stepOne.classList.add('step-1-minimize')
    headerImg.src = "logo-bonus.svg"
    rulesImg.src = "image-rules-bonus.svg"
    headerImg.style.width = "80%"
    this.textContent = "BEGINNER"
    hasClickedAdvanced = true
  } else {
    stepOneAdvanced.classList.remove('step-1-advanced-minimize')
    stepOne.classList.remove('step-1-minimize')
    headerImg.src = "logo.svg"
    rulesImg.src = "image-rules.svg"
    headerImg.style.width = "70%"
    this.textContent = "ADVANCE"
    hasClickedAdvanced = false
  }
  stepTwo.classList.remove("step-2-minimizer")
})
playerOptions.forEach((option, index) => {
  option.addEventListener("click", function() {
    playerSelect.innerHTML = option.innerHTML
    playerSelect.classList.replace(`${playerSelect.classList[1]}`, `${option.classList[1]}`)

    let computerChoice
    if (hasClickedAdvanced === false) {
      computerChoice = Math.floor(Math.random() * 3)
    } else {
      computerChoice = Math.floor(Math.random() * 5) + 3
    }

    computerSelect.innerHTML = playerOptions[computerChoice].innerHTML
    computerSelect.classList.replace(`${computerSelect.classList[1]}`, `${playerOptions[computerChoice].classList[1]}`)

    if (hasClickedAdvanced === false) {
      stepOne.classList.toggle("step-1-minimize")
    } else {
      stepOneAdvanced.classList.toggle("step-1-advanced-minimize")
    }
    stepTwo.classList.toggle("step-2-minimizer")

    function winningChoice(player, computerOne, computerTwo) {
      return index === player && (computerChoice === computerOne || computerChoice === computerTwo)
    }
    function losingChoice(playerOne, playerTwo, computer) {
      return computerChoice === computer && (index === playerOne || index === playerTwo)
    }

    if (index === computerChoice) {
      annouceWinner.textContent = 'TIE'
      return
    }
    if ((index + 1 === computerChoice && index < 3) || (index === 2 && computerChoice === 0) || losingChoice(5, 7, 3) || losingChoice(3, 6, 4) || losingChoice(6, 4, 5) || losingChoice(3, 7, 6) || losingChoice(4, 5, 7)) {
      annouceWinner.textContent = 'YOU LOSE'
      if (Number(score.textContent) !== 0) {
        score.textContent = Number(score.textContent) -1
      }
      return
    }
    if ((index - 1 === computerChoice && index < 3) || (index === 0 && computerChoice === 2) || winningChoice(3, 5, 7) || winningChoice(4, 3, 6) || winningChoice(5, 6, 4) || winningChoice(6, 3, 7) || winningChoice(7, 4, 5)) {
      annouceWinner.textContent = 'YOU WIN'
      score.textContent = Number(score.textContent) + 1
      return
    }
  })
})

playAgainBtn.addEventListener("click", function() {
  if (hasClickedAdvanced === false) {
    stepOne.classList.toggle("step-1-minimize")
  } else {
    stepOneAdvanced.classList.toggle("step-1-advanced-minimize")
  }
  stepTwo.classList.toggle("step-2-minimizer")
})

