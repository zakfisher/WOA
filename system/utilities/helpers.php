<?php
class Helpers {

    function __construct() {}

    public function getRandomColor($colorArr) {
        return $colorArr[rand(0, count($colorArr) - 1)];
    }
}
