// target input form
let formEl = $('#coin-search');
let coin = '';
let amount;
// target coin display id
let coinDisplayEl = $('#coin-display');
let userInputEl = $('#coin-name');

const el = $('#test');
async function coins() {
    await fetch('https://api.exchange.coinbase.com/currencies')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let allCoins = []
            for (let i = 0; i < data.length; i++) {
                //el.append(data[i].name + ' ' + data[i].id + '<br>')
                console.log(data[i]);
                allCoins.push(data[i].id)
            }
            $(function() {
                $( "#coin-input" ).autocomplete({
                    source: allCoins
                });
            })
        })
        .catch(err => {
            console.error(err);
        })
}

coins();


function formHandler(event) {
    event.preventDefault();

    coin = $('input[name="coin-input"]').val();
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
                let drinkNameEl = $('#drinkName');
                let drinkImgEl = $('#drinkImg');
                drinkImgEl.empty();
                drinkNameEl.empty();
                coinDisplayEl.empty();
                userInputEl.empty();
                console.error(err);
                if (!coin) {
                    coinDisplayEl.append('<h3 class="red-text">Input Required</h3>')
                } else {
                    coinDisplayEl.append('<h3 class="red-text">Invalid Ticker</h3>')
                }

            })
    }
}
formEl.on('submit', formHandler)