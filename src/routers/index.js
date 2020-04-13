

module.exports = function (sqlService) {
    return {
        plugin: {
            name: 'router',
            register: (server, options) => {
                server.route((() => {
                    //let client = new CosmosClient({ endpoint, key });
                    //client.repla
                    return [
                        //...require('./authentication')(sqlService),
                        ...require('./budgetRouter')(sqlService),
                        ...require('./ledgerRouter')(sqlService),
                        ...require('./assetContent')()
                    ];
                })())
            }
        }
    }

}
