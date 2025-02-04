const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// function to send response
const respond = (request, response, status, content, type) => {
    // set status code and content type
    response.writeHead(status, {
        'Content-Type': type,
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });
    // write the content string or buffer to response
    response.write(content);
    // send the response to the client
    response.end();
};

// function to handle the index page
const getIndex = (request, response) => {
    respond(request, response, 200, index, 'text/html');
};

// function to handle the css
const getCSS = (request, response) => {
    respond(request, response, 200, css, 'text/css');
};

module.exports = {
    getIndex,
    getCSS
};