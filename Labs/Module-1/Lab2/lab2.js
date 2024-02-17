const labTitle = "Programming for Designers - Lab 2";

// Console logs differnt local variables
const init = () => {
    let id = 10;
    let name = "your name should go here";
    let bornInMadison = false;
    
    console.log(id);
    console.log(name);
    console.log(bornInMadison);

    printLabTitle();
}

// Console logs global variable
const printLabTitle = () => {
    console.log(labTitle);
}