<?php
class DB {
   function __construct() { }

   private function query($query)
   {
      global $db;
      $result_set = mysqli_query($db, $query) or die("Error at resultset" . mysqli_error($db));
      if (!$result_set) die('#1 Invalid query: ' . mysqli_error($db));
      return $result_set;
   }

   function insert_into($table, $assoc_array)
   {
      // Compose INSERT INTO Query
      foreach ($assoc_array as $key => $value)
      {
         $values[] = "'" . $value . "'";
         $properties[] = $key;
      }
      $properties = implode(",", $properties);
      $values = implode(",", $values);
      $query = "INSERT INTO " . $table . " (" . $properties . ") VALUES(" . $values . ");";

      // Execute Query
      $this->query($query);

      print 'success';
   }

   function select_from($array, $table)
   {
      // Compose SELECT x FROM Query
      $values = implode(",", $array);
      $query = "SELECT " . $values . " FROM " . $table . ";";

      // Execute Query
      $result_set = $this->query($query);

      // Return Results
      while ($row = mysqli_fetch_array($result_set, MYSQL_ASSOC)) $rows[] = $row;
      return $rows;
   }

   function select_from_where($array, $table, $column, $value)
   {
      // Compose SELECT x FROM y WHERE Query
      $values = implode(",", $array);
      $query = "SELECT " . $values . " FROM " . $table . " WHERE " . $column . " = '" . $value . "';";

      // Execute Query
      $result_set = $this->query($query);

      // Return Results
      while ($row = mysqli_fetch_array($result_set, MYSQL_ASSOC)) $rows[] = $row;
      return $rows;
   }
}