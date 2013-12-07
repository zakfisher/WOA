<?php
class UserController {

    public function getMethods() {
        return array(
            'login' => array(),
            'logout' => array(),
            'isLoggedIn' => array(),
            'getUser' => array(),
            'getUserAccessLevel' => array()
        );
    }

    public function login($params) {
        $model = new UserModel();
        if (isset($params['username']) && isset($params['password'])) {
            return $model->authenticate($params);
        }
        if (!isset($params['username']) && !isset($params['password'])) {
            return array('error' => 'Please provide a username and password to login.');
        }
        if (!isset($params['username'])) {
            return array('error' => 'Please provide a username to login.');
        }
        if (!isset($params['password'])) {
            return array('error' => 'Please provide a password to login.');
        }
    }

    public function signup($params) {
        $model = new UserModel();
        if (!isset($params['first_name'])) {
            return array('error' => 'Please provide a username to sign up.');
        }
        if (!isset($params['last_name'])) {
            return array('error' => 'Please provide a username to sign up.');
        }
        if (!isset($params['email'])) {
            return array('error' => 'Please provide a username to sign up.');
        }
        if (!isset($params['username'])) {
            return array('error' => 'Please provide a username to sign up.');
        }
        if (!isset($params['password'])) {
            return array('error' => 'Please provide a password to sign up.');
        }
        return $model->createUser($params);
    }

    public function logout($location) {
        if ($this->isLoggedIn()) {
            $model = new UserModel();
            $model->destroyToken();
        }
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
        return $_SESSION['user']['access'];
    }

}