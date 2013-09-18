<?php
class UserModel {

    function __construct() {}

    public function authenticate($params) {
        $database = new db();
        $user = $database->select_from_where_and(array('user_id, username, first_name, last_name, access'), 'users', 'username', $params['username'], 'password', sha1($params['password']));
        if (empty($user)) {
            $response = array('error' => 'Username / password not found.');
        }
        else {
            $response['success'] = 'Successfully logged in!';
            $_SESSION['logged_in'] = true;
            $_SESSION['user'] = $user[0];
        }
        return $response;
    }

}