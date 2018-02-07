<div>
	<span style="text-align:right; font-size:12px; float:left;">
	<br/>
	<span style="font-weight:bold;">Sort by: </span>
	<?php
		if ($sortType == 1) {
			echo "<span style=\"font-weight:bold;\">easiest</span> | <a href=\"?sort=2\">hardest</a> | <a href=\"?sort=3\">most effective</a> | <a href=\"?sort=4\"># ratings</a> | <a href=\"?sort=5\">name</a> | <a href=\"?sort=0\">latest</a>";
		} elseif ($sortType == 2) {
			echo "<a href=\"?sort=1\">easiest</a> | <span style=\"font-weight:bold;\">hardest</span> | <a href=\"?sort=3\">most effective</a> | <a href=\"?sort=4\"># ratings</a> | <a href=\"?sort=5\">name</a> | <a href=\"?sort=0\">latest</a>";
		} elseif ($sortType == 3) {
			echo "<a href=\"?sort=1\">easiest</a> | <a href=\"?sort=2\">hardest</a> | <span style=\"font-weight:bold;\">most effective</span> | <a href=\"?sort=4\"># ratings</a> | <a href=\"?sort=5\">name</a> | <a href=\"?sort=0\">latest</a>";
		} elseif ($sortType == 4) {
			echo "<a href=\"?sort=1\">easiest</a> | <a href=\"?sort=2\">hardest</a> | <a href=\"?sort=3\">most effective</a> | <span style=\"font-weight:bold;\"># ratings</span> | <a href=\"?sort=5\">name</a> | <a href=\"?sort=0\">latest</a>";
		}	elseif ($sortType == 5) {
			echo "<a href=\"?sort=1\">easiest</a> | <a href=\"?sort=2\">hardest</a> | <a href=\"?sort=3\">most effective</a> | <a href=\"?sort=4\"># ratings</a> | <span style=\"font-weight:bold;\">name</span> | <a href=\"?sort=0\">latest</a>";
		} else {
			echo "<a href=\"?sort=1\">easiest</a> | <a href=\"?sort=2\">hardest</a> | <a href=\"?sort=3\">most effective</a> | <a href=\"?sort=4\"># ratings</a> | <a href=\"?sort=5\">name</a> | <span style=\"font-weight:bold;\">latest</span>";
		}
		$count = max(array_keys($arrAllQuickiesInfo))+1;
	?>
	</span>
	<span style="text-align:left; font-size:12px; float:right;">
	<span style="font-weight:bold;">Display by Muscle Group: </span>
	<br/>
	<input type="radio" name="muscleGroup" value="all" checked="checked" onClick="showAllQuickies('Total Body', 'Upper Body', 'Lower Body', 'Core', <?php echo $count ?>);" /> All&nbsp;&nbsp;&nbsp;
	<input type="radio" name="muscleGroup" value="total" onClick="showQuickiesMuscleGroup('Total Body', 'Upper Body', 'Lower Body', 'Core', <?php echo $count ?>);" /> Total Body&nbsp;&nbsp;&nbsp;
	<input type="radio" name="muscleGroup" value="lower" onClick="showQuickiesMuscleGroup('Lower Body', 'Total Body', 'Upper Body', 'Core', <?php echo $count ?>);" /> Lower Body&nbsp;&nbsp;&nbsp;
	<input type="radio" name="muscleGroup" value="upper" onClick="showQuickiesMuscleGroup('Upper Body', 'Total Body', 'Lower Body', 'Core', <?php echo $count ?>);" /> Upper Body&nbsp;&nbsp;&nbsp;
	<input type="radio" name="muscleGroup" value="core" onClick="showQuickiesMuscleGroup('Core', 'Total Body', 'Lower Body', 'Upper Body', <?php echo $count ?>);" /> Core&nbsp;&nbsp;&nbsp;		
	</span>
</div>