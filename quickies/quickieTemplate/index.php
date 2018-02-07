<?php
	$templateQuickieId = $quickiesInfo->getQuickieId();
	$templateQuickieName = $quickiesInfo->getQuickieName();
	$templateQuickieMuscleGroup = $quickiesInfo->getMuscleGroup();
	$templateQuickieDateCreated = $quickiesInfo->getDateCreated();
	$templateQuickieCreator1 = $quickiesInfo->getCreator1();
	$templateQuickieCreator2 = $quickiesInfo->getCreator2();
	$templateQuickieEx1 = $quickiesInfo->getExercise1();
	$templateQuickieEx1pl = getPluralForm($templateQuickieEx1);
	$templateQuickieRep1 = $quickiesInfo->getReps1();
	$templateQuickieEx2 = $quickiesInfo->getExercise2();
	$templateQuickieEx2pl = getPluralForm($templateQuickieEx2);
	$templateQuickieRep2 = $quickiesInfo->getReps2();
	$templateQuickieEx3 = $quickiesInfo->getExercise3();
	$templateQuickieEx3pl = getPluralForm($templateQuickieEx3);
	$templateQuickieRep3 = $quickiesInfo->getReps3();
	$templateQuickieEx4 = $quickiesInfo->getExercise4();
	$templateQuickieEx4pl = getPluralForm($templateQuickieEx4);
	$templateQuickieRep4 = $quickiesInfo->getReps4();
	$templateQuickieVideoUrl = $quickiesInfo->getVideoUrl();
	$templateYouTubeID = substr($templateQuickieVideoUrl, strlen("http://www.youtube.com/embed/"));
	$templateYouTubeID = substr($templateYouTubeID, 0, strpos($templateYouTubeID, "?"));
	$templateQuickieHistory = $quickiesInfo->getHistory();
	$templateQuickieDefaultTextArea = $quickiesInfo->getDefaultReviewText();
	
	$templateQuickieUserReview = trim($_POST["userReview"]);
	$templateQuickieDifficultyRating = $_POST["difficulty"];
	$templateQuickieEffectivenessRating = $_POST["effectiveness"];
	if (isset($_POST["submitQuickieRating$templateQuickieId"])) {
		if (empty($templateQuickieUserReview) || strcmp($templateQuickieUserReview, $templateQuickieDefaultTextArea) == 0) {
			$templateQuickieUserReview = "N/A";
		}
		addQuickiesRatingReview($templateQuickieId, $member_id, $templateQuickieUserReview, $templateQuickieDifficultyRating, $templateQuickieEffectivenessRating);
	}

	$arrQuickieRatings = getQuickieRatings($templateQuickieId);
	$templateQuickieNumRatings = $arrQuickieRatings['numRatings'];
	$templateQuickieDifficultyRating = $arrQuickieRatings['difficultyRating'];
	$templateQuickieEffectivenessRating = $arrQuickieRatings['effectivenessRating'];
	$templateQuickieDifficultyScale = $arrQuickieRatings['difficultyScale'];
	$templateQuickieEffectivenessScale = $arrQuickieRatings['effectivenessScale'];
	$templateQuickieAllRatingsReviews = $arrQuickieRatings['allRatingsReviews'];
?>
<tr id="<?php echo "$templateQuickieMuscleGroup $templateQuickieId"; ?>" style="display:block;">
	<td style="width:800px;">
		<a name="1"></a><br/>
		<div class="tableBorder">
			<div class="tableTitle"><?php echo $templateQuickieName; ?></div>
			<table border="0" style="width:100%;">
				<tr>
					<td style="width:25%;" valign="top"><?php include("tabs.php"); ?></td>
					<td class="quickiesInfo" style="text-align: left; width:75%;" valign="top">
						<?php 
							include("summary.php"); 
							include("variations.php");
							include("rating.php");
							include("history.php");
						?>
					</td>
				</tr>
			</table>
		</div><!--end border-->
	</td>
</tr>