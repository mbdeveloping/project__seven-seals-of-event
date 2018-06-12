$(document).ready(function() {
  /********** MAIN RULES FOR ALL PAGES **********/
  const pageBody = $("body");
  const preloader = $(".preloader");
  /*** Website preloader screen spinner rules ***/
    TweenMax.to(preloader, .3, {opacity:0, onComplete:function() {
      preloader.detach();
    }});
    pageBody.removeClass("body-scroll-lock");
  //Home page owl carousel
  let homeOwl = $('.owl1');
  homeOwl.owlCarousel({
    loop:true,
    startPosition:0,
    autoplay:true,
    autoplayHoverPause:true,
    smartSpeed:500,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:1
        }
    }
  });
  $('.owl-carousel').owlCarousel({
    loop:false,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:3
        },
        700:{
            items:4
        },
        1000:{
            items:5
        }
    }
  });
  //3rd party lightbox for gallery plugin
  (function(){
    var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i];
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0];
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if(linkEl.children.length > 0) {
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl;
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0],
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};
initPhotoSwipeFromDOM('.my-gallery');
  }());
  /* Header nav hamburger-btn rules */
  (function() {
    const navBtn = $("#hamburger-btn");
    const navUl = $("#main-nav ul");
    const headerBar = $("#main-header");
    const navLiA = $("#main-nav ul li a");
    const brandingP = $("#header-branding p");
    const brandingImg = $("#header-branding img");
    const hamburgerBars = $(".bar");
    const blurBg = $(".blur-bg");

    //Close nva menu on !menu click
    function closeMenuOnSideClick(e) {
      let $element = $(e.target);
      if (!$element.hasClass("nav-ul-display") && !$element.hasClass('bar') && !$element.hasClass('hamburger-btn') && navUl.hasClass('nav-open') && !$element.hasClass('nav-link')) {
        closeNav();
      }
    }
    function openNav() {
      pageBody.addClass("body-scroll-lock");
      navBtn.addClass("change");
      navUl.addClass("nav-ul-display nav-open");
      TweenMax.fromTo(navUl, .3, {opacity:0,x:"100%"}, {opacity:1, x:"0%"});
    }
    function closeNav() {
      pageBody.removeClass("body-scroll-lock");
      navBtn.removeClass("change");
      TweenMax.to(navUl, .3, {opacity:0,x:"100%", onComplete:function(){
        TweenMax.set(navUl, {opacity:1, x:"0%"});
        navUl.removeClass("nav-ul-display nav-open");
      }});
    }
    function hamburgerClick() {
      if (!navUl.hasClass("nav-open")) {
        openNav();
      } else {
        closeNav();
      }
    }
    //Scroll back to top btn function
    (function() {
      const scrollTopBtn = $("#go-back-top");
      //Button show/hide animation
      function scrollTopanim() {
        if ($(window).scrollTop() > 900) {
          TweenMax.to(scrollTopBtn, 2, {x:0,y:0, ease: Elastic.easeOut.config(1, 0.3)});
        }else if ($(window).scrollTop() < 900) {
          TweenMax.to(scrollTopBtn, .5, {x:50, y:50});
        }
      }
      //Scroll to top
      function backToTop(e) {
        e.preventDefault();
          TweenMax.to(window, 1, {scrollTo:{y:0, ease: Power4.easeOut, autoKill:false}});
      }
      function headerbarSize() {
        if (window.innerWidth >= 1024) {
          if ($(window).scrollTop() > 20) {
            headerBar.addClass("header-size");
            navLiA.addClass("navLiA-size");
            brandingP.addClass("navLiA-size");
            brandingImg.addClass("logo-size");
            hamburgerBars.addClass("bars-size");
          } else {
            headerBar.removeClass("header-size");
            navLiA.removeClass("navLiA-size");
            brandingP.removeClass("navLiA-size");
            brandingImg.removeClass("logo-size");
            hamburgerBars.removeClass("bars-size");
          }
        }else {
          headerBar.addClass("header-size");
          navLiA.addClass("navLiA-size");
          brandingP.addClass("navLiA-size");
          brandingImg.addClass("logo-size");
          hamburgerBars.addClass("bars-size");
        }
      }
      //Events
      $(window).on('scroll', headerbarSize);
      $(window).on('resize', headerbarSize);
      navBtn.on('click', hamburgerClick);
      $(window).on('resize', resizeNav);
      $(window).on('scroll', scrollTopanim);
      scrollTopBtn.on('click', backToTop)
      $('body').on('click', closeMenuOnSideClick);
      headerbarSize();
    }())
    //resize window remove body block
    function resizeNav() {
      let windowW = window.innerWidth;
      if (windowW >= 1024) {
        pageBody.removeClass("body-scroll-lock");
      }
    }
    resizeNav();
  }());

  /* Footer rules */
  (function(){
    const weChatBtn = $("#wechat-overlay-btn a");
    const weChatClose = $("#weChat-overlay-close");
    const weChatOv = $(".weChat-overlay");
    function openWeChat(element) {
      element.preventDefault();
      pageBody.addClass("body-scroll-lock");
      weChatOv.css("display", "flex");
      TweenMax.fromTo(weChatOv, .7, {opacity:0}, {opacity:1});
    }
    function closeWeChat(element) {
      element.preventDefault();
      pageBody.removeClass("body-scroll-lock");
      TweenMax.fromTo(weChatOv, .7, {opacity:1}, {opacity:0, onComplete:function(){
        weChatOv.css("display","none");
      }});
    }
    //Events
    weChatBtn.on('click', openWeChat);
    weChatClose.on('click', closeWeChat);

    /* Updating copyright date */
    (function(){
      let today = new Date();
      let year = today.getFullYear();
      let el = document.getElementById("updatingDate");
      if (el) {
        el.textContent = year;
      }
    }())
  }());

  /********** HOME PAGE RULES **********/
  //Home page parallax
  (function() {
    const parallaxElements = $('.home-parallax-bg');

    $(window).on('scroll', function () {
      window.requestAnimationFrame(function () {
        let scrolled = $(window).scrollTop();
        TweenMax.to(parallaxElements, .5, {y: scrolled * -0.2});
      });
    });
  }());
  //Activities slide click rules
  (function() {
    const travelSlideBtn = $("a#slide2-btn");
    const consultationSlide = $("a#slide3-btn");

    function setTravelSlide() {
      store.set('travelSlide', 'travelSlide');
    }
    function setConsultationSlide() {
      store.set("consultationSlide", "consultationSlide");
    }

    //Events
    travelSlideBtn.on('click', setTravelSlide);
    consultationSlide.on('click', setConsultationSlide)
  }());

  /********** WEDDING PAGE RULES **********/
  (function() {
    /* Main cards rules */
    const cardsoverlay = $(".cards-overlay");
    //Hide/show top right close button
    function hideCloseBtn() {
      let windowH = window.innerHeight;
      let cardInnerH = $(".card-overlay-inner").outerHeight();
      let closeBtnH = $("#card-close-button-bottom").height();
      if (windowH >= cardInnerH + closeBtnH) {
        $("#card-close-button").css("display", "none");
      } else {
        $("#card-close-button").css("display", "flex");
      }
    }
    hideCloseBtn();

    (function() {
      const thumbnails = $(".thumbnail");
      const cards = $(".main-card");
      const otherWedding = $(".other-wedding");
      const outterCard = $(".outter-main-card");

      function openCard() {
        let element = $(this);
        let thumbnailIndex = thumbnails.index(element);
        otherWedding.removeClass("current-other");
        $(otherWedding[thumbnailIndex]).addClass("current-other");
        pageBody.addClass("body-scroll-lock");
        TweenMax.fromTo(cardsoverlay, .3, {opacity:0}, {opacity:1});
        TweenMax.fromTo($(".outter-main-card"), .3, {scale:0}, {scale:1, onComplete:function(){}});
        cardsoverlay.addClass("cards-overlay-display");
        $(cards[thumbnailIndex]).removeClass("main-card-display");
        outterCard.scrollTop(0);
        hideCloseBtn();
      }
      //On other-wedding click open next card funtion
      function nextCard() {
        let element = $(this);
        let otherWeddingtIndex = otherWedding.index(element);
        if (!element.hasClass("current-other")) {
          otherWedding.removeClass("current-other");
          element.addClass("current-other");
          cards.addClass("main-card-display");
          $(cards[otherWeddingtIndex]).removeClass("main-card-display");
          TweenMax.to(outterCard, .5, {scrollTo:{y:0}});
        }
      }

      //Events
      otherWedding.on('click', nextCard)
      thumbnails.on('click', openCard);
      $(window).on('resize', hideCloseBtn);
      /* Cards close button rules */
      (function() {
        const closeBtn = $("#card-close-button");


        function closeCard() {
          TweenMax.fromTo($(".outter-main-card"), .3, {scale:1}, {scale:0, onComplete:function(){
            pageBody.removeClass("body-scroll-lock");
            $(".main-card").addClass("main-card-display");
          }});
          TweenMax.fromTo(cardsoverlay, .3, {opacity:1}, {opacity:0, onComplete:function(){
            cardsoverlay.removeClass("cards-overlay-display");
          }});
        }
        //Close card on overlay background click
        function overlayBgClickClose(e) {
          let $element = $(e.target);
          if ($element.hasClass("cards-overlay")) {
            closeCard();
          }
        }
        //prevent close button preventDefault
        function prevDefBtn(e) {
          e.preventDefault();
        }
        //Events
        closeBtn.on('click', prevDefBtn);
        closeBtn.on('click', closeCard);
        cardsoverlay.on('click', overlayBgClickClose);
      }());
    }());
  }());
  /************* CONTACT PAGE RULES ********************/
  /*** JS Form validation ***/
  (function() {
    let isFormValid;
    $('.required').on('blur', function() {
      $(this).each(function() {
        if (this.value === "") {
          $(this).addClass("formValidationError");
          $(this).next("p").text("Please fill this field");
        } else {
          $(this).removeClass("formValidationError");
          $(this).next("p").text("");
        }
      });
    })
    $('#email').on('blur', function() {
      if (this.value) {
        let valid = /[^@]+@[^@]+/.test(this.value);
        if (!valid) {
          $('#email').addClass("formValidationError");
          $('#email').next("p").text("Please enter a valid email");
          console.log("enter valdi email blur")
        } else {
          $('#email').removeClass("formValidationError");
          $('#email').next("p").text("");
        }
      }
    })
    $('#human').on('blur', function() {
      if (this.value) {
        if (this.value==="5") {
          $('#human').removeClass("formValidationError");
        }else {
          $('#human').addClass("formValidationError");
          $('#human').next("p").text("Your anti-spam is inccorect");
          console.log("Your anti-spam is inccorect blur")
        }
      }
    })
    $('form').on('submit', function(e) {
      const requiredElements = $('.required');
      let formOffsetTop = $('#main-contact-section').offset().top;
      let navBarH = $('#main-header').height();
      let emailVal = document.getElementById('email').value;
      let antiSpamlVal = document.getElementById('human').value;

      //General check
        requiredElements.each(function() {
        if (this.value === "") {
          $(this).addClass("formValidationError");
          $(this).next("p").text("Please fill this field");
          TweenMax.to(window, .3, {scrollTo:{y:formOffsetTop-navBarH, autoKill:false}});
        } else {
          $(this).removeClass("formValidationError");
          $(this).next("p").text("");
          // isFormValid = true;
        }
      });

      //Type custom validation
      //EMAIL
      if (emailVal) {
        let valid = /[^@]+@[^@]+/.test(emailVal);
        if (!valid) {
          $('#email').addClass("formValidationError");
          $('#email').next("p").text("Please enter a valid email");
          TweenMax.to(window, .3, {scrollTo:{y:formOffsetTop-navBarH, autoKill:false}});
          console.log("enter valdi email on submit")
        }
      }
      //ANTI-SPAM
      //check if has a value
      if (antiSpamlVal) {
        if (antiSpamlVal==="5") {
          $('#human').removeClass("formValidationError");
          console.log("antispam is correct!!!")
        }else {
          $('#human').addClass("formValidationError");
          $('#human').next("p").text("Your anti-spam is inccorect");
          TweenMax.to(window, .3, {scrollTo:{y:formOffsetTop-navBarH, autoKill:false}});
          console.log("Your anti-spam is inccorect on submit")
          isFormValid = false;
        }
      }

      if (requiredElements.hasClass("formValidationError")) {
        isFormValid = false;
      } else {
        isFormValid = true;
      }
      console.log(isFormValid)
      //Prevent form from being subbmited
      if (!isFormValid) {
        e.preventDefault();
      }
    })
  }());
  /*********** LANGUAGES RULES **********/
  (function() {
    const lang = {
      "china" : {
        "navBar" : {
          "home": "主页",
          "weddings": "婚礼",
          "activities": "活动",
          "gallery": "图册",
          "contact": "联系"
        }
      }
    }


    $("#chineseLan").on('click', function() {
      const navLinks = $(".nav-link");
      navLinks.each(function() {
      $(this).text(lang.china.navBar[$(this).attr("key")]);
      })
    })
  }())
})
