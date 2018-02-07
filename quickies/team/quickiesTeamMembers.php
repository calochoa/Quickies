<tr>
	<td>
<?php
	$allTeamQuickiesInfo = getAllTeamQuickiesInfo();
	$provisionalFlag = 0;
	$i = 0;
	foreach ($allTeamQuickiesInfo as $teamQuickiesMemberInfo) {
		$memberId = $teamQuickiesMemberInfo->getMemberId();
		if ($teamQuickiesMemberInfo->getQuickiesTeamId() > 100 && $provisionalFlag == 0) {
			$provisionalFlag = 1;
			echo "<div class=\"clearfix\"></div>";
			echo "<br/><span style='text-align:center;'><h1>Provisional Quickies Team Members</h1></span><hr/><br/>";
			echo "<p class='intro'>Join the Quickies Team for a workout on any Sunday at 9:30am at SCHS Track to inquire how to become a Quickies Team member.</p><br/>";
			$i = 15;
		}
		$memberName = getMemberFullName($memberId);
		$memberFirstName = getMemberName($memberId);
		
		$row = floor($i / 5);
		if ($row == 0) {
			$bottom = "235px;";
		} else if ($row == 1) {
			$bottom = "-5px;";
		} else if ($row == 2) {
			$bottom = "-245px;";
		} else {
			$bottom = "-595px;";
		}

		$column = $i++ % 5;
		if ($column == 0) {
			$horizontal = "left:100px;";
		} else if ($column == 1) {
			$horizontal = "left:250px;";
		} else if ($column == 2) {
			$horizontal = "left:400px;";
		} else if ($column == 3) {
			$horizontal = "left:575px;";
		} else if ($column == 4) {
			$horizontal = "left:auto;right:100px;";
		}
?>
		<div class="quickie-member" style="">
			<div style="float:left;margin:10px;text-align:center;font-size:10px; width:100">
				<img alt='<?php echo $memberName; ?>' src='<?php echo "$images/photos/quickiesTeamSmall/$memberId.jpg" ?>'/>
				<div style="font-weight:bold;margin:10px 0 5px 0;">
					<a href='<?php echo "http://www.calworkouts.com/members/profiles/$memberId.php" ?>'><?php echo $memberFirstName; ?></a>
				</div>
				<div><?php echo $teamQuickiesMemberInfo->getHeader(); ?></div>
			</div>
			<div class="quickie-member-profile" style="bottom:<?php echo $bottom.$horizontal; ?>">
				<h3>GENERAL</h3>
				<?php if ($teamQuickiesMemberInfo->getWeight() != "") { ?>
				<div style="float:left">
					<div class="row-value">
						<span class="sub-header">Name:</span>
						&nbsp;&nbsp;
						<?php echo $memberName; ?>
					</div>
					<div class="row-value">
						<span class="sub-header">DOB:</span>
						&nbsp;&nbsp;
						<?php echo $teamQuickiesMemberInfo->getDob(); ?>
					</div>
				</div>
				<div style="float:right">
					<div class="row-value">
						<span class="sub-header">Weight:</span>
						&nbsp;&nbsp;
						<?php echo $teamQuickiesMemberInfo->getWeight(); ?>
					</div>
					<div class="row-value">
						<span class="sub-header">Height:</span>
						&nbsp;&nbsp;
						<?php echo $teamQuickiesMemberInfo->getHeight(); ?>
					</div>
				</div>		
				<?php } else { ?>
				<div class="row-value">
					<span class="sub-header">Name:</span>
					&nbsp;&nbsp;
					<?php echo $memberName; ?>
				</div>
				<div style="float:left">
					<div class="row-value">
						<span class="sub-header">DOB:</span>
						&nbsp;&nbsp;
						<?php echo $teamQuickiesMemberInfo->getDob(); ?>
					</div>
				</div>
				<div style="float:right">
					<div class="row-value">
						<span class="sub-header">Height:</span>
						&nbsp;&nbsp;
						<?php echo $teamQuickiesMemberInfo->getHeight(); ?>
					</div>
				</div>
				<?php } ?>
				<div class="clearfix"></div>
				<h4>Date &amp; Reason Joined:</h4>
				<div><?php echo $teamQuickiesMemberInfo->getDateJoined()." - ".$teamQuickiesMemberInfo->getReasonJoined(); ?></div>
				<h3>GOALS &amp; ACHIEVEMENTS</h3>
				<h4>Current Goal:</h4>
				<div><?php echo $teamQuickiesMemberInfo->getCurrentGoal(); ?></div>
				<h4>Ultimate Goal:</h4>
				<div><?php echo $teamQuickiesMemberInfo->getUltimateGoal(); ?></div>
				<h4>Proudest Achievement:</h4>
				<div><?php echo $teamQuickiesMemberInfo->getProudestAchievement(); ?></div>
				<h3>FAVORITES</h3>
				<div class="row-value">
					<span class="sub-header">Favorite Quickie:</span>
					&nbsp;&nbsp;
					<?php echo $teamQuickiesMemberInfo->getFavoriteQuickie(); ?>
				</div>
				<div class="row-value">
					<span class="sub-header">Favorite Muscle:</span>
					&nbsp;&nbsp;
					<?php echo $teamQuickiesMemberInfo->getFavoriteMuscle(); ?>
				</div>
				<div class="row-value">
					<span class="sub-header">Favorite Exercise:</span>
					&nbsp;&nbsp;
					<?php echo $teamQuickiesMemberInfo->getFavoriteExercise(); ?>
				</div>
			</div>
		</div>
<?php } ?>
	</td>
</tr>