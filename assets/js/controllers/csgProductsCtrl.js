/* CSG Products Controller
=========================================================================================
=========================================================================================
*/ 

csgJobSubTool.controller('csgProductsCtrl', function($scope,$sce,$stateParams,csgServicesFactory ) {

	'use strict';
	$scope.$sce = $sce;  
    $scope.pageName = $stateParams.title;  
    csgServicesFactory.getAllServices().then(function(data){
        var serviceId = data.d.results.filter(function(object){
            return object.Title === $scope.pageName;
        })[0].ID;
        console.log('id',serviceId)
        csgServicesFactory.getAllProducts().then(function(response){
            console.log('getAllProducts',response);	
            $scope.productsAvailable = response.d.results.filter(function(object){
                console.log('object',object)
                return object.related_ServicesId === serviceId; 
            });	
        });
    });
});