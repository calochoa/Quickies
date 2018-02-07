<?php

	$arrQuickiesSort = array();
	if ($sortType == 1) {
		foreach ($arrAllQuickiesInfo as $quickiesInfo) {
			$quickieId = $quickiesInfo->getQuickieId();
			$arrQuickieRatings = getQuickieRatings($quickieId);
			$arrQuickiesSort[$quickieId] = $arrQuickieRatings['difficultyRating'];
		}
		asort($arrQuickiesSort);
	} elseif ($sortType == 2) {
		foreach ($arrAllQuickiesInfo as $quickiesInfo) {
			$quickieId = $quickiesInfo->getQuickieId();
			$arrQuickieRatings = getQuickieRatings($quickieId);
			$arrQuickiesSort[$quickieId] = $arrQuickieRatings['difficultyRating'];
		}
		arsort($arrQuickiesSort);
	} elseif ($sortType == 3) {
		foreach ($arrAllQuickiesInfo as $quickiesInfo) {
			$quickieId = $quickiesInfo->getQuickieId();
			$arrQuickieRatings = getQuickieRatings($quickieId);
			$arrQuickiesSort[$quickieId] = $arrQuickieRatings['effectivenessRating'];
		}
		arsort($arrQuickiesSort);
	} elseif ($sortType == 4) {
		foreach ($arrAllQuickiesInfo as $quickiesInfo) {
			$quickieId = $quickiesInfo->getQuickieId();
			$arrQuickieRatings = getQuickieRatings($quickieId);
			$arrQuickiesSort[$quickieId] = $arrQuickieRatings['numRatings'];
		}
		arsort($arrQuickiesSort);
	} elseif ($sortType == 5) {
		foreach ($arrAllQuickiesInfo as $quickiesInfo) {
			$quickieId = $quickiesInfo->getQuickieId();
			$arrQuickiesSort[$quickieId] = $quickiesInfo->getQuickieName();
		}
		asort($arrQuickiesSort);
	} else {
		foreach ($arrAllQuickiesInfo as $quickiesInfo) {
			$quickieId = $quickiesInfo->getQuickieId();
			$arrQuickiesSort[$quickieId] = $quickieId;
		}
		arsort($arrQuickiesSort);
	}
	foreach ($arrQuickiesSort as $key => $val) {
		$quickiesInfo = $arrAllQuickiesInfo[$key-1];
		include("quickieTemplate/index.php");
	}
	
?>