<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

error_reporting(E_ALL);
ini_set('display_errors', 0);

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

if (!is_array($input) || !isset($input['username'], $input['password'])) {
    echo json_encode([
        "status"  => "error",
        "message" => "Missing username or password"
    ]);
    exit;
}

$username = $input['username'];
$password = $input['password'];

$conn = new mysqli("localhost", "root", "", "contribution", "3307");
if ($conn->connect_error) {
    echo json_encode([
        "status"  => "error",
        "message" => "DB connection failed: " . $conn->connect_error
    ]);
    exit;
}

$username = $conn->real_escape_string($username);
$password = $conn->real_escape_string($password);

$sql = "SELECT * FROM users WHERE Name = '$username' AND Password = '$password'";
$result = $conn->query($sql);

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "role"   => $row['Role'],
        "name"   => $row['Name']
    ]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => "Invalid username or password"
    ]);
}

$conn->close();
