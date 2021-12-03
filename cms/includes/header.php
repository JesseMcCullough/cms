<?php

require_once "autoloader.php";

$cmsPages = ["pages", "navigation", "forms", "support"];

?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
	<meta charset="UTF-8" />
	<link href="images/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="styles/style.css" type="text/css" rel="stylesheet" />
	<title><?php echo $this->getTitle(); ?> | CMS</title>
</head>
<body>
	<div class="side-nav">
		<p class="greeting">Welcome, User<span class="site">site.com</span></p>
		<ul>
			<?php
			foreach ($cmsPages as $cmsPage) {
				echo '<li>';
				echo '<a href="' . $cmsPage . '.php"';
				echo $this->applyActiveNavigationLink($cmsPage) . ">";
				echo ucfirst($cmsPage);
				echo "</a></li>\n";
			}
			?>
		</ul>
		<p class="copyright">Copyright &copy; 2021 Jesse McCullough. All Rights Reserved.</p>
	</div>

	<div class="content <?php echo $this->getContentId(); ?>">