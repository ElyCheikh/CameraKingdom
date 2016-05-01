var app = angular.module('NetworkWebApp.controllers', ['ngResource', 'ngSanitize','geolocation']);

app.run(function($rootScope) {
	$rootScope.globalFoo = function() {

		/*================*/
		/* 01 - VARIABLES */
		/*================*/
		var swipers = [],
			winW, winH, winScr, _isresponsive, smPoint = 768,
			mdPoint = 992,
			lgPoint = 1200,
			addPoint = 1600,
			_ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

		/*========================*/
		/* 02 - page calculations */
		/*========================*/
		function pageCalculations() {
			winW = $(window).width();
			winH = $(window).height();
			if ($('.menu-button').is(':visible')) _isresponsive = true;
			else _isresponsive = false;
			if (winW <= 992)
				$(".header-menu").css({
					"max-height": winH - 20 + "px"
				});
		}

		/*=================================*/
		/* 03 - function on document ready */
		/*=================================*/
		pageCalculations();

		//center all images inside containers
		$('.center-image').each(function() {
			var bgSrc = $(this).attr('src');
			$(this).parent().addClass('background-block').css({
				'background-image': 'url(' + bgSrc + ')'
			});
			$(this).hide();
		});

		/*============================*/
		/* 04 - function on page load */
		/*============================*/
		$(window).load(function() {
			$(".be-loader").fadeOut("slow");
			initSwiper();
			notification();
			//$('.isotope-grid').isotope({
			//	itemSelector: '.isotope-item ',
			//	percentPosition: true
			//});
			setTimeout(function() {
				$('.tab-wrapper.style-2 .tab-info').addClass('none');
			}, 100)

		});

		/*==============================*/
		/* 05 - function on page resize */
		/*==============================*/
		$(window).resize(function() {
			resizeCall();
			notification();
		});

		function resizeCall() {
			pageCalculations();

			$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function() {
				var thisSwiper = swipers['swiper-' + $(this).attr('id')],
					$t = $(this),
					slidesPerViewVar = updateSlidesPerView($t);
				thisSwiper.params.slidesPerView = slidesPerViewVar;
				thisSwiper.reInit();
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
				if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
				updateSlidesPerView(this);
			});
			var a = $(window).height() - 70;
			$("#one").css("max-height", a + "px");
		}

		/*=====================*/
		/* 06 - swiper sliders */
		/*=====================*/
		function initSwiper() {
			var initIterator = 0;
			$('.swiper-container').each(function() {
				var $t = $(this);

				var index = 'swiper-unique-id-' + initIterator;

				$t.addClass('swiper-' + index + ' initialized').attr('id', index);
				$t.find('.pagination').addClass('pagination-' + index);

				var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
				var centerVar = parseInt($t.attr('data-center'), 10);
				var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;

				var slidesPerViewVar = $t.attr('data-slides-per-view');
				if (slidesPerViewVar == 'responsive') {
					slidesPerViewVar = updateSlidesPerView($t);
				} else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

				var loopVar = parseInt($t.attr('data-loop'), 10);
				var speedVar = parseInt($t.attr('data-speed'), 10);

				var slidesPerGroup = parseInt($t.attr('data-slides-per-group'), 10);
				if (!slidesPerGroup) {
					slidesPerGroup = 1;
				}

				swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
					speed: speedVar,
					pagination: '.pagination-' + index,
					loop: loopVar,
					paginationClickable: true,
					autoplay: autoPlayVar,
					slidesPerView: slidesPerViewVar,
					slidesPerGroup: slidesPerGroup,
					keyboardControl: true,
					calculateHeight: true,
					simulateTouch: simVar,
					centeredSlides: centerVar,
					roundLengths: true,
					onSlideChangeEnd: function(swiper) {
						var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
						var qVal = $t.find('.swiper-slide-active').attr('data-val');
						$t.find('.swiper-slide[data-val="' + qVal + '"]').addClass('active');
					},
					onSlideChangeStart: function(swiper) {
						$t.find('.swiper-slide.active').removeClass('active');
						if ($t.hasClass('thumbnails-preview')) {
							var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
							swipers['swiper-' + $t.next().attr('id')].swipeTo(activeIndex);
							$t.next().find('.current').removeClass('current');
							$t.next().find('.swiper-slide[data-val="' + activeIndex + '"]').addClass('current');
						}
					},
					onSlideClick: function(swiper) {
						if ($t.hasClass('thumbnails')) {
							swipers['swiper-' + $t.prev().attr('id')].swipeTo(swiper.clickedSlideIndex);
						}
					},
					onResize: function(swiper) {
						var browserWidthResize2 = $(window).width();
						if (browserWidthResize2 < 750) {
							swiper.params.slidesPerGroup = 1;
						} else {
							swiper.params.slidesPerGroup = slidesPerGroup;
							swiper.resizeFix(true);
						}
					}
				});
				swipers['swiper-' + index].reInit();
				if ($t.attr('data-slides-per-view') == 'responsive') {
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
					if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
				initIterator++;
			});

		}

		function updateSlidesPerView(swiperContainer) {
			if (winW >= addPoint) return parseInt($(swiperContainer).attr('data-add-slides'), 10);
			else if (winW >= lgPoint) return parseInt($(swiperContainer).attr('data-lg-slides'), 10);
			else if (winW >= mdPoint) return parseInt($(swiperContainer).attr('data-md-slides'), 10);
			else if (winW >= smPoint) return parseInt($(swiperContainer).attr('data-sm-slides'), 10);
			else return parseInt($(swiperContainer).attr('data-xs-slides'), 10);
			// else return 0;
		}

		//swiper arrows
		$('.swiper-arrow-left.be-out').on('click', function() {
			swipers['swiper-' + $(this).parent().parent().find(".swiper-container").attr('id')].swipePrev();
			return false;
		});

		$('.swiper-arrow-right.be-out').on('click', function() {
			swipers['swiper-' + $(this).parent().parent().find(".swiper-container").attr('id')].swipeNext();
			return false;
		});

		$('.swiper-arrow-left').on('click', function() {
			if (!$(this).hasClass("be-out")) swipers['swiper-' + $(this).parent().attr('id')].swipePrev();
		});

		$('.swiper-arrow-right').on('click', function() {
			if (!$(this).hasClass("be-out")) swipers['swiper-' + $(this).parent().attr('id')].swipeNext();
		});

		/*==============================*/
		/* 07 - buttons, clicks, hovers */
		/*==============================*/

		// central images background
		$('.be-center-image').each(function() {
			var bgSrc = $(this).attr('src');
			$(this).parent().css({
				'background-image': 'url(' + bgSrc + ')'
			});
			$(this).hide();
		});

		// top menu
		$(".cmn-toggle-switch").on("click", function() {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$('body').removeClass('menu-open')
			} else {
				$(this).addClass("active");
				$('body').addClass('menu-open')
			}
			$(".header-menu").stop().slideToggle();
			$(".large-popup").slideUp();
			return false;
		});

		$(".header-menu i").on("click", function() {
			if ($(window).width() < 1200) {
				if ($(this).hasClass("fa-angle-down")) {
					$(this).removeClass("fa-angle-down");
					$(this).addClass("fa-angle-up");
					$(this).parent().find("ul:first").stop().slideToggle();
				} else {
					$(this).removeClass("fa-angle-up");
					$(this).addClass("fa-angle-down");
					$(this).parent().find("ul:first").stop().slideToggle();
				}
			}
		});


		$(".filter-block a").on("click", function() {
			$(".filter-block li").removeClass("be-active");
			if ($(window).width() > 1199) {
				$(".be-popup").fadeOut();
				$(this).parent().find(".be-popup").fadeIn();
			} else {
				$(".be-popup").slideUp();
				$(this).parent().find(".be-popup").slideDown();
			}
			$(this).parent().addClass("be-active");
			$(".be-fixed-filter").addClass("active-fixed");
		});
		$(".be-fixed-filter, .be-popup .fa").on("click", function() {
			$(".filter-block li").removeClass("be-active");
			if ($(window).width() > 1199)
				$(".be-popup").fadeOut();
			else
				$(".be-popup").slideUp();
			$(".be-fixed-filter").removeClass("active-fixed");
		});

		//
		$(".color").on("click", function() {
			$(".color").removeClass("active-color");
			$(this).addClass("active-color");
		});

		$(".be-drop-down").on("click", function() {
			$(this).toggleClass("be-dropdown-active");
			$(this).find(".drop-down-list").stop().slideToggle();
		});
		$(".drop-down-list li").on("click", function() {
			var new_value = $(this).find("a").text();
			$(this).parent().parent().find(".be-dropdown-content").text(new_value);
			return false;
		});

		$('.creative_filds_block').on('click', 'a', function(e) {
			e.preventDefault();
			$(this).siblings().removeClass('active');
			$(this).addClass('active');

		});

		//

		$(".login_block .btn-login").on("click", function() {
			$(".large-popup.login").slideToggle();
			return false;
		});

		$(".be-signup-link").on("click", function() {
			$(".large-popup.login").slideDown();
			return false;
		});
		$(".large-popup.login .close-button").on("click", function() {
			$(".large-popup.login").slideUp();
		});

		$(".be-register").on("click", function() {
			$(".large-popup.register").slideDown();
			return false;
		});
		$(".large-popup.register .close-button").on("click", function() {
			$(".large-popup.register").slideUp();
		});
		$(".btn-share").on("click", function() {
			$(".share-buttons").animate({
				width: 'toggle'
			}, 350);
		});
		$(".btn-message").on("click", function(event) {
			event.stopPropagation();
			var $tgt = jQuery(event.target);
			if ($tgt.is('.close-button')) {
				$(this).find(".message-popup").slideUp();
			} else {
				$(this).find(".message-popup").slideDown();
			}
		});
		$(".btn-rename").on("click", function(event) {
			event.stopPropagation();
			var $tgt = jQuery(event.target);
			if ($tgt.is('.close-button')) {
				$(this).find(".message-popup").slideUp();
			} else {
				$(this).find(".message-popup").slideDown();
			}
		});

		$(".edit-collection").on("click", function() {
			$(this).find(".c_edit").slideToggle();
			return false;
		});

		//scroll left menu
		$('#scrollspy').affix({
			offset: {
				top: function() {
					return (this.top = $('#scrollspy').offset().top - 85)
				},
				bottom: 464
			}
		});


		$(".s_keywords a").eq(0).on("click", function() {
			$(this).parent().find(".color-6").fadeOut();
		})

		$(".s_keywords i").on("click", function() {
				if ($(this).parent().index() != 0)
					$(this).parent().fadeOut();
			})
			/*notification*/
		$(".messages-popup").on("click", function() {
			$(".notofications-block").hide();
			$(".messages-block").slideToggle();
			return false;
		});
		$(".notofications-popup").on("click", function() {
			$(".messages-block").hide();
			$(".notofications-block").slideToggle();
			return false;
		});

		function notification() {
			$('.noto-body').css("max-height", winH - 150);
		}

		/*accordion*/
		$('.accordion').each(function() {
			$(this).find('.acc-title').on("click", function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					$(this).siblings('.acc-body').slideUp();
				} else {
					$(this).closest('.accordion').find('.active').removeClass('active');
					$(this).closest('.accordion').find('.acc-body').slideUp('slow');
					$(this).toggleClass('active');
					$(this).siblings('.acc-body').slideToggle('slow');
				}
			});
		});

		//statistic counters
		$('.number-counters').viewportChecker({
			classToAdd: 'counted',
			offset: 100,
			callbackFunction: function(elem, action) {
				elem.find('.stat-number').countTo();
			}
		});


		//Tabs
		var tabFinish = 0;
		$('.nav-tab-item').on('click', function() {
			var $t = $(this);
			if (tabFinish || $t.hasClass('active')) return false;
			tabFinish = 1;
			$t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
			$t.addClass('active');
			var index = $t.parent().parent().find('.nav-tab-item').index(this);
			$t.closest('.tab-wrapper').find('.tab-info:visible').fadeOut(500, function() {
				$t.closest('.tab-wrapper').find('.tab-info').eq(index).fadeIn(500, function() {
					tabFinish = 0;
				});
			});
		});

		/*table sorting*/
		$('.table-sotring').each(function() {
			$(this).tablesorter();
		});

		$('.select-all').change(function() {
			if ($(this).prop('checked')) {
				$(this).closest('form').find('.noto-entry .form-checkbox input').prop('checked', true);
			} else {
				$(this).closest('form').find('.noto-entry .form-checkbox input').prop('checked', false);
			}
		});

		var post_id = 1;
		$("a.add_section").on("click", function() {

			$(".creative_filds_block ul").append("<li><a href='#" + post_id + "'>New section</a>");
			$("._editor-content_").append('<div class="affix-block" id="' + post_id + '"><div class="be-large-post"><div class="info-block style-2"><div class="be-large-post-align"><h3 class="info-block-label">New section</h3></div><i class="fa fa-times close-w"></i></div><div class="be-large-post-align"><div class="row"><div class="input-col col-xs-12"><div class="form-group focus-2"><div class="form-label">Section Title</div><input class="form-input" type="text" placeholder="About Me"></div></div><div class="input-col col-xs-12"><div class="form-group focus-2"><div class="form-label">Description</div><textarea class="form-input" required="" placeholder="Something about you"></textarea></div></div></div></div></div></div>');
			$("#scrollspy li a[href^='#']").on('click', function(e) {
				e.preventDefault();
				var hash = this.hash;
				$('html, body').animate({
					scrollTop: $(this.hash).offset().top
				}, 1200, function() {
					window.location.hash = hash;
				});
				return false;
			});

			$(".close-w").on("click", function() {
				var id = $(this).parent().parent().parent().attr("id");
				$(this).parent().parent().parent().fadeOut();
				$(".creative_filds_block a").each(function() {
					if ($(this).attr("href") == "#" + id) {
						$(this).parent().fadeOut();
					}
				});
			});
			post_id++;
		});

		$(window).on('scroll', function() {
			checkSection();
		}); // - > scroll_end

		// - > Scroll_nav_click
		$('.edit-ln > a').on('click', function(e) {
			e.preventDefault();
			$(this).parent().siblings().find('a').removeClass('active');
			showSection($(this).attr('href'), true);
		});

		showSection(window.location.hash, false);

		function showSection(section, isAnimate) {
			var direction = section.replace(/#/, ''),
				reqSection = $('.sec').filter('[data-sec="' + direction + '"]'),
				reqSectionPos;

			if (reqSection.length) {
				reqSectionPos = reqSection.offset().top - 70;
			}

			if (isAnimate) {
				$('body, html').animate({
					scrollTop: reqSectionPos
				}, 500);
			} else {
				$('body, html').scrollTop(reqSectionPos);
			}
		}; // - > showSection_end

		function checkSection() {
			$('.sec').each(function() {
				var $this = $(this),
					topEdge = $this.offset().top - 70,
					boottomEdge = topEdge + $this.height(),
					wScroll = $(window).scrollTop();

				if (topEdge < wScroll && boottomEdge > wScroll) {
					var currentId = $this.data('sec'),
						reqLink = $('.edit-ln > a').filter('[href="#' + currentId + '"]');

					reqLink.parent('.edit-ln').addClass('ac').siblings().removeClass('ac');

					window.location.hash = currentId;
				}
			});
		}; // - > checkSection_end

		$('.to').on('click', function(e) {
			e.preventDefault();
			$('html,body').stop().animate({
				scrollTop: $('.be-comment-block').offset().top - 50
			}, 800);
		});


		$('.m-close').on('click', function() {
			$('.noto-popup').slideUp();
		})


		$('.theme-config .open').on('click', function() {
			$('.theme-config').toggleClass('active');
		});

		$('.m-color').on('click', function() {
			var colour = $(this).data('colour');
			var index = $(this).index();
			$('.logo-c').hide();
			$('.logo-c').eq(index).show();
			$('.m-color').removeClass('active');
			$(this).addClass('active');
			$('#color-link').attr('href', colour);
		});

		$('.color3').on('click', function() {
			$('body').addClass('body-color2');
			$('body').removeClass('body-color3 body-color4');
		});

		$('.color6').on('click', function() {
			$('body').addClass('body-color3');
			$('body').removeClass('body-color2 body-color4');
		});

		$('.color8').on('click', function() {
			$('body').addClass('body-color4');
			$('body').removeClass('body-color2 body-color3');
		});

		$('.color1').on('click', function() {
			$('body').removeClass('body-color2 body-color4 body-color3');
		});

		$('.color11').on('click', function() {
			$('body').addClass('body-color5');
			$('body').removeClass('body-color6 body-color7');
		});

		$('.color12').on('click', function() {
			$('body').addClass('body-color6');
			$('body').removeClass('body-color5 body-color7');
		});

		$('.color13').on('click', function() {
			$('body').addClass('body-color7');
			$('body').removeClass('body-color5 body-color6');
		});

		$('.color10').on('click', function() {
			$('body').removeClass('body-color5 body-color6 body-color7');
		});


		$('.s-color').on('click', function() {
			$('.s-color').removeClass('active');
			$(this).addClass('active');

		});


		$('#media').on('click', function() {
			$('.embed').slideDown();
		});


		$('.open-custom').on('click', function(e) {
			e.preventDefault();
			$(this).next('.inner-filter-info').fadeToggle();
		});



		$('.en-nav').on('click', function(e) {
			e.preventDefault();
			$('.en-nav').removeClass('active');
			$(this).addClass('active');
		});

		$('#content-w').on('click', function(e) {
			$('.cover-popup').add('.setting-popup').fadeOut();
		});

		$('#cover-w').on('click', function(e) {
			$('.cover-popup').fadeIn();
			$('.setting-popup').fadeOut();
		});

		$('#setting-w').on('click', function(e) {
			$('.cover-popup').fadeOut();
			$('.setting-popup').fadeIn();
		});

		$('#add-brand').on('click', function(e) {
			$('.mini-popup-wrapper').fadeOut();
			$('.brand-popup').fadeIn();
		});

		$('#add-school').on('click', function(e) {
			$('.mini-popup-wrapper').fadeOut();
			$('.school-popup').fadeIn();
		});

		$('#tools').on('click', function(e) {
			$('.mini-popup-wrapper').fadeOut();
			$('.tools-popup').fadeIn();
		});

		$('#team').on('click', function(e) {
			$('.mini-popup-wrapper').fadeOut();
			$('.team-popup').fadeIn();
		});

		$('#add-agency').on('click', function(e) {
			$('.mini-popup-wrapper').fadeOut();
			$('.agencies-popup').fadeIn();
		});

		$('.close-mini').on('click', function(e) {
			$(this).closest('.mini-popup-wrapper').fadeOut();
		});

		$('.close-media').on('click', function(e) {
			$('.embed').slideUp();
		});

		//MIX UP
		if ($('#container-mix').length) {
			$('#container-mix').mixItUp({
				animation: {
					duration: 400,
					effects: 'fade translateZ(-360px) stagger(34ms)',
					easing: 'ease'
				}
			});
		};


		if ($('#slider-range-max').length) {
			$('.color-i').length && $('.color-i').colorPicker();

			$("#slider-range-max").slider({
				range: "max",
				min: 1,
				max: 10,
				value: 2,
				slide: function(event, ui) {
					$("#amount").val(ui.value);
				}
			});
			$("#amount").val($("#slider-range-max").slider("value"));

			$("#slider-head").slider({
				range: "max",
				min: 1,
				max: 10,
				value: 2,
				slide: function(event, ui) {
					$("#amount-h").val(ui.value);
				}
			});
			$("#amount-h").val($("#slider-head").slider("value"));

		}


		$('.popup-gallery').length && $('.popup-gallery').magnificPopup({
			delegate: 'a.popup-a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});


		//Follow action
		$('.be-follow-type').on('click', function(e) {
			e.preventDefault();
			$(this).text('FOLLOWING').css({
				'padding': 5,
				'textAlign': "center"
			});
		});

		$('.like-btn').on('click', function(e) {
			e.preventDefault();
			$(this).html('YOU LIKED PROJECT');
		});

		$('.add-btn').on('click', function(e) {
			e.preventDefault();
			$(this).html('YOU ADDED TO COLLECTION');
		});

		$('.send-btn').on('click', function(e) {
			e.preventDefault();
			$('.send-m').slideDown();
		});

		$('.close-m').on('click', function(e) {
			e.preventDefault();
			$('.send-m').slideUp();
		});

		$('.parrent-page').on('click', function() {
			$(this).find('ul').slideToggle();
		});

	};
});
/**
 * ----------------------------------------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------------------------------
 */

