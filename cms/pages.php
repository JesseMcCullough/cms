<?php
$contentId = "pages";
$pageTitle = "Pages";
$activeNavigationLink = "pages";
require_once("includes/header.php");
?>

<h1>Pages</h1>
<a href="#" class="button new">New Page</a> <!-- TO-DO: Make "New Page" button create a new page. -->
<table class="table-pages">
    <thead>
        <tr>
            <th class="column-name">Name</th>
            <th class="column-updated">Updated</th>
        </tr>
    </thead>
    <tbody>
        <!-- TO-DO: Display each page that is in the /pages folder. --> 
        <tr>
            <td class="column-name">Home</td>
            <td class="column-updated">November 28, 2021 5:30 PM</td>
            <td class="column-edit"><a href="#" class="button edit">Edit</a></td>
        </tr>
        <tr>
            <td class="column-name">Services</td>
            <td class="column-updated">November 28, 2021 2:45 PM</td>
            <td class="column-edit"><a href="#" class="button edit">Edit</a></td>
        </tr>
        <tr>
            <td class="column-name">About</td>
            <td class="column-updated">November 28, 2021 1:00 PM</td>
            <td class="column-edit"><a href="#" class="button edit">Edit</a></td>
        </tr>
        <tr>
            <td class="column-name">Contact</td>
            <td class="column-updated">November 28, 2021 10:15 AM</td>
            <td class="column-edit"><a href="#" class="button edit">Edit</a></td>
        </tr>
    </tbody>
</table>

<?php require_once("includes/footer.php"); ?>