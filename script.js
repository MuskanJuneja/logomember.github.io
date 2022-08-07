const cards = document.querySelectorAll(".card");
var movtext = document.querySelector('.moves span')
var moves = 0;
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
var time = 91; var time2 = 6;
var t;
var t2;
var timer = document.querySelector('.timer span')
const gaintime2 = () => {
    t2 = setTimeout(() => {
        if (time2 != 0) {
            time2 = time2 - 1;
            timer.textContent = "starts in " + time2;
            gaintime2()
        }
        else {
            start()
        }
    },1000)
}
const gaintime = () => {
    t = setTimeout(() => {
        if (time != 0) {
            time = time - 1;
            timer.textContent = time;
            gaintime()
        }
        else {
            end()
            return shuffleCard()
        }
    }, 1000)
}
const correct = new Audio('assets/audio2.mpeg')
const wrong = new Audio('assets/audio1.mpeg')
function flipCard({ target: clickedCard }) {
    moves = moves + 0.5;
    movtext.textContent = Math.floor(moves);
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if (img1 === img2) {
        correct.play();
        matched++;
        if (matched == 8) {
            setTimeout(() => {
                end()
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    wrong.play()
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `assets/${arr[i]}.jpg`;
        card.addEventListener("click", flipCard);
    });
}
const start = () => {
    clearTimeout(t2)
    shuffleCard();
    gaintime();
}
gaintime2()
function end() {
    clearTimeout(t)
    timer.textContent = 'end'
    movtext.textContent=''
    window.alert("Game ended")
    //FROM HERE SCORE WILL BE SENT TO DATABASE
}
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});