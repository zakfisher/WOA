<?php

global $db;

// Production
if (ENV == 'production')
{
    $host = 'localhost';
    $db_name = 'worldoh4_zfi';
    $u = 'worldoh4_zak';
    $p = 'TWLzak';
}

// Development
else
{
    $host = 'localhost';
    $db_name = 'worldoh4_zfi_dev';
    $u = 'worldoh4_zak';
    $p = 'TWLzak';
}

$db = mysqli_connect($host, $u, $p, $db_name);
if (!$db) die('Database connection failed: '.mysqli_connect_error());
