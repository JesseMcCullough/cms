<?php

class Page {

    private $title;
    private $contentId;
    private $activeNavigationLink;

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function getContentId() {
        return $this->contentId;
    }

    public function setContentId($contentId) {
        $this->contentId = $contentId;
    }

    public function getActiveNavigationLink() {
        return $this->activeNavigationLink;
    }

    public function setActiveNavigationLink($activeNavigationLink) {
        $this->activeNavigationLink = $activeNavigationLink;
    }

    public function applyActiveNavigationLink($page) {
        if ($this->getActiveNavigationLink() == $page) {
            return ' class="active"';
        }
    }
    
    public function createHeader() {
        include_once("includes/header.php");
    }
    
}