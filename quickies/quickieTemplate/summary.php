<div id="quickieSummary<?php echo $templateQuickieId; ?>" style="display:block; line-height:125%;">
	<table border="0" style="font-size:13px; width:100%;">
		<tr>
			<td style="width:25%; padding-right:10px;" valign="middle" align="center">
				<?php
					include("video.php");
				?>
			</td>
			<td style="width:45%; padding-left:5px; padding-right:10px;" valign="top">
				<table border="0" style="width:100%;">
					<tr>
						<td style="font-weight:bold; width:60%;">Muscle Group:</td>
						<td colspan="2"><?php echo $templateQuickieMuscleGroup; ?></td>
					</tr>
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
					<tr>
						<td style="font-weight:bold; width:30%;"># of Ratings/Reviews:</td>
						<td style="width:10%;" colspan="2"><?php echo $templateQuickieNumRatings; ?></td>
					</tr>
					<tr>
						<td style="font-weight:bold; width:30%;">Date Created:</td>
						<td style="width:10%;" colspan="2"><?php echo $templateQuickieDateCreated; ?></td>
					</tr>
					<tr>
						<td style="font-weight:bold; width:30%;"><?php if($templateQuickieCreator2 != null) { echo "Creators:"; } else { echo "Creator:"; }?></td>
						<td style="width:10%;" colspan="2"><?php echo getLinkTagToMemberProfile($templateQuickieCreator1); if($templateQuickieCreator2 != null) { echo" & ".getLinkTagToMemberProfile($templateQuickieCreator2);} ?></td>
					</tr>
				</table>
			</td>
			<td style="width:30%;" valign="top">
				<table border="0" style="width:100%;">
					<tr><td style="font-weight:bold; width:20%;" valign="top">Description:</td></tr>
					<tr><td><?php echo popUpLinkDescription($templateQuickieRep1, $templateQuickieEx1, $templateQuickieEx1pl); ?></td></tr>
					<tr><td><?php echo popUpLinkDescription($templateQuickieRep2, $templateQuickieEx2, $templateQuickieEx2pl); ?></td></tr>
					<tr><td><?php echo popUpLinkDescription($templateQuickieRep3, $templateQuickieEx3, $templateQuickieEx3pl); ?></td></tr>
					<tr><td><?php echo popUpLinkDescription($templateQuickieRep4, $templateQuickieEx4, $templateQuickieEx4pl); ?></td></tr>
				</table>
			</td>
		</tr>
	</table>
</div>