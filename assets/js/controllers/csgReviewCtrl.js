/* CSG Review Controller
=========================================================================================
=========================================================================================
*/ 

csgJobSubTool.controller('csgReviewCtrl', function($scope,$sce,csgTest,$window) {

	'use strict';
	$scope.$sce = $sce;  
  if($window.localStorage.getItem('formData') == undefined){
    $window.history.back();
  }  
    $scope.jobPosted = function($event){
        $event.preventDefault();
        var data = $window.localStorage.getItem('formData');
      /*   $scope.formData = {
          'Title': 'sarjeet23',
          'totalFiles': 22,
          'requestor':'sarjeet.kaur@uk.ey.com',
          'clientName':'Learning Portal',
          'priority': 'Low',
          'engagementCode':'I-66065718, L&D xSL UKI Portal',
          'projectPurpose':'Internal',
          'altContact':'jeni.kumar1@uk.ey.com',
          'requestedOn':'5/26/2021 12:00 AM',
          'dueBy':'5/26/2021 05:00 PM',
          'documentPassword':'asda',
          'filesTypeSubmitted':'Hard Copy',
          'printingRequirements':'true',
          'specialInstructions':'edwuuu'
        } */
   
       //csgTest.getTestData(JSON.stringify($scope.formData));
       csgTest.getTestData(data);
     }
	

});