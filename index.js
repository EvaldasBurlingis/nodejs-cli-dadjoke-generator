const clc = require("cli-color");
const readlineSync = require('readline-sync');

const data = [
    {
        id: 1,
        question: "Dad, did you get a haircut?",
        answer: "No, I got them all cut!"
    },
    {
        id: 2,
        question: "How do you get a squirrel to like you?",
        answer: "Act like a nut."
    },
    {
        id: 3,
        question: "Why don't eggs tell jokes?",
        answer: "They'd crack each other up."
    },
];

class DadJoke {
    constructor(id, question, answer) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }

    getId() {
        return this.id;
    }

    getQuestion() {
        return this.question;
    }

    getAnswer() {
        return this.answer;
    }
}

class App {
    constructor(jokes) {
        this.jokes = jokes;
    }

    showNavigationMenu() {
        console.log(clc.bgGreen.white("\nSelect what would you like to do:"));
        console.log('[1] Print all dad jokes one by one');
        console.log('[2] Print random dad joke');
        console.log('[3] Choose dad joke by question');
        console.log('[4] Print mixed dad joke');
        console.log('[5] Enter new dad joke');
        console.log('[6] Count dad jokes in database');
        console.log('[7] Exit');
        this.parseNavigationInput();
    }

    parseNavigationInput() {
        let selection = readlineSync.question("\nEnter number: ");
        selection = parseInt(selection);

        switch (selection) {
            case 1:
                this.printAllJokes();
                break;
            case 2:
                this.printRandomJoke();
                break;
            case 3:
                this.printSelectedJoke();
                break;
            case 4:
                this.printMixedJoke();
                break;
            case 5:
                this.insertNewJoke();
                break;
            case 6:
                this.countJokesInDb();
                break;
            case 7:
                this.exit();
                break;
            default:
                this.printLine();
                console.log(clc.bold.red("Sorry, this doesn't match any item in the navigation menu."));
                this.printLine();
                this.showNavigationMenu();
                break;
        }
    }

    insertNewJoke() {
        console.log("\nAdd new joke");

        const question = readlineSync.question("\nEnter joke question: ");
        const answer = readlineSync.question("\nEnter joke answer: ");
        const id = this.jokes.length + 1;

        let joke = new DadJoke(id, question, answer);
        this.jokes.push(joke);

        console.log("\nJoke added successfully\n")
        this.printFormattedJoke(joke);

        this.showNavigationMenu();

        
    }

    printAllJokes() {
        this.jokes.map(joke => {
            this.printLine();
            console.log(clc.bold.green(`${joke.getQuestion()}`));
            console.log(clc.cyan(`${joke.getAnswer()}`));
        });

        this.showNavigationMenu();
    }

    printRandomJoke() {
        const randomNumber = this.generateRandomId();
        const joke = this.findJokeById(randomNumber);

        this.printFormattedJoke(joke);
        
        this.showNavigationMenu();
    }

    printSelectedJoke() {
        console.log("\nAll questions\n");

        this.jokes.map(joke => {
            console.log(clc.bold.green(`[${joke.getId()}] ${joke.getQuestion()}`));
        });

        let id = readlineSync.question("\nEnter joke number: ");
        id = parseInt(id);

        const joke = this.findJokeById(id);

        if(joke.length === 0) {
            console.log('Enter valid joke number');
            this.printSelectedJoke();
        } else {
            this.printFormattedJoke(joke);
            this.showNavigationMenu();
        }

    }

    printFormattedJoke(joke) {
        this.printLine()
        console.log(clc.bold.green(`${joke.getQuestion()}`));
        console.log(clc.cyan(`${joke.getAnswer()}`));
        this.printLine();
    }

    generateRandomId() {
        return Math.floor(Math.random() * this.jokes.length) + 1;
    }

    findJokeById(id) {
        let joke = this.jokes.filter(item => item.id === id);
        
        if (joke.length !== 0) return joke[0];
        return [];
    }

    printMixedJoke() {
        const questionId = this.generateRandomId();
        const answerId = this.generateRandomId();

        const joke1 = this.findJokeById(questionId);
        const joke2 = this.findJokeById(answerId);

        this.printLine();
        console.log(clc.bold.green(`${joke1.getQuestion()}`));
        console.log(clc.cyan(`${joke2.getAnswer()}`));
        this.printLine()
        
        this.showNavigationMenu();
    }

    countJokesInDb() {
        this.printLine();
        console.log(`We have ${clc.bold.green(this.jokes.length)} jokes in database`);
        this.printLine();

        this.showNavigationMenu();
    }

    exit() {
        console.log(clc.green("\nBye!\n"));
    }

    init() {
        this.printLine();
        console.log(clc.bold("DAD JOKE GENERATOR"));
        this.printLine();
        this.showNavigationMenu();
    }

    printLine() {
        console.log(clc.bold("============================="));
    }
}


// seed db
let jokes = [];
for(let i = 0; i < data.length; i++) {
    const joke = new DadJoke(data[i]['id'], data[i]['question'], data[i]['answer']);
    jokes.push(joke);
}

const app = new App(jokes);
app.init()

