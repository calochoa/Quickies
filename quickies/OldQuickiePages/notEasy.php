<tr>
  <td>
  <br/>
  <div class="tableBorder">
  <div class="tableTitle">NOT Easy</div>
  <table border="0" width="100%">
  <tr>
	<td align="left" valign="top" colspan="4">
	  <p class="newTop"><b>TOTAL BODY</b> (Note: s.a.p. = single arm push-ups, h.s.p. = hand stand push-ups, b. = burpee, s.l. = single leg)</p>
	</td>
  </tr>
  <tr>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Basic</b>
	  <?php 
		echo popUpLink("10", "singleArmPushUp", "s.a.p.");
	  	echo popUpLink("10", "handstandPushUp", "h.s.p.");
	  	echo popUpLink("10", "burpeePullUp", "b. pull-ups");
		echo popUpLink("10", "singleLegSquat", "s.l. squats");
	  ?>
	  </p>
	</td>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Like a Boss</b>
	  <?php 
		echo popUpLink("20", "singleArmPushUp", "s.a.p.");
	  	echo popUpLink("20", "handstandPushUp", "h.s.p.");
	  	echo popUpLink("20", "burpeePullUp", "b. pull-ups");
		echo popUpLink("20", "singleLegSquat", "s.l. squats");
	  ?>
	  </p>
	</td>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Like a BAMF</b>
	  <?php 
		echo popUpLink("40", "singleArmPushUp", "s.a.p.");
	  	echo popUpLink("40", "handstandPushUp", "h.s.p.");
	  	echo popUpLink("40", "burpeePullUp", "b. pull-ups");
		echo popUpLink("40", "singleLegSquat", "s.l. squats");
	  ?>
	  </p>
	</td>
	<td align="left" valign="top">
	  <p class="newBot">
	  <b>Advanced:</b> Ladder Style (ex: ladder 7)
	  <?php 
		echo popUpLink("7", "singleArmPushUp", "s.a.p.").popUpLink(", 7", "handstandPushUp", "h.s.p.").popUpLink(", 7", "burpeePullUp", "b. pull-ups").popUpLink(", 7", "singleLegSquat", "s.l. squat");
		echo popUpLink("6", "singleArmPushUp", "s.a.p.").popUpLink(", 6", "handstandPushUp", "h.s.p.").popUpLink(", 6", "burpeePullUp", "b. pull-ups").popUpLink(", 6", "singleLegSquat", "s.l. squat");
		echo "<br/><b>. . .</b>";
		echo popUpLink("1", "singleArmPushUp", "s.a.p.").popUpLink(", 1", "handstandPushUp", "h.s.p.").popUpLink(", 1", "burpeePullUp", "b. pull-up").popUpLink(", 1", "singleLegSquat", "s.l. squat");
	  ?>
	  </p>
	</td>
  </tr>
  </table>
  </div><!--end border-->
  </td>
</tr>