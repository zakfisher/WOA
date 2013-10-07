<?php
class AdminModel {

    function __construct() {}

    public function getNextTrackMissingData() {
        $db = new DB();
        return $db->select_from_where_or(array('*'), 'music', 'artist', 'Unknown', 'title', 'Unknown', 1);
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

}