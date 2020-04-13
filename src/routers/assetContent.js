


module.exports = function (client) {
    return [{
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {

            return 'Hello World!';
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    }, {
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return h.file('index.html')
        }
    }];
}
