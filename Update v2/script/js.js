$(document).ready(function() {
  /***** MAIN RULES FOR ALL PAGES *****/
  const pageBody = $("body");

  /* Footer rules */
  (function(){
    const weChatBtn = $("#wechat-overlay-btn a");
    const weChatClose = $("#weChat-overlay-close");

    function openWeChat(element) {
      element.preventDefault();
      pageBody.addClass("body-scroll-lock");
      $(".weChat-overlay").css("display", "flex").hide().fadeIn();
    }
    function closeWeChat(element) {
      element.preventDefault();
      pageBody.removeClass("body-scroll-lock");
      $(".weChat-overlay").fadeOut();
    }
    weChatBtn.on('click', openWeChat);
    weChatClose.on('click', closeWeChat);
  }());

  /***** WEDDING PAGE RULES *****/
  (function() {
    /* Main cards rules */
    const cardsoverlay = $(".cards-overlay");

    (function() {
      const thumbnails = $(".thumbnail");
      const cards = $(".main-card");

      function addCard() {
        let element = $(this);
        let elementIndex = thumbnails.index(element);

        pageBody.addClass("body-scroll-lock");
        cardsoverlay.addClass("cards-overlay-display").hide().fadeIn('slow');
        $(cards[elementIndex]).removeClass("main-card-display");
      }
      thumbnails.on('click', addCard);
      
      /* Cards close button rules */
      (function() {
        const closeBtn = $("#card-close-button");

        function closeCard(element) {
          element.preventDefault();
          cardsoverlay.fadeOut('slow').removeClass("cards-overlay-display");
          pageBody.removeClass("body-scroll-lock");
          $(".main-card").addClass("main-card-display");
        }

        closeBtn.on('click', closeCard);

      }());

    }());
  }());
})
