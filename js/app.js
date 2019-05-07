/*
Constants
*/
var openedCards = [];
var matchedCards = 0;
var moves = 0;
var starsCount = 0;


/*
 * Create a list that holds all of your cards
 */
const cardsList = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-anchor',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-diamond',
    'fa fa-bomb',
    'fa fa-leaf',
    'fa fa-bomb',
    'fa fa-bolt',
    'fa fa-bicycle',
    'fa fa-paper-plane-o',
    'fa fa-cube'
]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function buildGame() {

    openedCards = [];
    matchedCards = 0;
    moves = 0;

    const cards = shuffle(cardsList);

    const containerCard = document.querySelector('.deck');

    containerCard.innerHTML = "";

    cards.forEach(function (card) {
        containerCard.insertAdjacentHTML(
            'afterbegin',
            `<li class="card">
                <i class="${card}"></i>
            </li>`
        );
    })

    const itemsCard = document.querySelectorAll('.card');
    itemsCard.forEach(function (itemCard) {
        itemCard.addEventListener('click', eventClick);
    })

    document.querySelector('.moves').textContent = 0;
    restartStars();
}

const eventClick = function eventClickListener(event) {
    openCard(event.target);
}

function openCard(card) {

    if (openedCards[0] == card) {
        return;
    }

    card.classList.add("open", "show");

    openedCards.push(card);

    if (openedCards.length == 2) {

        document.querySelector('.moves').textContent = ++moves;

        const itemsCard = document.querySelectorAll('.card');
        itemsCard.forEach(function (itemCard) {
            itemCard.removeEventListener('click', eventClick, false);
        })

        if (openedCards[0].childNodes[1].className == openedCards[1].childNodes[1].className) {
            matchCards(openedCards);
        } else {
            notMatchCards(openedCards);
        }

        openedCards = [];

        fillStars();

        checkWin();
    }
}

function matchCards(openedCards) {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    matchedCards++;

    const itemsCard = document.querySelectorAll('.card');
    itemsCard.forEach(function (itemCard) {
        itemCard.addEventListener('click', eventClick);
    })
}

function notMatchCards(openedCards) {
    openedCards.forEach(card => {
        setTimeout(function () {
            card.classList.remove("open", "show");

            const itemsCard = document.querySelectorAll('.card');
            itemsCard.forEach(function (itemCard) {
                itemCard.addEventListener('click', eventClick);
            })

        }, 1000)
    })
}

function checkWin() {
    if (matchedCards == 8) {
        document.querySelector('#card-panel').className = "game-panel-hide";
        document.querySelector('#win-panel').className = "show-win";

        document.querySelector('.moves-win').textContent = moves;
        document.querySelector('.start-count').textContent = starsCount;

        matchedCards = 0;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    buildGame();
});

document.querySelector('#btn-newgame').addEventListener('click', function () {
    document.querySelector('#card-panel').className = "game-panel-show";
    document.querySelector('#win-panel').className = "hide-win";

    buildGame();
})


document.querySelector('.restart').addEventListener('click', function () {
    buildGame();
});

function fillStars() {

    const starsTwo = document.querySelector('#start-two');
    const starsThree = document.querySelector('#start-three');

    className = "fa fa-star-o";

    if (moves > 12 && moves <= 16) {
        starsThree.className = className;
        starsCount = 2;
    } else if (moves > 16) {
        starsThree.className = className;
        starsTwo.className = className;
        starsCount = 1;
    }else{
        starsCount = 3;
    }

}

function restartStars() {
    document.querySelector('#start-two').className = "fa fa-star";
    document.querySelector('#start-three').className = "fa fa-star";
}