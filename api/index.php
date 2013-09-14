<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/system/config.php');

$controllerMap = array(
    'music' => 'MusicController'
);

$class = $controllerMap[$_GET['c']];
$method = $_GET['m'];

if (isset($_POST)) $params = array($_POST);

if (!empty($_GET['p'])) $params = $_GET['p'];

if (method_exists($class, $method)) {
    $c = new $class();
    if (empty($params[0])) $json = call_user_func(array($class, $method));
    else $json = call_user_func_array(array($class, $method), $params);
    header('Content-type: application/json');
    print json_encode($json);
    exit;
}