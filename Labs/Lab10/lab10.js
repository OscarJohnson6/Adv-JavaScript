// Creating a server to say hello world on port 3333.
const http = require("http");

const server = http.createServer((req, res) => {
    const outputResponse = "hello world";
    res.write(outputResponse);
    res.end();
})

server.listen(3333);

console.log("Listening on port 3333...");