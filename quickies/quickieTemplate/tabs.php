<?php
	$quickieSummaryTabSelect = "quickieSummaryTabSelect$templateQuickieId";
	$quickieSummary = "quickieSummary$templateQuickieId";
	$quickieVariationsTabSelect = "quickieVariationsTabSelect$templateQuickieId";
	$quickieVariations = "quickieVariations$templateQuickieId";
	$quickieRatingsTabSelect = "quickieRatingsTabSelect$templateQuickieId";
	$quickieRating = "quickieRating$templateQuickieId";
	$quickieHistoryTabSelect = "quickieHistoryTabSelect$templateQuickieId";
	$quickieHistory = "quickieHistory$templateQuickieId";
?>

<div id="<?php echo $quickieSummaryTabSelect; ?>" style="display:block;">
	<table border="0" style="width:100%;">
		<tr class="QTbodySelect"><td class="quickiesTab">Summary</td></tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				showstuff('<?php echo $quickieVariationsTabSelect; ?>'); showstuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Variations</a>
			</td>
		</tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				showstuff('<?php echo $quickieRatingsTabSelect; ?>'); showstuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Ratings &amp; Reviews</a>
			</td>
		</tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				showstuff('<?php echo $quickieHistoryTabSelect; ?>'); showstuff('<?php echo $quickieHistory; ?>');">History</a>
			</td>
		</tr>
	</table>
</div>
<div id="<?php echo $quickieVariationsTabSelect; ?>" style="display:none;">
	<table border="0" style="width:100%;">
		<tr class="QTbody">		
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				showstuff('<?php echo $quickieSummaryTabSelect; ?>'); showstuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Summary</a>
			</td>
		</tr>
		<tr class="QTbodySelect"><td class="quickiesTab">Variations</td></tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				showstuff('<?php echo $quickieRatingsTabSelect; ?>'); showstuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Ratings &amp; Reviews</a>
			</td>
		</tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				showstuff('<?php echo $quickieHistoryTabSelect; ?>'); showstuff('<?php echo $quickieHistory; ?>');">History</a>
			</td>
		</tr>
	</table>
</div>
<div id="<?php echo $quickieRatingsTabSelect; ?>" style="display:none;">
	<table border="0" style="width:100%;">
		<tr class="QTbody">		
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				showstuff('<?php echo $quickieSummaryTabSelect; ?>'); showstuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Summary</a>
			</td>
		</tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				showstuff('<?php echo $quickieVariationsTabSelect; ?>'); showstuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Variations</a>
			</td>
		</tr>
		<tr class="QTbodySelect"><td class="quickiesTab">Ratings &amp; Reviews</td></tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				showstuff('<?php echo $quickieHistoryTabSelect; ?>'); showstuff('<?php echo $quickieHistory; ?>');">History</a>
			</td>
		</tr>
	</table>
</div>
<div id="<?php echo $quickieHistoryTabSelect; ?>" style="display:none;">
	<table border="0" style="width:100%;">
		<tr class="QTbody">		
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				showstuff('<?php echo $quickieSummaryTabSelect; ?>'); showstuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Summary</a>
			</td>
		</tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				showstuff('<?php echo $quickieVariationsTabSelect; ?>'); showstuff('<?php echo $quickieVariations; ?>');
				hidestuff('<?php echo $quickieRatingsTabSelect; ?>'); hidestuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Variations</a>
			</td>
		</tr>
		<tr class="QTbody">
			<td class="quickiesTab">
				<a class="QTbodyTitle" href="javascript:
				hidestuff('<?php echo $quickieSummaryTabSelect; ?>'); hidestuff('<?php echo $quickieSummary; ?>'); 
				hidestuff('<?php echo $quickieVariationsTabSelect; ?>'); hidestuff('<?php echo $quickieVariations; ?>');
				showstuff('<?php echo $quickieRatingsTabSelect; ?>'); showstuff('<?php echo $quickieRating; ?>');
				hidestuff('<?php echo $quickieHistoryTabSelect; ?>'); hidestuff('<?php echo $quickieHistory; ?>');">Ratings &amp; Reviews</a>
			</td>
		</tr>
		<tr class="QTbodySelect"><td class="quickiesTab">History</td></tr>
	</table>
</div>