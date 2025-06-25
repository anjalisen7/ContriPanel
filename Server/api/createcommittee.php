<?php
include('dbcon.php');

if (!$input) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit;
}


$name        = $input['name'] ?? '';
$startDate   = $input['startDate'] ?? '';
$endDate     = $input['endDate'] ?? '';
$totalAmount = $input['totalAmount'] ?? '';
$drawType    = $input['drawType'] ?? '';
$membersArr  = $input['members'] ?? [];

if (!$name || !$startDate || !$endDate || !$totalAmount || !$drawType) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}


$membersStr = implode(', ', $membersArr);


$conn = new mysqli("localhost", "root", "", "contribution", "3307");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}


$stmt = $conn->prepare("INSERT INTO comittee (ComitteeName, Start_date, End_date, Total_Amount, Draw_Date, Members) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssiss", $name, $startDate, $endDate, $totalAmount, $drawType, $membersStr);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Committee created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
