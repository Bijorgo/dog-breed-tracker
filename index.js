
// hold information about breed from db.json
function breedDish(matchedBreed) {
    //make unordered list for additional sttributes to go into
    const extraList = document.createElement("ul");

    const groupItem = document.createElement("li");
    groupItem.id = "group-item";
    groupItem.textContent = "Group: " + matchedBreed.group;
    extraList.append(groupItem);

    const sizeItem = document.createElement("li");
    sizeItem.id = "size-item"
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

function createEdit(nestedName, nestedComment){
    // create "edit" button
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit"; 
    //handle edit event
    editBtn.addEventListener("click", () => {
        const form = document.createElement("form");
        form.name = "edit-form";
        form.id = "edit-form";
    
        // create text input to edit name
        const editNameLabel = document.createElement("label");
        editNameLabel.textContent = "Name: ";
        const editNameText = document.createElement("input");
        editNameText.type = "text";
        editNameText.name = "edit-name"
        editNameText.placeholder = "optional"
        editNameLabel.append(editNameText);
        form.append(editNameLabel);

        //create text input to edit comment
        const editCommentLabel = document.createElement("label");
        editCommentLabel.textContent = "Comment: ";
        const editCommentText = document.createElement("input");
        editCommentText.type = "text";
        editCommentText.name = "edit-comment"
        editCommentText.placeholder = "optional"
        editCommentLabel.append(editCommentText);
        form.append(editCommentLabel);

        //create size text input 
        /*
        const editSizeLabel = document.createElement("label");
        editSizeLabel.textContent = "Size: ";
        const editSizeText = document.createElement("input");
        editSizeText.type = "text";
        editSizeText.name = "edit-size"
        editSizeText.placeholder = "optional"
        editSizeLabel.append(editSizeText);
        form.append(editSizeLabel);
        */

        //create submit button
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "submit";
        //handle a submission
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            //upon submit, update new dog li

            // update name or retain previously given name
            const retainName = nestedName.textContent.split(": ")[1];
            nestedName.textContent = "Name: " + (editNameText.value || retainName);

            console.log(nestedComment + " -NESTED comment");
            console.log(nestedComment.textContent + " -C Text Here");
            console.log(nestedName + " -nested Name HERE")
            console.log(nestedName.textContent + " -NAME TEXT HERE")

            //update comment or retain original comment
            const retainComment = nestedComment.textContent.split(": ")[1];
            nestedComment.textContent = "Comment: " + (editCommentText.value || retainComment);
            /*

            //SIZE
            const newSize = editSizeText.value;
            const retainSize = nestedListADog.querySelector("#size-item").textContent;  // existing size
        
            // Update the size item if new size is provided, otherwise keep the original
            const updatedSize = newSize || retainSize;
            nestedListADog.querySelector("#size-item").textContent = "Size: " + updatedSize;*/
            

            //remove entire edit/form box
            form.remove();
        });

        form.append(submitBtn); // attatch submit button to bottom of form
        // attatch new form somwhere
        document.querySelector("#more").append(form);
    });
    return editBtn;
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
        const matchedBreed = breedData.find(b => b.breed.toLowerCase() === breedInput.toLowerCase()); //match input and data case

        // if no breed is found, display text telling user what to do
        if (!matchedBreed) {
            const alertDiv = document.querySelector("#more");
            const alertP = document.createElement("p");
            alertP.textContent = `Breed not found. Please check your spelling or use breed "other".`;
            alertDiv.append(alertP);
            const xButton = document.createElement("button");
            xButton.textContent = "X";
            alertDiv.append(xButton);
            xButton.addEventListener("click", ()=> {
                alertDiv.textContent = "";
                form.reset();
            });
            return; // if no breed found, exit
        } else {
            console.log("Found breed:", matchedBreed.breed);
        };
        //console.log(matchedBreed + "breedInput check"); // debug

        // create a space for new dog to go, add dog to list
        const orderedListDogBreed = document.querySelector("#dogs"); //static ol
        const listADog = document.createElement("li"); // first item to go under ol
        const nestedListADog = document.createElement("ul"); // dynamic nested ul to go under initial, ordered li
        const nestedName = document.createElement("li");
        const nestedComment = document.createElement("li");
        // items below are appended to listADog first, then append each dog to the full list

        // take matched breed and display as first ordered list item
        listADog.textContent = "Breed: " + (matchedBreed.breed) + (checkMix());

         // hold comments from form add into a nested li
        const comment = document.querySelector("#comments").value;
        nestedComment.textContent = "Comment: " + (comment || "none");

        //take name from form and add into nested li
        const nameInput = document.querySelector("#name");
        nestedName.textContent = "Name: " + (nameInput.value || "Unknown");

        console.log( "what is nestedName right after defining?  " + nestedName.value)
        console.log(nameInput.value + " -NAME INPUT")

        // append items into nest
        nestedListADog.append(nestedName);
        nestedListADog.append(nestedComment);

        //create a favorite button
        const favBtn = document.createElement("button");
        const heart = '\u2661'; // exmpty heart symbol
        favBtn.textContent = heart;
        favBtn.addEventListener("dblclick", () => {
            const filledHeart = `\u2665`; // filled heart symbol
            favBtn.textContent = filledHeart;
        });
        
        // create a remove button plus functionality on click
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click",() => {
            dogCounter--; // subtract 1 for each dog removed
            countInc.textContent = dogCounter;
            listADog.remove();
        });



        listADog.append(favBtn);
        listADog.append(removeBtn);
        const editBtn = createEdit(nestedName, nestedComment);
        listADog.append(editBtn);
        listADog.append(nestedListADog); // placed here so buttons show after breed first, then nested list 
        orderedListDogBreed.append(listADog);

        
        

        

        // add 1 to counter for each dog added
        dogCounter++; 
        countInc.textContent = dogCounter;

        // call event handler to display additional attributes from database
        mousingHandler(listADog, matchedBreed);
        
        form.reset(); // clear form after submit
    });  
};


