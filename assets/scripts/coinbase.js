// target input form
let formEl = $('#coin-search');
let coin = '';
let amount;
// target coin display id
let coinDisplayEl = $('#coin-display');
let userInputEl = $('#coin-name');


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
                coinDisplayEl.text('');
                console.log(data.data);
                console.log(data.data.amount);
                amount = data.data.amount;
                userInputEl.text(coin.toUpperCase())
                coinDisplayEl.append("$" + Number(amount).toLocaleString());
                $('input[name="coin-input"]').val('');
               randomDrink();
            })
            .catch(err => {
                console.error(err);
            })
    }
}
formEl.on('submit', formHandler)