<?php
class AdminController {

    function __construct() {}

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
            $customData['Attempted Rows']++;
            $mp3['url'] = str_replace('http://www.worldofanarchy.com/_WOA/music/', '', $mp3['url']);
            if (in_array($mp3['url'], $existingURLs)) continue;
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

}