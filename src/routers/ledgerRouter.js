
const LedgerHandler=require('../handlers/ledgerHandler')
module.exports = function (sqlService) {
    let ledgerHandler=new LedgerHandler(sqlService);
    return [{
      method: 'GET',
      path: '/transactions/{id}',
      options: {
        description: 'Get All Transactions',
        notes: 'Returns an array of Transactions',
        tags: ['api'],
        handler: async (request, h) => {
          let response = {};
          try {
            response = await ledgerHandler.getTransactions(request.params.id);
          } catch (e) {
            console.log(e);
          }
  
          return {
            response
          }
        }
      }
    }, {
      method: 'POST',
      path: '/transaction',
      handler: async (request, h) => {
        let response = {};
        try {
          //response = await oneUserServiceClient.updateUser();
          response = await ledgerHandler.addNewTransaction(request.payload);
        } catch (e) {
          console.log(e);
        }
        return {
          response
        }
      },
      options: {
        description: 'add new transactions',
        notes: 'Allows to add new transactions',
        tags: ['api'],
      //   validate: {
      //     payload: joi.object().keys(postUserModel)
      //   }
      }
    },
    {
        method: 'PUT',
        path: '/transaction/{id}',
        handler: async (request, h) => {
          let response = {};
          try {
            //response = await oneUserServiceClient.updateUser();
            response = await ledgerHandler.updateTransaction(request.params.id,request.payload);
          } catch (e) {
            console.log(e);
          }
          return {
            response
          }
        },
        options: {
          description: 'Update transactions',
          notes: 'Allows to update transactions',
          tags: ['api'],
        }
      },{
        method: 'DELETE',
        path: '/transaction/{id}',
        handler: async (request, h) => {
          let response = {};
          try {
            //response = await oneUserServiceClient.updateUser();
            response = await ledgerHandler.deleteTransaction(request.params.id);
          } catch (e) {
            console.log(e);
          }
          return {
            response
          }
        },
        options: {
          description: 'delete transactions',
          notes: 'Allows to delete transactions',
          tags: ['api']
        }
      }];
  }
  