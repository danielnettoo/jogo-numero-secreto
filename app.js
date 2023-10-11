let drawnNumberList = [];
let limitNumber = 10;
let secretNumber = generatedRandomNumber();
let attempts = 1;

function textOnScreen(tag, texto) {
    let field = document.querySelector(tag);
    field.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function showInitialMessage() {
    textOnScreen("h1", "Jogo do Número Secreto");
    textOnScreen("p", "Escolha um número entre 1 e 10");
}

showInitialMessage();

function verifyAttempts() {
    let inputNumber = document.querySelector("input").value;

    if (inputNumber == secretNumber){
        textOnScreen("h1", "Parabéns");
        let oneAttempt = attempts > 1 ? "tentativas" : "tentativa";
        let attemptsMessage = `Você acertou o numero secreto com ${attempts} ${oneAttempt}`; 
        textOnScreen("p", attemptsMessage);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (inputNumber > secretNumber){
            textOnScreen("h1", "Quase !");
            textOnScreen("p", `O numero secreto é menor do que ${inputNumber}`);
        } else {
            textOnScreen("h1", "Quase !");
            textOnScreen("p", `O numero secreto é maior do que ${inputNumber}`);
        }
        clearField();
        attempts++;
    }
}

function generatedRandomNumber(){
    let drawnNumber = parseInt(Math.random()*limitNumber + 1);
    let qtdElementsOnList = drawnNumberList.length;

    if (qtdElementsOnList == limitNumber){
        drawnNumberList = [];
    }

    if (drawnNumberList.includes(drawnNumber)){
        return generatedRandomNumber();
    } else {
        drawnNumberList.push(drawnNumber);
        console.log(drawnNumberList);
        return drawnNumber;
    }

}

function clearField(){
    inputNumber = document.querySelector("input");
    inputNumber.value = " ";
}

function newGame(){
    showInitialMessage();
    secretNumber = generatedRandomNumber();
    clearField();
    attempts = 1;
    document.getElementById("reiniciar").setAttribute("disabled", true);
}