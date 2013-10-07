<?php
class AdminController {

    function __construct() {}

    public function getMessage() {
        if (isset($_SESSION['message'])) {
            $message = $_SESSION['message'];
            unset($_SESSION['message']);
            return $message;
        }
        return false;
    }

    public function setMessage($type, $message) {
        $_SESSION['message'] = array('type' => $type, 'message' => $message);
    }

    public function getActions() {
        return array(
            'import-new-tracks' => array(
                'title' => 'Import New Tracks',
                'description' => 'Extract meta data and insert rows in database.'
            ),
            'update-missing-data' => array(
                'title' => 'Update Missing Data',
                'description' => 'Update "Unknown" artists and titles.'
            )
        );
    }

    public function executeAction($action) {
        $results = array();
        switch ($action) {
            case 'import-new-tracks':
                $results = $this->importNewTracks();
                break;
            case 'update-missing-data':
                $results = $this->getNextTrackMissingData();
                break;
        }
        return $results;
    }

    public function importNewTracks() {
        $music = new MusicController();
        $allMusic = $music->getAll();
        $existingURLs = array();
        foreach ($allMusic as $row) {
            if (!in_array($row['url'], $existingURLs)) $existingURLs[] = $row['url'];
        }
        $files = $music->getFiles();
        krsort($files['all']);
        $customData = array();
        $customData['Attempted Rows'] = 0;
        $customData['New Rows'] = 0;
        foreach ($files['all'] as $i => $mp3) {
            $mp3['url'] = str_replace('http://www.worldofanarchy.com/_WOA/music/', '', $mp3['url']);
            if (in_array($mp3['url'], $existingURLs)) continue;
            $customData['Attempted Rows']++;
            $mp3 = $music->getMetaData($mp3);
            unset($mp3['uploaded']);
            unset($mp3['filename']);
            unset($mp3['folder']);
            $database = new DB();
            $response = $database->insert_into('music', $mp3);
            $files['all'][$i] = $mp3;
            if (!empty($response['error'])) {
                print $response['error'];
                $results['results'] = $mp3;
                break;
            }
            $results['results'][] = $mp3;
            $customData['New Rows']++;
        }
        $allMusic = $music->getAll();
        $customData['File Count'] = count($files['all']);
        $customData['Total Rows'] = count($allMusic);
        $results['customData'] = $customData;
        return $results;
    }

    public function getNextTrackMissingData() {
        $model = new AdminModel();
        $track['results'] = $model->getNextTrackMissingData();
        if (empty($track['results'])) {
            $track = array('customData' => array('Tracks Found' => 0));
        }
        return $track;
    }

    public function updateMissingData($params) {
        $music = new MusicModel();
        $model = new AdminModel();
        $response = $model->updateMissingData($params);
        if ($response) {
            $track = $music->getTrackById($params['music_id']);
            $track = $track[0];
            $this->setMessage('success', 'Updated (music_id = ' . $track['music_id'] . '): ' . $track['artist'] . ' - ' . $track['title']);
        }
        else {
            $this->setMessage('danger', 'Not Updated (music_id = ' . $params['music_id'] . ')');
        }
    }

    public function deleteTrack($params) {
        $music = new MusicModel();
        $model = new AdminModel();
        $track = $music->getTrackById($params['music_id']);
        $track = $track[0];
        $response = $model->deleteTrack($params['music_id']);
        if ($response) {
            $this->setMessage('success', 'Deleted (music_id = ' . $params['music_id'] . ')');
            unlink("/home1/worldoh4/public_html/_WOA/music/" . $track['url']);
        }
        else {
            $this->setMessage('danger', 'Unable to delete (music_id = ' . $params['music_id'] . ')');
        }
    }

}