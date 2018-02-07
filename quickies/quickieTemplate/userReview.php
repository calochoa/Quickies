<div id="quickieUserReview<?php echo $templateQuickieId; ?>" style="display:none; line-height:125%;">
	<span style="padding-left:20px; font-size:13px; font-weight:bold; color:#1F497D;">*My Rating &amp; Review</span>
	<form name="quickieRatingForm<?php echo $templateQuickieId; ?>" method="post" action="index.php">
		<table border="0" style="font-size:13px; width:100%;">
			<tr>
				<td style="width:25%; padding-left:20px; font-weight:bold;" valign="top">User Review:</td>
				<td style="width:75%; padding-right:20px;">
					<textarea rows="4" cols="50" name="userReview" onclick='checkForTextChange(document.quickieRatingForm<?php echo $templateQuickieId; ?>.userReview, "<?php echo $templateQuickieDefaultTextArea; ?>");'><?php echo $templateQuickieDefaultTextArea; ?></textarea>
				</td>
			</tr>
			<tr>
				<td style="width:25%; padding-left:20px; font-weight:bold;" valign="top">Difficulty Scale:</td>
				<td style="width:75%; padding-right:20px;">
					<table border="0" style="text-align:center; width:100%; font-size:12px;">
						<tr><?php for ($i = $startScale; $i <= $endScale; $i++) { echo "<td>".$arrDifficultyScales[$i]."</td>"; } ?></tr>
						<tr><?php for ($i = $startScale; $i <= $endScale; $i++) { $checked = $i == 3 ? " checked" : ""; echo "<td><input type='radio' name='difficulty' value='".$i."'".$checked."/></td>"; } ?></tr>
						<tr><?php for ($i = $startScale; $i <= $endScale; $i++) { echo "<td style='width:20%'>".$i."</td>"; } ?></tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="width:25%; padding-left:20px; font-weight:bold;" valign="top">Effectiveness Scale:</td>
				<td style="width:75%; padding-right:20px;">
					<table border="0" style="text-align:center; width:100%; font-size:12px;">
						<tr><?php for ($i = $startScale; $i <= $endScale; $i++) { echo "<td>".$arrEffectivenessScales[$i]."</td>"; } ?></tr>
						<tr><?php for ($i = $startScale; $i <= $endScale; $i++) { $checked = $i == 3 ? " checked" : ""; echo "<td><input type='radio' name='effectiveness' value='".$i."'".$checked."/></td>"; } ?></tr>
						<tr><?php for ($i = $startScale; $i <= $endScale; $i++) { echo "<td style='width:20%'>".$i."</td>"; } ?></tr>
					</table>
				</td>
			</tr>
		</table>
		<p style="padding-left:20px;" class="intro">*Note: if you have already submitted a rating, this one will overwrite your previous one.</p><br/>
		<div style="text-align:center;">
			<input type="submit" value="Submit Rating" name="submitQuickieRating<?php echo $templateQuickieId; ?>"/>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<input type="button" value="Cancel Rating" onclick="showstuff('rateQuickieButton<?php echo $templateQuickieId; ?>'); hidestuff('quickieUserReview<?php echo $templateQuickieId; ?>');"/>
		</div>
		<br/>
	</form>
</div>