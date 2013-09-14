<?php

global $db;

// Production
if (ENV == 'www')
{
    $host = 'localhost';
    $db_name = 'worldoh4_woa_prod';
    $u = 'worldoh4_WOAprod';
    $p = 'WOAprod';
}

// Development
else
{
    $host = 'localhost';
    $db_name = 'worldoh4_woa_dev';
    $u = 'worldoh4_WOAdev';
    $p = 'WOAdev';
}

$db = mysqli_connect($host, $u, $p, $db_name);
if (!$db) die('Database connection failed: '.mysqli_connect_error());
