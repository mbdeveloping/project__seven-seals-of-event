/****************************************************************************
*************************** Disabling parallax for mobile ************************
****************************************************************************/

$(".mobile-par").hide();

if (/Mobi/.test(navigator.userAgent)) {
    $(".middle-parallax").css("display", "none");
    $(".mobile-par").show();
}
/****************************************************************************
*************************** SMOOTH SCROLLING EFFECT ************************
****************************************************************************/
$("html").easeScroll();

$("html").easeScroll({
  frameRate: 60,
  animationTime: 1000,
  stepSize: 120,
  pulseAlgorithm: 1,
  pulseScale: 8,
  pulseNormalize: 1,
  accelerationDelta: 20,
  accelerationMax: 1,
  keyboardSupport: true,
  arrowScroll: 50,
  touchpadSupport: true,
  fixedBackground: true
});

//bcSwipe script

! function(t) {
    t.fn.bcSwipe = function(e) {
        var n = {
            threshold: 50
        };
        return e && t.extend(n, e), this.each(function() {
            function e(t) {
                1 == t.touches.length && (u = t.touches[0].pageX, c = !0, this.addEventListener("touchmove", o, !1))
            }

            function o(e) {
                if (c) {
                    var o = e.touches[0].pageX,
                        i = u - o;
                    Math.abs(i) >= n.threshold && (h(), t(this).carousel(i > 0 ? "next" : "prev"))
                }
            }

            function h() {
                this.removeEventListener("touchmove", o), u = null, c = !1
            }
            var u, c = !1;
            "ontouchstart" in document.documentElement && this.addEventListener("touchstart", e, !1)
        }), this
    }
}(jQuery);


/******************************************************************************
******************************** NavBar Animation******************************
*******************************************************************************/

$(document).ready(function(){

      $(window).scroll(function(){
        var $navPadding = $('.navPadding'),
            $topNavBar = $('.top-Nav-Bar'),
            $logo = $('.logo'),
            $logoText = $('.logoText'),
            $navFont = $('.navFont'),
            $faReg = $('.fa-registered');
          if ($(this).scrollTop() > 25) {


              $navPadding.addClass('paddingSmall');
              $navPadding.removeClass('paddingNormal');
              $topNavBar.addClass('smallHeight');
              $topNavBar.removeClass('normalHeight');
              $logo.addClass('logoSmall');
              $logo.removeClass('logoNormal');
              $logoText.addClass('logoTextSmall');
              $logoText.removeClass('logoTextNormal');
              $navFont.css("font-size", "16px");
              $faReg.addClass('logo-r-fs');
              $faReg.removeClass('logo-r-fn')
          } else {
              $topNavBar.removeClass('smallHeight');
              $topNavBar.addClass('normalHeight');
              $navPadding.addClass('paddingNormal');
              $navPadding.removeClass('paddingSmall');
              $logo.addClass('logoNormal');
              $logo.removeClass('logoSmall');
              $logoText.addClass('logoTextNormal');
              $logoText.removeClass('logoTextSmall');
              $navFont.css("font-size", "20px");
              $faReg.removeClass('logo-r-fs');
              $faReg.addClass('logo-r-fn')
          };
      });
  });

/*******************************************************************************
************************** Scroll to Top ***************************************
*******************************************************************************/

$("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
 });

 $("a[href='#second-scroll-top']").click(function() {
     $("html, body").animate({ scrollTop: 300 }, "slow");
     return false;
  });
