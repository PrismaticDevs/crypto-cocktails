// target input form
let formEl = $('#coin-search');
let coin = '';
let amount;
// target coin display id
let coinDisplayEl = $('#coin-display');
let userInputEl = $('#coin-name');
let myCoins = [];
let myCoinsEl = $('#myCoins')
let storedCoins;

loadCoins()
function loadCoins() {
    myCoinsEl.text('');
    storedCoins = JSON.parse(localStorage.getItem("coins"));
    if (storedCoins) {
      for (let i = 0; i < storedCoins.length; i++) {
        let coinBtn = $(
          `<div>
                <button id="${i}" data-coin="${storedCoins[i]}" class="myCoinBtn waves-effect waves-light btn-large">${storedCoins[i]}</button> <a class="remove-coin-btn">Remove</a>
            </div>`
        );
        myCoinsEl.append(coinBtn);
      }
    }
  }

async function coins() {
    await fetch('https://api.exchange.coinbase.com/currencies')
        .then(response => {
            return response.json();
            
        })
        .then(data => {
            let allCoins = []
            for (let i = 0; i < data.length; i++) {
                //el.append(data[i].name + ' ' + data[i].id + '<br>')
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
    // check to see if the submit came from a button or the input form
  // if a button get the data attribute, q else get it from the form
  if (formEl.attr('data-coin')) {
    coin = formEl.attr('data-coin')
    // clear the button attribute so it will not persist if the 
    // next search is from the form.
    formEl.attr('data-coin', '');
  } else {
    coin = $('input[name="coin-input"]').val().trim();
  }

    //coin = $('input[name="coin-input"]').val();
    let requestedUrl = `https://api.coinbase.com/v2/prices/${coin}-usd/sell`

    
    localStorage.setItem("coins", JSON.stringify(myCoins));
    myCoins = [];
    //loadCoins()
    coinbase();
    async function coinbase() {
        await fetch(requestedUrl)
            .then(response => {
               return response.json();
               
            })
            .then(data => {
                if (!data.errors) {
                    //console.error(err , "error");
                    // Get saved searches from local storage
                    storedCoins = JSON.parse(localStorage.getItem("coins"));
                    // Check if there are any coins in local storage
                    console.log(myCoins);
                    if (storedCoins !== null) {
                        myCoins = storedCoins
                        console.log(myCoins);
                        if (!myCoins.includes(coin)) {
                            myCoins.push(coin);
                            console.log(myCoins);
                            localStorage.setItem("coins", JSON.stringify(myCoins));
                        }
                    } else {

                        myCoins.push(coin);
                        console.log(myCoins);
                        localStorage.setItem("coins", JSON.stringify(myCoins));
                    }
                    // console.log(coin);
                    console.log(myCoins);
                    

                    loadCoins()
                    coinDisplayEl.text('');
                    amount = data.data.amount;
                    userInputEl.text(coin.toUpperCase())
                    coinDisplayEl.append("$" + Number(amount).toLocaleString());
                    // scroll to coin display for small screens
                    location.href = "#coin-name"
                    randomDrink();
                    
                    $('input[name="coin-input"]').val('');
                    
                } else {
                    return;
                }
                
                   
                
            })
            .catch(err => {
                let drinkNameEl = $('#drinkName');
                let drinkImgEl = $('#drinkImg');
                drinkImgEl.empty();
                drinkNameEl.empty();
                coinDisplayEl.empty();
                
                console.error(err , "error");
                if (!coin) {
                    coinDisplayEl.append('<h3 class="red-text">Input Required</h3>')
                } else {
                    coinDisplayEl.append('<h3 class="red-text">Invalid Ticker</h3>')
                }
            })
    }
}
formEl.on('submit', formHandler)

// click handler for history buttons
myCoinsEl.on('click', function(event) {
    let btnClass = $(event.target).attr("class");
    if (btnClass === 'remove-coin-btn') {
    } else {
        let coin = event.target.getAttribute('data-coin');
        event.stopPropagation();
        formEl.attr('data-coin', coin);
        formEl.submit();
    }
  })