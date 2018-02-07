<?php
	
	include("../../standard/startSession.php");
	include("../../standard/functions.php");
	$memberName = getMemberName($member_id);
	$title = "The Quickies Team";
	$css = "../../css";
	$images = "../../images";
	$format = "../../standard/format";
	include("$format/header.php");
	
	include("intro.php");
	include("quickiesTeamMembers.php");

	$sideBar = "none";
	include("$format/footer.php");
?>