/*global console, $ */


$(function(){ "use strict";
	//calculate body padding top depend on navbar height
	$('body').css('paddingTop' , $('.navbar').innerHeight() + 11); 


	

	//smoothly scroll to element
	$(".navbar li a").click(function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#' + $(this).data('scroll')).offset().top +1

		},1000);
	



	//Add active class on navbar link and remove from siblings 
	$('.navbar li a').click(function(){
		$(this).addClass('active').parent().siblings().find('a').removeClass('active');
	})
	});



	$(window).scroll(function(){

	
	//Sync Navbar Links With Sections
		$('.block').each(function(){
			if($(window).scrollTop() > $(this).offset().top){
				var blockID = $(this).attr('id');
				$('.navbar a').removeClass('active');
				$('.navbar li a[data-scroll="' + blockID + '"]').addClass('active'); 
			}
		})
	



	//Scroll To Top Button
		var scrollToTop = $('.scroll-to-top');
		if($(window).scrollTop() >= 1000){
			if(scrollToTop.is(':hidden')){
			scrollToTop.fadeIn(400);
		}
		}else{
			scrollToTop.fadeOut(400);
		}
	});
	



	//Click on Scroll to top to go up
	$('.scroll-to-top').click(function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0

		},1000);
	})
	



	//Popup
	$('.show-popup').click(function(){
		$('.' + $(this).data('popup')).fadeIn();
	});
	$('.popup').click(function(){
		$(this).fadeOut();
	});
	$('.popup .inner').click(function(e){
		e.stopPropagation();
	});
	$('.popup .close').click(function(e){
		e.preventDefault();
		$(this).parentsUntil('.popup').parent().fadeOut();
	});
	$(document).keydown(function(e){
		if(e.keyCode == 27){
			$('.popup').fadeOut();
		}
	});

	


	//Buttons with effects 
	$('.from-left, .border-left').hover(function(){
		$(this).find('span').eq(0).animate({
			width:'100%'
		}, 500);
	},function(){
		$(this).find('span').eq(0).animate({
			width: 0
		}, 500);	
	
	});
	$('.from-top, .border-top').hover(function(){
		$(this).find('span').eq(0).animate({
			height:'100%'
		}, 500);
	},function(){
		$(this).find('span').eq(0).animate({
			height: 0
		}, 500);	
	
	});
	//Bounce button effects
	function bounceElement(selector, times, distance, speed){
		for(var i = 0; i < times; i++){
			$(selector).animate({
				left: '+=' + distance
			},speed).animate({
				left: '-=' + distance
			},speed);
		}
	}
	$('.bounce-one').on('click', function(){
		bounceElement($(this), 5, 50, 400)
	
	});
	$('.bounce-two').on('click', function(){
		bounceElement($(this), 3, 80, 900)
	
	});


	//Animated progress
	$('.animated-progress span').each(function(){
		$(this).animate({
			width: $(this).attr('data-progress') + '%'
		}, 2000, function(){
			$(this).text($(this).attr('data-progress') + '%' );
		})
	});
	



	//Fixed menu
	$('.fixed-menu .fa-cogs').on('click', function(){
		var fixedMenu = $(this).parent('.fixed-menu');
		fixedMenu.toggleClass('is-visible');
		if (fixedMenu.hasClass('is-visible')) {
		fixedMenu.animate({
			left:0
		},500);
		$('body').animate({
			paddingLeft:'220px'
		},500);
	}else{
		fixedMenu.animate({
			left:'-220px'
		},500);	
		$('body').animate({
			paddingLeft:0 
		},500);
	}
	});
	



	//Change Colors
	$('.change-colors li').on('click',function(){
		$('body').attr('data-default-color', $(this).data('color'));
	});
	



	//Thumbnails Gallery
	var numOfThumbnails = $('.thumbnails').children().length,
		marginBetween1thumbnails = '.5',
		totalMarginBetweenThumbnails = (numOfThumbnails - 1) * marginBetween1thumbnails,
		thumbnailWidth = (100 - totalMarginBetweenThumbnails) / numOfThumbnails ;
	$('.thumbnails img').css({
		'width':thumbnailWidth + '%',
		'margin-right':marginBetween1thumbnails + '%'
	})
	$('.thumbnails img').on('click', function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		$('.master-img img').hide().attr('src', $(this).attr('src')).fadeIn(500);
	});
	$('.master-img .fa-chevron-right').on('click', function(){
		if($('.thumbnails .selected').is(':last-child')){
			$('.thumbnails img').eq(0).click();
		}else{
			$('.thumbnails .selected').next().click();	
		}
		
	});
	$('.master-img .fa-chevron-left').on('click', function(){
		if($('.thumbnails .selected').is(':first-child')){
			$('.thumbnails img:last').click();
		}else{
			$('.thumbnails .selected').prev().click();	
		}
		
	});



	//Toggle Product Description
	$('.products .product i, .items .item i').on('click', function(){
		$(this).toggleClass('fa-plus fa-minus').next('p').slideToggle();
	});
	


	//Switch list and grid view
	$('.view-options i').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.items').removeClass('list-view grid-view').addClass($(this).data('class'));
	});

	//Error Message Effect
	$('.error-message').each(function(){
		$(this).animate({
			right:0
		},1000, function(){
			$(this).delay(3000).fadeOut();
		});
	});
	/*
	** our Form
	** parctical Examples
	*/


	//Hide placeholder on focus & restore on blur 
	var placeAttr = ''; 
	$('[placeholder]').focus(function(){
		placeAttr = $(this).attr('placeholder');
		$(this).attr('placeholder', '');
	}).blur(function(){
		$(this).attr('placeholder', placeAttr);
	});


	//Show Message when field is empty
	$('[required]').blur(function(){
		if ($(this).val() == '') {
			$(this).next('span').fadeIn().delay(2000).fadeOut();
		}
	});

	//Add asterisk to all required field
	$('<span class="asterisk">*</span>').insertBefore(':input[required]');

	//customize the asterisk with jQuery
	$('.asterisk').parent('div').css('position', 'relative');
	$('.asterisk').each(function(){
		$(this).css({
			'position': 'absolute',
			'top': 13,
			'left': $(this).parent('div').find(':input').innerWidth() - 20,
			'color': '#F00'
		});
	});

	//customize the input field
	$('.our-form input[type="file"]').wrap('<div class="custom-file"></div>');
	$('.custom-file').prepend('<span>Upload Your File</span>');
	$('.custom-file').append('<i class="fa fa-upload fa-lg skin-color"></i>');
	$('.our-form input[type="file"]').change(function(){
		$(this).prev('span').text($(this).val());
	});


	//Detect UniCode of keyboard keys
	$('.detect-unicode').on('keyup', function(event){
		var keyboardkeys =event.keyCode || event.which;
		$('.unicode').html('UniCode = ' + keyboardkeys);
	});

	//Change input direction depend on language
	$('.auto-direction').on('keyup', function(){
		if ($(this).val().charCodeAt(0) < 200) {
			$(this).css('direction', 'ltr');
		}else{
			$(this).css('direction', 'rtl');
		}

	});
	//Convert input value to Tags
	$('.add-tag').on('keyup', function(event){
		var keyboardkey =event.keyCode || event.which;
		if(keyboardkey === 188){ //Comma pressed
			var thisValue = $(this).val().slice(0, -1);
			$('.tags').append('<span class="tag-span"><i class="fa fa-times"></i>' + thisValue + '</span>');
			$(this).val('');
		}
	});
	//Remove Tag on click
	$('.tags').on('click', '.tag-span i', function(){
		$(this).parent('.tag-span').fadeOut(800);
	});


	//Trim Paragraph Text Characters 
	function trimText(selector, maxLength) {

	$(selector).each(function(){
		if($(this).text().length > maxLength){
			var trimmedText = $(this).text().substr(0, maxLength);
			$(this).text(trimmedText + '...');
		}
	});
	}
	//Use functions on different elements
	trimText('.trimmed-texts .p-one', 100)
	trimText('.trimmed-texts .p-two', 200)


	//Adjust elements height to be the same
	var theMaxHeight = 0;
	//Loop on elements to you want to adjust height
	$('.same-height div').each(function(){
		if($(this).height() > theMaxHeight){
			theMaxHeight = $(this).height();
		}
	});
	$('.same-height div').height(theMaxHeight);


	//Shuffle Cards
	var zIndexValue = 0;
	$('.cards .card').on('click', function(){
		$(this).animate({
			left: '20%',
			marginTop: 30
		}, 400, function(){
			zIndexValue--;
			$(this).css('z-index', zIndexValue);
		}).animate({
			left: $(this).css('left'),
			marginTop: 0
		},400);
	});

	//Create Blink Warning
	blinkWarning();
	function blinkWarning(){
		$('.blink-warning').fadeOut(1000, function(){
			$(this).fadeIn(1000);
			blinkWarning();
		});
	}

	//To Do List 
	var newTask = $('.task-input');
	$('.add-task').on('submit', function(e){
		e.preventDefault();
		if (newTask.val() != '') {
			$('<li>' + newTask.val() + '</li>').appendTo('.tasks');
			newTask.val('');
		}
	});
	$('.tasks').on('click', 'li', function(){
		$(this).css('text-decoration', 'line-through').delay(200).fadeOut(400, function(){
			$(this).remove();
		});
	});

	//Type Write Effects
	var theText = $('.typer').data('text'),
		theTextLength = theText.length,
		n = 0,
		theTyper = setInterval(function(){
			$('.typer').each(function(){
				$(this).html($(this).html() + theText[n]);
			});
			n += 1;
			if (n >= theText.length) {
				clearInterval(theTyper);
			}
		},100);

	//calculate table cell price values
	var theSummary = 0;
	$('.price').each(function(){
		theSummary += parseInt($(this).text());
	});
	$('.the-total').text(theSummary);

	//Auto Change Content
	(function autoChange(){
		$('.ticker-list .active').each(function(){
			if (! $(this).is(':last-child')) {
				$(this).delay(1000).fadeOut(1000, function(){
					$(this).removeClass('active').next().addClass('active').fadeIn();
					autoChange();
				});
			}else{
				$(this).delay(1000).fadeOut(1000, function(){
					$(this).removeClass('active');
					$('.ticker-list li').eq(0).addClass('active').fadeIn();
					autoChange();
				});
			}
		});
	}()); //End self Invoked function

	//Dynamic Tabs
	$('.tabs-list li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.content-list > div').hide();
		$($(this).data('content')).fadeIn();
	});

	//Switch Tabs View
	$('.switch-tabs').on('click', function(){
		$(this).next('.dynamic-tabs').toggleClass('left-tabs');
	});

	//Email Suggest Box
	var emailProviders = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'],
		finalString = '';
	$('.email-suggest').on('keyup', function(){
		finalString = '';
		if(! $(this).next().is('.suggest-box')){
			$('<ul class="suggest-box"></ul>').insertAfter($(this));
		}

		for(var i = 0; i < emailProviders.length; i++){
			finalString += '<li>' + $(this).val() + '@' + emailProviders[i] + '</li>';
		}
		$('.suggest-box').html(finalString);
	});
	$('body').on('click', '.suggest-box li', function(){
		$('.email-suggest').val($(this).text());
		$(this).parent().fadeOut(300).remove();
	});
});

