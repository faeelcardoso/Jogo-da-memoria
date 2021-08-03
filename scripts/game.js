let game = {
  cards: null,
  moves: null,
  firstScore: true,
  lockMode: false,
  firstCard: null,
  secondCard: null,

  score: {
    "lsScore": 0
  },

  techs: [
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
  ],

  setCard: function(id) { // id da carta flipada
    let card = this.cards.filter(card => card.id === id)[0]; // como só tem 1 com o msm ID, só pego ele com o [0]

    if(card.flipped || this.lockMode) { // a carta já foi virada ou está em modo lockMode?
      return false;
    }
    if(!this.firstCard) { // se a primeira carta estiver vazia
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else { 
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function() {
    // Só vai continuar se as duas cartas já foram selecionadas
    if(!this.firstCard || !this.secondCard) { 
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver: function() {
    return this.cards.filter(card => card.flipped).length == 20; // se todas as cartas estiverem flipadas
  },

  // agora faço das funções, métodos de game
  createCardsFromTechs: function() {
    this.cards = [];
  
    this.techs.forEach(tech => {
      this.cards.push(this.createPairFromTech(tech));
        // o único problema que isso sai daqui como, [[{}, {}]]
        // não é exatamente oq eu quero, porém o flatMap resolve
    });
  
    // com o flatMap eu quebro e separo os arrays, agora está assim [{}, {}], porém com o dobro
    this.cards = this.cards.flatMap(pair => pair); 
    this.shuffleCards();
    return this.cards; // já retorna as cartas embaralhadas no jeito
  },
  
  createPairFromTech: function(tech) {
    // aqui vou criar o par de cartas
    return [ 
      {
        id: this.createRandomId(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.createRandomId(tech),
        icon: tech,
        flipped: false,
      }
    ];
  },
  
  createRandomId: tech => {
    return tech + parseInt(Math.random() * 1000);
  },

  shuffleCards: function() {
    // OBJ: estou passando os cards por referência, ou seja, n preciso de spread aq, posso mudar direto
  
    let currentIndex = this.cards.length; // pegando o último index de cards
    let randomIndex = 0;
  
    // poderia fazer com o sort(a, b) tbm, porém bora tenta de outra forma
    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex); //random de 0.1 à 0.9 * currentIndex e salvo sempre abaixo com o floor
      currentIndex--;
      
      // agora só inverter
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
      // let a = 50 - let b = 30 -> [a, b] = [b, a] -> a = 30 - b = 50
    }
  },

  localStorageUpdate() {
    localStorage.setItem("score", JSON.stringify(game.score));
  }
}