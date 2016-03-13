# anguar-material-spinner-dialog-with-http-interceptor


A few weeks ago, I was working on a web application which was actually built in angular base. I needed a spinner loader to display just after http request and before I got the response from the server. That should be very easy in jquery, but in angular is I find it less difficult. I tried with timeout, but that's very inconsistent as the time required for different server call might not be same. Then I found about http interceptor, i used $http interceptor to display spinner between sending request and receiving response from sever.

 An interceptor is simply a regular service factory that is registered to that array. $httpProvider consists array of interceptor . 
 You can create $http interceptor like this:
 
  
  
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
 
 $http interceptor can be very useful if you want to modify all your request config before sending to the server and after receiving from the server. Once you define an error handling function at $http interceptor, it will handle all over the module. 
 
 To create a spinner I define a service httpDelayConfig to store the properties of spinner like this
    
    app.service('httpDelayConfig', function(){
      return {
      milliseconds: 1000,
      spinner:{spinnerval:false}
      };
      });
    
The spinnerval holds the display property of spinner.
I have created a directive called "loading" for spinner like this:

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
 Now you can use this directive as  <loading></loading> in your layout . 
 
 I have uploaded a fully working example of http interceptor spinner loader directive in plunker .
 Link: https://embed.plnkr.co/Iom7kgWULpNLGYRzbz4l/
 
 Here are my plnkers: https://plnkr.co/users/jigyasup