/**
 * Controls all other Pages
 */
app.controller('HomeCtrl', ['$scope', '$http', function($rootScope, $http) {
	console.log("Page Controller reporting for duty.");
	
	$http.get('http://localhost:3000/follow/postFollowed').success(function(data, status) {
		console.log(data[0]);
		$rootScope.allPosts = data[0];
	});
	$rootScope.globalFoo();
}]);


app.controller('ClaimsCtrl', ['$scope', function($rootScope) {
	console.log("ClaimsCtrl Controller reporting for duty.");
	$rootScope.globalFoo();
}]);
/**
 * MyportfolioInfoCtrl all other ClaimsCtrl
 */
app.controller('MyportfolioInfoCtrl', ['$scope', function($rootScope) {
	console.log("MyportfolioInfoCtrl Controller reporting for duty.");
	$rootScope.globalFoo();
}]);

/**
 * Controls the Activity
 */
app.controller('ActivityCtrl', ['$scope', function($rootScope) {
	console.log("ActivityCtrl Controller reporting for duty.");
	$rootScope.globalFoo();
}]);

/**
 * Controls the Discover
 */
app.controller('DiscoverCtrl', ['$scope', function($rootScope) {
	console.log("DiscoverCtrl Controller reporting for duty.");
	$rootScope.globalFoo();
}]);
/**
 * Controls the Challenges
 */
