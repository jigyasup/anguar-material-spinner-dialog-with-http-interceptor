var app = angular.module('plunker', ['ngResource','ngMaterial']);
app.config( ["$httpProvider",function($httpProvider,$provide) {
 
    $httpProvider.interceptors.push('httpInterceptor');
}]);


  app.factory('httpInterceptor', testInterceptor);
  
  function testInterceptor($timeout,httpDelayConfig) {
  return {
    request: function(config) {
       httpDelayConfig.spinner.spinnerval = true;
      return config;
    },

    requestError: function(config) {
      return config;
    },

    response: function(res) {
      
                   
                
              httpDelayConfig.spinner.spinnerval = false;
                return res;
    },

    responseError: function(res) {
        httpDelayConfig.spinner.spinnerval = false;
      return res;
    }
  }
}

app.service('httpDelayConfig', function(){
  return {
    milliseconds: 1000,
    spinner:{spinnerval:false}
  };
});

app.controller('MainCtrl', function($scope, $http, httpDelayConfig) {
  $scope.content = 'Content will be loaded here.'
  $scope.httpDelay = httpDelayConfig;
  
  $scope.fetchAsync = function(forceError) {
    $scope.content = 'Loading...';  
    
    $http.get(forceError ? 'skdhakdjhs' : 'testtext.text').then(function(result) {
      $scope.content = result.data;
    }, function() {
      $scope.content = 'There was an error!';
    });
  }
});
app.directive("loading",loadingFunc);
function loadingFunc($mdDialog,httpDelayConfig) {
    return {
        restrict: 'E',
        
        link: function (scope, element, attr) {
          

            scope.$watch(function () { return httpDelayConfig.spinner.spinnerval; }, function (data) {
                if (httpDelayConfig.spinner.spinnerval) {
                   
                        showLoading();
                  
                  

                } else {

                    $mdDialog.hide();
                }
            }, true);

           
        
            

            function showLoading() {

                $mdDialog.show({

                    clickOutsideToClose: false,
                    controller: function () { this.parent = scope; },
                    controllerAs: 'spinnerCtrl',
                    parent: document.body,
                    template:
                  //  '<div layout="row" layout-sm="column" layout-align="space-around">\
    //'<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
  //</div>'
 //  '<md-progress-linear md-mode="determinate" value="20"></md-progress-linear>'
                     '<md-dialog  id="spinner1s" ng-cloak>\
                           <md-content><div class="md-dialog-content spinnerDialog"><img src="img.svg"><div></md-content></md-dialog>'
                     ,
                    onComplete: afterShowAnimation,

                })

                function afterShowAnimation(scope, element, options) {
                    // post-show code here: DOM element focus, etc.
                }
            }
         
            
        } 
    }
}