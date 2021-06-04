/* Area intros Data Factory
===========================================================================================
===========================================================================================*/

csgJobSubTool.factory('csgTest', function($http,$location){
	return {
		
		getTestData: function(data){
			
	    data = data.replace(/[{}]/g, "");
	    var dataValue =
	      "{__metadata:{'type':'SP.Data.Lst_x005f_CSGProjectsListItem'}," + data + "}";
		  $http({
				url:"https://eygb.sharepoint.com/sites/CreativeWorkflow/_api/web/lists/getByTitle('Lst_CSGProjects')/items?$select=*", 
				method: "POST",
				contentType: "application/json;odata=verbose",
				headers: {
							"Accept": "application/json;odata=verbose",
							"Content-Type": "application/json;odata=verbose", //header for create record
							"X-RequestDigest": $("#__REQUESTDIGEST").val(),
							"X-HTTP-Method": "POST"
					   },
					body:  { __metadata: { type: "SP.List" }, dataValue: true },
					data:  dataValue		
					})
					.then(function(response) {
						console.log("success:: ", response);
						$location.path('/SitePages/Creative-Workflow.aspx/home/thankYou');
					});
		
		}
	}
});