$(document).ready(function() {
  /***** WEDDING PAGE *****/

  /* Main cards rules */
  (function() {
    let $mainCards = $(".cards");

    $mainCards.on('click', function() {
      let $element = $(this);

      if ($element.hasClass("royal-card")) {
        $("body").addClass("body-scroll-lock");
        $(".cards-overlay").addClass("cards-overlay-display").hide().fadeIn('slow');
        $(".royal-main-card").addClass("cards-overlay-display").hide().fadeIn('slow');
      }
      console.log($element);
    })
  }());
  /* Footer rules */
  (function(){
    let $weChatBtn = $("#wechat-overlay-btn a");
    let $weChatClose = $("#weChat-overlay-close");

    $weChatBtn.on('click', function(e) {
      e.preventDefault();
      $("body").addClass("body-scroll-lock");
      $(".weChat-overlay").css("display", "flex").hide().fadeIn();
    });

    $weChatClose.on('click', function(e) {
      e.preventDefault();
      $("body").removeClass("body-scroll-lock");
      $(".weChat-overlay").fadeOut();
    })
  }())
})
