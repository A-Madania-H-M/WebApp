<?php
header('Content-Type: application/json');

$cars = [
    [
        'name' => 'Hyundai KONA',
        'type' => 'EV',
        'description' => 'Mobil full elektrik yang ramah lingkungan.',
        'price' => 'Rp 800.000',
        'period' => '/hari',
        'image' => '../assets/images/Kona.png'
    ],
    [
        'name' => 'Hyundai Elantra Limited',
        'type' => 'Sedan',
        'description' => 'Sedan mewah dengan fitur premium.',
        'price' => 'Rp 950.000',
        'period' => '/hari',
        'image' => '../assets/images/ElantraLimited.png'
    ],
    [
        'name' => 'Mercedes-Benz Sprinter',
        'type' => 'MPV',
        'description' => 'Mobil besar untuk perjalanan jauh.',
        'price' => 'Rp 1.550.000',
        'period' => '/hari',
        'image' => '../assets/images/Sprinter.png'
    ]
];

// Jika ada filter type
if (isset($_POST['type']) && $_POST['type'] !== '') {
    $typeFilter = strtolower($_POST['type']);
    $cars = array_filter($cars, function ($car) use ($typeFilter) {
        return strpos(strtolower($car['type']), $typeFilter) !== false;
    });
}

// Jika ada pencarian keyword
if (isset($_POST['search']) && $_POST['search'] !== '') {
    $keyword = strtolower($_POST['search']);
    $cars = array_filter($cars, function ($car) use ($keyword) {
        return strpos(strtolower($car['name']), $keyword) !== false;
    });
}

// Kembalikan hasil dalam format array berurutan
echo json_encode(array_values($cars));
