<?php

include_once("classes/Section.php");
$sections = Section::getSections();

?>

<select class="hidden" name="section" id="select-section" onchange="onChangeSelectSection(event)">
    <option value="none">Select Section</option>

    <?php
    
    foreach ($sections as $section) { 
        echo "<option value=\"{$section->getName()}\">{$section->getName()}</option>\n";
    }

    ?>
</select>
