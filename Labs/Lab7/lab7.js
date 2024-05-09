// Getting all list element text values in a spread operation then logging them
const init = () => {
    const courseList = [...document.querySelectorAll("li")];
    let courseArray = courseList.map(li => li.textContent);

    courseArray = [...courseArray, "React.js", "Angular.js"]

    console.log(courseArray);

    // Trying another approach to logging courses
    const anotherList = document.querySelectorAll("li");
    console.log(["React.js", "Angular.js", ...Array.from(anotherList).map(li => li.textContent)]);
}

window.onload = init;