<?php
class AdminController {

    function __construct() {}

    public function getMethods() {
        return array(
            'getMessage' => array(),
            'setMessage' => array(),
            'getActions' => array(),
            'executeAction' => array(),
            'importNewTracks' => array(),
            'getNextTrackMissingData' => array(),
            'updateMissingData' => array(),
            'deleteTrack' => array(),
            'getArtistList' => array(),
            'updateArtistName' => array()
        );
    }

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

    public function getActions($section) {
        $actions = array(
            'music' => array(
                'import-new-tracks' => array(
                    'title' => 'Import New Tracks',
                    'description' => 'Extract meta data and insert rows in database.'
                ),
                'update-missing-data' => array(
                    'title' => 'Update Missing Data',
                    'description' => 'Update "Unknown" artists and titles.'
                ),
                'update-artist-list' => array(
                    'title' => 'Update Artists',
                    'description' => 'Get list of artists and update data.'
                )
            ),
            'artists' => array(
                'fetch-fb-ids' => array(
                    'title' => 'Fetch FB IDs',
                    'description' => 'Search FB Graph for artist page ids.'
                ),
            ),
            'users' => array()
        );
        return $actions[$section];
    }

    public function executeAction($action) {
        $results = array();
        switch ($action) {
            // Music
            case 'import-new-tracks':
                $results = $this->importNewTracks();
                break;
            case 'update-missing-data':
                $results = $this->getNextTrackMissingData();
                break;
            case 'update-artist-list':
                $results = $this->getArtistList();
                break;
            // Artists
            case 'fetch-fb-ids':
                $results = $this->fetchArtistFBIDs();
                break;
        }
        return $results;
    }

    public function importNewTracks() {
        $music = new MusicController();
        $allMusic = $music->getAllMixes();
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
        $allMusic = $music->getAllMixes();
        if ($customData['Attempted Rows'] == 0) {
            $this->setMessage('success', 'All files exist in database. Total rows = ' . count($allMusic) . '. Total files = ' . count($files['all']) . '.');
        }
        else {
            $this->setMessage('success', 'Attempted ' . $customData['Attempted Rows'] . ' rows. Added ' . $customData['New Rows'] . ' rows. Total rows = ' . count($allMusic) . '. Total files = ' . count($files['all']) . '.');
        }
        return $results;
    }

    public function getNextTrackMissingData() {
        $model = new AdminModel();
        $track['results'] = $model->getNextTrackMissingData();
        if (empty($track['results'])) {
            $this->setMessage('success', 'All tracks are up to date.');
        }
        return $track;
    }

    public function updateMissingData($params) {
        $music = new MusicModel();
        $model = new AdminModel();
        $response = $model->updateMissingData($params);
        if ($response) {
            $track = $music->getMixById($params['music_id']);
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
        $track = $music->getMixById($params['music_id']);
        $track = $track[0];
        $response = $model->deleteTrack($params['music_id']);
        if ($response) {
            $this->setMessage('success', 'Deleted (music_id = ' . $params['music_id'] . ')');
            unlink("/home1/worldoh4/public_html/_WOA/music/" . urldecode($track['url']));
        }
        else {
            $this->setMessage('danger', 'Unable to delete (music_id = ' . $params['music_id'] . ')');
        }
    }

    public function getArtistList() {
        $music = new MusicController();
        $results = array();
        $results['results'] = $music->listArtists();
        return $results;
    }

    public function updateArtistName($params) {
        $model = new AdminModel();
        $response = $model->updateArtistName($params);
        if (!empty($response)) {
            $this->setMessage('success', 'Updated ' . $response['old_artist_name']  . ' to ' . $response['new_artist_name'] . '. ' . $response['rows_attempted'] . ' rows attempted. ' . $response['rows_updated'] . ' rows updated.');
        }
        else {
            $this->setMessage('danger', 'No rows updated. (' . $params['old_artist_name']  . ' to ' . $params['new_artist_name'] . ')');
        }
    }

    public function fetchArtistFBIDs() {
        $fb = new FB();
        $db = new DB();
        $music = new MusicController();
        $artists = $music->listArtists();
        $results = array(
            'customData' => array(
                'total' => count($artists),
                'attempted' => 0,
                'found' => 0,
                'updated' => 0
            )
        );
        foreach ($artists as $i => $artist) {
            $curl = $fb->graph('search?q=' . $artist . '&type=page&category=musician');
            if (!empty($curl['data'])) {
                $j = 0;
                while ($j < count($curl['data'])) {
                    if ($curl['data'][$j]['category'] == 'Musician/band') {
                        $results['results'][$artist] = $curl['data'][$j]['id'];
                        $results['customData']['found']++;
                        $mixes = $db->select_from_where(array('*'), 'music', 'artist', $artist);
                        foreach ($mixes as $mix) {
                            if ($mix['fbid'] === null) {
                                $music->updateRow(array('fbid' => $curl['data'][$j]['id']), array('key' => 'music_id', 'val' => $mix['music_id']));
                                $results['customData']['updated']++;
                            }
                        }
                        break;
                    }
                    $j++;
                }
            }
            $results['customData']['attempted']++;
        }
        $this->setMessage('success', $results['customData']['total'] . ' total. ' . $results['customData']['attempted'] . ' attempted. ' . $results['customData']['found'] . ' found. ' . $results['customData']['updated'] . ' updated. ');
        return $results;
    }
}