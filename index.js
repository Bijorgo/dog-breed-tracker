// Javascript Content Here
console.log("JavaScript is running")
//take input from form upon submit
    //fetch info from json .find()
    //create li under #list
    //display name and append breed to li
    //if no breed found-handle that
    //increase counter by 1
    //add "more info" button to each dog
        //upon click, display more info
    //add delete button to dog, click event listener
    //create "favorite" function, dblclick event listener

//callbacks:




// hold information about breed in db
function breedDish(matchedBreed) {
    //make unordered list for db information to go into
    const extraList = document.createElement("ul");
    //something.append(extraList)
    const groupItem = document.createElement("li");
    groupItem.textContent = matchedBreed.group;
    extraList.append(groupItem);

    const sizeItem = document.createElement("li");
    sizeItem.textContent = matchedBreed.size;
    extraList.append(sizeItem);

    const hairItem = document.createElement("li");
    hairItem.textContent = matchedBreed.hair;
    extraList.append(hairItem);

    const coatItem = document.createElement("li");
    coatItem.textContent = matchedBreed.coat;
    extraList.append(coatItem);

    document.querySelector("li").append(extraList);
    return extraList;
}; // close breedDish


function mEnterEventHandler(listItem, matchedBreed) {
    listItem.addEventListener("mouseenter", (event) => {
        const extraList = breedDish(matchedBreed);
        listItem.append(extraList);
    
    })
}; // close mEnter 


//submit handler
function submitFormInfo(breedData) {

    const form = document.querySelector("#dog-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        //console.log("form submitted");
        // value of text input
        const breedInput = document.querySelector("#breed-lookup").value.trim();
        const matchedBreed = breedData.find(b => b.breed.toLowerCase() === breedInput.toLowerCase());

        //if no breed found => handle it-to be changed later 
        if (!matchedBreed) {
            console.log("Breed not found");
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
        mEnterEventHandler(listADog, matchedBreed);
        
       
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