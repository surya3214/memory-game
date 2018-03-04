let card = document.getElementsByClassName('card')
let cards = [...card]
console.log(cards)

const deck = document.getElementById('card-deck')

let moves = 0, interval
let counter = document.querySelector('.moves')

const stars = document.querySelectorAll('.fa-star')

let matchedCard = document.getElementsByClassName('match')

let starsList = document.querySelectorAll('.stars li')

let closeIcon = document.getElementById('.close')

let modal = document.getElementById('popup1')

let openedCards = []

let cardStates = ['show', 'open', 'match', 'disabled']

// @description Shuffles the given array
function shuffle(array) {
  let currentIndex = array.length
  let randomIndex
  let tmp
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    tmp = array[randomIndex]
    array[randomIndex] = array[currentIndex]
    array[currentIndex] = tmp
  }
  return array
}

document.body.onload = startGame()

function reset() {
  moves = second = minute = hour = 0
  counter.innerHTML = moves
  deck.innerHTML = ""
  Array.prototype.forEach.call(cards, function(item) {
    deck.appendChild(item)
  })
  for (let i = 0; i < cards.length; i++)
    cards[i].classList.remove(cardStates)
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = 'rgb(226, 194, 11)'
    stars[i].style.visibility = 'visible'
  }
  let timer = document.querySelector('.timer')
  timer.innerHTML = '0 mins 0 secs'
  clearInterval(interval)
}

// @ description Game start function
function startGame() {
  cards = shuffle(cards)
  console.log(cards)
  reset()
}

// @description toggle card states
let displayCard = function() {
  console.log('card clicked')
  this.classList.toggle('open')
  this.classList.toggle('show')
  this.classList.toggle('disabled')
}

function cardOpen() {
  openedCards.push(this)
  let len = openedCards.length
  if (len === 2) {
  }
}

function congratulations() {
  // clearInterval(interval)
  // finalTime = timer.innerHTML

  // modal.classList.add('show')
  // let starRating = document.querySelector('.stars').innerHTML

}

for (let i = 0; i < cards.length; i++) {
  card = cards[i]
  card.addEventListener('click', displayCard)
  card.addEventListener('click', cardOpen)
  card.addEventListener('click', congratulations)
}