app.controller('ChallengesCtrl', ['$scope', function($rootScope) {
	console.log("ChallengesCtrl Controller reporting for duty.");
	$rootScope.globalFoo();



}]);
app.controller('TweetList', function($scope, $resource, $timeout) {

	//$rootScope.globalFoo();
	console.log("twitter ctrl");
	/**
	 * init controller and set defaults
	 */
	function init() {

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
		twttr.events.bind('loaded', function() {
			$scope.msnry.reloadItems();
			$scope.msnry.layout();
		});

		$scope.getTweets();
	}

	/**
	 * requests and processes tweet data
	 */
	function getTweets(paging) {

		var params = {
			action: 'user_timeline',
			user: 'photoblggr'
		};

		if ($scope.maxId) {
			params.max_id = $scope.maxId;
		}

		// create Tweet data resource
		$scope.tweets = $resource('/tweets/:action/:user', params);

		// GET request using the resource
		$scope.tweets.query({}, function(res) {

			if (angular.isUndefined(paging)) {
				$scope.tweetsResult = [];
			}

			$scope.tweetsResult = $scope.tweetsResult.concat(res);

			// for paging - https://dev.twitter.com/docs/working-with-timelines
			$scope.maxId = res[res.length - 1].id;

			// render tweets with widgets.js
			$timeout(function() {
				twttr.widgets.load();
			}, 30);
		});
	}

	/**
	 * binded to @user input form
	 */
	$scope.getTweets = function() {
		$scope.maxId = undefined;
		getTweets();
	}

	/**
	 * binded to 'Get More Tweets' button
	 */
	$scope.getMoreTweets = function() {
		getTweets(true);
	}

	init();
});
/**
 * Controls the Social Tweets
 */
