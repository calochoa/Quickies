<?php
	
	include("../../standard/startSession.php");
	include("../../standard/functions.php");
	$memberName = getMemberName($member_id);
	$title = "Quickies";
	$css = "../../css";
	$images = "../../images";
	$format = "../../standard/format";
	include("$format/header.php");

	include("intro.php");
	include("quickEasy.php");
	include("bangBangBoogie.php");
	include("hipHopYouDontStop.php");
	include("pushUpOrShutUp.php");
	include("hardCore.php");
	include("sheBurns.php");
	include("tooEasy.php");
	include("notEasy.php");
	
	$sideBar = "none";
	include("$format/footer.php");
?>