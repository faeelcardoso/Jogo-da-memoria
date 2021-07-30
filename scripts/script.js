// já crio minhas classes aq, caso precise mudar, só mudo aq
const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";

let techs = [
  "bootstrap",
  "css",
  "electron",
  "firebase",
  "html",
  "javascript",
  "jquery",
  "mongo",
  "node",
  "react",
];
let cards = null;

startGame();

function startGame() {
  cards = createCardsFromTechs(techs);
  shuffleCards(cards);
  initializeCards(cards);
}

function initializeCards(cards) {
  let gameBoard = document.querySelector("#gameBoard");
  
  cards.forEach(card => { // recebe o array de objetos
    let cardElement = document.createElement("div"); 
    
    // adicionando classes e atributos com o array de objetos já montado
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement); // colocando minha div dentro do gameBoard
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);

  if(face === FRONT) { // se for a parte de cima, coloco a imagem
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/" + card.icon + ".png";

    cardElementFace.appendChild(iconElement);
  } else { // se não, coloco só o simbolo
    cardElementFace.innerHTML = "&lt;/&gt;"
  }

  element.appendChild(cardElementFace);
}

function shuffleCards(cards) {
  // OBJ: estou passando os cards por referência, ou seja, n preciso de spread aq, posso mudar direto

  let currentIndex = cards.length; // pegando o último index de cards
  let randomIndex = 0;

  // poderia fazer com o sort(a, b) tbm, porém bora tenta de outra forma
  while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex); //random de 0.1 à 0.9 * currentIndex e salvo sempre abaixo com o floor
    currentIndex--;
    
    // agora só inverter
    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    // let a = 50 - let b = 30 -> [a, b] = [b, a] -> a = 30 - b = 50
  }
}

function createCardsFromTechs(techs) {
  let cards = [];

  techs.forEach(tech => {
    cards.push(createPairFromTech(tech));
      // o único problema que isso sai daqui como, [[{}, {}]]
      // não é exatamente oq eu quero, porém o flatMap resolve
  });

  // com o flatMap eu quebro e separo os arrays, agora está assim [{}, {}], porém com o dobro
  return cards.flatMap(pair => pair); 
}

function createPairFromTech(tech) {
  // aqui vou criar o par de cartas
  return [ 
    {
      id: createRandomId(tech),
      icon: tech,
      flipped: false,
    },
    {
      id: createRandomId(tech),
      icon: tech,
      flipped: false,
    }
  ];
}

function createRandomId(tech) {
  return tech + parseInt(Math.random() * 1000);
}

function flipCard() {
  console.log(this)
  this.classList.add("flip");
}