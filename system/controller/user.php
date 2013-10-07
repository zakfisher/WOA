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
        $model = new UserModel();
        $model->destroyToken();
        $location = '/';
        if ($_SESSION['user']['access'] == 'admin') $location = '/admin/';
        unset($_SESSION);
        session_destroy();
        header('Location: ' . $location);
    }

    public function isLoggedIn() {
        if (isset($_SESSION['user'])) {
            $model = new UserModel();
            $response = $model->authenticateWithToken($_SESSION['user']['token']);
            if (isset($response['success'])) return true;
        }
        else return false;
    }

    public function getUser() {
        return $_SESSION['user'];
    }

    public function getUserAccessLevel() {
        print $_SESSION['user']['access'];
    }

}