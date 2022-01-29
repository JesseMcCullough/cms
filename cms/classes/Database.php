<?php

class Database {

    private $name;
    private $host;
    private $username;
    private $password;
    private $connection;

    public function __construct() {
        $this->name = "cms_test";
        $this->host = "localhost";
        $this->username = "root";
        $this->password = "";
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->name);
    }

    public function getConnection() {
        return $this->connection;
    }

}