/***** contact page bouncing arrow ***/

   $("#bounceArrow").click(function() {
    $('html,body').animate({
        scrollTop: $(".gallery-header").offset().top},
        'slow');
});


   /***************************************************************************
   ********************* Carousel Control :hovet Show/Hide ********************
   ****************************************************************************/

   $(document).ready(function(){
     if (!/Mobi/.test(navigator.userAgent)) {
       var $cControl = $(".carousel-control");
       var $mainContainer = $(".container");


       $cControl.css("display", "block").hide();
      $mainContainer.mouseover(function(){
           $cControl.stop().fadeIn(300);
       });

       $mainContainer.mouseleave(function(){
           $cControl.stop().fadeOut(300);
       });
       $cControl.hover(function() {
         $(this).css("background", "rgba(0,0,0, .5)");
        }, function() {
          $(this).css("background", "rgba(0,0,0, 1)");
        }
      );
     }

   });

   /***************************************************************************
   ********************** Carousel Control Pressing Motion ********************
   ****************************************************************************/

   $(document).ready(function(){
     var $carContRight = $(".carousel-control.right");
     var $carConLeft = $(".carousel-control.left");
     // for right
     $carContRight.mousedown(function(){
         $(this).css({"height": "75px", "width": "75px"});
     });
    $carContRight.mouseup(function(){
        $(this).css({"height": "80px", "width": "80px"});
    });

       // for left
       $carConLeft.mousedown(function(){
           $(this).css({"height": "75px", "width": "75px"});
       });
         $carConLeft.mouseup(function(){
             $(this).css({"height": "80px", "width": "80px"});
         });
   });

/******************************************************************************
********************** BACK TOT OP BUTTON PRESS ANIMATION *********************
*******************************************************************************/
/******************************************************************************
********************** Scroll Top Button Fade In/Out **************************
******************************************************************************/

   $(document).ready(function(){
     var $gTop =  $('#top');
     $gTop.mousedown(function(){
         $(this).css({"height": "45px", "width": "45px"});
     });
       $gTop.mouseup(function(){
           $(this).css({"height": "50px", "width": "50px"});
       });

       $(window).scroll(function(){

           if ($(this).scrollTop() > 700) {
               $gTop.css("margin-right", "20px");
           } else {
               $gTop.css("margin-right", "-100px");

           };
       });
   });



/******************************************************************************
******************** Wedding cards changer ************************************
******************************************************************************/

   $(document).ready(function(){
     let $royalRight = $(".royal-right"),
         $tradRight = $(".traditional-right"),
         $midCRight = $(".mid-class-right"),
         $simpleCRight = $(".simple-class-right"),
         $westernRight = $(".western-right"),
         $mixRight = $(".mix-wedding-right"),
         $royalCard = $(".royal-card"),
         $tradCard =  $(".traditional-card"),
         $midCC = $(".mid-class-card"),
         $simpleCC = $(".simple-class-card"),
         $westernCard = $(".western-card"),
         $mixCard = $(".mix-wedding-card");

      $royalRight.click(function(){
       $royalCard.css("display", "block");
       $tradCard.css("display", "none");
       $midCC.css("display", "none");
       $simpleCC.css("display", "none");
       $westernCard.css("display", "none");
       $mixCard.css("display", "none");
     })

     $tradRight.click(function(){
       $royalCard.css("display", "none");
       $tradCard.css("display", "block");
       $simpleCC.css("display", "none");
       $midCC.css("display", "none");
       $westernCard.css("display", "none");
       $mixCard.css("display", "none");
     })

     $midCRight.click(function(){
       $royalCard.css("display", "none");
       $tradCard.css("display", "none");
       $midCC.css("display", "block");
       $simpleCC.css("display", "none");
       $westernCard.css("display", "none");
       $mixCard.css("display", "none");
     })

     $simpleCRight.click(function(){
       $royalCard.css("display", "none");
       $tradCard.css("display", "none");
       $midCC.css("display", "none");
       $simpleCC.css("display", "block");
       $westernCard.css("display", "none");
       $mixCard.css("display", "none");
     })

     $westernRight.click(function(){
       $royalCard.css("display", "none");
       $tradCard.css("display", "none");
       $midCC.css("display", "none");
       $simpleCC.css("display", "none");
       $westernCard.css("display", "block");
       $mixCard.css("display", "none");
     })

     $mixRight.click(function(){
       $royalCard.css("display", "none");
       $tradCard.css("display", "none");
       $midCC.css("display", "none");
       $simpleCC.css("display", "none");
       $westernCard.css("display", "none");
       $mixCard.css("display", "block");
     })

   });

   /****************************************************************************
   ***************** Activity cards changer ***********************************/

   $(document).ready(function(){

     var $exR = $(".exhibition-right"),
         $tvlR = $(".travel-right"),
         $consR = $(".consultation-right"),
         $chrtR = $(".charities-right"),
         $inOutR = $(".inout-right"),

         $exC = $(".exhibition-card"),
         $trvlC =$(".travel-card"),
         $consC = $(".consultation-card"),
         $chrtC = $(".charities-card"),
         $inOutC = $(".inout-card");

     $exR.click(function(){
       $exC.css("display", "block");
       $trvlC.css("display", "none");
       $consC.css("display", "none");
       $chrtC.css("display", "none");
       $inOutC.css("display", "none");

     })

    $tvlR.click(function(){
       $trvlC.css("display", "block");
       $exC.css("display", "none");
       $consC.css("display", "none");
       $chrtC.css("display", "none");
       $inOutC.css("display", "none");

     })


     $consR.click(function(){
       $consC.css("display", "block");
       $exC.css("display", "none");
       $trvlC.css("display", "none");
       $chrtC.css("display", "none");
       $inOutC.css("display", "none");
     })

     $chrtR.click(function(){
       $chrtC.css("display", "block");
       $exC.css("display", "none");
       $trvlC.css("display", "none");
       $inOutC.css("display", "none");
       $consC.css("display", "none");
     })

     $inOutR.click(function(){
       $inOutC.css("display", "block");
       $exC.css("display", "none");
       $trvlC.css("display", "none");
       $consC.css("display", "none");
       $chrtC.css("display", "none");
     })
/*******************************************/
     $('.location').bind("click", function() {
     window.location = $(this).data('location');
    });
   });
