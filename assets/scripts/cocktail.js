function randomDrink() {

    cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    let drinkNameEl = $('#drinkName');
    let drinkImgEl = $('#drinkImg')
    
    
    fetch(cocktailUrl)
    .then(function (response) {
    // When this request is made, get the response and check to see if it went well
    // if so, take the data and decode it so that we humans can read it
    return response.json();
    })
    .then(function (data) {
        drinkImgEl.empty();
        console.log(data.drinks[0].strDrink);
        console.log(data);
        let drinkName = data.drinks[0].strDrink;
        let drinkImg = data.drinks[0].strDrinkThumb;
        drinkNameEl.text(drinkName);
        drinkImgEl.append(
            `<img src="${drinkImg}" height="200rem" />`
            );
        })
    }