/* Current User data Properties Factory
===========================================================================================
===========================================================================================*/

csgJobSubTool.factory('currentUser', function($http){
	var currentUser = null;
	return {
		getCurrentUserData: function(){
	    	return $http.get("https://eygb.sharepoint.com/sites/CreativeWorkflow/_api/SP.UserProfiles.PeopleManager/GetMyProperties", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {				
				return response.data;
			});
		},
		get: function(){
            return currentUser;
        },
		set: function(user){
			var obj = {
				'emailId': user.Email,
				'userName': user.DisplayName.split(' ')[0]
			}
			currentUser = obj;
		}
	}
});