/************ HAMBURGER MENU ******************/
$(document).ready(function(){
  var $hamburgerBtn = $("#hamburger-btn");
  $hamburgerBtn.on('click', function(){
    this.classList.toggle("change");
      var $mainNav = $("#main-nav-ul");
      $mainNav.stop().hide().fadeIn('slow');
      $(".slider-section").toggleClass("menu-blur");
      $(".carousel").toggleClass("menu-blur");
      $(".item").toggleClass("menu-blur");
      $("main").toggleClass("menu-blur");
      $(".contact-section").toggleClass("menu-blur");
      $(".main-footer").toggleClass("menu-blur");
      $(".right-w-wrapper-center").toggleClass("menu-blur");
      $(".left-w-out-border").toggleClass("menu-blur");
      $(".chi-wrapper").toggleClass("menu-blur");
      $(".contact-hero-img").toggleClass("menu-blur");
      $(".testingov").toggleClass("menu-blur");
      $(".fa-arrow-down").toggleClass("menu-blur");
      $("#top").toggleClass("menu-blur");
  });

});


$(document).ready(function(){
  var $mainNav = $(".main-navigation");
    $(".container-hamburger-btn").on('click', function(){
        if ($mainNav.hasClass("open-navigation")) {
          $mainNav.removeClass("open-navigation");
          $mainNav.addClass("close-navigation");

        } else {
            $mainNav.addClass("open-navigation");

        }
    });
});

