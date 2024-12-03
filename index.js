//index.js

const xButton = document.createElement("button");
xButton.textContent = "X";

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
}; // close breedDish


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
}; // close mousing handler




// handle what happens when form is submitted 
function submitFormInfo(breedData) {

    const form = document.querySelector("#dog-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // take breed typed in and match it with a breed in the database
        const breedInput = document.querySelector("#breed-lookup").value.trim();
        const matchedBreed = breedData.find(b => b.breed.toLowerCase() === breedInput.toLowerCase());

        //if no breed found => handle it-to be changed later 
        if (!matchedBreed) {
            //console.log("Breed not found");
            const alertDiv = document.querySelector("#alert");
            const alert = document.createElement("p");
            alert.textContent = "Breed not found. Please check your spelling or create a custom breed.";
            alertDiv.append(alert);
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
        listADog.textContent = matchedBreed.breed;
        orderedListDogBreed.append(listADog);
        // call event handler to display additional attributes from database
        mousingHandler(listADog, matchedBreed);
        
       form.reset();
    }); // closes addEventListener
    
    
}; //closes formInfo()


function main() {
    fetch("./db.json")
    .then(response => response.json())
    .then(data => {
            //do something with data
        const breedData = data["dog-breeds"];
        submitFormInfo(breedData);
        
        
    }) //closes .then()
    .catch(error => console.error("Error fetching data.", error));
}; //closes retrieveDogInfo()
main();



//NOTES:

//Debugging under 2nd .then
        /*
        breedData.forEach(b => {
            // Log the breed to see what's inside
            console.log("Breed object:", b);

            // Ensure the breed is a string
            if (typeof b.breed !== 'string') {
                console.error("Invalid breed data:", b);
                return;
            }
            console.log(b.breed);
        });
        */

        /*
        //hold info from form
        const breed = document.querySelector("#breed-lookup").value;
        // items only on forms:
        const mixedBreed = document.querySelector("#mix-yes").value;
        const dogName = document.querySelector("#name").value;
        const coatColor = document.querySelector(".coat-color");
        //items in db and on form, this collects form input
        const breedGroup = document.querySelector("#groups");
        const sizeType = document.querySelector("#dropdown-size");
        const hairType = document.querySelector("#dropdown-hair-type");
        const coatType = document.querySelector("#dropdown-coat-type");
        
        const dogsInList = document.querySelector("#dogs");
        //match breed
        const selectedBreed = breedData.find(b => b === breed);
        // create li under #dogs, set text
        const newDog = document.createElement("li");
        newDog.textContent = "Breed:" + (selectedBreed || "Unknown") + "Name:" + dogName;
        dogsInList.append(newDog);
        */