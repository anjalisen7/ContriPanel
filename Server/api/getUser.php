<?php
include('dbcon.php');

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit();
}

$result = $conn->query("SELECT * FROM users WHERE `Role`='Contributor'");
$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(["status" => "success", "data" => $users]);
$conn->close();
?>
