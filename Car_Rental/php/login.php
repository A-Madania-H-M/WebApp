<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "car_rental";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $username;
        header("Location: ../index.html");
        exit();
    } else {
        echo "Password salah!";
    }
} else {
    echo "Username tidak ditemukan!";
}

$stmt->close();
$conn->close();
?>
