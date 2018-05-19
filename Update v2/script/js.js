/*Footer Script */
$(document).ready(function() {
  var $weChatBtn = $("#wechat-overlay-btn a");
  var $weChatClose = $("#weChat-overlay-close");

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
})
