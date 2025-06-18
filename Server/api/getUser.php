<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "contribution","3307");

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
