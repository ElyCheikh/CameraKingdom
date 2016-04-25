angular.module('NetworkWebApp', [
  'NetworkWebApp.services',
  'NetworkWebApp.controllers',
  'ngRoute'
  ]).controller('MyCtrlup',['Upload','$window',function(Upload,$window){
      var vm = this;
      vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
          vm.upload(vm.file); //call upload function
        }
      }

      vm.upload = function (file) {
        Upload.upload({
          url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
          data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
          if(resp.data.error_code === 0){ //validate success
            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
          } else {
            $window.alert('an error occured');
          }
        }, function (resp) { //catch error
          console.log('Error status: ' + resp.status);
          $window.alert('Error status: ' + resp.status);
        }, function (evt) {
          console.log(evt);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
      };
    }])
.config(function ($routeProvider, $httpProvider) {
    // Pages
    $routeProvider.when("/home", {templateUrl: "partials/index.html", controller: "HomeCtrl"});
    $routeProvider.when("/activity", {templateUrl: "partials/activity.html", controller: "ActivityCtrl"});
    $routeProvider.when("/claims", {templateUrl: "partials/claims.html", controller: "ClaimsCtrl"});
    $routeProvider.when("/social", {templateUrl: "partials/social.html", controller: "SocialCtrl"});

    $routeProvider.when("/challenges", {templateUrl: "partials/challenges.html", controller: "ChallengesCtrl"});
    $routeProvider.when("/messages", {templateUrl: "partials/messages-2.html", controller: "MessagesCtrl"});

    $routeProvider.when("/myportfolio", {templateUrl: "partials/myportfolio.html", controller:"MyportfolioCtrl"});
    $routeProvider.when("/myportfolio-information", {templateUrl: "partials/myportfolio-information.html", controller:"MyportfolioInfoCtrl"});

    $routeProvider.when("/addwork", {templateUrl: "partials/addworkk.html", controller: "AddworkCtrl"});
    $routeProvider.when("/portfolio", {templateUrl: "partials/portfolio.html", controller: "PortfolioCtrl"});
    $routeProvider.when("/discover", {templateUrl: "partials/discover.html", controller: "DiscoverCtrl"});
    // discover
    $routeProvider.when("/discover/people", {templateUrl: "partials/people.html", controller: "PeopleCtrl"});
    $routeProvider.when("/discover/gallerie", {templateUrl: "partials/gallery.html", controller:"InstagramCtrl"});
    $routeProvider.when("/discover/youtube", {templateUrl: "partials/youtube.html", controller:"YoutubeCtrl"});
    $routeProvider.when("/discover/explore", {templateUrl: "partials/search.html", controller: "SearchCtrl"});
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    });
    $routeProvider.when('/oauth', {
      templateUrl: 'partials/oauth.html',
      controller: 'OauthCtrl'
    });
    $routeProvider.when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterCtrl'
    });
    $routeProvider.when('/profile', {
      templateUrl: 'partials/myportfolio.html',
      controller: 'ProfileCtrl'

		});
		$routeProvider.when('/verify', {
			templateUrl: 'partials/verify.html',
			controller: 'VerifyCtrl'
		});
		$routeProvider.when('/verified', {
			templateUrl: 'partials/verified.html',
			controller: 'VerifiedCtrl'
		});
      $routeProvider.when('/error', {
      templateUrl: 'partials/error.html',
      controller: 'errorCtrl'
    });
    $routeProvider.when('/forgotPassword', {
      templateUrl: 'partials/forgotPassword.html',
      controller: 'forgotPassword'
    });
    $routeProvider.when('/email_pass_forgot', {
      templateUrl: 'partials/email_pass_forgot.html',
      controller: 'email_pass_forgotCtrl'
    });
/*     $routeProvider.when('/pass_recovery_email/:token', {
      templateUrl: 'partials/passConfirm.html',
      controller: 'passRecoveryCtrl'
    });*/
     $routeProvider.when('/passConfirm', {
      templateUrl: 'partials/passConfirm.html',
      controller: 'passConfirmCtrl'
    });

 

  $routeProvider.otherwise({redirectTo: '/home'});
});
