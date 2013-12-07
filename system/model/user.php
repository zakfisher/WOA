<?php
class UserModel {

    function __construct() {}

    public function getMethods() {
        return array(
            'authenticate' => array(),
            'authenticateWithToken' => array(),
            'destroyToken' => array()
        );
    }

    public function authenticate($params) {
        $database = new DB();
        $user = $database->select_from_where_and(array('user_id, username, first_name, last_name, access'), 'users', 'username', $params['username'], 'password', sha1($params['password']));
        if (empty($user)) {
            $response = array('error' => 'Username / password not found.');
        }
        else {
            $token = Text::random_string();
            $setToken = $database->update_where('users', array('token' => sha1(md5($token))), 'user_id', $user[0]['user_id']);
            $response['success'] = 'Successfully logged in!';
            $_SESSION['user'] = $user[0];
            $_SESSION['user']['token'] = $token;
        }
        return $response;
    }

    public function authenticateWithToken($token) {
        $database = new DB();
        $user = $database->select_from_where(array('user_id, username, first_name, last_name, access'), 'users', 'token', sha1(md5($token)));
        if (empty($user)) {
            $response = array('error' => 'Username / password not found.');
        }
        else {
            $newToken = Text::random_string();
            $setToken = $database->update_where('users', array('token' => sha1(md5($newToken))), 'user_id', $user[0]['user_id']);
            $response['success'] = 'Successfully logged in!';
            $_SESSION['user'] = $user[0];
            $_SESSION['user']['token'] = $newToken;
        }
        return $response;
    }

    public function destroyToken() {
        $database = new DB();
        return $database->update_where('users', array('token' => null), 'user_id', $_SESSION['user']['user_id']);
    }

    public function createUser($params) {
        $database = new DB();
        $params['access'] = 'user';
        $password = $params['password'];
        $params['password'] = sha1($params['password']);
        // Check username/email
        $existingUsername = $database->select_from_where(array('*'), 'users', 'username', $params['username']);
        $existingEmail = $database->select_from_where(array('*'), 'users', 'email', $params['email']);
        if (!empty($existingEmail)) {
            $response = array('error' => 'This email is already being used.');
            return $response;
        }
        if (!empty($existingUsername)) {
            $response = array('error' => 'This username is already being used.');
            return $response;
        }
        // Create User
        $user = $database->insert_into('users', $params);
        if (empty($user)) {
            $response = array('error' => 'Unable to create account.');
        }
        else {
            $response = array('success' => 'Account created successfully!');
        }
        return $response;
    }
}