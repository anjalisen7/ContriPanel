<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");



$conn = new mysqli("localhost", "root", "", "contribution","3307");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}


$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data["name"]);
$password = trim($data["password"]);
$role = trim($data["role"]);
$date = date("Y-m-d H:i:s");


if (empty($name) || empty($password) || empty($role)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}


$check = $conn->prepare("SELECT * FROM users WHERE Name = ?");
$check->bind_param("s", $name);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Username already exists."]);
    exit;
}


$stmt = $conn->prepare("INSERT INTO users (Name, Password, Role, DateTime) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $password, $role, $date);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User added successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $conn->error]);
}

$conn->close();
?>
