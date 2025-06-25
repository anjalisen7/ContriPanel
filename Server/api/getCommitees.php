<?php
include('dbcon.php');
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
