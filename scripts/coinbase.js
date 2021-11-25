let coin = 'btc';
async function coinbase() {
    await fetch(`https://api.coinbase.com/v2/prices/${coin}-usd/sell`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.data);
        })
        .catch(err => {
            console.error(err);
        })
}
coinbase();