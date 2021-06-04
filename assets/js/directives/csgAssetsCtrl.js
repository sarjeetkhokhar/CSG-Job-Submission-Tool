/* CSG Assets Controller
=========================================================================================
=========================================================================================
*/ 

csgJobSubTool.controller('csgAssetsCtrl', function($scope,$sce,docParams,$stateParams,csgServicesFactory,$window,$uibModal,$location,currentUser,csgTest) {

	'use strict';
	$scope.$sce = $sce;  
    $scope.prevPage = $stateParams.serviceTitle;
    $scope.pageName = $stateParams.productTitle;
    $scope.selectedAssets = [];
    $scope.assetPanel = false;
    $scope.reviewScreenOpen = false;
    $scope.successUploadedArr = [];
    $scope.idDataArr = [];
    $scope.submitted = false;
    
  
      console.log('url', _spPageContextInfo.siteAbsoluteUrl);
    $scope.formData = {
      'Title': '',
      'assets':'',
      'totalFiles': '',
      'requestor': '',
      'priority': '',
      'engagementCode':'',
      'projectPurpose':'',
      'altContact':'',
      'requestedOn':'',
      'dueBy':'',
      'documentPassword':'',
      'filesTypeSubmitted':'',
      'printingRequirements':'',
      'specialInstructions':'',
      'dataDocumentUpload':''
    }
    $scope.assets = [];
    var currentUserData = currentUser.get();
    console.log('user',currentUserData);
    if(currentUserData == null){
      currentUser.getCurrentUserData().then(function(response){
        console.log('getCurrentUserData',response);
        currentUser.set(response.d);
        var value = currentUser.get()
        $scope.formData.requestor = value.emailId;
        $scope.userName = value.userName;
      });
    }else{
      $scope.formData.requestor = currentUserData.emailId;
      $scope.userName = currentUserData.userName;
    }
    // APP
		var APP_BLD = 20181209;
		// CONST
		var HTML_SPINNER = '<div class="sprlib-spinner"><div class="sprlib-bounce1"></div><div class="sprlib-bounce2"></div><div class="sprlib-bounce3"></div></div>';

		/*
			REFS:
			https://blogs.msdn.microsoft.com/uksharepoint/2013/04/20/uploading-files-using-the-rest-api-and-client-side-techniques/
			https://msdn.microsoft.com/en-us/library/office/dn769086.aspx
			http://sharepoint.stackexchange.com/questions/74969/properties-when-uploading-files-using-rest-in-sp-2013
		*/

	$scope.getFilesDetails = function(){
		console.log('output content', $('#console'));
	}

    $scope.doPopulateApp = function() {
			var fileName = "";
			try { fileName = $('#filePicker')[0].files[0]; } catch(ex){}

			// STEP 1:
			$('#sprLibCode').text(
				'// STEP 1: Use FilePicker to read file\n'
				+'var reader = new FileReader();\n'
				+'reader.readAsArrayBuffer( $(\'#filePicker\')[0].files[0] );\n'
				+'reader.onloadend = function(e){\n'
				+'    var parts = $(\'#filePicker\')[0].value.split("\\\\");\n'
				+'    var fileName = parts[parts.length - 1];\n'
				+'    var foldName = $(\'#selDestLib\').val();\n'
				+'\n'
				+'    // STEP 2: Upload file to SharePoint\n'
				+'    sprLib.folder( foldName ).upload({\n'
				+'        name: fileName,\n'
				+'        data: e.target.result,\n'
				+'        overwrite: true\n'
				+'    });\n'
				+'});'
			);
			Prism.highlightElement( $('#sprLibCode')[0] );

			// STEP 2:
			sprLib.site().lists()
			.then(function(arrLists){
				arrLists.forEach(function(list){
					if ( list.BaseType == 'Library' && !list.Hidden ) {
						$('#selDestLib').append('<option value="'+ list.ServerRelativeUrl +'">'+ list.Title +'</option>');
					}
				});

				$('#contOptions .sprlib-spinner').hide();
			})
			.catch(function(strErr){
				alert(strErr);
			});
		}

    $('#filePicker').change(function(newItem){
      $scope.uploadFile(newItem);
    })
    var dataDocumentUpload = [];
    var dataDocumentUploadNames = [];
    $scope.uploadFile = function(newItem) {
         //console.log($('#filePicker')[0].files);
         let fileArr = [];
         for (var file in $('#filePicker')[0].files){
             fileArr.push($('#filePicker')[0].files[file]);
     }
     fileArr.length = fileArr.length - 2
         $scope.fileArrLength = fileArr.length;
         console.log('fileArr ', $scope.fileArrLength);
         for (let i = 0; i < fileArr.length; i++){
             //console.log('file ', fileArr[i]);
             var reader = new FileReader();
             reader.readAsArrayBuffer(fileArr[i]);
             reader.onloadend = function(e){
                 //console.log('file in onload', fileArr[i]);
                 // var parts = $('#filePicker')[0].value.split('\\');
                 //console.log('parts '+i, fileArr[i].name);
                 //var fileName = parts[parts.length - 1];
                 let fileName = fileArr[i].name;
                 //console.log('filename '+i, fileName)
                 var strAjaxUrl = _spPageContextInfo.siteAbsoluteUrl
                     + "/CreativeWorkflow/_api/web/lists/getByTitle('Lst_DocumentLibrary')/RootFolder/files/Add(url='"+ fileName +"',overwrite=false)";
 
                 //console.log('strAjaxUrl ', strAjaxUrl);
                 //console.log('e.target.result', e.target.result);
                 sprLib.rest({
                     type: "POST",
                     url: strAjaxUrl,                
                     data: e.target.result
                 })
                 .then(function(arr){
           //console.log('result arr ', arr);
           $('#console').append('SUCCESS: "'+ arr[0].Name +'" uploaded to: '+ arr[0].ServerRelativeUrl +'<br>');
           $scope.successUploadedArr.push({FileName: arr[0].Name, FileUrl: arr[0].ServerRelativeUrl});
            dataDocumentUpload.push(arr[0].Name + '#' + arr[0].ServerRelativeUrl)
            dataDocumentUploadNames.push(arr[0].Name);
            docParams.addDoc({FileName: arr[0].Name, FileUrl: arr[0].ServerRelativeUrl});
            /* : <a href="'+ arr[0].ServerRelativeUrl +' target="_blank">'+arr[0].Name + '</a><br/>' */
           $('#successDiv').append(`<ul><li><span>`+ arr[0].Name +`</span>
           <span>`+ $scope.userName + `</span>
           <span>date and time({{new Date()}})</span>
      <span class="delete">delete</span></li></ul>`);
           /* csgServicesFactory.getAllDocs().then(function(data){
            console.log('data',data);
          }) */
         })
                 .catch(function(strErr){
                     console.error(strErr);
         })				
             };
       reader.onerror = function(e){
         alert(e.target.error.responseText);
         console.error(e.target.error);
       };		
       
     }
       /* $scope.refreshIntervalId = setInterval(function(){
         if($scope.successUploadedArr.length == $scope.fileArrLength){
           console.log('success array', $scope.successUploadedArr);
           $scope.docHtml = '';
           for (var k=0; k < $scope.successUploadedArr.length; k++){
             $('#successDiv').append('Link: <a href="'+ $scope.successUploadedArr[k].FileUrl +' target="_blank">'+$scope.successUploadedArr[k].FileName + '</a><br/>' );
 
             $scope.docHtml += "<a href='" +  $scope.successUploadedArr[k].FileUrl + "'>" +  $scope.successUploadedArr[k].FileName + "</a><br/><br/>";
           }					
           //$scope.submitInfo($('#successDiv'));
           clearInterval($scope.refreshIntervalId);
         }									
       }, 1000); */
 
       // var docArr = docParams.getDocArr();
       // console.log('docParams', docArr);
       // STEP 2: Show version
       // $('#console').append('<h5 class="text-primary">FYI: sprLib.version = '+ sprLib.version +'</h5>');
 
       // STEP 3: Populate
       //$scope.doPopulateApp();
    }
    csgServicesFactory.getAllProducts().then(function(values){
      console.log('values',values);
      csgServicesFactory.getAllAssets().then(function(data){  
            var currentAsset = values.d.results.filter(function(obj){
              return obj.Title === $scope.pageName
            })
            console.log(currentAsset);
            $scope.productsAvailable = data.d.results.filter(function(v){
                 angular.forEach(v.related_ProductsId.results,function(value,key){
                    if(value == currentAssetID){
                      return v;
                    }
                 })
            });
      })
    })
    
    $scope.selectAssets = function($evnt,asset){
        $evnt.preventDefault();
        $scope.formData.requestedOn = formatDate(new Date());
       /*  var currentUserData = currentUser.get();
        $scope.formData.Requestor = currentUserData.emailId; */
        var findAssets = $scope.assets.filter(function(val){
          return (val.Title == asset.Title && val.ID == asset.ID)
        })
        var aTypesArr = [];
        if(findAssets.length < 1){
          var types = asset.assetTypes.split(',');
          angular.forEach(types, function(value,key){
            aTypesArr.push(value.trim());
          });
        var obj = {
          Title: asset.Title,
          Type: aTypesArr,
          ID: asset.ID,
          selectedType: aTypesArr[0]
        }
        console.log('obj',obj);
        
        $scope.assets.push(obj);
        $scope.assetPanel = true;
      }
    }
    $scope.selectRadio = function(index,type,id){
      console.log(index,type);
     if($('#' + type + '--' + index).parents('.radio-wrapper').find('.checkmark').length > 0){
        $('#' + type + '--' + index).parents('.radio-wrapper').find('.checkmark').removeClass('checkmark');
      }        
      $('#' + type + '--' + index).addClass('checkmark');      
      $scope.assets.filter(function(obj){
        if(obj.ID == id){
          obj.selectedType = type;
        }
      })
      
      
    }
    $scope.deleteAssets = function(id){  
      $.each($scope.assets, function(i){
        if($scope.assets[i].ID === id) {
          $scope.assets.splice(i,1);
            return false;
        }
    });
     if($scope.assets.length < 1){     
        $scope.assetPanel = false;   
      }
     
  }
  $scope.back = function(){
    $scope.reviewScreenOpen = false;
  }
   /*  $scope.open = function (parentSelector) {
      var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        size: 'lg',
        appendTo: parentElem,
      });
      
    }; */
    $scope.ok = function () {     
      $scope.openPopUp = false;
    };

    $scope.cancel = function () {
      $scope.openPopUp = false;
     /*  $scope.dismiss({$value: 'cancel'}); */
    };
    $scope.error = [];
    $scope.jobReview = function($event){
      console.log(dataDocumentUpload);
      $scope.displayUploadedNames = dataDocumentUploadNames;
      $event.preventDefault();    
      if($scope.csgForm.$invalid || $scope.csgForm.$pristine){
        angular.forEach($scope.csgForm.$error.required,function(value,key){
          console.log(value);
          if(value.$name == "projectPurpose"){
            $scope.error.push('project Purpose is required field*')
          }else if(value.$name == "dueBy"){
            $scope.error.push('Due By is required field*')
          }else if(value.$name == "engagementCode"){
            $scope.error.push('Engagement Code is required field*')
          }else if(value.$name == "altContact"){
            $scope.error.push('Alternative Contact is required field*')
          }
          else if(value.$name == "totalFiles"){
            $scope.error.push('Total Number of uploaded files is required field*')
          }
        });
        $scope.submitted = true;
        $('#s4-bodyContainer').animate({
          scrollTop: $(".csg-form-error-Block").offset().top
      }, 2000);
        
      }else{
        $scope.submitted = false;
        console.log('formData',$scope.formData);       
        $scope.formData.dueBy = formatDate($scope.formData.dueBy,'dueBy');
        angular.forEach($scope.assets,(function(value,key){
          $scope.formData.assets = $scope.formData.assets + value.Title + '#' + value.selectedType + ','
        }));
        angular.forEach(dataDocumentUpload,(function(value,key){
          $scope.formData.dataDocumentUpload = $scope.formData.dataDocumentUpload  + value + ','
        }));
        
       $scope.reviewScreenOpen = true;
      }
     
    } 
     $scope.hasError = function(field, validation){
    if(validation){
      return ($scope.csgForm[field].$dirty && $scope.csgForm[field].$error[validation]) || ($scope.submitted && $scope.csgForm[field].$error[validation]);
    }
    return ($scope.csgForm[field].$dirty && $scope.csgForm[field].$invalid) || ($scope.submitted && $scope.csgForm[field].$invalid);
  };


    
  
    window.onbeforeunload = function(event) {
      // do some stuff here, like reloading your current state
      //this would work only if the user chooses not to leave the page
      return 'are you sure you will lost your form Data';
  }
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
$scope.inlineOptions = {  
  minDate: new Date(),
  showWeeks: false
};
 // Disable weekend selection
 function disabled(data) {
  var date = data.date,
    mode = data.mode;
  return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
}
$scope.dateOptions = {
  dateDisabled: disabled,
  formatYear: 'yy',
  minDate: new Date(),
  startingDay: 1
};
$scope.toggleMin = function() {
  $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
  $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
};
$scope.toggleMin();


$scope.priorities = ["Low", "Medium", "High"];
$scope.purposes = ["Internal","External"];
$scope.printingRequirements = ["YES","NO"];
$scope.filesTypeSubmitted = ["Nothing to submit","Attached Files","Hard Copy","Scan","Data Key","See special Instructions"];  
  var formatDate = function(date,dueBy){
    if(dueBy == undefined){
      var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
      return date.getMonth() > 8 ? date.getMonth()+ 1 : '0' + (date.getMonth()+ 1) + '/' + date.getDate() + '/' + date.getFullYear() +' ' + date.getHours() + ':'+ (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ' ' + ampm 
    }else{
      var ampm =  '5:00 PM';
      return date.getMonth() > 8 ? date.getMonth()+ 1 : '0' + (date.getMonth()+ 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + ampm;
    }
   
  }
 
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };
  $scope.toggleOnce = true;
  $scope.open2 = function() {
    if( $scope.toggleOnce){
      $scope.toggleMin();
      $scope.toggleOnce = false;
    }
    $scope.popup2.opened = true;
  };
  $scope.openPopUp = false;
  $scope.jobCancel = function($event) {
   $scope.openPopUp = true;
  };

  
  $scope.popup2 = {
    opened: false
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    showWeeks: false,      
    startingDay: 0
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.jobPosted = function($event){
    $event.preventDefault();    
    var data = JSON.stringify($scope.formData);
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
})