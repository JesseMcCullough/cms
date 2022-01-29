<?php

require_once("classes/Page.php");

$page = new Page();
$page->setTitle("New Page");
$page->setContentId("new-page");
$page->setActiveNavigationLink("pages");
$page->setPathToHeader("includes/header.php");
$page->createHeader();

?>

<h1>New Page</h1>
<div class="section add-new">
    <?php include_once("includes/select-section.php"); ?>
    <p><span id="add-icon">+</span>Add New Section</p>
 
<div>

<script>

    let selectSection = document.getElementById("select-section");
    // cannot add a listener? selectSection.addEventListener("change", doAnything);

    let addNewSection = document.querySelector(".content.new-page .section.add-new");
    addNewSection.addEventListener("click", onClickNewSection);

    function onClickNewSection() {
        // instead of ajax, maybe just remove the p element since select-section is already present in the document.
        let addNewSectionParagraph = document.querySelector(".content.new-page .section.add-new p");
        addNewSectionParagraph.remove();

        addNewSection.classList.remove("add-new");
        addNewSection.classList.add("new");

        selectSection.classList.toggle("hidden");
    }

    function doAnything() {
        console.log("Anything");
    }

    function onChangeSelectSection(event) {
        let value = event.target.value;

        if (value == "intro") {
            // cannot use php code inside of javascript, so youll need to use ajax to get an included file.
            console.log("Selected intro");
        } else if (value == "test") {
            console.log("Selected test");
        }
    } 

</script>

<?php require_once("includes/footer.php"); ?>
