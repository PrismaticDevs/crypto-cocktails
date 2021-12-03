$(".modal").modal();

function randomDrink() {
    cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    let drinkNameEl = $("#drinkName");
    let drinkImgEl = $("#drinkImg");
    let modalDrink = $("#modal-drink");
    let recipe = $("#recipe");
    let modalImage = $("#modal-image");

    fetch(cocktailUrl)
        .then(function(response) {
            // When this request is made, get the response and check to see if it went well
            // if so, take the data and decode it so that we humans can read it
            return response.json();
        })
        .then(function(data) {
            drinkImgEl.empty();
            console.log(data.drinks[0].strDrink);
            console.log(data);
            let drinkName = data.drinks[0].strDrink;
            let drinkImg = data.drinks[0].strDrinkThumb;
            let modalUl = $("<ul>");
            recipe.empty();
            modalImage.empty();
            modalImage.append(`<img style="width:50%" src="${drinkImg}">`);
            modalDrink.empty();
            modalDrink.append(drinkName);
            for (let i = 1; i <= 15; i++) {
                let strIngredient = eval("data.drinks[0].strIngredient" + i);
                let modalLi = $("<li>");

                if (strIngredient !== null && strIngredient !== "") {
                    modalLi.append(`${strIngredient}`);
                }
                let strMeasure = eval("data.drinks[0].strMeasure" + i);
                if (strMeasure !== null && strMeasure !== "") {
                    modalLi.append(`: ${strMeasure}`);
                }
                modalUl.append(modalLi);
                recipe.append(modalUl);
                // recipe.append(`${strIngredient}: ${strMeasure}`);
            }
            recipe.append("<b>Instructions: </b>" + data.drinks[0].strInstructions);

            drinkNameEl.text(drinkName);
            drinkImgEl.append(
                `<img src="${drinkImg}" height="200rem" /> 
        <br>
        <button data-target="modal1" class="btn modal-trigger">Get Recipe</button>
                `
            );
        });
}