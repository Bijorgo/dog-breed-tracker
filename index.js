//index.js

// hold information about breed from db.json
function breedDish(matchedBreed) {
    //make unordered list for additional sttributes to go into
    const extraList = document.createElement("ul");

    const groupItem = document.createElement("li");
    groupItem.textContent = "Group: " + matchedBreed.group;
    extraList.append(groupItem);

    const sizeItem = document.createElement("li");
    sizeItem.textContent = "Size: " + matchedBreed.size;
    extraList.append(sizeItem);

    const hairItem = document.createElement("li");
    hairItem.textContent = "Hair Type: " + matchedBreed.hair;
    extraList.append(hairItem);

    const coatItem = document.createElement("li");
    coatItem.textContent = "Coat Type: " + matchedBreed.coat;
    extraList.append(coatItem);

    document.querySelector("li").append(extraList);
    return extraList; // return full list without appending yet
}; 

// callback function to handle mouseenter and mouseleave events on list items 
function mousingHandler(listItem, matchedBreed) {
    let extraList;
    //display extra attributes list when mousing over breed
    listItem.addEventListener("mouseenter", (event) => {
        extraList = breedDish(matchedBreed);
        listItem.append(extraList);
    });
    // Remove the extra list when the mouse leaves    
    listItem.addEventListener("mouseleave", (event) => {    
        if (extraList) {
            extraList.remove();
        };
    });
}; 

// callback function to use input from checkbox
function checkMix(){
    const mixInput = document.querySelector("#mix-yes");
    let mixed;
    if (mixInput.checked) {
        mixed = "(Mixed)";
    }else {
        mixed = "";
    };  
    return mixed;  
};

// handle what happens when form is submitted 
function submitFormInfo(breedData) {

    const form = document.querySelector("#dog-form");
    // to keep track of number of dogs added to list 
    const countInc = document.querySelector("#counter");
    let dogCounter = 0;

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // take breed typed in and match it with a breed in the database
        const breedInput = document.querySelector("#breed-lookup").value.trim(); //trim trailing spaces from input
        const matchedBreed = breedData.find(b => b.breed.toLowerCase() === breedInput.toLowerCase());

        // if no breed is found, display text telling user what to do
        if (!matchedBreed) {
            const alertDiv = document.querySelector("#more");
            const alertP = document.createElement("p");
            alertP.textContent = "Breed not found. Please check your spelling or create a custom breed.";
            alertDiv.append(alertP);
            const xButton = document.createElement("button");
            xButton.textContent = "X";
            alertDiv.append(xButton);
            xButton.addEventListener("click", ()=> {
                alertDiv.textContent = "";
                form.reset();
            });
        } else {
            console.log("Found breed:", matchedBreed.breed);
        };
        //console.log(matchedBreed + "breedInput check"); // debug

        // create a space for new dog to go, add dog to list
        const orderedListDogBreed = document.querySelector("#dogs");
        const listADog = document.createElement("li");
        
        // call event handler to display additional attributes from database
        mousingHandler(listADog, matchedBreed);

        //take name from form and use information
        const nameInput = document.querySelector("#name");
        // set text that will be in each li
        listADog.textContent = "Breed: " + (matchedBreed.breed) + (checkMix()) + "   Name: " + (nameInput.value || "Unknown");

        //create a favoirte button
        const favBtn = document.createElement("button");
        const heart = '\u2661';
        favBtn.textContent = heart;
        listADog.append(favBtn);
        favBtn.addEventListener("dblclick", () => {
            const filledHeart = `\u2665`;
            favBtn.textContent = filledHeart;
        })

        // create a remove button plus functionality on click
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click",() => {
            dogCounter--; // subtract 1 for each dog removed
            countInc.textContent = dogCounter;
            listADog.remove();
        });
        // append elements to list item then item to list
        listADog.append(removeBtn);
        orderedListDogBreed.append(listADog);

        dogCounter++; // add 1 to counter for each dog added
        countInc.textContent = dogCounter;
        
       form.reset();
    }); // closes addEventListener, submit 
    
    
}; //closes formInfo()


function main() {
    fetch("./db.json")
    .then(response => response.json())
    .then(data => {
        const breedData = data["dog-breeds"];
        submitFormInfo(breedData);
    })
    .catch(error => console.error("Error fetching data.", error));
}; //closes retrieveDogInfo()

main();
