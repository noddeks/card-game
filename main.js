document.addEventListener('DOMContentLoaded', () => {
  let cards = [];
  const input = document.querySelector('.start__input');
  const timer = document.querySelector('.timer');

  let hasTurnedCard = true;
  let lockBoard = false;
  let cardOne;
  let cardTwo;
  let cardFace;

  document.querySelector('.start__button').addEventListener('click', function() {
    if (Number(input.value) === 2) {
      generateCards(2);
    } else if (Number(input.value) === 4) {
      generateCards(4);
    } else if (Number(input.value) === 6) {
      generateCards(6);
    } else if (Number(input.value) === 8) {
      generateCards(8);
    } else if (Number(input.value) === 10) {
      generateCards(10);
    } else {
      generateCards(4);
    }

    activeTimer = setInterval(startTimer, 1000);

    document.querySelector('.start').classList.add('start_hidden');
    document.querySelector('.card-container').classList.add('card-container_active');
    document.querySelector('.button').classList.add('button_active');
    document.querySelector('.timer-container').classList.add('timer_active');
  });


  function startTimer() {
    timer.innerHTML = parseInt(timer.innerHTML) + 1;
    if (timer.innerHTML > 60) {
      location.reload();
    }
  }

  function shuffle(array) {
    let j, temp;
    for(let i = array.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  }

  function turnCard() {
    if (lockBoard) return;
    if (this === cardOne) return;

    this.classList.add('card_turned');
    this.children[0].classList.add('card__face_active');

    if (!hasTurnedCard) {
      hasTurnedCard = true;
      cardOne = this;
      return;
    }

    cardTwo = this;
    hasTurnedCard = false;

    checkMatch();
  }

  function checkMatch() {
    if (cardOne.children[0].innerHTML === cardTwo.children[0].innerHTML) {
      disableCards();
      return;
    }
    returnCards();
  }

  function disableCards() {
    cardOne.removeEventListener('click', turnCard);
    cardTwo.removeEventListener('click', turnCard);
  }

  function returnCards() {
    lockBoard = true;
    setTimeout(() => {
      cardOne.classList.remove('card_turned');
      cardOne.children[0].classList.remove('card__face_active');
      cardTwo.classList.remove('card_turned');
      cardTwo.children[0].classList.remove('card__face_active');
      lockBoard = false;
    }, 1000);
  }

  function generateCards(n) {
    for (let i = 0; i < n ** 2; i++) {
       cards.push({
           id: i + 1,
           value: Math.floor(i / 2) + 1,
           state: 'closed',
       })
    }

    shuffle(cards);

    for (let card of cards) {
      cardFace = document.createElement('div');
      cardFace.classList.add('card__face');
      cardFace.innerHTML = card.value;
      card = document.createElement('div');
      card.classList.add('card');
      card.append(cardFace);
      document.querySelector('.card-container').append(card);
      card.addEventListener('click', turnCard);
    }
    return cards;
  }

  document.querySelector('.button').addEventListener('click', () => location.reload());
});
