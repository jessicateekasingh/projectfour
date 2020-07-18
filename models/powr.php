<?php
$dbconn = null;
if(getenv('DATABASE_URL')){
$connectionConfig = parse_url(getenv('DATABASE_URL'));
$host = $connectionConfig['host'];
$user = $connectionConfig['user'];
$password = $connectionConfig['pass'];
$port = $connectionConfig['port'];
$dbname = trim($connectionConfig['path'],'/');
$dbconn = pg_connect(
    "host=".$host." ".
    "user=".$user." ".
    "password=".$password." ".
    "port=".$port." ".
    "dbname=".$dbname
  );
} else {
    $dbconn = pg_connect("host=localhost dbname=phpapi");
}

class Post
{
  public $id;
  public $title;
  public $author;
  public $content;

  public function __construct($id, $title, $author, $content)
  {
    $this->id = $id;
    $this->title = $title;
    $this->author = $author;
    $this->content = $content;
  }
}

?>
