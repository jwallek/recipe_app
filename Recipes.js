// When the Page for the Recipes Loads, the function fetchRecipes() will be called to display
// Recipes with default Parameters
window.onload = fetchRecipes();

// Target where Recipe Cards with be Displayed
var cardTarget = document.getElementById("recipes-container")
var menuInput
var displayOrder = []

// Function which iterates the recipes.json file for the recipes
function fetchRecipes() {
    fetch("recipes.json")
    .then(res => res.json())
    .then(data => {
       var i = 0;
       for( i in data){

        // Creating  components for the cards
           var card = document.createElement("span")
           var recipeName = document.createElement("h2")
           var recipeTime = document.createElement("h4")
           var recipeDate = document.createElement("h6")
           var recipeIngredients = document.createElement("ul")
           var recipeInstructions = document.createElement("p")
           var recipeImage = document.createElement("img")
           var recipeDifficulty = document.createElement("h5")
           
           
            // Assigning components with class names that appropiately style each element
           recipeName.className = "recipe-name"
           recipeTime.className = "recipe-time"
           card.className = "recipe-card"
           recipeDate.className = "recipe-date"
           recipeIngredients.className = "recipe-ingredients"
           recipeInstructions.className = "recipe-instructions"
           recipeImage.className = "recipe-image"
           recipeDifficulty.classList.add("recipe-difficulty" )

            //Adding attribute to animate the cards with AOS js    
           card.setAttribute("data-aos", "zoom-in")
           card.setAttribute("data-aos-duration", "1000")


            //Appending data to the elements
           recipeName.append(data[i].name)
           recipeTime.append(data[i].time.join(' & '))
           recipeDate.append(data[i].date)
           recipeDifficulty.append(data[i].difficulty)
           if(data[i].difficulty == "easy"){
               recipeDifficulty.classList.add("easy")
           }
           if(data[i].difficulty == "medium"){
            recipeDifficulty.classList.add("medium")

            }
            if(data[i].difficulty == "hard"){
                recipeDifficulty.classList.add("hard")
            }
           
           for(var k in data[i].ingredients){

            var recipeIngredient = document.createElement("li")
            recipeIngredient.className = "recipe-ingredient"

              recipeIngredient.append(data[i].ingredients[k])
              recipeIngredients.append(recipeIngredient)

           }
           recipeInstructions.append(data[i].instructions)
            
            recipeImage.src = data[i].URL;

            // Appending data to the temp card
            card.append(recipeName, recipeImage, recipeTime, recipeDate, recipeIngredients, recipeInstructions, recipeDifficulty)

            // Appending the card to the target ID Container in Recipes.html
            cardTarget.appendChild(card)  
       }
    })
}


// Returning what the user chose from the options
function getMenuInput(menuOption)
{
    
    menuInput =  menuOption.value;
    sortRecipes()
}

// Sorting the recipes based on the property. Received guidance from the link provided below
//medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
function sortByProperty(property)
{
    return function(a,b)
    {
        if(a[property] > b[property]) return 1;
        if(a[property] < b[property]) return -1;

        return 0
    }
}

// Sorting the recipes based on the property and order. Received guidance from the link provided below
//medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
function sortByTime(property, order)
{
    // If User Selects Sort by Newest Pulished Recipes
    if(order == "new")
    {
        return function (a,b)
        {
            if(a[property] > b[property]) return -1;
            if(a[property] < b[property]) return 1
            
    
            return 0

        }
    }

    // If User Selects Sort by Oldest Pulished Recipes
    if(order == "old")
    {
        return function (a,b)
        {
            if(a[property] > b[property]) return 1;
            if(a[property] < b[property]) return -1
            
    
            return 0

        }
    }
}


