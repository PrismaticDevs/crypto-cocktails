// target input form
let formEl = $("#coin-search");
let coin = "";
let amount;
// target coin display id
let coinDisplayEl = $("#coin-display");
let userInputEl = $("#coin-name");
let myCoins = [];
let myCoinsEl = $("#myCoins");
let storedCoins;

loadCoins();

function loadCoins() {
  myCoinsEl.text("");
  storedCoins = JSON.parse(localStorage.getItem("coins"));
  if (storedCoins) {
    for (let i = 0; i < storedCoins.length; i++) {
      let coinBtn = $(
        `<div class="row">
            <div col s12>
                <button id="${i}" data-coin="${storedCoins[i]}" class="myCoinBtn waves-effect waves-light btn-large">${storedCoins[i]}</button><a id="${storedCoins[i]}" class="remove-coin-btn btn-floating btn-small waves-effect waves-light red">X</a>
            </div>
        </div>`
      );
      myCoinsEl.append(coinBtn);
    }
  }
}

async function coins() {
  await fetch("https://api.exchange.coinbase.com/currencies")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let allCoins = [];
      for (let i = 0; i < data.length; i++) {
        allCoins.push(data[i].id);
      }
      $(function () {
        $("#coin-input").autocomplete({
          source: allCoins,
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

coins();

function formHandler(event) {
  event.preventDefault();
  // check to see if the submit came from a button or the input form
  // if a button get the data attribute, q else get it from the form
  if (formEl.attr("data-coin")) {
    coin = formEl.attr("data-coin");
    // clear the button attribute so it will not persist if the
    // next search is from the form.
    formEl.attr("data-coin", "");
  } else {
    coin = $('input[name="coin-input"]').val().trim().toUpperCase();
  }

  let requestedUrl = `https://api.coinbase.com/v2/prices/${coin}-usd/sell`;

  myCoins = [];
  loadCoins();
  coinbase();
  async function coinbase() {
    await fetch(requestedUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          userInputEl.empty();
        storedCoins = JSON.parse(localStorage.getItem("coins"));
        // Get saved searches from local storage
        let coinImg = coinImage(coin);
        // Check if there are any coins in local storage
        console.log(coinImg);
        if (storedCoins !== null) {
          myCoins = storedCoins;

          if (!myCoins.includes(coin)) {
            if (!data.errors) {
              myCoins.push(coin);
            }
            localStorage.setItem("coins", JSON.stringify(myCoins));
          }
        } else {
          if (!data.errors) {
            myCoins.push(coin);
            localStorage.setItem("coins", JSON.stringify(myCoins));
          }
        }

        coinDisplayEl.text("");
        amount = data.data.amount;
        userInputEl.append(coin.toUpperCase());

        coinDisplayEl.append("$" + Number(amount).toLocaleString());
        // scroll to coin display for small screens
        location.href = "#coin-name";
        randomDrink();

        $('input[name="coin-input"]').val("");

        loadCoins();
        myCoins = "";
        
      })
      .catch((err) => {
        let drinkNameEl = $("#drinkName");
        let drinkImgEl = $("#drinkImg");
        drinkImgEl.empty();
        drinkNameEl.empty();
        userInputEl.empty();
        coinDisplayEl.empty();
        $('input[name="coin-input"]').val("");
        location.href = "#coin-name";
        console.error(err, "error");
        if (!coin) {
          coinDisplayEl.append('<h3 class="red-text">Input Required</h3>');
        } else {
          coinDisplayEl.append('<h3 class="red-text">Invalid Ticker</h3>');
        }
      });
  }
}
formEl.on("submit", formHandler);

// click handler for coin buttons
myCoinsEl.on("click", function (event) {
  let btnClass = $(event.target).attr("class");
  if (btnClass.includes("remove-coin-btn")) {
    let coinToRemove = $(event.target).attr("id");
    myCoins = storedCoins = JSON.parse(localStorage.getItem("coins"));
    myCoins = arrayRemove(myCoins, coinToRemove);
    localStorage.setItem("coins", JSON.stringify(myCoins));
    loadCoins();
  } else {
    let coin = event.target.getAttribute("data-coin");
    event.stopPropagation();
    formEl.attr("data-coin", coin);
    formEl.submit();
  }
});

async function coinImage(coin) {
  await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${coin}&order=market_cap_desc&sparkline=false`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].symbol === coin.toLowerCase()) {
          userInputEl.append(
            `<img class="crypto-icon" src="${data[i].image}">`
          );
        }
      }
    });
}
