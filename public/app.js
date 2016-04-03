angular.module('CameraKingdom', ['ngRoute'])
.config(function(
	$routeProvider,
	$httpProvider

) {
	$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'RegisterCtrl'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'LoginCtrl'
		})
		.when('/profile', {
			controller: 'ProfileCtrl',
		    templateUrl: 'profile.html'
		})
		.when('/verify', {
			templateUrl: 'verify.html',
			controller: 'VerifyCtrl'
		})
		.when('/verified', {
			templateUrl: 'verified.html',
			controller: 'VerifiedCtrl'
		})

	.otherwise({
		redirectTo: '/'
	});
})


.controller('HomeCtrl', function($scope) {
	$scope.home = 'Home Page';
})

.controller('LoginCtrl', function($scope) {
	$scope.login = 'Login Page';
})

.controller('RegisterCtrl', function($scope) {
	$scope.register = 'Register Page';
})

.controller('VerifyCtrl', function(){
		
})

.controller('VerifiedCtrl', function(){
	
})

.controller('ProfileCtrl', function($scope, $http) {
	console.log('profile'); 
	$http.get("http://localhost:3000/account").success(function(data, status) {
		console.log(data);
		$scope.profile = data;
	});
})



;