<?php
$cmsPages = ["pages", "navigation", "forms", "support"];
$contentId;
$pageTitle;
$activeNavigationLink;

function applyActiveNavigationLink($name) {
	global $activeNavigationLink;
	if ($activeNavigationLink == $name) {
		return 'class="active"';
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
	<meta charset="UTF-8" />
	<link href="images/favicon.ico" type="image/x-icon" rel="icon" />
	<link href="styles/style.css" type="text/css" rel="stylesheet" />
	<title><?php echo $pageTitle; ?> | CMS</title>
</head>
<body>
	<div class="side-nav">
		<p class="greeting">Welcome, User<span class="site">site.com</span></p>
		<ul>
			<?php
			foreach ($cmsPages as $page) {
				echo '<li>';
				echo '<a href="' . $page . '.php"';
				echo ' ' . applyActiveNavigationLink($page) . ">";
				echo ucfirst($page);
				echo "</a></li>\n";
			}
			?>
		</ul>
		<p class="copyright">Copyright &copy; 2021 Jesse McCullough. All Rights Reserved.</p>
	</div>

	<div class="content <?php echo $contentId; ?>">