$(document).ready(function() {
  /********** MAIN RULES FOR ALL PAGES **********/
  const pageBody = $("body");

  /* Owl carousel Rules*/
  $(".owl-carousel").owlCarousel();

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

    (function() {
      const thumbnails = $(".thumbnail");
      const cards = $(".main-card");

      function openCard() {
        let element = $(this);
        let elementIndex = thumbnails.index(element);

        pageBody.addClass("body-scroll-lock");
        cardsoverlay.addClass("cards-overlay-display").hide().fadeIn('slow');
        $(cards[elementIndex]).removeClass("main-card-display");
        $(".outter-main-card").scrollTop(0);
        console.log($(".other-wedding").length);
        console.log($(".other-wedding")[0]);
      }
      $(".other-wedding").on('click', function() {
        console.log(this);
        console.log($(".other-wedding").index(this));
      })
      thumbnails.on('click', openCard);

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
        closeBtn.on('click', closeCard);
        closeBtnBot.on('click', closeCard);
      }());
    }());
  }());
})
