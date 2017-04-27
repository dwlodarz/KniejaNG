<?php

class NewsItem { 
    public $id;
    public $subject;
    public $username;
    public $timestamp;
    public $readCount;
} 

// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}
require_once "maincore.php";

if (!isset($_GET['readmore']) || !isnum($_GET['readmore'])) {
	$rows = dbcount("(news_id)", DB_NEWS, groupaccess('news_visibility')." AND (news_start='0'||news_start<=".time().") AND (news_end='0'||news_end>=".time().") AND news_draft='0'");
	if (!isset($_GET['rowstart']) || !isnum($_GET['rowstart'])) { $_GET['rowstart'] = 0; }
	if ($rows) {
		$result = dbquery(
			"SELECT tn.*, tc.*, user_id, user_name FROM ".DB_NEWS." tn
			LEFT JOIN ".DB_USERS." tu ON tn.news_name=tu.user_id
			LEFT JOIN ".DB_NEWS_CATS." tc ON tn.news_cat=tc.news_cat_id
			WHERE ".groupaccess('news_visibility')." AND (news_start='0'||news_start<=".time().") AND (news_end='0'||news_end>=".time().") AND news_draft='0'
			ORDER BY news_sticky DESC, news_datestamp DESC LIMIT ".$_GET['rowstart']."20", 'utf-8'
		);
		$numrows = dbrows($result);
		if ($settings['news_style'] == "1") { $nrows = round((dbrows($result) - 1) / 2); }
        $resultJson = "[";
        $newsArray = array();

        $count = 0;
		while ($data = dbarray($result)) {
			$news_cat_image = "";
            $resultJson .="{\"id\":".$data['news_id'].", \"subject\":\"".stripslashes($data['news_subject'])."\", \"username\":\"".$data['user_name']."\", \"timestamp\": \"".$data['news_datestamp']."\", \"readCount\": ".$data['news_reads']."},";

            $newsItem = new NewsItem();
            $newsItem->id = iconv('ISO-8859-2', 'UTF-8//TRANSLIT',$data['news_id']);
            $newsItem->subject = iconv('ISO-8859-2', 'UTF-8//TRANSLIT',$data['news_subject']);
            $newsItem->username = iconv('ISO-8859-2', 'UTF-8//TRANSLIT',$data['user_name']);
            $newsItem->timestamp = iconv('ISO-8859-2', 'UTF-8//TRANSLIT',$data['news_datestamp']);
            $newsItem->readCount = iconv('ISO-8859-2', 'UTF-8//TRANSLIT',$data['news_reads']);
            array_push($newsArray, $newsItem);
        }

        $resultJson=rtrim($resultJson,",");
        $resultJson .= "]";
       echo json_encode($newsArray);
        //header('Content-type:application/json;charset=iso-8859-2');
header('Content-Type: application/json; charset=utf-8');
        
//echo $resultJson;
    }
}
			
?>
			