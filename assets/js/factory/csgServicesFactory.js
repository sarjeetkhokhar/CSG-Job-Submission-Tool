/* Area intros Data Factory
===========================================================================================
===========================================================================================*/

csgJobSubTool.factory('csgServicesFactory', function($http){
	return {		
		getAllServices: function(){
	    	return $http.get("https://eygb.sharepoint.com/sites/CreativeWorkflow/_api/web/lists/getByTitle('Lst_CSGServices')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getAllProducts: function(){
			return $http.get("https://eygb.sharepoint.com/sites/CreativeWorkflow/_api/web/lists/getByTitle('Lst_CSGProducts')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getAllAssets: function(){
			return $http.get("https://eygb.sharepoint.com/sites/CreativeWorkflow/_api/web/lists/getByTitle('Lst_CSGAssets')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getAllDocs: function(){
			return $http.get("https://eygb.sharepoint.com/sites/CreativeWorkflow/_api/web/lists/getByTitle(Lst_DocumentLibrary')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},

	}
});