app.controller('SocialCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);
/**
 * Controls the Myportfolio
 */
app.controller('MyportfolioCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);
/**
 * Controls the Addwork
 */
app.controller('AddworkCtrl', ['$scope', function($rootScope) {
	console.log("AddworkCtrl Controller reporting for duty.");
	$rootScope.globalFoo();
}]);
/**
 * Controls the Portfolio
 */
app.controller('PortfolioCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);
/**
 * Controls the details
 */
app.controller('DetailsCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);
/**
 * Controls the People
 */
app.controller('PeopleCtrl', ['$scope','geolocation', function($rootScope,geolocation) {
	$rootScope.globalFoo();
	$rootScope.coords = geolocation.getLocation().then(function(data){
		console.log('lat:'+data.coords.latitude);
		console.log('long:'+data.coords.longitude);

		return {lat:data.coords.latitude, long:data.coords.longitude};
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){

			$rootScope.$apply(function(){



				$rootScope.position = position;
				console.log($rootScope.position);
			});
		});
	}
}]);
/**
 * Controls the Gallerie
 */
app.controller('GallerieCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);
/**
 * Controls the Search
 */
app.controller('SearchCtrl', ['$scope', '$http', function($rootScope, $http) {
	console.log("Discover Controller reporting for duty.");
	
	$http.get('http://localhost:3000/follow/AllPosts').success(function(data, status) {
		console.log(data);
		$rootScope.allPosts = data;
	});
	$rootScope.globalFoo();
}]);

/**
 * Controls the Messages
 */
app.controller('MessagesCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);

app.controller('LoginCtrl', function($scope) {
	console.log("Login Controller reporting for duty.");
	$scope.myVar = 'Login Page';
});
app.controller('OauthCtrl', function($scope) {
	console.log("Oauth Controller reporting for duty.");
	$scope.myVar = 'Oauth Page';
});
app.controller('RegisterCtrl', function($scope) {
	console.log("Register Controller reporting for duty.");
	$scope.myVar = 'Register Page';
});
app.controller('VerifyCtrl', function($scope) {
	console.log("Verify Controller reporting for duty.");
	$scope.myVar = 'Verify Page';
});

app.controller('VerifiedCtrl', function($scope) {
	console.log("Verified Controller reporting for duty.");
	$scope.myVar = 'Verified Page';
});

app.controller('ProfileCtrl', function($rootScope, $scope, $http) {
	$rootScope.globalFoo();
	console.log("Profile Controller reporting for duty.");
	$http.get("http://localhost:3000/account").success(function(data, status) {
 		$scope.myVar = 'Profile Page';
 		$rootScope.profile = data.account;
		$rootScope.posts = data.posts;
     $scope.myVar = 'Profile Page';
  	//console.log(data);
		$scope.profile = data;
 	});
});



app.controller('errorCtrl', ['$scope', function($scope) {
	console.log("Error Controller reporting for duty.");
}]);
app.controller('forgotPasswordCtrl', ['$scope', function($scope) {
	console.log("forgotPassword Controller reporting for duty.");
}]);
app.controller('email_pass_forgotCtrl', ['$scope', function($scope) {
	console.log("Email pass forgot Controller reporting for duty.");
}]);

app.controller('passConfirmCtrl', function($scope, $routeParams, $http) {
	console.log("passRecovery pass forgot Controller reporting for duty.");
	$http.get("http://localhost:3000/gettoken").success(function(data, status) {
 		$scope.myVar = 'Profile Page';
		console.log('agular data')
		console.log(data);
		var str = data;
		str = str.slice(0, -1);
		while (str.charAt(0) === '"')
			str = str.substr(1);
		console.log('new toekn');
		console.log(str);
     $scope.myVar = 'Profile Page';
    console.log('agular data')
  	console.log(data);
  	var str = data ;
  	str = str.slice(0, -1);
  	while(str.charAt(0) === '"')
    str = str.substr(1);
   console.log('new token');
   console.log(str);
 		$scope.token = str;
	});
});

app.controller('AddcontactCtrl', function($scope) {
	console.log("Add Contact Controller reporting for duty.");
});
app.controller("contactCtrl", function($scope, $http) {
	console.log("list Contact Controller reporting for duty.");
	$http.get("http://localhost:3000/contact").success(function(data, status) {
		$scope.myVar = 'Profile Page';
		console.log(data);
		$scope.list = data;
	});
});

app.controller('MessagesForTestCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);


app.controller('MessagesForTestCtrl', ['$scope', function($rootScope) {
	$rootScope.globalFoo();
}]);
/**
 * Controls the Instagram
 */
app.controller('InstagramCtrl', function($scope, InstagramFactory) {



	loadPhotosFromInsta();

	function loadPhotosFromInsta() {
		InstagramFactory.photos().success(function(response) {
			//console.log(response);
			$scope.photos = response;
		});
	}
});

app.controller('YoutubeCtrl', function($scope, YoutubeFactory) {

	loadFromYoutube();

	function loadFromYoutube() {
		YoutubeFactory.videos().success(function(response) {
			//console.log(response);
			$scope.videos = response;
		});
	}
});


app.controller('UploadCtrl', function($scope) {

});

app.controller('show-profileCtrl', function($rootScope,$routeParams, $scope, $http) {
	
	console.log('routeparams')
	console.log($routeParams.id);
	var data = {
		his: $routeParams.id
	};
	$http({
		url: 'http://localhost:3000/follow/hisProfile',
		method: "GET",
		params: {
			his: $routeParams.id
		}
	}).success(function(data, status) {
		console.log('data by id');
		console.log(data);
		$scope.profile = data.profile;
		$scope.posts = data.posts;
	});
$rootScope.globalFoo();
});

app.controller('followUserCtrl', function($rootScope,$routeParams, $scope, $http) {
	
	console.log('routeparams')
	console.log($routeParams.id);
	var data = {
		his: $routeParams.id
	};
	$http({
		url: 'http://localhost:3000/follow/idToFollow',
		method: "Post",
		params: {
			his: $routeParams.id
		}
	}).success(function(data, status) {
		console.log('data by id');
		console.log(data);
	});
$rootScope.globalFoo();
});

app.controller('MediaCtrl', function($scope,$rootScope, MediaFactory) {

	loadMedia();
	function loadMedia(){
		MediaFactory.medias().success(function (response) {
			//console.log(response);
			$scope.medias = response;
			$rootScope.globalFoo();
		});
	}

});

/*------------------------------------------------------------------*/
/*-----------------------Challenge Work Controllers-----------------*/
/*------------------------------------------------------------------*/

function IssuesController($scope, Issues, Auth) {
	$scope.globalFoo();
	// If you didn't want realtime updates, you would use Issues.query()
	$scope.issues = Issues.pollList(1000);
	$scope.auth = Auth;

	$scope.create = function() {
		issue = {first: {name: $scope.firstOption}, second: {name: $scope.secondOption}};
		Issues.save(issue, function() {
			$scope.issues = Issues.query()
		})
	}
}




function IssueDetailsController($scope, Issues, $routeParams, Auth) {
	$scope.globalFoo();
	$scope.issueId = $routeParams._id;
	$scope.auth = Auth;

	// If you didn't want realtime updates, you would use Issues.get({_id:...})
	$scope.issue = Issues.pollIssue({_id: $routeParams._id}, 1000);

	$scope.vote = function(option) {
		Issues.vote($scope.issue, option)
	};

	$scope.remove = function() {
		Issues.remove({_id: $routeParams._id});
		window.location = "/"
	}
}



function LoginController($scope, Auth) {
	$scope.auth = Auth;

	$scope.login = function() {
		if (!$scope.newUsername) return alert("Please enter a username");
		Auth.login($scope.newUsername)
	};

	$scope.logout = function() {
		Auth.logout();
	}
}









/// FILTERS ///
app.filter('ago', function() {
	return function(text) {
		return moment(text).fromNow()
	}
});











//// SERVICES ////
app.factory('Issues', function($http, $resource, Auth) {
	var Issues = $resource("/issues/:_id");

	Issues.vote = function(issue, vote, cb) {
		cb = cb || function() {};
		vote.username = Auth.username;
		$http.post("/issues/" + issue._id + "/votes", vote).success(cb);
	};

	// polls the server for updates, and merges results into these
	Issues.pollList = function(interval) {
		var issues = Issues.query();

		// for now, only support updates and adds
		function fetch() {
			newIssues = Issues.query(function() {
				newIssues.forEach(function(newIssue) {
					var matches = _.find(issues, function(issue) {
						return (issue._id == newIssue._id)
					});


					if (matches)
						_.extend(matches, newIssue);

					else
						issues.unshift(newIssue)
				})
			})
		}

		interval = setInterval(fetch, interval);

		return issues
	};

	Issues.pollIssue = function(matching, interval) {
		var issue = Issues.get(matching);

		function fetch() {
			newIssue = Issues.get(matching, function() {
				_.extend(issue, newIssue)
			})
		}

		interval = setInterval(fetch, interval);

		return issue
	};


	return Issues
});

app.factory('Auth', function() {
	var Auth = {
		username: localStorage.username,
		login: function(username) {
			localStorage.username = username;
			this.username = username;
			this.loggedIn = true
		},
		logout: function() {
			localStorage.removeItem('username');
			delete this.username;
			this.loggedIn = false;
		}
	};
	Auth.loggedIn = !!Auth.username;
	return Auth;
});




//// DIRECTIVES ////
app.directive('coloredBar', function() {
	return {
		link: function(scope, element, attrs) {
			var INCREMENTAL_WIDTH = 20;
			var MIN_WIDTH = 30;

			// have a min width?

			scope.$watch(attrs.total, function(total) {
				width = Math.max(total * INCREMENTAL_WIDTH, MIN_WIDTH);
				element.css('width', width + 'px');
			});

			scope.$watch(attrs.text, function(text) {
				element.text(text);
			})
		}
	}
});


app.directive('pieChart', function() {
	return {
		link: function(scope, element, attrs) {
			var firstTotal = null;
			var secondTotal = null;

			var original = element.clone();

			scope.$watch(attrs.first, function(first) {
				firstTotal = first;
				render()
			});

			scope.$watch(attrs.second, function(second) {
				secondTotal = second;
				render();
			});

			function render() {
				if (!(firstTotal > -1 && secondTotal > -1)) return;

				var total = firstTotal + secondTotal;
				var percent = 50;

				if (total > 0)
					percent = Math.floor(firstTotal * 100 / total);

				element.data('percent', percent);

				if (element.data('easyPieChart')) {
					element.data('easyPieChart').update(percent)
				}

				else {
					element.html("<span class='text'></span>");
					element.easyPieChart({
						barColor: "#3A3",
						trackColor: "#CCC",
						scaleColor: false,
						lineWidth: 30,
						lineCap: "butt",
						size: 150,
						animate: 500
					})
				}

				element.find('.text').text(firstTotal + " / " + total);
			}
		}
	}
});

