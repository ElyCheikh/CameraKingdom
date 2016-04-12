var app = angular.module('NetworkWebApp.controllers', ['ngResource', 'ngSanitize']);


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
app.controller('TweetList', function($scope, $resource, $timeout) {

    /**
     * init controller and set defaults
     */
    function init () {

      // set a default username value
      $scope.username = "twitterdev";
      
      // empty tweet model
      $scope.tweetsResult = [];

      // initiate masonry.js
      $scope.msnry = new Masonry('#tweet-list', {
        columnWidth: 320,
        itemSelector: '.tweet-item',
        transitionDuration: 0,
        isFitWidth: true
      });

      // layout masonry.js on widgets.js loaded event
      twttr.events.bind('loaded', function () {
        $scope.msnry.reloadItems();
        $scope.msnry.layout();
      });

      $scope.getTweets();
    }

    /**
     * requests and processes tweet data
     */
    function getTweets (paging) {

      var params = {
        action: 'user_timeline',
        user:	'photo'
      };

      if ($scope.maxId) {
        params.max_id = $scope.maxId;
      }

      // create Tweet data resource
      $scope.tweets = $resource('/tweets/:action/:user', params);

      // GET request using the resource
      $scope.tweets.query( { }, function (res) {

        if( angular.isUndefined(paging) ) {
          $scope.tweetsResult = [];
        }

        $scope.tweetsResult = $scope.tweetsResult.concat(res);

        // for paging - https://dev.twitter.com/docs/working-with-timelines
        $scope.maxId = res[res.length - 1].id;

        // render tweets with widgets.js
        $timeout(function () {
          twttr.widgets.load();
        }, 30);
      });
    }

    /**
     * binded to @user input form
     */
    $scope.getTweets = function () {
      $scope.maxId = undefined;
      getTweets();
    }

    /**
     * binded to 'Get More Tweets' button
     */
    $scope.getMoreTweets = function () {
      getTweets(true);
    }

    init();
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
  //	console.log(data);
		$scope.profile = data;
	});
});

app.controller('MessagesForTestCtrl', function (/* $scope, $location, $http */) {
	console.log("Messages Controller reporting for duty.");


});
/**
 * Controls the Instagram
 */
app.controller('InstagramCtrl', function($scope, InstagramFactory) {



	loadPhotosFromInsta();
	function loadPhotosFromInsta(){
		InstagramFactory.photos().success(function (response) {
			//console.log(response);
			$scope.photos = response;
		});
	}
});