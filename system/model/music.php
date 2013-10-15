<?php
class MusicModel {

    function __construct() {}

    public function getMethods() {
        return array(
            'get_all_tracks' => array(),
            'getTrackById' => array(),
            'getArtists' => array(),
            'makeArtistList' => array(),
            'makeBrowseByArtistList' => array()
        );
    }

    public function getAllRows($filter) {
        $db = new DB();
        $results = array_reverse($db->select_from(array($filter), 'music'));
        return $results;
    }

    public function getTrackById($musicId) {
        $db = new DB();
        $results = $db->select_from_where(array('*'), 'music', 'music_id', $musicId);
        return $results;
    }

    public function makeArtistList() {
        $db = new DB();
        $results = $db->select_from_group_by(array('artist'), 'music', 'artist');
        $response = array();
        foreach ($results as $obj) {
            $response[] = $obj['artist'];
        }
        return $response;
    }

    public function makeBrowseByArtistList() {
        $db = new DB();
        $results = $db->select_from_order_by(array('*'), 'music', 'artist');
        $response = array();
        foreach ($results as $row) {
            $response[htmlentities($row['artist'])][] = $row;
        }
        return $response;
    }
}