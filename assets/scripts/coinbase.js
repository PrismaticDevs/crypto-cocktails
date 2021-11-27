// target input form
let formEl = $('#coin-search');
let coin = '';
// target coin display id
let coinDisplayEl = $('#coin-display');
let userInputEl = $('#user-input');

function formHandler(event) {
    event.preventDefault();
    coin =$('input[name="coin-input"]').val();
    let requestedUrl = `https://api.coinbase.com/v2/prices/${coin}-usd/sell`
    console.log(coin);
    coinbase();
    async function coinbase() {
        await fetch(requestedUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                console.log(data.data.amount);
                let amount = data.data.amount;
                userInputEl.text(coin.toUpperCase())
                coinDisplayEl.append('$' + amount);
                $('input[name="coin-input"]').val('');
               randomDrink();
            })
            .catch(err => {
                console.error(err);
            })
    }
}
formEl.on('submit', formHandler)