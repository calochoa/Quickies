<div id="quickieRating<?php echo $templateQuickieId; ?>" style="display:none; line-height:125%;">
	<span style="padding-left:20px; font-size:13px; font-weight:bold; color:#1F497D;">Summary</span>
	<table border="0" style="font-size:13px; width:100%;">
		<tr>
			<td style="width:50%; padding-left:20px; padding-right:20px;" valign="top">
				<table border="0" style="width:100%;">
					<tr>
						<td style="font-weight:bold; width:60%;">Difficulty Rating:</td>
						<td style="width:10%;"><?php echo $templateQuickieDifficultyRating; ?></td>
						<td>(<?php echo $templateQuickieDifficultyScale; ?>)</td>
					</tr>
					<tr>
						<td style="font-weight:bold; width:60%;">Effectiveness Rating:</td>
						<td style="width:10%;"><?php echo $templateQuickieEffectivenessRating; ?></td>
						<td>(<?php echo $templateQuickieEffectivenessScale; ?>)</td>
					</tr>
				</table>
			</td>
			<td style="width:50%; padding-left:20px; padding-right:20px;" valign="top">
				<table border="0" style="width:100%;">
					<tr>
						<td style="font-weight:bold; width:60%;"># of Ratings/Reviews:</td>
						<td style="width:40%;" colspan="2"><?php echo $templateQuickieNumRatings; ?></td>
					</tr>
					<tr>
						<td colspan="2">
							<div id="rateQuickieButton<?php echo $templateQuickieId; ?>">
								<input type="button" value="Rate <?php echo $templateQuickieName; ?>" onclick="<?php
									if (empty($member_id)) {
										echo "document.location.href='http://www.calworkouts.com/login.php?rtl=11&ptr=quickies'";
									} else {
										echo "showstuff('quickieUserReview$templateQuickieId'); hidestuff('rateQuickieButton$templateQuickieId');";
									}
								?>"/>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<br/>
	<?php 
		include("userReview.php");
		include("reviews.php"); 
	?>
</div>