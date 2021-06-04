/* CSG Services Controller
=========================================================================================
=========================================================================================
*/ 

csgJobSubTool.controller('csgServicesCtrl', function($scope,$sce,csgServicesFactory) {

	'use strict';
	$scope.$sce = $sce;    
	csgServicesFactory.getAllServices().then(function(response){
		console.log('getAllServices',response);	
		$scope.servicesData = response.d.results;	
	});
	

});