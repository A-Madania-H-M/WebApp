<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "car_rental";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt password

$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    echo "Akun berhasil dibuat. <a href='login.html'>Login sekarang</a>";
} else {
    echo "Gagal membuat akun: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
