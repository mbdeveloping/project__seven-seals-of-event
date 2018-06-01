<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
    $phone = $_POST['phone'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'Seven Seals of Event';
		$to = 'seven-seals-of-event@hotmail.com';
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
		if (!$_POST['phone']) {
			$errPhone = 'Please enter your phone number';
		}

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
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Sevens Seals of Event</title>
    <link rel="stylesheet" href="font-awesome.min.css">
    <link rel="stylesheet" href="bootstrap.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/skeleton.css">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="favicon.png">
		<meta name="description" content="Contact Sevens Seals of Event now!">
    <meta name="keywords" content="Seven Seals of Event, Contact Seven Seals of Event, email, phone, phone number, address, skype, wechat">
    <meta name="language" content="en-GB">
    <meta name="author" content="Mantvydas Binderis">
    <!-- Adds HTML5 element support for earlier versions of IE -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body>
    <header role="header">

      <section class="top-Nav-Bar normalHeight">

          <div class="container-skeleton">
            <div class="top-Nav-Bar-Content">
              <div class="branding">
                <a href="index.html">
                  <img class="logo logoNormal" src="images/home/logo.png" alt="Seven Seals of Event logo">
                  <p class="logoText logoTextNormal">Seven Seals of Event<sup><i class="fa fa-registered logo-r-fn" aria-hidden="true"></i></sup></p>
                </a>
              </div><!--end branding-->
							<div id="hamburger-btn" class="container-hamburger-btn">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
              <nav class="main-navigation" role="navigation">
                <ul id="main-nav-ul">
                  <li class="paddingNormal navPadding"><a class="navFont paddingNormal navPadding" href="index.html">Home</a></li>
                  <li class="paddingNormal navPadding"><a class="navFont paddingNormal navPadding" href="wedding.html">Weddings</a></li>
                  <li class="paddingNormal navPadding"><a id="activity-page" class="navFont paddingNormal navPadding" href="activity.html">Activity</a></li>
                  <li class="paddingNormal navPadding"><a class="navFont paddingNormal navPadding" href="gallery.html">Gallery</a></li>
                  <li class="active-main paddingNormal navPadding"><a class="navFont paddingNormal navPadding" href="contact.php">Contact Us</a></li>
                </ul>
              </nav><!--end nav-->
          </div><!--end top-Nav-Bar-Content-->
        </div><!--end container-->

      </section><!--edn top-Nav-Bar section-->

  </header><!-- end main header -->

  <main role="main">
		<div class="chi-wrapper">
			<div class="contact-hero-img">

			</div>
			<a id="bounceArrow" class="contact-hero-arrow" href="#bounceArrow">
				<i class="fa fa-chevron-circle-down fa-arrow-down"></i>
			</a>
		</div>

		<article class="testingov">
			<div class="container-skeleton">
	      <header class="gallery-header">
	        <h1>CONTACT US</h1>
	      </header><!-- end gallery-header -->

	      <section class="main-contact-section">
	        <section class="contact-form tcell-group-contact">

	          <form class="form-horizontal" role="form" method="post" action="contact.php">
	  					<div class="from-success-box">
	  						<?php echo $result; ?>
	  					</div>
	  					<input aria-label="First and last name" type="text" class="form-control" id="name" name="name" placeholder="FIRST & LAST NAME" value="<?php echo htmlspecialchars($_POST['name']); ?>">
	  					<?php echo "<p class='text-danger'>$errName</p>";?>

	  					<input aria-label="Your email" type="email" class="form-control" id="email" name="email" placeholder="EMAIL" value="<?php echo htmlspecialchars($_POST['email']); ?>">
	  					<?php echo "<p class='text-danger'>$errEmail</p>";?>

	  					<input aria-label="Phone number" type="tel" class="form-control" id="phone" name="phone" placeholder="PHONE NUMBER" value="<?php echo htmlspecialchars($_POST['phone']); ?>">
	  					<?php echo "<p class='text-danger'>$errPhone</p>";?>

	  					<textarea aria-label="your message" class="form-control" id="message" rows="4" name="message" placeholder="ENTER YOUR MESSAGE"><?php echo htmlspecialchars($_POST['message']);?></textarea>
	  					<?php echo "<p class='text-danger'>$errMessage</p>";?>

							<label for="human" id="anti-spam-q" aria-label="Anti-spam question: 2 + 3 = ?">Anti-spam question: 2 + 3 = ?</label>
		  				<input type="text" class="form-control anti-spam-w" id="human" name="human" placeholder="Your Answer">
		  				<?php echo "<p class='text-danger'>$errHuman</p>";?>

	  					<input id="form-btn" name="submit" type="submit" value="Send">
	  				</form>
	        </section>

	        <section class="gmaps tcell-group-contact">

						<div class="contact-intro-text">
							<p>We are here to answer any questions You may have about our services. Reach out to us and we'll respond as soon as we can.</p>
							<p>Even if there is something You have always wanted to experience and can't find it on Seven Seals of Event, let us know and we promise we'll do our best to fit Your needs.</p>
						</div>

	          <div class="contact-direct">
	            <h2>Contact Seven Seals of Event direct:</h2>
	            <ul>
	              <li><span class="addDisplayBlock">Tel:</span> <a href="tel:+86 150-1324-6047">+86 150-1324-6047</a></li>
	              <li><span class="addDisplayBlock">Email:</span> <a href="mailto:seven-seals-of-event@hotmail.com">seven-seals-of-event@hotmail.com</a></li>
	              <li><span class="addDisplayBlock"> Skype:</span> edgar.stasiukonis</li>
	              <li><span class="addDisplayBlock">WeChat:</span> edgaras</li>
	              <li><span class="addDisplayBlock">Address:</span> Room 905, No 1, NanZhuNan Road, HaiZhu District, Guangzhou City, Guangdong Province, China</li>
	            </ul>
	          </div>

	        </section>
	      </section>

	    </div><!-- end container-main -->
		</article>

</main><!-- end main -->

    <footer class="main-footer">
      <div class="container-skeleton">

        <section class="footer-textarea">
          <h5>connect with us</h5>

					<address id="footer-address">
						<a id="phoneHolder" href="tel:+8615013246047"><i class="fa fa-phone" aria-hidden="true"></i>+86 150-1324-6047</a>
						<a id="mailHolder" href="mailto:seven-seals-of-event@hotmail.com"><i class="fa fa-envelope-o" aria-hidden="true"></i>seven-seals-of-event@hotmail.com</a>

						<p id="adress-lineHeight" class="dont-h-hover"><i class="fa fa-map-marker" aria-hidden="true"></i>Room 905, No 1, NanZhuNan Road, HaiZhu District, Guangzhou City, Guangdong Province, China</p>
					</address>

          <ul class="social-net">
            <!-- href="weixin://dl/chat?edgaras" -->
            <li id="wechat-overlay"><a title="Contact us via WeChat"><i class="fa fa-weixin" aria-hidden="true"></i></a></li>
            <div class="wcoimg">
              <div class="wcoimg-wrapper">
									<p id="wechat-msg">Add me on WeChat through official ID: edgaras</p>
                  <img src="images/weChatBarCode.jpg" alt="Barcode for WeChat">
                  <button id="wcoimg-btn" type="button" name="button">CLOSE</button>
              </div>
            </div>
            <li><a title="Contact us via Skype" href="skype:live:edgar.stasiukonis?chat"><i class="fa fa-skype" aria-hidden="true"></i></a></li>
          </ul><!-- end social-net -->

        </section><!--end footer-textarea -->
        <ul class="footer-links">
          <li><a class="footerBorder" href="privacy-policy.html">Privacy Policy</a></li>
          <li><a class="footerBorder" href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
          <li><a class="footerNoBorder" href="we-cooperate-with.html">We Cooperate With</a></li>
        </ul>
      </div><!-- end container-main -->
      <footer class="subfooter">
        <p>Seven Seals of Event - Copyright &copy; <span id="updatingDate"></span></p>
        <p class="createdBy">Created by: <a href="#">MBDeveloping</a> </p>
      </footer><!-- end subfooter -->
    </footer><!-- end main footer -->

		<!-- Jump to Up button -->
						<a role="button" title="Back to top" id="top" href="#top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
		<!-- End Jump to Up button -->
	<script type="text/javascript" src="jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="jquery.easeScroll.js"></script>
	<script src="bootstrap.js"></script>
	<script src="jquery.parallax-scroll.js"></script>
	<script src="parallax.min.js"></script>
	<script src="owl.carousel.js"></script>
  <script type="text/javascript" src="script.js"></script>

  </body>
</html>
