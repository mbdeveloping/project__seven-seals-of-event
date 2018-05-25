$(document).ready(function() {
  /********** MAIN RULES FOR ALL PAGES **********/
  const pageBody = $("body");
  /* Owl carousel Rules*/
  $(".owl-carousel").owlCarousel();
  /* Header nav hamburger-btn rules */
  (function() {
    const navBtn = $("#hamburger-btn");
    const navUl = $("#main-nav ul");
    navBtn.on('click', function() {
      pageBody.toggleClass("body-scroll-lock");
      this.classList.toggle("change");
      navUl.toggleClass("nav-ul-display");
      TweenMax.fromTo(navUl, .3, {opacity:0}, {opacity:1});
    });
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
      //Events
      $(window).on('scroll', scrollTopanim);
      scrollTopBtn.on('click', backToTop)
    }())
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
        TweenMax.fromTo(cardsoverlay, 1, {opacity:0}, {opacity:1});
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
          TweenMax.to(outterCard, 1, {scrollTo:{y:0}});
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
