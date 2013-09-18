<?php
class UserController {

    function __construct() {}

    public function login($params) {
        $model = new UserModel();
        if (isset($params['username']) && isset($params['password'])) {
            return $model->authenticate($params);
        }
        if (!isset($params['username']) && !isset($params['password'])) {
            return array('error' => 'You must provide a username and password to login.');
        }
        if (!isset($params['username'])) {
            return array('error' => 'You must provide a username to login.');
        }
        if (!isset($params['password'])) {
            return array('error' => 'You must provide a password to login.');
        }
    }

    public function logout() {
        unset($_SESSION);
        session_destroy();
        header('Location: /admin/');
    }

    public function loggedIn() {
        return $_SESSION['logged_in'];
    }

    public function getUser() {
        return $_SESSION['user'];
    }

}