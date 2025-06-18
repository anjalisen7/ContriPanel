<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "contribution", "3307");
if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Connection failed"]);
  exit;
}

$sql = "SELECT * FROM comittee ORDER BY id DESC";
$result = $conn->query($sql);

$data = [];
    while ($row = $result->fetch_assoc()) {
 
  $row['members'] = array_map('trim', explode(',', $row['Members']));
  $data[] = $row;
}


echo json_encode(["status" => "success", "data" => $data]);
?>
