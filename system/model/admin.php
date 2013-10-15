<?php
class AdminModel {

    function __construct() {}

    public function getMethods() {
        return array(
            'getNextTrackMissingData' => array(),
            'updateMissingData' => array(),
            'deleteTrack' => array()
        );
    }

    public function getNextTrackMissingData() {
        $db = new DB();
        return $db->select_from_where_or_or(array('music_id, artist, title, url'), 'music', 'artist', 'Unknown', 'title', 'Unknown', 'artist', '', 1);
    }

    public function updateMissingData($params) {
        $values = array();
        if (isset($params['artist'])) $values['artist'] = $params['artist'];
        if (isset($params['title'])) $values['title'] = $params['title'];
        $db = new DB();
        return $db->update_where('music', $values, 'music_id', $params['music_id']);
    }

    public function deleteTrack($musicId) {
        $db = new DB();
        $results = $db->delete_from_where('music', 'music_id', $musicId);
        return $results;
    }

    public function updateArtistName($params) {
        $db = new DB();
        $results = $db->select_from_where(array('music_id'), 'music', 'artist', $params['old_artist_name']);
        $response = array();
        $params['rows_attempted'] = 0;
        $params['rows_updated'] = 0;
        foreach ($results as $row) {
            $params['rows_attempted']++;
            $res = $db->update_where('music', array('artist' => $params['new_artist_name']), 'music_id', $row['music_id']);
            if ($res) $params['rows_updated']++;
        }
        if ($params['rows_updated'] > 0) $response = $params;
        return $response;
    }

}