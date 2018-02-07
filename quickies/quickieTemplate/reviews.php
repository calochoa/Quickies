<div style="padding-left:20px; font-size:13px; font-weight:bold; color:#1F497D;">
<?php
	if ($templateQuickieNumRatings > $maxNumRatingsToShow) {
		echo "<div id='showAllQuickieRatings$templateQuickieId' style='display:block;'>
			Displaying $maxNumRatingsToShow out of $templateQuickieNumRatings Ratings & Reviews - 
			<a href='javascript: showstuff(\"remainingQuickieRatings$templateQuickieId\"); showstuff(\"hideAllQuickieRatings$templateQuickieId\");
			hidestuff(\"showAllQuickieRatings$templateQuickieId\");'>Show all</a>
		</div>";
		
		echo"<div id='hideAllQuickieRatings$templateQuickieId' style='display:none;'>
			Displaying $templateQuickieNumRatings out of $templateQuickieNumRatings Ratings & Reviews - 
			<a href='javascript: hidestuff(\"remainingQuickieRatings$templateQuickieId\"); hidestuff(\"hideAllQuickieRatings$templateQuickieId\");
			showstuff(\"showAllQuickieRatings$templateQuickieId\");'>Show $maxNumRatingsToShow</a>
		</div>";
		
	} elseif ($templateQuickieNumRatings > 0) {
		echo "Displaying All Ratings & Reviews";
	} else {
		echo "There are currently no Ratings & Reviews for $templateQuickieName";
	}
?>
</div>
<?php
	$count = 0;
	foreach ($templateQuickieAllRatingsReviews as $templateQuickieRatingReview) {
		$author = $templateQuickieRatingReview->getAuthor();
		$linkToAuthorProfile = $templateQuickieRatingReview->getLinkToAuthorProfile();
		$dateTime = $templateQuickieRatingReview->getDateTime();
		$review = $templateQuickieRatingReview->getReview();
		$difficultyRating = $templateQuickieRatingReview->getDifficultyRating();
		$difficultyScale = $templateQuickieRatingReview->getDifficultyScale();
		$effectivenessRating = $templateQuickieRatingReview->getEffectivenessRating();
		$effectivenessScale = $templateQuickieRatingReview->getEffectivenessScale();
		if ($count++ == $maxNumRatingsToShow) {
			echo "<div id='remainingQuickieRatings$templateQuickieId' style='display:none;'>";
		}
		include("reviewTemplate.php");
	}
	if ($templateQuickieNumRatings > $maxNumRatingsToShow) {
		echo "</div>";
	}
?>