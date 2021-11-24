async function coinbase() {
    await fetch('https://api.coinbase.com/v2/currencies')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
}