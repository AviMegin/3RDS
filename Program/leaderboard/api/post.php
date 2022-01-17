<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
//open connection to mysql db
$connection = mysqli_connect("studmysql01.fhict.local", "dbi430712", "ramses100", "dbi430712") or die("Error " . mysqli_error($connection));

//fetch table rows from mysql db
$sql = "select * from leaderboard";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

//fetch table rows from mysql db
$sql = "select * from leaderboard";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$emparray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
}
echo json_encode($emparray);
mysqli_close($connection);
