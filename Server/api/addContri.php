<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username, $data->committee, $data->amount, $data->date)) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "contribution", "3307");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}


$uid = "";
$checkStmt = $conn->prepare("SELECT uid FROM contri WHERE Name = ? AND ComiteeName = ? LIMIT 1");
$checkStmt->bind_param("ss", $data->username, $data->committee);
$checkStmt->execute();
$result = $checkStmt->get_result();

if ($row = $result->fetch_assoc()) {
    $uid = $row['uid'];
} else {
    $uid = uniqid("mem_", true);
}
$checkStmt->close();


$stmt = $conn->prepare("INSERT INTO contri (Uid, Name, ComiteeName, ContiAmount, date) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssds", $uid, $data->username, $data->committee, $data->amount, $data->date);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "uid" => $uid]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
