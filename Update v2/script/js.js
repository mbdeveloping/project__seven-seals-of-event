$(document).ready(function() {
  /********** MAIN RULES FOR ALL PAGES **********/
  const pageBody = $("body");
  //Home page owl carousel
  $('.owl1').owlCarousel({
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

    function hamburgerClick() {
      if (!navUl.hasClass("nav-open")) {
        pageBody.addClass("body-scroll-lock");
        $(this).addClass("change");
        navUl.addClass("nav-ul-display nav-open");
        TweenMax.fromTo(navUl, .3, {opacity:0,x:"100%"}, {opacity:1, x:"0%"});
        TweenMax.fromTo(blurBg, .5, {'-webkit-filter':'blur(0px)'}, {'-webkit-filter':'blur(10px)'});
      } else {
        pageBody.removeClass("body-scroll-lock");
        $(this).removeClass("change");
        TweenMax.to(navUl, .3, {opacity:0,x:"100%", onComplete:function(){
          TweenMax.set(navUl, {opacity:1, x:"0%"});
          navUl.removeClass("nav-ul-display nav-open");
        }});
        TweenMax.fromTo(blurBg, .5, {'-webkit-filter':'blur(10px)'}, {'-webkit-filter':'blur(0px)'});
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
          TweenMax.to(window, 1, {scrollTo:{y:0, ease: Power4.easeOut}});
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
      var today = new Date();
      var year = today.getFullYear();

      var el = document.getElementById("updatingDate");
      el.textContent = year;
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
        const closeBtnBot = $("#card-close-button-bottom");
        function closeCard(element) {
          element.preventDefault();
          cardsoverlay.removeClass("cards-overlay-display");
          pageBody.removeClass("body-scroll-lock");
          $(".main-card").addClass("main-card-display");
        }
        //Events
        closeBtn.on('click', closeCard);
        closeBtnBot.on('click', closeCard);
      }());
    }());
  }());
})