//Similar to fetchRecipes, sortRecipes retrieves the recipes based on the User's choice(s) 
function sortRecipes(){
    var formInputBreakfast = document.getElementById("flexCheckBreakfast")
    var formInputLunch = document.getElementById("flexCheckLunch")
    var formInputDinner = document.getElementById("flexCheckDinner")
    var formInputEasy = document.getElementById("flexCheckEasy")
    var formInputMedium = document.getElementById("flexCheckMedium")
    var formInputHard = document.getElementById("flexCheckHard")



    // Clearing the target 
    cardTarget.innerHTML = ""
    var formInputs = []
    var difficultyInput = []

     //Checking what was checked or not. If checked, add to array to keep track of what the user chose.

    if (formInputBreakfast.checked)
    {
        formInputs.push(formInputBreakfast.value)
    }
    if(formInputLunch.checked){
        formInputs.push(formInputLunch.value)
    }
    if(formInputDinner.checked){
        formInputs.push(formInputDinner.value)
    }


    if(formInputEasy.checked){
        difficultyInput.push(formInputEasy.value)
    }
    if(formInputMedium.checked){
        difficultyInput.push(formInputMedium.value)
    }
    if(formInputHard.checked){
        difficultyInput.push(formInputHard.value)
    }

    // If not checked, remove from array if it had been chosen before

    if(!formInputBreakfast.checked){
        formInputs = formInputs.filter(item => item !== formInputBreakfast.value)
    }
    if(!formInputLunch.checked){
        formInputs = formInputs.filter(item => item !== formInputLunch.value)
    }
    if(!formInputDinner.checked){
        formInputs = formInputs.filter(item => item !== formInputDinner.value)
    }


    if(!formInputEasy.checked){
        difficultyInput = difficultyInput.filter(item => item !== formInputEasy.value)
    }
    if(!formInputMedium.checked){
        difficultyInput = difficultyInput.filter(item => item !== formInputMedium.value)
    }
    if(!formInputHard.checked){
        difficultyInput = difficultyInput.filter(item => item !== formInputHard.value)
    }



    // Fetching recipes, in the same manner as the function fetchRecipes()
    fetch("recipes.json")
    .then(res => res.json())
    .then(data => {
        var i = 0;
        for (i in data){
            var month = new Date(data[i].date).getUTCMonth() + 1
            var day = new Date(data[i].date).getUTCDate()
            var year = new Date(data[i].date).getUTCFullYear()
            data[i].date = year + "/" + month + "/" + day
            console.log(data)
        }

        // Sorting the Recipes before iterating

        // Sort Alphabetically
        if(menuInput === "alpha"){
            cardTarget.innerHTML =""
            data.sort(sortByProperty("name"))
            for(i in data)
            {
                displayOrder.push(data[i].id)
            }
            console.log(displayOrder)

        }

        // Sort by Date (Newest First)
        if(menuInput === "date-new"){
            cardTarget.innerHTML =""
            data.sort(sortByTime("date", "new"))   
            console.log(data)
            for(i in data)
            {
                displayOrder.push(data[i].id)
            }
            console.log(displayOrder)

        }

        // Sort by Date (Oldest First)
        if(menuInput === "date-old"){
            cardTarget.innerHTML =""
            data.sort(sortByTime("date", "old"))   
            console.log(data)
            for(i in data)
            {
                displayOrder.push(data[i].id)
            }
            console.log(displayOrder)
        }

        //Iterating through the sorted recipes
       
       for( i in data){
           var card = document.createElement("span")
           var recipeName = document.createElement("h2")
           var recipeTime = document.createElement("h4")
           var recipeDate = document.createElement("h6")
           var recipeIngredients = document.createElement("ul")
           var recipeInstructions = document.createElement("p")
           var recipeImage = document.createElement("img")
           var recipeDifficulty = document.createElement("h5")
           
           

           recipeName.className = "recipe-name"
           recipeTime.className = "recipe-time"
           card.className = "recipe-card"
           recipeDate.className = "recipe-date"
           recipeIngredients.className = "recipe-ingredients"
           recipeInstructions.className = "recipe-instructions"
           recipeImage.className = "recipe-image"
           recipeDifficulty.classList.add("recipe-difficulty" )

           card.setAttribute("data-aos", "zoom-in")
           card.setAttribute("data-aos-duration", "1000")

        var timefound = false
        var difficultyFound = difficultyInput.includes(data[i].difficulty)
        console.log(difficultyFound)
            for(var k in data[i].time){
                if (formInputs.includes(data[i].time[k])){
                    timefound = true
                }
            }
            
        
        if(timefound && difficultyInput.length === 0 || timefound && difficultyFound || difficultyFound && formInputs.length === 0 || formInputs.length === 0 && difficultyInput.length === 0){
            recipeName.append(data[i].name)
            recipeTime.append(data[i].time.join(' & '))
            recipeDate.append(data[i].date)
            recipeDifficulty.append(data[i].difficulty)
            if(data[i].difficulty == "easy"){
                recipeDifficulty.classList.add("easy")
            }
            if(data[i].difficulty == "medium"){
             recipeDifficulty.classList.add("medium")
 
             }
             if(data[i].difficulty == "hard"){
                 recipeDifficulty.classList.add("hard")
             }
            
            for(var k in data[i].ingredients){
 
             var recipeIngredient = document.createElement("li")
             recipeIngredient.className = "recipe-ingredient"
 
               recipeIngredient.append(data[i].ingredients[k])
               recipeIngredients.append(recipeIngredient)
 
            }
            recipeInstructions.append(data[i].instructions)
             
            recipeImage.src = data[i].URL;
             card.append(recipeName, recipeImage, recipeTime, recipeDate, recipeIngredients, recipeInstructions, recipeDifficulty)
             cardTarget.appendChild(card)  
        }  
       
    }
    })

}