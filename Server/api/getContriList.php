<?php
include('dbcon.php');
if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Connection failed"]);
  exit;
}


$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username)) {
  echo json_encode(["status" => "error", "message" => "Username is required"]);
  exit;
}

$username = $conn->real_escape_string($data->username);


$stmt = $conn->prepare("SELECT * FROM contri WHERE Name = ? ORDER BY id DESC");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode(["status" => "success", "data" => $data]);
?>
