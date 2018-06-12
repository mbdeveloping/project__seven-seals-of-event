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
        "homePage":{
          "navBar" : {
            "home": "主页",
            "weddings": "婚礼",
            "activities": "活动",
            "gallery": "图册",
            "contact": "联系"
          },
          "slide1":{
            "h1":"您的大日子是我们的责任",
            "p":"您的梦想我们专业团队帮",
            "btn":"您实现"
          },
          "slide2":{
            "h1":"欧洲旅游",
            "p":"今天我们为量身设计专属您的假日生活",
            "btn":"了解更多"
          },
          "slide3":{
            "h1" : "我们提供基督徒商业咨询服务",
            "p" : "我们希望陪您一起度过商业旅途的艰难时刻!",
            "btn" : "了解更多"
          },
          "intro":{
            "h2" : "柒印策划有限公司",
            "p" : "我们秉着欧洲丰富的策划经验予2017年正式成立（中国）柒印策划有限公司。以专业高质量为主体的宗旨为您全权打造任何一场你所需的非凡体验。柒印策划团队专家们随时为您准备打造一场专属您的难忘感动时刻。"
          },
          "parallax":{
            "h2" : "发现您的完美婚礼",
            "p" : "为了您此生难忘的一日我们提供多种类的婚礼场景布置供你选择",
            "btn": "发现"
          },
          "activities":{
            "h2":"活动",
            "p":"我们提供多样化的活动供您选择。我们专业团队竭尽全力达到您满意的要求。",
            "btn":"探索更多"
          },
          "exhibition":{
            "h3":"展会",
            "p":"我们致力于创造全新；独特及前所未有的目标为宗旨。"
          },
          "travel":{
            "h3":"旅游",
            "p":"我们专业团队为您量身打造的旅途确保您的一路尽享欧洲风情。"
          },
          "consultation":{
            "h3":"咨询",
            "p":"我们为商务人士提供并组织商务会议及培训"
          },
          "likeWhatYouSee":{
            "h4":"喜欢您所看到的吗？",
            "p":"告诉我们您需要的活动策划",
            "btn":"联系我们"
          },
          "exploreEvents":{
            "h4":"探索发现最新活动",
            "p":"告诉我们您所需的服务",
            "btn":"发现更多"
          }
        }
      }
    }

    $("#chineseLan").on('click', function() {
      const navLinks = $(".nav-link");

      navLinks.each(function() {
      $(this).text(lang.china.homePage.navBar[$(this).attr("key")]);
      });
      $(".slide1 h1").text(lang.china.homePage.slide1.h1);
      $(".slide1 p").text(lang.china.homePage.slide1.p);
      $(".slide1 a").text(lang.china.homePage.slide1.btn);

      $(".slide2 h1").text(lang.china.homePage.slide2.h1);
      $(".slide2 p").text(lang.china.homePage.slide2.p);
      $(".slide2 a").text(lang.china.homePage.slide2.btn);

      $(".slide3 h1").text(lang.china.homePage.slide3.h1);
      $(".slide3 p").text(lang.china.homePage.slide3.p);
      $(".slide3 a").text(lang.china.homePage.slide3.btn);

      $("#intro-about h2").text(lang.china.homePage.intro.h2);
      $("#intro-about p").text(lang.china.homePage.intro.p);

      $("#home-parallax-text h2").text(lang.china.homePage.parallax.h2);
      $("#home-parallax-text p").text(lang.china.homePage.parallax.p);
      $("#home-parallax-btn").text(lang.china.homePage.parallax.btn);

      $("#home-activity-header h2").text(lang.china.homePage.activities.h2);
      $("#home-activity-header p").text(lang.china.homePage.activities.p);
      $("#home-activity-btn").text(lang.china.homePage.activities.btn);
      $("#exhibition h3").text(lang.china.homePage.exhibition.h3);
      $("#exhibition p").text(lang.china.homePage.exhibition.p);
      $("#travel h3").text(lang.china.homePage.travel.h3);
      $("#travel p").text(lang.china.homePage.travel.p);
      $("#consultation h3").text(lang.china.homePage.consultation.h3);
      $("#consultation p").text(lang.china.homePage.consultation.p);

      $(".like-what-you-see h4").text(lang.china.homePage.likeWhatYouSee.h4);
      $(".like-what-you-see p").text(lang.china.homePage.likeWhatYouSee.p);
      $(".like-what-you-see a").text(lang.china.homePage.likeWhatYouSee.btn);

      $(".explore-events h4").text(lang.china.homePage.exploreEvents.h4);
      $(".explore-events p").text(lang.china.homePage.exploreEvents.p);
      $(".explore-events a").text(lang.china.homePage.exploreEvents.btn);
      console.log($("#slide2-btn").text())
    });

    $("#enlanguage").on('click', function() {
      location.reload();
    });
  }())
})
