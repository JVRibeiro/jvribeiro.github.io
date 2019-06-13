<?php

  class Dbh {
    private $host;
    private $username;
    private $pwd;
    private $dbname;
    private $charset;

    public function connect() {
      $this->host = "localhost";
      $this->username = "root";
      $this->pwd = "";
      $this->dbname = "test";
      $this->charset = "utf8mb4";

      try {
        $dsn = "mysql:host=". $this->host ."; dbname=". $this->dbname ."; charset=". $this->charset;
        $pdo = new PDO($dsn, $this->username, $this->pwd);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $pdo;
      } catch (\Exception $e) {
        echo "Conexão com o banco falhou: ". $e->getMessage();
      }

    }
  }
