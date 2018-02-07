<?php
	
	include("../../standard/startSession.php");
	include("../../standard/functions.php");
	$memberName = getMemberName($member_id);
	$title = "Junior Quickies";
	$css = "../../css";
	$images = "../../images";
	$format = "../../standard/format";
	include("$format/header.php");
	
	$arrDifficultyScales = getDifficultyScales();
	$arrEffectivenessScales = getEffectivenessScales();
	$startScale = 1;
	$endScale = 5;
	$maxNumRatingsToShow = 5;
	$sortType = $_GET['sort'];
	
	$arrAllQuickiesInfo = getAllQuickiesInfoByType("junior");
	include("intro.php");
	include("../showQuickies.php");

	$sideBar = "none";
	include("$format/footer.php");
?>