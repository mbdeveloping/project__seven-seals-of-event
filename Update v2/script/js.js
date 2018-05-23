$(document).ready(function() {
  /***** WEDDING PAGE *****/
  (function() {
    let pageBody = $("body");
    /* Main cards rules */
    (function() {
      let thumbnails = $(".thumbnail");
      let cards = $(".main-card");

      thumbnails.on('click', function() {
        let element = $(this);
        let elementIndex = thumbnails.index(element);

        pageBody.addClass("body-scroll-lock");
        $(".cards-overlay").addClass("cards-overlay-display").hide().fadeIn('slow');
        $(cards[elementIndex]).removeClass("main-card-display");
      })
    }());

    /* Cards close button rules */
    (function() {
      let closeBtn = $("#card-close-button");

      closeBtn.on('click', function(element) {
        element.preventDefault();
        $(".cards-overlay").fadeOut('slow').removeClass("cards-overlay-display");
        pageBody.removeClass("body-scroll-lock");
        $(".main-card").addClass("main-card-display");
      })
    }());

    /* Footer rules */
    (function(){
      let weChatBtn = $("#wechat-overlay-btn a");
      let weChatClose = $("#weChat-overlay-close");

      weChatBtn.on('click', function(e) {
        e.preventDefault();
        pageBody.addClass("body-scroll-lock");
        $(".weChat-overlay").css("display", "flex").hide().fadeIn();
      });

      weChatClose.on('click', function(e) {
        e.preventDefault();
        pageBody.removeClass("body-scroll-lock");
        $(".weChat-overlay").fadeOut();
      })
    }())
  }());
})
