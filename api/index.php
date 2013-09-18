<?php
require_once('../system/config.php');

$controllerMap = array(
    'music' => 'MusicController',
    'user' => 'UserController'
);

$class = $controllerMap[$_GET['c']];
$method = $_GET['m'];

if (!empty($_POST)) $params = array($_POST);
if (!empty($_GET['p'])) $params = $params = $_GET['p'];

if (method_exists($class, $method)) {
    $c = new $class();
    if (empty($params)) $json = call_user_func(array($class, $method));
    else {
        if (gettype($params) != 'array') $params = array($params);
        $json = call_user_func_array(array($class, $method), $params);
    }
    header('Content-type: application/json');
    print json_encode($json);
    exit;
}