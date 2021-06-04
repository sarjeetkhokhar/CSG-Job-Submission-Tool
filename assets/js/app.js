var csgJobSubTool = angular.module('csgJSTApp', ['ui.router', 'ngSanitize','ui.bootstrap']);

var appCacheVersion = '20-02-20-234';
/* csgJobSubTool.run(function($state, $rootScope) {
  $state.go('home');  
}); */
//this is to allow the $location.search().q to work when entering a search term
csgJobSubTool.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode(
    {
      enabled: true,
      requireBase: false
    });    
}]);

csgJobSubTool.filter('strLimit', ['$filter', function($filter) {
  return function(input, limit) {
     if (! input) return;
     if (input.length <= limit) {
         return input;
     }

     return $filter('limitTo')(input, limit) + '...';
  };
}]);

csgJobSubTool.filter('limitHtml', function() {
  return function(text, limit) {

      var changedString = String(text).replace(/<[^>]+>/gm, '');
      var length = changedString.length;

      return length > limit ? changedString.substr(0, limit - 1)+ '....' : changedString;
  }
});

csgJobSubTool.filter('trusted', ['$sce', function($sce){
	var div = document.createElement('div');
	return function(text) {
		div.innerHTML = text;
		return $sce.trustAsHtml(div.textContent);
	}
}])

csgJobSubTool.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

csgJobSubTool.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});
csgJobSubTool.filter('removeHTMLTags', function() {
  return function(text) {
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
})

csgJobSubTool.filter('searchFor', function(){
  return function(dataArr, searchString){
      console.log('searching ....');
      if(!searchString){
          return dataArr;
      }
      
      var result = [];
      searchString = searchString.toLowerCase();
      angular.forEach(dataArr, function(item){
          if(item.name.toLowerCase().Index-TestOf(searchString) !== -1){
              result.push(item);
          }
      });
      return result;
  };
});


csgJobSubTool.config(function($locationProvider,$stateProvider, $urlRouterProvider, $httpProvider) {
  $locationProvider.hashPrefix('');
  $stateProvider
    .state('/', {
      url: "/SitePages/Creative-Workflow.aspx/home",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/homePartial.html?=c" + appCacheVersion
    })
    .state('home', {
      url: "/SitePages/Creative-Workflow.aspx/home",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/homePartial.html?=c" + appCacheVersion
    })   
    .state('services', {
      url: "/SitePages/Creative-Workflow.aspx/home/services",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/servicePartial.html?=c" + appCacheVersion
    })
    .state('services/individual', {
      url: "/SitePages/Creative-Workflow.aspx/home/services/{title}",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/productPartial.html?=c" + appCacheVersion
    })  
    .state('services/individual/individual', {
      url: "/SitePages/Creative-Workflow.aspx/home/services/{serviceTitle}/{productTitle}",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/assetsPartial.html?=c" + appCacheVersion
    })  
    .state('review', {
      url: "/SitePages/index.aspx/home/review",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/reviewPartial.html?=c" + appCacheVersion
    })  
    .state('thankYou', {
      url: "/SitePages/Creative-Workflow.aspx/home/thankYou",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/thankYouPartial.html?=c" + appCacheVersion
    })  
    .state('error', {
      url: "/SitePages/index.aspx/home/error",
      templateUrl: "https://eygb.sharepoint.com/sites/CreativeWorkflow/Test/SiteAssets/job-submission-tool/assets/js/partials/errorPartial.html?=c" + appCacheVersion
    })  

    $urlRouterProvider.otherwise("/SitePages/Creative-Workflow.aspx/home");

});