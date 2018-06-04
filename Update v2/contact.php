<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
    $phone = $_POST['phone'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'Seven Seals of Event';
		$to = 'mantvydas.binderis@gmail.com';
		$subject = 'Message from Seven Seals of Event ';

		$body ="From: $name\n E-Mail: $email\n Phone number: $phone\n Message:\n $message";
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}

		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}

    //Check if phone has been entered
		// if (!$_POST['phone']) {
		// 	$errPhone = 'Please enter your phone number';
		// }

		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if simple anti-bot test is correct
		if ($human !== 5) {
			$errHuman = 'Your anti-spam is incorrect';
		}
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errPhone && !$errMessage && !$errHuman) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! We will be in touch as soon as possible!</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later.</div>';
	}
}
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Contact Sevens Seals of Event now!">
    <meta name="keywords" content="Seven Seals of Event, Contact Seven Seals of Event, email, phone, phone number, address, skype, wechat">
    <meta property="og:image" content="https://sevensealsofevent.com/images/contact-page-thumbnail.JPG">
    <meta property="og:image:width" content="300">
    <meta property="og:image:height" content="300">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Contact Seven Seals of Event">
    <meta property="og:description" content="Seven Seals of Event offers activities for all Your life's special events starting with exhibitions, travel, business Christian consultation, charities, indoors and outdoors acitivties and much more.">
    <meta name="language" content="en-GB">
    <meta name="author" content="Mantvydas Binderis">
    <title>Contact Sevens Seals of Event</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/owl.carousel.min.css">
    <link rel="stylesheet" href="styles/main-css.css">
    <link rel="icon" href="favicon.png">
    <!-- Adds HTML5 element support for earlier versions of IE -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="preloader">
      <div class="preloader-inner">
        <img class="rotating" src="images/home/preloader1.png" alt="">
        <img src="images/home/preloader2.png" alt="">
        <h1>Loading...</h1>
      </div>
    </div>
    <header id="main-header">
      <div class="container main-header-inner">
          <a href="index.html">
            <div id="header-branding" class="blur-bg">
              <img src="images/home/logo.png" alt="">
              <p>Seven Seals of Event<sup><i class="far fa-registered"></i></sup></p>
            </div>
          </a>
          <a id="hamburger-btn" href="#">
            <div class="bar bar1"></div>
            <div class="bar bar2"></div>
            <div class="bar bar3"></div>
          </a>
          <nav id="main-nav">
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="wedding.html">Weddings</a></li>
              <li><a href="activities.html">Activities</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li class="active-page"><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
      </div>
    </header>
    <main class="blur-bg">
      <section id="contact-hero" class="intro-header">
        <header>
          <div class="hero-bg">
             <span role="img" aria-label="Background picture of flowers on wedding table"> </span>
          </div>
          <div class="alignt-header-text">
            <div class="hero-text-wrapper">
              <h1>Reach Us Out</h1>
              <p>We are here to answer any questions You may have about our services. Reach out to us and we'll respond as soon as we can.</p>
            </div>
          </div>
        </header>
      </section>
      <article  class="item-section">
        <div class="container">
          <div id="main-contact-outter">
            <section id="main-contact-section">
              <h2>Contact Us</h2>
              <form class="contact-form" role="form" method="post" action="contact.php" novalidate>
                <div class="form-success-box">
                  <?php echo $result; ?>
                </div>
                <input aria-label="First and last name" type="text" class="form-control required" id="name" name="name" placeholder="FIRST & LAST NAME" value="<?php echo htmlspecialchars($_POST['name']); ?>">
                <?php echo "<p class='text-danger'>$errName</p>";?>
                <input aria-label="Your email" type="email" class="form-control required" id="email" name="email" placeholder="EMAIL" value="<?php echo htmlspecialchars($_POST['email']); ?>">
                <?php echo "<p class='text-danger'>$errEmail</p>";?>
                <input aria-label="Phone number" type="tel" class="form-control" id="phone" name="phone" placeholder="PHONE NUMBER" value="<?php echo htmlspecialchars($_POST['phone']); ?>">
                <?php echo "<p class='text-danger'>$errPhone</p>";?>
                <textarea aria-label="your message" class="form-control required" id="message" rows="4" name="message" placeholder="ENTER YOUR MESSAGE"><?php echo htmlspecialchars($_POST['message']);?></textarea>
                <?php echo "<p class='text-danger'>$errMessage</p>";?>
                <label for="human" id="anti-spam-q" aria-label="Anti-spam question: 2 + 3 = ?">Anti-spam question: 2 + 3 = ?</label>
                <input type="text" class="form-control anti-spam-w required" id="human" name="human" placeholder="ANTI-SPAM ANSWER">
                <?php echo "<p class='text-danger'>$errHuman</p>";?>
                <input id="form-btn" name="submit" type="submit" value="Send">
              </form>
            </section>
            <section id="contact-direct">
              <h3>Contact Direct</h3>
              <ul class="contact-direct-inner">
                <li>
                  <i class="fas fa-mobile-alt"></i>
                  <a href="tel:+86 150-1324-6047">+86 150-1324-6047</a>
                </li>
                <li>
                  <i class="far fa-envelope"></i>
                  <a href="mailto:seven-seals-of-event@hotmail.com">seven-seals-of-event@hotmail.com</a>
                </li>
                <li>
                  <i class="fab fa-skype"></i>
                  <a href="skype:live:edgar.stasiukonis?chat">edgar.stasiukonis</a>
                </li>
                <li><i class="fab fa-weixin"></i>edgaras</li>
                <li><i class="fas fa-map-marker"></i>Room 905, No 1, NanZhuNan Road, HaiZhu District, Guangzhou City, Guangdong Province, China</li>
              </ul>
            </section>
            <section id="google-maps">
              <div id="map">
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
    <section id="contact-gallery-section" class="blur-bg">
      <div class="container">
        <div class="contact-gallery-box-wrapper">
          <div class="like-what-you-see">
            <h4>LIKE WHAT YOU SEE?</h4>
            <p>Tell us about Your event</p>
            <a role="button" class="btn" href="#">GET IN TOUCH</a>
          </div>
          <div class="explore-events">
            <h4>EXPLORE OUR RECENT EVENTS</h4>
            <p>See what we can do</p>
            <a role="button" class="btn" href="gallery.html">DISCOVER MORE</a>
          </div>
        </div>
      </div>
    </section>
    <footer id="main-footer" class="blur-bg">
      <div class="container">
        <section class="footer-textarea">
          <h4>CONNECT WITH US</h4>
          <address class="footer-address">
            <a href="tel:+8615013246047"><i class="fa fa-phone" aria-hidden="true"></i>+86 150-1324-6047</a><br>
            <a href="mailto:seven-seals-of-event@hotmail.com"><i class="fa fa-envelope-o" aria-hidden="true"></i>seven-seals-of-event@hotmail.com</a><br>
            <p id="adress-lineHeight" class="dont-h-hover"><i class="fa fa-map-marker" aria-hidden="true"></i>Room 905, No 1, NanZhuNan Road, HaiZhu District, Guangzhou City, Guangdong Province, China</p>
          </address>
          <ul class="footer-social-links">
            <li id="wechat-overlay-btn" role="button" tabindex="0" aria-label="Wechat">
              <a title="Contact us via WeChat" href="#">
                <i class="fa fa-weixin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <div class="weChat-overlay">
                <div class="weChat-overlay-inner-wrapper">
                  <p>Add me on WeChat through official ID: edgaras</p>
                  <img src="../images/weChatBarCode.jpg" alt=""><br>
                  <a role="btn" id="weChat-overlay-close" href="#">CLOSE</a>
                </div>
              </div>
            </li>
            <li>
              <a title="Contact us via Skype" href="skype:live:edgar.stasiukonis?chat">
                <i class="fa fa-skype" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <footer class="sub-footer">
          <p>Seven Seals of Event - Copyright &copy; <span id="updatingDate">2018</span></p>
      </footer>
    </footer>
    <a id="go-back-top" href="#">
      <i class="fas fa-arrow-up"></i>
    </a>
    <script src="https://use.fontawesome.com/f436a90964.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="script/owl.carousel.min.js"></script>
    <script src="script/TweenMax.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/plugins/ScrollToPlugin.min.js"></script>
    <script src="script/js.js"></script>
    <script>
    //Chec if from china
    (function() {
      let offset = new Date().getTimezoneOffset();
      let script = document.createElement('script');

      if (offset/60 == -8) {
      console.log('Hello from China!');
      script.type='text/javascript';
      script.src='http://maps.google.cn/maps/api/js?key=AIzaSyCgFqA73BX3urIDInRLXFUL-pGvD8mz3OA&callback=myMap';
      $("body").append(script);
    } else {
      script.type='text/javascript';
      script.src='https://maps.google.com/maps/api/js?key=AIzaSyCgFqA73BX3urIDInRLXFUL-pGvD8mz3OA&callback=myMap';
      $("body").append(script);
    }
    }());
      function myMap() {
        var myCenter = new google.maps.LatLng(23.08072453972975,113.27934539154057);
        var mapCanvas = document.getElementById("map");
        var mapOptions = {center: myCenter, zoom: 18, fullscreenControl:false};
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var marker = new google.maps.Marker({position:myCenter});
        marker.setMap(map);
      }
    </script>
  </body>
</html>
