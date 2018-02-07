<tr>
  <td>
  <br/>
  <div class="tableBorder">
  <div class="tableTitle">Push-Up or Shut Up</div>
  <table border="0" width="100%">
  <tr>
	<td align="left" valign="top" colspan="4">
	  <p class="newTop"><b>TOTAL BODY</b></p>
	</td>
  </tr>
  <tr>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Basic</b>
	  <?php 
		echo popUpLink("30", "lunge", "lunges");
	  	echo popUpLink("30", "pushUp", "push-ups");
	  	echo popUpLink("30", "crunch", "crunches");
	  	echo popUpLink("10", "burpee", "burpees");
	  ?>
	  </p>
	</td>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Like a Boss</b>
	  <?php 
		echo popUpLink("60", "lunge", "lunges");
	  	echo popUpLink("60", "pushUp", "push-ups");
	  	echo popUpLink("60", "crunch", "crunches");
	  	echo popUpLink("20", "burpee", "burpees");
	  ?>
	  </p>
	</td>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Like a BAMF</b>
	  <?php 
		echo popUpLink("120", "lunge", "lunges");
	  	echo popUpLink("120", "pushUp", "push-ups");
	  	echo popUpLink("120", "crunch", "crunches");
	  	echo popUpLink("40", "burpee", "burpees");
	  ?>
	  </p>
	</td>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Advanced:</b> Ladder Style (ex: ladder 7)
	  <?php 
		echo popUpLink("7", "lunge", "lunges").popUpLink(", 7", "pushUp", "push-ups").popUpLink(", 7", "crunch", "crunches").popUpLink(", 7", "burpee", "burpees");
		echo popUpLink("6", "lunge", "lunges").popUpLink(", 6", "pushUp", "push-ups").popUpLink(", 6", "crunch", "crunches").popUpLink(", 6", "burpee", "burpees");
		echo "<br/><b>. . .</b>";
		echo popUpLink("1", "lunge", "lunge").popUpLink(", 1", "pushUp", "push-up").popUpLink(", 1", "crunch", "crunch").popUpLink(", 1", "burpee", "burpee");
	  ?>
	  </p>
	</td>
  </tr>
  </table>
  </div><!--end border-->
  </td>
</tr>