/******************************************************************************
**********************WEDDING PAGE weddings list active class toggle **********
*******************************************************************************/
$(document).ready(function(){
  var $rwc = $(".right-w-circle");
  $rwc.on("click", function() {
    $rwc.removeClass("right-w-circle-active");
    $(this).addClass("right-w-circle-active");
    $rwc.removeClass("right-w-circle-h3-active");
    $(this).addClass("right-w-circle-h3-active");
  });
});
/******************************************************************************
****************************** FOOTER WECHAT OVERLAY ***************************
*******************************************************************************/
$(document).ready(function(){
  var $wcoimg = $(".wcoimg");
  $("#wechat-overlay").on("click", function() {
    $wcoimg.fadeIn();
  });
  $("#wcoimg-btn").on("click", function() {
    $wcoimg.fadeOut();
  });

/*******************************************************************************
******************** SLIDE ANCHOR LINK OPENS SPECIFIC TAB **********************
*******************************************************************************/
$(function () {
  if (window.location.hash){
    var $firstEx = $("#firstEx"),
        $secondEx = $("#secondEx"),
        $secondCons = $("#secondCons"),
        $firstCons = $("#firstCons"),
        $secondTravel = $("#secondTravel"),
        $firstTravel = $("#firstTravel"),
        $travelC = $("#travel-card");

    if (window.location.hash == "#consultation-card") {
      $("#consultation-card").css("display", "block");
      $firstEx.removeClass("right-w-circle-active");
      $firstEx.removeClass("right-w-circle-h3-active");
      $secondEx.removeClass("right-w-circle-active");
      $secondEx.removeClass("right-w-circle-h3-active");
      $secondCons.addClass("right-w-circle-active");
      $secondCons.addClass("right-w-circle-h3-active");
      $firstCons.addClass("right-w-circle-active");
      $firstCons.addClass("right-w-circle-h3-active");
      (function(){
      var uri = window.location.toString();
      if (uri.indexOf("#") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("#"));
          window.history.replaceState({}, document.title, clean_uri);
        }
      }())
    }
    else if (window.location.hash == "#travel-card") {
    $firstEx.removeClass("right-w-circle-active");
    $firstEx.removeClass("right-w-circle-h3-active");
    $secondEx.removeClass("right-w-circle-active");
    $secondEx.removeClass("right-w-circle-h3-active");
    $travelC.css("display", "block");
    $secondTravel.addClass("right-w-circle-active");
    $secondTravel.addClass("right-w-circle-h3-active");
    $firstTravel.addClass("right-w-circle-active");
    $firstTravel.addClass("right-w-circle-h3-active");
    (function(){
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    }())
    }
} else {
  $(".cards").hide().first().show();
}

  });
});
/******************************************************************************
******************************* Footer date ***********************************
*******************************************************************************/
(function(){
  var today = new Date();
  var year = today.getFullYear();

  var el = document.getElementById("updatingDate");
  el.textContent = year;
}())

