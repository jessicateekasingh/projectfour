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
    $dbconn = pg_connect("host=localhost dbname=finalproject");
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

class Posts
{
  static function all()
  {
      $posts = array();

      $results = pg_query("SELECT * FROM fitness");

      $row_object = pg_fetch_object($results);
      while ($row_object) {
          $new_post = new Post(
            intval($row_object->id),
            $row_object->title,
            $row_object->author,
            $row_object->content,

          );
          $posts[] = $new_post;
          $row_object = pg_fetch_object($results);
      }
      return $posts;
  }




//SINGLE POST//
static function single($id)
{
  $query = "SELECT * FROM fitness WHERE id = $1";
  $query_params = array($id);
  $results = pg_query_params($query, $query_params);
  $post = '';

  $row_object = pg_fetch_object($results);
  while ($row_object) {
      $new_post = new Post(
        intval($row_object->id),
        $row_object->title,
        $row_object->author,
        $row_object->content,

      );
      $post[] = $new_post;
      $row_object = pg_fetch_object($results);
}
return $post;
}//end single post//


//CREATE POST FUNCTION START//
static function create($post)
{
  $query = "INSERT INTO fitness (title, author, content) VALUES ($1, $2, $3)";
  $query_params = array($post->title, $post->author, $post->content);
  pg_query_params($query, $query_params);

  $results = pg_query("SELECT * FROM fitness ORDER BY id DESC LIMIT 1");
  $row_object = pg_fetch_object($results);
  while ($row_object) {
      $new_post = new Post(
        intval($row_object->id),
        $row_object->title,
        $row_object->author,
        $row_object->content,

      );
      $post[] = $new_post;
      $row_object = pg_fetch_object($results);
}
return $post;
}//CREATE POST FUNCTION END//




//UPDATE POST FUNCTION START//
static function update($updated_post)
{
  $query = "UPDATE fitness SET title = $1, author = $2, content = $3 WHERE id = $4";
  $query_params = array($updated_post->title, $updated_post->author, $updated_post->content, $updated_post->id);
  $result = pg_query_params($query, $query_params);

  return self::all();
}//end update post//



//DELETE FUNCTION START//
static function delete($id)
{
  $query = "DELETE FROM fitness WHERE id = $1";
  $query_params = array($id);
  $result = pg_query_params($query, $query_params);


  return self::all();
}//end delete func//


?>