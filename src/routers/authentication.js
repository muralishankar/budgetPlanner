

module.exports = function (client) {
  return [{
    method: 'GET',
    path: '/user',
    options: {
      description: 'Get All User Details',
      notes: 'Returns an array of User Details',
      tags: ['api'],
      handler: async (request, h) => {
        let response = {};
        try {
          //response = await oneUserServiceClient.fetchAllUsers();
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
    path: '/user',
    handler: async (request, h) => {
      let response = {};
      try {
        //response = await oneUserServiceClient.updateUser(request.payload);
      } catch (e) {
        console.log(e);
      }
      return {
        response
      }
    },
    options: {
      description: 'Update User Details',
      notes: 'Allows to update user details',
      tags: ['api'],
    //   validate: {
    //     payload: joi.object().keys(postUserModel)
    //   }
    }
  }];
}
