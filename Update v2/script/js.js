$(document).ready(function() {
  /********** MAIN RULES FOR ALL PAGES **********/
  const pageBody = $("body");
  const preloader = $(".preloader");
  /*** Website preloader screen spinner rules ***/
  $(window).on("load", function() {
    TweenMax.to(preloader, .3, {opacity:0, onComplete:function() {
      preloader.detach();
      pageBody.removeClass("body-scroll-lock");
    }});
  });
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
        }
      }
      //ANTI-SPAM
      //check if has a value
      if (antiSpamlVal) {
        if (antiSpamlVal==="5") {
          $('#human').removeClass("formValidationError");
        }else {
          $('#human').addClass("formValidationError");
          $('#human').next("p").text("Your anti-spam is inccorect");
          TweenMax.to(window, .3, {scrollTo:{y:formOffsetTop-navBarH, autoKill:false}});
          isFormValid = false;
        }
      }

      if (requiredElements.hasClass("formValidationError")) {
        isFormValid = false;
      } else {
        isFormValid = true;
      }
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
          "logo":{
            "p":"柒印策划有限公司"
          },
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
        },
        "weddingsPage":{
          "hero":{
            "h1":"设计您的完美婚礼",
            "p":"我们为专属您的日子变得神奇而难忘"
          },
          "wedFirstStep":{
            "h2":"浏览",
            "p":"查看我们的婚礼类别"
          },
          "wedSecondStep":{
            "h2":"精粹",
            "p":"选择您的梦中婚礼"
          },
          "wedThirdStep":{
            "h2":"设计",
            "p":"让我们携手共创您的神奇之日"
          },
          "mainSectionHeader":"选择您的婚礼",
          "royalThumbnail":{
            "h3":"皇家婚礼",
            "p":"没秘密-每个人心中都梦想成为被人拥戴的王子和公主。柒印皇家婚礼策划专家团队将为您实现。",
            "btn":"阅读更多"
          },
          "traditionalThumbnail":{
            "h3":"传统婚礼",
            "p":"您在寻找充满传统色彩的传统婚礼吗？那你来对地方了！柒印专家团队将开启您的传统色彩之旅。",
            "btn":"阅读更多"
          },
          "midClassThumbnail":{
            "h3":"精致婚礼",
            "p":"请记住-这只是名字的称呼,我们专家团队能足够确保您能想王子和公主一样被款待甚至能节省更多的花费。",
            "btn":"阅读更多"
          },
          "simpleClassThumbnail":{
            "h3":"精简婚礼",
            "p":"为了精简喜好的您柒印团队打造专属您的日子。",
            "btn":"阅读更多"
          },
          "westernThumbnail":{
            "h3":"西式婚礼",
            "p":"电影中的西式场景婚礼还让您记忆犹新吗？柒印专家团队为您量身打造专属您的浪漫婚礼。",
            "btn":"阅读更多"
          },
          "mixThumbnail":{
            "h3":"中西式婚礼",
            "p":"为致力于梦想中混合式婚礼的你提供多样化选择。",
            "btn":"阅读更多"
          },
          "royalCard":{
            "h3":"皇家婚礼",
            "p":"没秘密-每个人心中都梦想成为被人拥戴的王子和公主。柒印皇家婚礼策划专家团队将为您实现。",
            "h4":"皇家婚礼服务项目（最终服务项目由双方合同协议达成）",
            "li1":"50人至无限",
            "li2":"婚礼仪式（室内/户外）",
            "li3":"食物（中餐/西餐+甜品桌）",
            "li4":"主持人（节目流程主持）",
            "li5":"现场音乐/DJ音乐",
            "li6":"婚礼图片（室内/户外）",
            "li7":"蜜月-婚纱照片及录像（全部免费）",
            "li8":"大型豪华轿车服务",
            "li9":"任意海外婚礼供您选择",
            "li10":"新人礼包"
          },
          "traditionalCard":{
            "h3":"传统婚礼",
            "p":"您在寻找充满传统色彩的传统婚礼吗？那你来对地方了！柒印专家团队将开启您的传统色彩之旅。",
            "h4":"传统婚礼服务项目（最终服务项目由双方合同协议达成）",
            "li1":"40人至无限",
            "li2":"婚礼仪式（室内/户外）",
            "li3":"食物（中式+甜品桌）",
            "li4":"主持人（节目流程主持）",
            "li5":"现场音乐/DJ音乐",
            "li6":"婚礼照片（室内/户外）",
            "li7":"传统蜜月（海外）",
            "li8":"摄像，录影",
            "li9":"新人大礼包"
          },
          "midClassCard":{
            "h3":"精致婚礼",
            "p":"请记住-这只是名字的称呼,我们专家团队能足够确保您能想王子和公主一样被款待甚至能节省更多的花费。",
            "h4":"精致婚礼服务项目（最终服务项目由双方合同协议达成）",
            "li1":"20-30人",
            "li2":"婚礼仪式（室内/户外）",
            "li3":"食物（中式/西式+甜品桌）",
            "li4":"主持人（节目流程主持）",
            "li5":"现场音乐/DJ音乐",
            "li6":"婚礼照片（室内/户外）",
            "li7":"蜜月设计",
            "li8":"新人大礼包"
          },
          "simpleClassCard":{
            "h3":"精简婚礼",
            "p":"为了精简喜好的您柒印团队打造专属您的日子。",
            "h4":"精简婚礼服务项目（最终服务项目由双方合同协议达成）",
            "li1":"10至20人",
            "li2":"婚礼仪式（室内/户外）",
            "li3":"食物（中式/西式+甜品桌）",
            "li4":"主持人（节目流程主持）",
            "li5":"现场音乐/DJ音乐",
            "li6":"婚礼照片（室内/户外）",
            "li7":"新人大礼包"
          },
          "westernCard":{
            "h3":"西式婚礼",
            "p":"电影中的西式场景婚礼还让您记忆犹新吗？柒印专家团队为您量身打造专属您的浪漫婚礼。",
            "h4":"西式婚礼服务项目（最终服务项目由双方合同协议达成）",
            "li1":"30至40人",
            "li2":"婚礼仪式（室内/户外）",
            "li3":"食物（西餐+甜品桌）",
            "li4":"主持人（节目流程主持）",
            "li5":"现场音乐/DJ音乐",
            "li6":"婚礼照片（户外）",
            "li7":"外籍餐饮服务人员",
            "li8":"蜜月",
            "li9":"摄影,摄像",
            "li10":"欧美婚礼",
            "li11":"新人大礼包"
          },
          "mixCard":{
            "h3":"中西式婚礼",
            "p":"为致力于梦想中混合式婚礼的你提供多样化选择。",
            "h4":"中西式婚礼服务项目（最终服务项目由双方合同协议达成）",
            "li1":"30至40人",
            "li2":"婚礼仪式（室内/户外）",
            "li3":"食物（西餐+甜品桌）",
            "li4":"主持人（节目流程主持）",
            "li5":"现场音乐/DJ音乐",
            "li6":"婚礼照片（户外）",
            "li7":"外籍餐饮服务人员",
            "li8":"蜜月",
            "li9":"摄影,摄像",
            "li10":"欧美婚礼",
            "li11":"新人大礼包"
          },
          "otherWeddings":{
            "mainHeader":{
              "h4":"其它婚礼"
            }
          }
        },
        "activitiesPage":{
          "hero":{
            "h1":"生活中的趣味活动",
            "p":"柒印让您全天充满活力"
          },
          "actFirstStep":{
            "h2":"浏览",
            "p":"查看我们的活动类别"
          },
          "actSecondStep":{
            "h2":"精粹",
            "p":"选择您的活动喜好"
          },
          "actThirdStep":{
            "h2":"设计",
            "p":"让我们携手共创您的神奇之日"
          },
          "mainSectionHeader":{
            "h2":"选择您的活动"
          },
          "exhibitionsThumbnail":{
            "h3":"展会",
            "p":"这是柒印专长之一，我们迫不及待展示我们各个领域杰出的特色风格（时尚；艺术和任意领域）",
            "btn":"阅读更多"
          },
          "travelThumbnail":{
            "h3":"旅游",
            "p":"我们专业团队热诚为您打造专属您的欧洲假日，让您每分每秒都乐在其中。",
            "btn":"阅读更多"
          },
          "consultationThumbnail":{
            "h3":"咨询",
            "p":"这是一项基督徒商务咨询专业团队，以道德为原则，传统为主，集结众多经验丰富，种类多样的公司代表人物组织。",
            "btn":"阅读更多"
          },
          "charitiesThumbnail":{
            "h3":"慈善",
            "p":"柒印慈善组织起源于2009年在立陶宛帮助孤儿寻找住所并提供他们衣物；玩具；食物和一些生活必须用品",
            "btn":"阅读更多"
          },
          "inoutThumbnail":{
            "h3":"室内/室外",
            "p":"我们提供多种室内外团队建设活动。",
            "btn":"阅读更多"
          },
          "moreActivities":{
            "h3":"更多活动",
            "li1":"新店开张",
            "li2":"宴会/会议",
            "li3":"进出口业务",
            "li4":"宝宝满月",
            "li5":"翻译（中文；立陶宛语；英语）",
            "li6":"商标设计"
          },
          "exhibitionsCard":{
            "h3":"展会",
            "p":"这是柒印专长之一，我们迫不及待展示我们各个领域杰出的特色风格（时尚；艺术和任意领域），柒印的宗旨是创造出全新的、独一无二的甚至是前所未有的。如果你致力于新事物那么你选对了地方！"
          },
          "travelCard":{
            "h3":"旅游",
            "p":"我们专业团队热诚为您打造专属您的欧洲假日，让您每分每秒都乐在其中。我们强烈推荐——立陶宛，蕴藏丰富的历史基底，天然无害大氧吧，健康美味的当地美食，更多趣味的它等你区发现。你的旅途从早到晚全程安排，当然还有著名的波罗的海风景如画的沙丘，堪称立陶宛金子的琥珀等你带它们回家。兴奋了吗？"
          },
          "consultationCard":{
            "h3":"咨询",
            "p":"这是一项基督徒商务咨询专业团队，以道德为原则，传统为主，集结众多经验丰富，种类多样的公司代表人物组织。我们为创业者组织会议及培训，最重要的是我们有基督基金会帮助年轻的创业者！想了解更多的信息请于我们联系获取进一步的细节。"
          },
          "charitiesCard":{
            "h3":"慈善",
            "p":"柒印慈善组织起源于2009年在立陶宛帮助孤儿寻找住所并提供他们衣物；玩具；食物和一些生活必须用品与此同时立陶宛孤儿人数直线下降40%（参考：新闻，YouTube）。如果你有感动爱心帮助立陶宛或者其它地区的孤儿请联系我们讨论进一步的细节。"
          },
          "inoutCard":{
            "h3":"室内/室外",
            "p":"我们提供多种室内外团队建设活动。组织生日派对；公司庆典及团队建设等。"
          },
          "otherActivities":{
            "mainHeader":{
              "h4":"其它活动"
            }
          }
        },
        "galleryPage":{
          "weddingsGalleryHeader":"婚礼图册",
          "activitiesGalleryHeader":"活动图册"
        },
        "weddingsGalleryPage":{
          "linkLocation1":"图册",
          "linkLocation2":"婚礼图册"
        }
      }
    }
    function translateLogoAndNav(){
      const navLinks = $(".nav-link");
      navLinks.each(function() {
      $(this).text(lang.china.homePage.navBar[$(this).attr("key")]);
      });
      $("#header-branding p").text(lang.china.homePage.logo.p);
    }
    function translateLikeWhatYouSee() {
      $(".like-what-you-see h4").text(lang.china.homePage.likeWhatYouSee.h4);
      $(".like-what-you-see p").text(lang.china.homePage.likeWhatYouSee.p);
      $(".like-what-you-see a").text(lang.china.homePage.likeWhatYouSee.btn);
      $(".explore-events h4").text(lang.china.homePage.exploreEvents.h4);
      $(".explore-events p").text(lang.china.homePage.exploreEvents.p);
      $(".explore-events a").text(lang.china.homePage.exploreEvents.btn);
    }
    function translateHomePage() {
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
    }
    function translateWeddingsPage() {
      $("#wedding-hero h1").text(lang.china.weddingsPage.hero.h1);
      $("#wedding-hero p").text(lang.china.weddingsPage.hero.p);

      $("#weddings-item .first-step h2").text(lang.china.weddingsPage.wedFirstStep.h2);
      $("#weddings-item .first-step p").text(lang.china.weddingsPage.wedFirstStep.p);
      $("#weddings-item .second-step h2").text(lang.china.weddingsPage.wedSecondStep.h2);
      $("#weddings-item .second-step p").text(lang.china.weddingsPage.wedSecondStep.p);
      $("#weddings-item .third-step h2").text(lang.china.weddingsPage.wedThirdStep.h2);
      $("#weddings-item .third-step p").text(lang.china.weddingsPage.wedThirdStep.p);

      $(".main-wedding-section h2").text(lang.china.weddingsPage.mainSectionHeader);

      $(".royal-thumbnail .cards-text h3").text(lang.china.weddingsPage.royalThumbnail.h3);
      $(".royal-thumbnail .cards-text p").text(lang.china.weddingsPage.royalThumbnail.p);
      $(".royal-thumbnail .thumbnail-icon-wrapper p").text(lang.china.weddingsPage.royalThumbnail.btn);

      $(".traditional-thumbnail .cards-text h3").text(lang.china.weddingsPage.traditionalThumbnail.h3);
      $(".traditional-thumbnail .cards-text p").text(lang.china.weddingsPage.traditionalThumbnail.p);
      $(".traditional-thumbnail .thumbnail-icon-wrapper p").text(lang.china.weddingsPage.traditionalThumbnail.btn);

      $(".midClass-thumbnail .cards-text h3").text(lang.china.weddingsPage.midClassThumbnail.h3);
      $(".midClass-thumbnail .cards-text p").text(lang.china.weddingsPage.midClassThumbnail.p);
      $(".midClass-thumbnail .thumbnail-icon-wrapper p").text(lang.china.weddingsPage.midClassThumbnail.btn);

      $(".simpleClass-thumbnail .cards-text h3").text(lang.china.weddingsPage.simpleClassThumbnail.h3);
      $(".simpleClass-thumbnail .cards-text p").text(lang.china.weddingsPage.simpleClassThumbnail.p);
      $(".simpleClass-thumbnail .thumbnail-icon-wrapper p").text(lang.china.weddingsPage.simpleClassThumbnail.btn);

      $(".western-thumbnail .cards-text h3").text(lang.china.weddingsPage.westernThumbnail.h3);
      $(".western-thumbnail .cards-text p").text(lang.china.weddingsPage.westernThumbnail.p);
      $(".western-thumbnail .thumbnail-icon-wrapper p").text(lang.china.weddingsPage.westernThumbnail.btn);

      $(".mix-thumbnail .cards-text h3").text(lang.china.weddingsPage.mixThumbnail.h3);
      $(".mix-thumbnail .cards-text p").text(lang.china.weddingsPage.mixThumbnail.p);
      $(".mix-thumbnail .thumbnail-icon-wrapper p").text(lang.china.weddingsPage.mixThumbnail.btn);

      $("#royal-main-card h3").text(lang.china.weddingsPage.royalCard.h3);
      $("#royal-main-card p").text(lang.china.weddingsPage.royalCard.p);
      $("#royal-main-card h4").text(lang.china.weddingsPage.royalCard.h4);
      $("#royal-main-card li:nth-child(1)").text(lang.china.weddingsPage.royalCard.li1);
      $("#royal-main-card li:nth-child(2)").text(lang.china.weddingsPage.royalCard.li2);
      $("#royal-main-card li:nth-child(3)").text(lang.china.weddingsPage.royalCard.li3);
      $("#royal-main-card li:nth-child(4)").text(lang.china.weddingsPage.royalCard.li4);
      $("#royal-main-card li:nth-child(5)").text(lang.china.weddingsPage.royalCard.li5);
      $("#royal-main-card li:nth-child(6)").text(lang.china.weddingsPage.royalCard.li6);
      $("#royal-main-card li:nth-child(7)").text(lang.china.weddingsPage.royalCard.li7);
      $("#royal-main-card li:nth-child(8)").text(lang.china.weddingsPage.royalCard.li8);
      $("#royal-main-card li:nth-child(9)").text(lang.china.weddingsPage.royalCard.li9);
      $("#royal-main-card li:nth-child(10)").text(lang.china.weddingsPage.royalCard.li10);

      $("#traditional-main-card h3").text(lang.china.weddingsPage.traditionalCard.h3);
      $("#traditional-main-card p").text(lang.china.weddingsPage.traditionalCard.p);
      $("#traditional-main-card h4").text(lang.china.weddingsPage.traditionalCard.h4);
      $("#traditional-main-card li:nth-child(1)").text(lang.china.weddingsPage.traditionalCard.li1);
      $("#traditional-main-card li:nth-child(2)").text(lang.china.weddingsPage.traditionalCard.li2);
      $("#traditional-main-card li:nth-child(3)").text(lang.china.weddingsPage.traditionalCard.li3);
      $("#traditional-main-card li:nth-child(4)").text(lang.china.weddingsPage.traditionalCard.li4);
      $("#traditional-main-card li:nth-child(5)").text(lang.china.weddingsPage.traditionalCard.li5);
      $("#traditional-main-card li:nth-child(6)").text(lang.china.weddingsPage.traditionalCard.li6);
      $("#traditional-main-card li:nth-child(7)").text(lang.china.weddingsPage.traditionalCard.li7);
      $("#traditional-main-card li:nth-child(8)").text(lang.china.weddingsPage.traditionalCard.li8);
      $("#traditional-main-card li:nth-child(9)").text(lang.china.weddingsPage.traditionalCard.li9);

      $("#midClass-main-card h3").text(lang.china.weddingsPage.midClassCard.h3);
      $("#midClass-main-card p").text(lang.china.weddingsPage.midClassCard.p);
      $("#midClass-main-card h4").text(lang.china.weddingsPage.midClassCard.h4);
      $("#midClass-main-card li:nth-child(1)").text(lang.china.weddingsPage.midClassCard.li1);
      $("#midClass-main-card li:nth-child(2)").text(lang.china.weddingsPage.midClassCard.li2);
      $("#midClass-main-card li:nth-child(3)").text(lang.china.weddingsPage.midClassCard.li3);
      $("#midClass-main-card li:nth-child(4)").text(lang.china.weddingsPage.midClassCard.li4);
      $("#midClass-main-card li:nth-child(5)").text(lang.china.weddingsPage.midClassCard.li5);
      $("#midClass-main-card li:nth-child(6)").text(lang.china.weddingsPage.midClassCard.li6);
      $("#midClass-main-card li:nth-child(7)").text(lang.china.weddingsPage.midClassCard.li7);
      $("#midClass-main-card li:nth-child(8)").text(lang.china.weddingsPage.midClassCard.li8);

      $("#simpleClass-main-card h3").text(lang.china.weddingsPage.simpleClassCard.h3);
      $("#simpleClass-main-card p").text(lang.china.weddingsPage.simpleClassCard.p);
      $("#simpleClass-main-card h4").text(lang.china.weddingsPage.simpleClassCard.h4);
      $("#simpleClass-main-card li:nth-child(1)").text(lang.china.weddingsPage.simpleClassCard.li1);
      $("#simpleClass-main-card li:nth-child(2)").text(lang.china.weddingsPage.simpleClassCard.li2);
      $("#simpleClass-main-card li:nth-child(3)").text(lang.china.weddingsPage.simpleClassCard.li3);
      $("#simpleClass-main-card li:nth-child(4)").text(lang.china.weddingsPage.simpleClassCard.li4);
      $("#simpleClass-main-card li:nth-child(5)").text(lang.china.weddingsPage.simpleClassCard.li5);
      $("#simpleClass-main-card li:nth-child(6)").text(lang.china.weddingsPage.simpleClassCard.li6);
      $("#simpleClass-main-card li:nth-child(7)").text(lang.china.weddingsPage.simpleClassCard.li7);

      $("#western-main-card h3").text(lang.china.weddingsPage.westernCard.h3);
      $("#western-main-card p").text(lang.china.weddingsPage.westernCard.p);
      $("#western-main-card h4").text(lang.china.weddingsPage.westernCard.h4);
      $("#western-main-card li:nth-child(1)").text(lang.china.weddingsPage.westernCard.li1);
      $("#western-main-card li:nth-child(2)").text(lang.china.weddingsPage.westernCard.li2);
      $("#western-main-card li:nth-child(3)").text(lang.china.weddingsPage.westernCard.li3);
      $("#western-main-card li:nth-child(4)").text(lang.china.weddingsPage.westernCard.li4);
      $("#western-main-card li:nth-child(5)").text(lang.china.weddingsPage.westernCard.li5);
      $("#western-main-card li:nth-child(6)").text(lang.china.weddingsPage.westernCard.li6);
      $("#western-main-card li:nth-child(7)").text(lang.china.weddingsPage.westernCard.li7);
      $("#western-main-card li:nth-child(8)").text(lang.china.weddingsPage.westernCard.li8);
      $("#western-main-card li:nth-child(9)").text(lang.china.weddingsPage.westernCard.li9);
      $("#western-main-card li:nth-child(10)").text(lang.china.weddingsPage.westernCard.li10);
      $("#western-main-card li:nth-child(11)").text(lang.china.weddingsPage.westernCard.li11);

      $(".other-wedding-categories h4").text(lang.china.weddingsPage.otherWeddings.mainHeader.h4);
      $(".royal-other h5").text(lang.china.weddingsPage.royalThumbnail.h3);
      $(".traditional-other h5").text(lang.china.weddingsPage.traditionalThumbnail.h3);
      $(".mid-other h5").text(lang.china.weddingsPage.midClassThumbnail.h3);
      $(".simple-other h5").text(lang.china.weddingsPage.simpleClassThumbnail.h3);
      $(".western-other h5").text(lang.china.weddingsPage.westernThumbnail.h3);
      $(".mix-other h5").text(lang.china.weddingsPage.mixThumbnail.h3);
    }

    function translateActivitiesPage() {
      $("#activities-hero h1").text(lang.china.activitiesPage.hero.h1);
      $("#activities-hero p").text(lang.china.activitiesPage.hero.p);

      $("#activities-item .first-step h2").text(lang.china.activitiesPage.actFirstStep.h2);
      $("#activities-item .first-step p").text(lang.china.activitiesPage.actFirstStep.p);
      $("#activities-item .second-step h2").text(lang.china.activitiesPage.actSecondStep.h2);
      $("#activities-item .second-step p").text(lang.china.activitiesPage.actSecondStep.p);
      $("#activities-item .third-step h2").text(lang.china.activitiesPage.actThirdStep.h2);
      $("#activities-item .third-step p").text(lang.china.activitiesPage.actThirdStep.p);

      $("#main-activities-section h2").text(lang.china.activitiesPage.mainSectionHeader.h2);

      $(".exhibitions-thumbnail .cards-text h3").text(lang.china.activitiesPage.exhibitionsThumbnail.h3);
      $(".exhibitions-thumbnail .cards-text p").text(lang.china.activitiesPage.exhibitionsThumbnail.p);
      $(".exhibitions-thumbnail .thumbnail-icon-wrapper p").text(lang.china.activitiesPage.exhibitionsThumbnail.btn);

      $(".travel-thumbnail .cards-text h3").text(lang.china.activitiesPage.travelThumbnail.h3);
      $(".travel-thumbnail .cards-text p").text(lang.china.activitiesPage.travelThumbnail.p);
      $(".travel-thumbnail .thumbnail-icon-wrapper p").text(lang.china.activitiesPage.travelThumbnail.btn);

      $(".consultation-thumbnail .cards-text h3").text(lang.china.activitiesPage.consultationThumbnail.h3);
      $(".consultation-thumbnail .cards-text p").text(lang.china.activitiesPage.consultationThumbnail.p);
      $(".consultation-thumbnail .thumbnail-icon-wrapper p").text(lang.china.activitiesPage.consultationThumbnail.btn);

      $(".charities-thumbnail .cards-text h3").text(lang.china.activitiesPage.charitiesThumbnail.h3);
      $(".charities-thumbnail .cards-text p").text(lang.china.activitiesPage.charitiesThumbnail.p);
      $(".charities-thumbnail .thumbnail-icon-wrapper p").text(lang.china.activitiesPage.charitiesThumbnail.btn);

      $(".inout-thumbnail .cards-text h3").text(lang.china.activitiesPage.inoutThumbnail.h3);
      $(".inout-thumbnail .cards-text p").text(lang.china.activitiesPage.inoutThumbnail.p);
      $(".inout-thumbnail .thumbnail-icon-wrapper p").text(lang.china.activitiesPage.inoutThumbnail.btn);

      $("#activities-more h3").text(lang.china.activitiesPage.moreActivities.h3);
      $("#more-activities-list li:nth-child(1)").text(lang.china.activitiesPage.moreActivities.li1);
      $("#more-activities-list li:nth-child(2)").text(lang.china.activitiesPage.moreActivities.li2);
      $("#more-activities-list li:nth-child(3)").text(lang.china.activitiesPage.moreActivities.li3);
      $("#more-activities-list li:nth-child(4)").text(lang.china.activitiesPage.moreActivities.li4);
      $("#more-activities-list li:nth-child(5)").text(lang.china.activitiesPage.moreActivities.li5);
      $("#more-activities-list li:nth-child(6)").text(lang.china.activitiesPage.moreActivities.li6);

      $("#exhibitions-main-card h3").text(lang.china.activitiesPage.exhibitionsCard.h3);
      $("#exhibitions-main-card p").text(lang.china.activitiesPage.exhibitionsCard.p);
      $("#travel-main-card h3").text(lang.china.activitiesPage.travelCard.h3);
      $("#travel-main-card p").text(lang.china.activitiesPage.travelCard.p);
      $("#consultation-main-card h3").text(lang.china.activitiesPage.consultationCard.h3);
      $("#consultation-main-card p").text(lang.china.activitiesPage.consultationCard.p);
      $("#charities-main-card h3").text(lang.china.activitiesPage.charitiesCard.h3);
      $("#charities-main-card p").text(lang.china.activitiesPage.charitiesCard.p);
      $("#inout-main-card h3").text(lang.china.activitiesPage.inoutCard.h3);
      $("#inout-main-card p").text(lang.china.activitiesPage.inoutCard.p);

      $("#other-activities h4").text(lang.china.activitiesPage.otherActivities.mainHeader.h4);
      $(".exhibitions-other h5").text(lang.china.activitiesPage.exhibitionsThumbnail.h3);
      $(".travel-other h5").text(lang.china.activitiesPage.travelThumbnail.h3);
      $(".consultation-other h5").text(lang.china.activitiesPage.consultationThumbnail.h3);
      $(".charities-other h5").text(lang.china.activitiesPage.charitiesThumbnail.h3);
      $(".inout-other h5").text(lang.china.activitiesPage.inoutThumbnail.h3);
    }

    function translateGalleryPage() {
      $("#weddings-gallery-thumbnail h1").text(lang.china.galleryPage.weddingsGalleryHeader);
      $("#activities-gallery-thumbnail h1").text(lang.china.galleryPage.activitiesGalleryHeader);
    }

    function weddingsGalleryTwoLocationLinks() {
      $(".gallery-location-links li:nth-child(1) > a").text(lang.china.weddingsGalleryPage.linkLocation1);
      $(".gallery-location-links li:nth-child(3) > a").text(lang.china.weddingsGalleryPage.linkLocation2);
    }

    function translateWeddingsGalleryPage() {
      $("#weddings-gallery h1").text(lang.china.galleryPage.weddingsGalleryHeader);
      weddingsGalleryTwoLocationLinks();

      $("#gallery-thumbnail-royal h2").text(lang.china.weddingsPage.royalThumbnail.h3);
      $("#gallery-thumbnail-traditional h2").text(lang.china.weddingsPage.traditionalThumbnail.h3);
      $("#gallery-thumbnail-midClass h2").text(lang.china.weddingsPage.midClassThumbnail.h3);
      $("#gallery-thumbnail-simpleClass h2").text(lang.china.weddingsPage.simpleClassThumbnail.h3);
      $("#gallery-thumbnail-western h2").text(lang.china.weddingsPage.westernThumbnail.h3);
      $("#gallery-thumbnail-mix h2").text(lang.china.weddingsPage.mixThumbnail.h3);
    }

    function translateRoyalGallery() {
      $(".main-images-page h1").text(lang.china.weddingsPage.royalThumbnail.h3);
      weddingsGalleryTwoLocationLinks();
      $(".gallery-location-links li:nth-child(5) > a").text(lang.china.weddingsPage.royalThumbnail.h3);
    }

    function translateTraditionalGallery() {
      $(".main-images-page h1").text(lang.china.weddingsPage.traditionalThumbnail.h3);
      weddingsGalleryTwoLocationLinks();
      $(".gallery-location-links li:nth-child(5) > a").text(lang.china.weddingsPage.traditionalThumbnail.h3);
    }

    function translateMidClassGallery() {
      $(".main-images-page h1").text(lang.china.weddingsPage.midClassThumbnail.h3);
      weddingsGalleryTwoLocationLinks();
      $(".gallery-location-links li:nth-child(5) > a").text(lang.china.weddingsPage.midClassThumbnail.h3);
    }

    function translateSimpleClassGallery() {
      $(".main-images-page h1").text(lang.china.weddingsPage.simpleClassThumbnail.h3);
      weddingsGalleryTwoLocationLinks();
      $(".gallery-location-links li:nth-child(5) > a").text(lang.china.weddingsPage.simpleClassThumbnail.h3);
    }

    function translateWesternGallery() {
      $(".main-images-page h1").text(lang.china.weddingsPage.westernThumbnail.h3);
      weddingsGalleryTwoLocationLinks();
      $(".gallery-location-links li:nth-child(5) > a").text(lang.china.weddingsPage.westernThumbnail.h3);
    }

    function translateMixnGallery() {
      $(".main-images-page h1").text(lang.china.weddingsPage.mixThumbnail.h3);
      weddingsGalleryTwoLocationLinks();
      $(".gallery-location-links li:nth-child(5) > a").text(lang.china.weddingsPage.mixThumbnail.h3);
    }

    function activitiesGalleryTwoLocationLinks() {
      $(".gallery-location-links li:nth-child(1) > a").text(lang.china.weddingsGalleryPage.linkLocation1);
      $(".gallery-location-links li:nth-child(3) > a").text(lang.china.galleryPage.activitiesGalleryHeader);
    }

    function translateActivitiesGalleryPage() {
      $("#activities-gallery h1").text(lang.china.galleryPage.activitiesGalleryHeader);
      activitiesGalleryTwoLocationLinks();

      $("#baby100 h2").text(lang.china.activitiesPage.moreActivities.li4);
    }

    function checkLanguageAndPage() {
      if (store.get("language") === "china") {
        if ($("body").attr("id") === "home-page") {
          translateLogoAndNav();
          translateHomePage();
          translateLikeWhatYouSee();
        }
        if ($("body").attr("id") === "weddings-page") {
          translateLogoAndNav();
          translateWeddingsPage();
          translateLikeWhatYouSee();
        }
        if ($("body").attr("id") === "activities-page") {
          translateLogoAndNav();
          translateLikeWhatYouSee();
          translateActivitiesPage();
        }
        if ($("body").attr("id") === "gallery-page") {
          translateLogoAndNav();
          translateGalleryPage();
        }
        if ($("body").attr("id") === "weddings-gallery-page") {
          translateLogoAndNav();
          translateWeddingsGalleryPage();
        }
        if ($("body").attr("id") === "royal-gallery-page") {
          translateLogoAndNav();
          translateRoyalGallery();
        }
        if ($("body").attr("id") === "traditional-gallery-page") {
          translateLogoAndNav();
          translateTraditionalGallery();
        }
        if ($("body").attr("id") === "midclass-gallery-page") {
          translateLogoAndNav();
          translateMidClassGallery();
        }
        if ($("body").attr("id") === "simpleclass-gallery-page") {
          translateLogoAndNav();
          translateSimpleClassGallery();
        }
        if ($("body").attr("id") === "western-gallery-page") {
          translateLogoAndNav();
          translateWesternGallery();
        }
        if ($("body").attr("id") === "mix-gallery-page") {
          translateLogoAndNav();
          translateMixnGallery();
        }
        if ($("body").attr("id") === "activities-gallery-page") {
          translateLogoAndNav();
          translateActivitiesGalleryPage();
        }
      }
    }

    checkLanguageAndPage();

    $("#chineseLan").on('click', function() {
      store.set("language", "china");
      checkLanguageAndPage();
    });

    $("#enlanguage").on('click', function() {
      store.remove('language');
      location.reload();
    });
  }());
})
