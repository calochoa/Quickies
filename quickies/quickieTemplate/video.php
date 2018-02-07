<table border="0" style="font-size:10px;text-align:center;width:100%;">
<?php
	if ($templateQuickieVideoUrl != null) {
		echo "<tr><td><a class=\"fancybox-media\" href=\"http://www.youtube.com/watch?v=$templateYouTubeID\"><img src=\"http://img.youtube.com/vi/$templateYouTubeID/3.jpg\"/><br/>Play Video</a></td></tr>";
	} else {
		echo "<tr><td><img src=\"http://img.youtube.com/vi/3.jpg\"/><br/>Video coming soon</td></tr>";
	}
?>
</table>