<?php

class Page {

    private $name;
    private $id;
    private $title;
    private $contentId;
    private $activeNavigationLink;
    private $pathToHeader;

    public function __construct() {
        $this->pathToHeader = "includes/header";
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getId() {
        return 1;
    }

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
    
    public function getPathToHeader() {
        return $this->pathToHeader;
    }

    public function setPathToHeader($pathToHeader) {
        $this->pathToHeader = $pathToHeader;
    }
    
    public function createHeader() {
        include_once($this->pathToHeader);
    }
    
}