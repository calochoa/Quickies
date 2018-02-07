<table border="0" style="font-size:13px; width:100%;">
	<tr><td style="padding-left:20px; padding-right:20px;" colspan="2"><hr/></td></tr>
	<tr>
		<td style="padding-left:20px;" colspan="2">by <a class="authorLinkSmall" href="<?php echo $linkToAuthorProfile; ?>"><?php echo $author; ?></a> &raquo; <?php echo $dateTime; ?></td>
	</tr>
	<tr>
		<td style="width:50%; padding-left:40px; padding-right:20px;" valign="top">
			<table border="0" style="width:100%;">
				<tr>
					<td style="font-weight:bold; width:50%;">Difficulty Rating:</td>
					<td style="width:10%;"><?php echo $difficultyRating; ?></td>
					<td>(<?php echo $difficultyScale; ?>)</td>
				</tr>
			</table>
		</td>
		<td style="width:50%; padding-left:20px; padding-right:20px;" valign="top">
			<table border="0" style="width:100%;">
				<tr>
					<td style="font-weight:bold; width:60%;">Effectiveness Rating:</td>
					<td style="width:10%;"><?php echo $effectivenessRating; ?></td>
					<td>(<?php echo $effectivenessScale; ?>)</td>
				</tr>
			</table>
		</td>
	</tr>
<?php
	if(strcmp($review, "N/A") != 0)
	{
?>
	<tr>
		<td style="padding-left:40px; padding-right:20px;" colspan="2" valign="top"><span style="font-weight:bold;">User Review: </span><?php echo $review; ?></td>
	</tr>
<?php
	}
?>
</table>