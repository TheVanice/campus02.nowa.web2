"use strict";

const baseUrl = "https://nowaunoweb.azurewebsites.net/api/game";
const colorSelectModal = new bootstrap.Modal(document.getElementById('colorSelectModal'));
const players = [ "Player 1", "Player 2",  "Player 3",  "Player 4"];
let gameId = "6984f25c-3f7d-4e9e-92a1-cf8c9be9d760";
let currentCard = {};

document.querySelector("#colorSelectButtons").addEventListener("click", function (e) {
    playCard(currentCard, e.target.dataset.wildcard);
    colorSelectModal.hide();
});

document.querySelector("#startGame").addEventListener("click", async function (e) {
    e.target.disabled = true;
    var data = await startGame();
    console.log(data);
});

document.querySelector("#cards").addEventListener("click", function (e) {
    currentCard = {
        value: e.target.dataset.value, 
        color: e.target.dataset.color
    };

    if (currentCard.value == 14) {
        colorSelectModal.show();
    } else {
        playCard(currentCard);
    }
});

async function startGame() {
    var response = await fetch(`${baseUrl}/start`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(players)
    });

    var data = await response.json();
    gameId = data.Id;
    return data;
}

async function playCard(card, wildColor){
    var response = await fetch(`${baseUrl}/playCard/${gameId}?value=${card.value}&color=${card.color}&wildColor=${wildColor}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT"
    });

    var data = await response.json();
    return data;
}
