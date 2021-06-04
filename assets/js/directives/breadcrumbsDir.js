/* Animation Directive
====================================================================================================
==================================================================================================*/ 

var breadcrumbs = function($state, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/breadcrumbs.html',
        replace: true,
        compile: function(tElement, tAttrs) {
            return function($scope, $stateParams) {
                console.log('stateparams',$stateParams);
                $scope.show = function(state){
                    if(!angular.isDefined(state.data)){
                        return false;
                    }
                    else if(!angular.isDefined(state.data.breadcrumbs)){
                        return false;
                    }
                    return true;
                };
            }
        }
    };
};

csgJobSubTool.directive('breadcrumbs', ['$state', '$stateParams', breadcrumbs]);