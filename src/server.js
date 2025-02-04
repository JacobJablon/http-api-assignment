const http = require('http');

const { getIndex, getCSS } = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': getIndex,
    '/style.css': getCSS,
};


// handle HTTP requests. In node the HTTP server will automatically
// send this function request and pre-filled response objects.
const onRequest = (request, response) => {
    // parse the url using the built in URL class. Can make sure this supports http and https
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    // grab the 'accept' headers (comma delimited) and split them into an array
    // store them inside of the request object for use in handler functions
    request.acceptedTypes = request.headers.accept.split(',');

    // check if the path name (the /name part of the url) matches
    // any in our url object. If so call that function. If not, default to index.
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response);
    } else {
        // otherwise send them to the index (normally this would be the 404 page)
        urlStruct.index(request, response);
    }
};


http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});