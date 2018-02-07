<?php
	
	include("../../standard/startSession.php");
	include("../../standard/functions.php");
	$memberName = getMemberName($member_id);
	$title = "Reject Quickies";
	$css = "../../css";
	$images = "../../images";
	$format = "../../standard/format";
	include("$format/header.php");
	
	include("intro.php");
	include("rejectQuickies.php");

	$sideBar = "quickies";
	include("$format/footer.php");
?>