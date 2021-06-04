/* CSG Thank You Controller
=========================================================================================
=========================================================================================
*/ 

csgJobSubTool.controller('csgThankYouCtrl', function($scope,$sce,currentUser ) {

	'use strict';
	$scope.$sce = $sce;  
    var currentUserData = currentUser.get();
	console.log('user',currentUserData);
	if(currentUserData == null){
		currentUser.getCurrentUserData().then(function(response){
			console.log('getCurrentUserData',response);
			currentUser.set(response.d);
			var value = currentUser.get()
			$scope.userName = value.userName;
		});
	}else{
		$scope.userName = currentUserData.userName;
	}
   
});