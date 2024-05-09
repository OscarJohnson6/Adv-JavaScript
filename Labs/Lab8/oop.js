// Creates 2 different student objects and prints their details
const init = () => {
    const student1 = new Student(
        "Oscar",
        "Johnson",
        "oscarjohnson6@madioncollege.edu"
    );

    const student2 = new Student(
        "Brody",
        "Coolin",
        "brodycoolin1@madioncollege.edu"
    );

    console.log(student1.printDetails());
    console.log(student2.printDetails());
    Student.register("Adv JavaScript");
};

class Student {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    get getFirstName() {
        return `${this.firstName}`;
    }
    get getLastName() {
        return `${this.lastName}`;
    }
    get getEmail() {
        return `${this.email}`;
    }

    set setFirstName(firstName) {
        this.firstName = firstName;
    }
    set setLastName(lastName) {
        this.lastName = lastName;
    }
    set setEmail(email) {
        this.email = email;
    }

    static register(courseName) {
        console.log(courseName);
    }

    printDetails() {
        return `${this.firstName} ${this.lastName} ${this.email}`;
    }
}

window.onload = init;