/******************* wedding page trigger active class on both lsit bars ****/
$(document).ready(function(){
  // First list bar
  var $fRoyal = $("#firstRoyal"),
      $fTrad = $("#firstTraditional"),
      $fMid = $("#firstMid"),
      $fSimple = $("#firstSimple"),
      $fWestern = $("#firstWestern"),
      $fMix = $("#firstMix"),

      $secR = $("#secondRoyal"),
      $secTr = $("#secondTraditional"),
      $secM = $("#secondMid"),
      $secSimp = $("#secondSimple"),
      $secWest = $("#secondWestern"),
      $secMix = $("#secondMix");


  $fRoyal.click(function(){
    $secR.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fTrad.click(function(){
    $secTr.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fMid.click(function(){
    $secM.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fSimple.click(function(){
    $secSimp.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fWestern.click(function(){
    $secWest.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fMix.click(function(){
    $secMix.addClass("right-w-circle-active right-w-circle-h3-active");
  })

  // Second list bar1
  $secR.click(function(){
    $fRoyal.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $secTr.click(function(){
    $fTrad.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $secM.click(function(){
    $fMid.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $secSimp.click(function(){
    $fSimple.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $secWest.click(function(){
    $fWestern.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $secMix.click(function(){
    $fMix.addClass("right-w-circle-active right-w-circle-h3-active");
  })
});
/******************* activity page trigger active class on both lsit bars ****/
$(document).ready(function(){

  var $fEx = $("#firstEx"),
      $fTrvl = $("#firstTravel"),
      $fCons = $("#firstCons"),
      $fChar = $("#firstChar"),
      $fInOut = $("#firstInOut"),

      $sEx = $("#secondEx"),
      $sTrvl = $("#secondTravel"),
      $sCons = $("#secondCons"),
      $sChar = $("#secondChar"),
      $sInOut = $("#secondInOut");

  // First list bar
  $fEx.click(function(){
    $sEx.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fTrvl.click(function(){
    $sTrvl.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fCons.click(function(){
    $sCons.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fChar.click(function(){
    $sChar.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $fInOut.click(function(){
    $sInOut.addClass("right-w-circle-active right-w-circle-h3-active");
  })

  // Second list bar1
  $sEx.click(function(){
    $fEx.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $sTrvl.click(function(){
    $fTrvl.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $sCons.click(function(){
    $fCons.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $sChar.click(function(){
    $fChar.addClass("right-w-circle-active right-w-circle-h3-active");
  })
  $sInOut.click(function(){
    $fInOut.addClass("right-w-circle-active right-w-circle-h3-active");
  })

});
/*************************** Footer icons animation **************************/
$(document).ready(function(){
  var $fPhone = $(".fa-phone"),
      $fEnvlp = $(".fa-envelope-o");

  $("#phoneHolder").hover(function(){
    $fPhone.addClass("pulse-animation");
    }, function(){
    $fPhone.removeClass("pulse-animation");
  });

  $("#mailHolder").hover(function(){
    $fEnvlp.addClass("pulse-animation");
    }, function(){
    $fEnvlp.removeClass("pulse-animation");
  });
});
/*****************************************************************************
**************************** OTHER photos box slider *************************
******************************************************************************/
$('.owl-carousel').owlCarousel({
    loop:true,
    // margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:true,
            loop:false,
            autoplay:true,
            autoplayTimeout:4000
        },
        500:{
            items:3,
            nav:true,
            loop:false,
            autoplay:true,
            autoplayTimeout:4000
        },
        700:{
            items:4,
            nav:true,
            loop:false
        },
        751:{
            items:3,
            nav:true,
            loop:false
        },
        1000:{
            items:4,
            nav:true,
            loop:false,
            autoplay:true,
            autoplayTimeout:4000
        },
    }
})



/******************************************************************************
******************** WE COOPERATE WITH PAGE CARD CONTROL **********************
*******************************************************************************/
$(document).ready(function(){
  var $togetherC = $('#together-card'),
      $mbC = $('#mb-card');

  $(".together").click(function(){
    $togetherC.css("display", "block");
    $mbC.css("display", "none");
  });
  $(".mb").click(function(){
    console.log("You clicked mb");
    $mbC.css("display", "block");
    $togetherC.css("display", "none");
  });
});
/******************************************************************************
************************ WE COOPERATE WECHAT OVERLAY  **************************
*******************************************************************************/
$(document).ready(function(){
  var $wcOv = $(".wc2overlay");

  $("#wc2ow").on("click", function() {
    $wcOv.fadeIn();
  });
  $("#wc2-btn").on("click", function() {
    $wcOv.fadeOut();
  });
});
/******************************************************************************/

var parallaxElements = $('.middle-parallax'),
    parallaxQuantity = parallaxElements.length;

$(window).on('scroll', function () {

  window.requestAnimationFrame(function () {

    for (var i = 0; i < parallaxQuantity; i++) {
      var currentElement =  parallaxElements.eq(i);
      var scrolled = $(window).scrollTop();

        currentElement.css({
          'transform': 'translate3d(0,' + scrolled * -0.2 + 'px, 0) translateZ(0)'
        });

    }
  });

});

/*******************************************************************************
******************************* ACCESSIBILITY  *********************************
*******************************************************************************/
$(".right-w-circle").keypress(function(){
  $(this).click();
  if ($(this).attr("aria-pressed", "fasle")) {
      $(this).attr("aria-pressed", "true");
      $(this).siblings().attr("aria-pressed", "false");
  }
})

$(".slider-indicators").keypress(function(){
  $(this).click();
  if ($(this).attr("aria-pressed", "fasle")) {
      $(this).attr("aria-pressed", "true");
      $(this).siblings().attr("aria-pressed", "false");
  }
})

$('.right-w-circle').on('mousedown', function(event) {
event.preventDefault();
});
/**/