function main() {
    fetch("./db.json")
    .then(response => response.json())
    .then(data => {
        const breedData = data["dog-breeds"];
        submitFormInfo(breedData);
    })
    .catch(error => console.error("Error fetching data.", error));
};

main();



//NOTES
/*
        const groupEdit = document.createElement("label");
        groupEdit.textContent = "Group: ";

        // create dropdown to choose group
        const groupSelect = document.createElement("select");

        // create dropdown options, collect them in the dropdown
        // MISC
        const miscOpt = document.createElement("option");
        miscOpt.value = "misc-group";
        miscOpt.textContent = "Misc";
        groupSelect.append(miscOpt);
        //HOUND
        const houndOpt = document.createElement("option");
        houndOpt.value = "hounds";
        houndOpt.textContent = "Hounds";
        groupSelect.append(houndOpt);
        //SPORTING 
        const sportOpt = document.createElement("option");
        sportOpt.value = "sporting";
        sportOpt.textContent = "Sporting"
        groupSelect.append(sportOpt);
        //NON-SPORTING
        const nonSpOpt = document.createElement("option");
        nonSpOpt.value = "non-sporting";
        nonSpOpt.textContent = "Non-Sporting";
        groupSelect.append(nonSpOpt);
        //TERRIER
        const terrierOpt = document.createElement("option");
        terrierOpt.value = "terrier";
        terrierOpt.textContent = "Terrier";
        groupSelect.append(terrierOpt);
        //TOY
        const toyOpt = document.createElement("option");
        toyOpt.value = "toy";
        toyOpt.textContent = "Toy";
        groupSelect.append(toyOpt);
        //WORKING
        const workingOpt = document.createElement("option");
        workingOpt.value = "working";
        workingOpt.textContent = "Working";
        groupSelect.append(workingOpt);
        //HERDING
        const herdingOpt = document.createElement("option");
        herdingOpt.value = "herding";
        herdingOpt.textContent = "Herding";
        groupSelect.append(herdingOpt);

        // attatch the group dropdown to a lable 
        groupEdit.append(groupSelect);
        // attatch everything under group lable to the form
        form.append(groupEdit);

*/
