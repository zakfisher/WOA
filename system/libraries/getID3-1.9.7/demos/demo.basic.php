<?php
/////////////////////////////////////////////////////////////////
/// getID3() by James Heinrich <info@getid3.org>               //
//  available at http://getid3.sourceforge.net                 //
//            or http://www.getid3.org                         //
/////////////////////////////////////////////////////////////////
//                                                             //
// /demo/demo.basic.php - part of getID3()                     //
// Sample script showing most basic use of getID3()            //
// See readme.txt for more details                             //
//                                                            ///
/////////////////////////////////////////////////////////////////

//die('Due to a security issue, this demo has been disabled. It can be enabled by removing line '.__LINE__.' in '.$_SERVER['PHP_SELF']);


// include getID3() library (can be in a different directory if full path is specified)
require_once('../getid3/getid3.php');

// Initialize getID3 engine
$getID3 = new getID3;

// Analyze file and store returned data in $ThisFileInfo
$filename = $_SERVER['DOCUMENT_ROOT'] . '/_WOA/music/9.12.13/';
$filename .= 'Ferry_Corsten_-_Corstens_Countdown_324_-_11-09-2013-www.mixing.dj.mp3';
//print $_SERVER['DOCUMENT_ROOT'];
$ThisFileInfo = $getID3->analyze($filename);
/*
 Optional: copies data from all subarrays of [tags] into [comments] so
 metadata is all available in one location for all tag formats
 metainformation is always available under [tags] even if this is not called
*/
getid3_lib::CopyTagsToComments($ThisFileInfo);
/*
 Output desired information in whatever format you want
 Note: all entries in [comments] or [tags] are arrays of strings
 See structure.txt for information on what information is available where
 or check out the output of /demos/demo.browse.php for a particular file
 to see the full detail of what information is returned where in the array
 Note: all array keys may not always exist, you may want to check with isset()
 or empty() before deciding what to output
*/

echo $ThisFileInfo['comments_html']['artist'][0]; // artist from any/all available tag formats
print '<br/>';
echo $ThisFileInfo['tags']['id3v2']['title'][0];  // title from ID3v2
//print '<br/>';
//echo $ThisFileInfo['audio']['bitrate'];           // audio bitrate
print '<br/>';
echo 'duration: ' . $ThisFileInfo['playtime_string'];            // playtime in minutes:seconds, formatted string
print '<br/>';
echo 'seconds: ' . $ThisFileInfo['playtime_seconds'];            // playtime in seconds
print '<br/>';
print '<pre>';
print_r($ThisFileInfo);
print '</pre>';
/*
 if you want to see ALL the output, uncomment this line:
*/
//echo '<pre>'.htmlentities(print_r($ThisFileInfo, true)).'</pre>';
