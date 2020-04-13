
const BudgerHandler=require('../handlers/budgetStoryHandler')
module.exports = function (sqlService) {
    let budgetHandler=new BudgerHandler(sqlService);
    return [{
      method: 'GET',
      path: '/plans',
      options: {
        description: 'Get All Plan Details',
        notes: 'Returns an array of Plan Details',
        tags: ['api'],
        handler: async (request, h) => {
          let response = {};
          try {
            response = await budgetHandler.getAllPlans();
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
      path: '/plan',
      handler: async (request, h) => {
        let response = {};
        try {
          //response = await oneUserServiceClient.updateUser();
          response = await budgetHandler.addNewPlan(request.payload);
        } catch (e) {
          console.log(e);
        }
        return {
          response
        }
      },
      options: {
        description: 'add new Plan Details',
        notes: 'Allows to add new plan details',
        tags: ['api'],
      //   validate: {
      //     payload: joi.object().keys(postUserModel)
      //   }
      }
    },
    {
        method: 'PUT',
        path: '/plan/{id}',
        handler: async (request, h) => {
          let response = {};
          try {
            //response = await oneUserServiceClient.updateUser();
            response = await budgetHandler.updatePlan(request.params.id,request.payload);
          } catch (e) {
            console.log(e);
          }
          return {
            response
          }
        },
        options: {
          description: 'Update Plan Details',
          notes: 'Allows to update plan details',
          tags: ['api'],
        }
      },{
        method: 'DELETE',
        path: '/plan/{id}',
        handler: async (request, h) => {
          let response = {};
          try {
            //response = await oneUserServiceClient.updateUser();
            response = await budgetHandler.deletePlan(request.params.id);
          } catch (e) {
            console.log(e);
          }
          return {
            response
          }
        },
        options: {
          description: 'delete plan Details',
          notes: 'Allows to delete plan details',
          tags: ['api']
        }
      }];
  }
  