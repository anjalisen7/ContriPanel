<?php
include('dbcon.php');

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username)) {
    echo json_encode(["status" => "error", "message" => "Username required"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "contribution", 3307);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

$username = $conn->real_escape_string($data->username);


$query = "SELECT ComitteeName FROM comittee WHERE LOWER(Members) LIKE LOWER('%$username%')";
$result = $conn->query($query);

$committees = [];
while ($row = $result->fetch_assoc()) {
    $committees[] = $row['ComitteeName'];  
}

echo json_encode(["status" => "success", "committees" => $committees]);
