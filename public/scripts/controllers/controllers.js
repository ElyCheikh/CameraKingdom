var app = angular.module('NetworkWebApp.controllers', []);


/**
 * Controls all other Pages
 */
app.controller('HomeCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});


});
/**
 * ClaimsCtrl all other ClaimsCtrl
 */
app.controller('ClaimsCtrl', function (/* $scope, $location, $http */) {
  console.log("Claims Controller reporting for duty.");

   	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});


});
/**
 * MyportfolioInfoCtrl all other ClaimsCtrl
 */
app.controller('MyportfolioInfoCtrl', function (/* $scope, $location, $http */) {
  console.log("MyportfolioInfo Controller reporting for duty.");

   	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});


});
/**
 * Controls the Activity
 */
app.controller('ActivityCtrl', function (/* $scope, $location, $http */) {
  console.log("Activity Controller reporting for duty.");
    	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});

/**
 * Controls the Discover
 */
app.controller('DiscoverCtrl', function (/* $scope, $location, $http */) {
  console.log("Discover Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});
/**
 * Controls the Challenges
 */
app.controller('ChallengesCtrl', function (/* $scope, $location, $http */) {
	console.log("Challenges Controller reporting for duty.");
	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
				{
					animation: {
						duration: 400,
						effects: 'fade translateZ(-360px) stagger(34ms)',
						easing: 'ease'
					}
				}
		);};
	$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
		return false;
	});

});
/**
 * Controls the Social Tweets
 */
app.controller('SocialCtrl', function (/* $scope, $location, $http */) {
	console.log("Social Controller reporting for duty.");
	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
				{
					animation: {
						duration: 400,
						effects: 'fade translateZ(-360px) stagger(34ms)',
						easing: 'ease'
					}
				}
		);};
	$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
		return false;
	});

});
/**
 * Controls the Myportfolio
 */
app.controller('MyportfolioCtrl', function (/* $scope, $location, $http */) {
  console.log("Myportfolio Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});
/**
 * Controls the Addwork
 */
app.controller('AddworkCtrl', function (/* $scope, $location, $http */) {
  console.log("Addwork Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});
/**
 * Controls the Portfolio
 */
app.controller('PortfolioCtrl', function (/* $scope, $location, $http */) {
  console.log("Portfolio Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});
/**
 * Controls the People
 */
app.controller('PeopleCtrl', function (/* $scope, $location, $http */) {
  console.log("People Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};

});
/**
 * Controls the Gallerie
 */
app.controller('GallerieCtrl', function (/* $scope, $location, $http */) {
  console.log("Gallerie Controller reporting for duty.");
     	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});


});
/**
 * Controls the Search
 */
app.controller('SearchCtrl', function (/* $scope, $location, $http */) {
  console.log("Search Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});


/**
 * Controls the Messages
 */
app.controller('MessagesCtrl', function (/* $scope, $location, $http */) {
  console.log("Messages Controller reporting for duty.");
  	//MIX UP
	if($('#container-mix').length) {
		$('#container-mix').mixItUp(
			{
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			}
		);};
			$(".be-drop-down").on("click" ,function(){
		$(this).toggleClass("be-dropdown-active");
		$(this).find(".drop-down-list").stop().slideToggle();
	});
	$(".drop-down-list li").on("click", function(){
		var new_value = $(this).find("a").text();
		$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
	});

});

app.controller('LoginCtrl', function ($scope) {
  console.log("Login Controller reporting for duty.");
  $scope.myVar = 'Login Page';
});
app.controller('OauthCtrl', function ($scope) {
  console.log("Oauth Controller reporting for duty.");
  $scope.myVar = 'Oauth Page';
});
app.controller('RegisterCtrl', function ($scope) {
  console.log("Register Controller reporting for duty.");
  $scope.myVar = 'Register Page';
});
app.controller('VerifyCtrl', function($scope){
  console.log("Verify Controller reporting for duty.");
  $scope.myVar = 'Verify Page';
});

app.controller('VerifiedCtrl', function($scope){
  console.log("Verified Controller reporting for duty.");
  $scope.myVar = 'Verified Page';
});

app.controller('ProfileCtrl', function($scope, $http) {
	  console.log("Profile Controller reporting for duty.");
	$http.get("http://localhost:3000/account").success(function(data, status) {
    $scope.myVar = 'Profile Page';
  	console.log(data);
		$scope.profile = data;
	});
});

app.controller('MessagesForTestCtrl', function (/* $scope, $location, $http */) {
	console.log("Messages Controller reporting for duty.");


});