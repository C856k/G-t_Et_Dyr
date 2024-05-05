class Node {
    constructor(question, yes = null, no = null, parent = null) {
      this.question = question;
      this.yes = yes;
      this.no = no;
      this.parent = parent;
    }
  }
  
  function traverseTree(currentNode) {
    if (!currentNode) return;
    let answer = prompt(currentNode.question + " (ja/nej)");
    if (answer.toLowerCase() === "ja") {
      if (currentNode.yes) {
        traverseTree(currentNode.yes);
      } else {
        alert("Jeg gættede dyret!");
        startNewGame();
      }
    } else if (answer.toLowerCase() === "nej") {
      if (currentNode.no) {
        traverseTree(currentNode.no);
      } else {
        learnNewAnimal(currentNode);
      }
    } else {
      alert("Indtast venligst 'ja' eller 'nej'.");
      traverseTree(currentNode); // Spørg igen
    }
  }
  
  function learnNewAnimal(currentNode) {
    let animal = prompt("Hvilket dyr tænkte du på?");
    let question = prompt("Hvilket spørgsmål kunne stilles for at identificere dyret korrekt?");
    
    let newAnimalNode = new Node("Er det en " + animal + "?");
    let newQuestionNode = new Node(question, newAnimalNode, currentNode);
  
    if (currentNode.parent) {
      if (currentNode.parent.yes === currentNode) {
        currentNode.parent.yes = newQuestionNode;
      } else {
        currentNode.parent.no = newQuestionNode;
      }
    } else {
      root = newQuestionNode; // Opdaterer root hvis det er det første dyr der læres
    }
  
    saveTree(root);
  }
  
  function saveTree(rootNode) {
    let treeJSON = JSON.stringify(rootNode, function(key, value) {
      if (key === 'parent') { return; }
      return value;
    }, 2);
    console.log(treeJSON);
  }
  
  function startNewGame() {
    if (confirm("Vil du starte et nyt spil?")) {
      traverseTree(root);
    }
  }
  
  // Opretter det indledende træ
  let root = new Node("Er det en elefant?");
  
  // Start spillet
  traverseTree(root);
  