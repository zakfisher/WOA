<?php
class MusicController {

    public $latest = 'halal';

    function __construct() {}

    public function all_tracks($filter='*') {
        $music_model = new MusicModel();
        return $music_model->get_all_tracks($filter);
    }

    private function getMetaData($mp3) {
        $getID3 = new getID3;
        $fileInfo = $getID3->analyze($mp3['filename']);
        $title = $fileInfo['tags']['id3v2']['title'][0];
        $title = str_replace(' - www.mixing.dj', '', $title);
        $title = str_replace(' - www.edmtunes.com', '', $title);
        $artist = $fileInfo['id3v1']['artist'];
        if (empty($artist)) $artist = $fileInfo['tags']['id3v2']['artist'][0];
        if (empty($artist)) {
            $artist = explode(' ', $title);
            $artist = $artist[0];
        }
        if (empty($artist)) {
//            JSON::print_array($fileInfo); exit;
        }
        $mp3['artist'] = $artist;
        $mp3['duration'] = $fileInfo['playtime_string'];
        $mp3['title'] = $title;
        return $mp3;
    }

    public function getMixes($offset = 1, $results = 50) {
        $dir = "/home1/worldoh4/public_html/_WOA/music/";
        if (is_dir($dir)) {
            if ($dh = opendir($dir)) {
                while (($file = readdir($dh)) !== false) {
                    $subdir = $dir . $file;
                    if (is_dir($subdir)) {
                        if ($sdh = opendir($subdir)) {
                            $folder = explode("/", $subdir);
                            $folder = $folder[6] . "/";
                            while (($subfile = readdir($sdh)) !== false) {
                                if ($subfile != '.' && $subfile != '..' && $subfile != '_notes' && $file != '.' && $file != '..') {

                                    // Upload Date (folder)
                                    $date = explode('.', $folder);
                                    $year = $date[2];
                                    $year = str_replace('/', '', $year);
                                    $month = $date[0];
                                    $day = $date[1];
                                    $YYYYMMDD = '20'.$year.'-'.($month<10?'0'.$month:$month).'-'.($day<10?'0'.$day:$day);

                                    // Filter out folders that aren't dates
                                    if (!is_numeric($year) && !is_numeric($month) && !is_numeric($day)) continue;

                                    // Extract data from file name
                                    $mp3 = array(
                                        'uploaded' => $YYYYMMDD,
                                        'added' => date('n/j/y', strtotime($YYYYMMDD)),
                                        'filename' => $filename = $dir . $folder . $subfile,
                                        'folder' => $folder,
                                        'url' => 'http://www.worldofanarchy.com/_WOA/music/' . $folder . rawurlencode($subfile)
                                    );
                                    $mp3s[$YYYYMMDD][] = $mp3;
                                }
                            }
                            closedir($sdh);
                        }
                    }
                }
                closedir($dh);
            }
        }

        krsort($mp3s);

        // Sort tracks (most recent first)
        foreach($mp3s as $list) {
            foreach ($list as $item) {
                $mp3s['all'][] = $item;
            }
        }

        // Get meta data for result set
        for ($i = $offset - 1; $i < $results; $i++) {
            $mp3s['all'][$i] = MusicController::getMetaData($mp3s['all'][$i]);
            if ($mp3s['all'][$i]['uploaded'] == $mp3s['all'][0]['uploaded']) $mp3s[$mp3s['all'][0]['uploaded']][$i] = MusicController::getMetaData($mp3s['all'][$i]);
        }

        return $mp3s;
    }

}