<?php
// midtrans_payment.php

// Konfigurasi server key Midtrans
$serverKey = "YOUR_SERVER_KEY_HERE"; // ganti dengan Server Key Midtrans kamu
$apiUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$order_id = "ORDER-" . rand(); // buat order ID unik
$amount = 1360000; // Rp. 1.360.000 (dalam integer tanpa titik/koma)

// Setup data transaksi
$transaction = [
    "transaction_details" => [
        "order_id" => $order_id,
        "gross_amount" => $amount
    ],
    "customer_details" => [
        "first_name" => $name,
        "email" => $email,
        "phone" => $phone
    ],
    "enabled_payments" => ["bni_va", "dana"]
];

// Curl ke Midtrans
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($transaction));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json",
    "Authorization: Basic " . base64_encode($serverKey . ":")
]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
echo json_encode(["token" => $result["token"]]);
