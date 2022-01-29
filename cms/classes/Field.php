<?php

class Field {

    private $name;
    private $type;
    private $defaultContent;

    public function __construct($name, $type, $defaultContent) {
        $this->name = $name;
        $this->type = $type;
        $this->defaultContent = $defaultContent;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getDefaultContent() {
       return $this->defaultContent;
    }

    public function setDefaultContent($defaultContent) {
        $this->defaultContent = $defaultContent;
    }

}