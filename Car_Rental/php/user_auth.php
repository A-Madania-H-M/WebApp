<?php
session_start();

if (!isset($_SESSION['username'])) {
    // User is not logged in
    header("Location: ../pages/login.html");
    exit();
}
