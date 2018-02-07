<?php
	$defaultDescr = "Go hard or go home!";
	if (isset($_POST['submitBetaQuickie'])) {
		if (session_is_registered("logged_in")) {
			$bqName = trim($_POST['bqName']);
			$mGroup = trim($_POST['mGroup']);
			$descr = trim($_POST['descr']);
			$reps1 = trim($_POST['reps1']);
			$exer1 = trim($_POST['exer1']);
			$reps2 = trim($_POST['reps2']);
			$exer2 = trim($_POST['exer2']);
			$reps3 = trim($_POST['reps3']);
			$exer3 = trim($_POST['exer3']);
			$reps4 = trim($_POST['reps4']);
			$exer4 = trim($_POST['exer4']);
			// verify all fields are provided
			if (!empty($bqName) && !empty($mGroup) && !empty($descr) && !empty($reps1) && !empty($exer1)
				&& !empty($reps2) && !empty($exer2) && !empty($reps3) && !empty($exer3) && !empty($reps4) && !empty($exer4)) {
					// verify all reps are numeric
					if (is_numeric($reps1) && is_numeric($reps2) && is_numeric($reps3) && is_numeric($reps4)) {
						// verify numbers are positive
						if ($reps1 > 0 && $reps2 > 0 && $reps3 > 0 && $reps4 > 0) {
							$newBetaQuickieInfo = new BetaQuickieInfo(0, $bqName, $member_id, 0, $descr, 
							$mGroup, 0, $exer1, $reps1, $exer2, $reps2, $exer3, $reps3, $exer4, $reps4);
							addBetaQuickie($newBetaQuickieInfo);
							$bqName = "";$mGroup = "";$descr = "";$reps1 = "";$exer1 = "";
							$reps2 = "";$exer2 = "";$reps3 = "";$exer3 = "";$reps4 = "";$exer4 = "";
							$message = "<b style='color:#1F497D;'>Your Beta Quickie has been added to the top of the list</b>";
						} else {
							$errorMessage = "Please verify that the reps are positive numbers.";
						}
					} else {
						$errorMessage = "Please verify that all reps are numeric.";
					}
			} else {
				$errorMessage = "Please verify all fields are provided.";
			}
		} else {
			$errorMessage = "Please login to create a Beta Quickie.";
	#			header( "Location: http://www.calworkouts.com/login.php" ); 
		}
		if (!empty($errorMessage)) {
			$errorMessage = "<b style='color:#FF0000;'>Error: $errorMessage</b>";
		}
	}
?>
<tr>
	<td>
		<div class="tableBorder">
			<div class="tableTitle">My Beta Quickie</div>
			<form name="betaQuickieForm" method="post" action="index.php">
			<table border="0" style="font-size:13px; width:100%; padding-left:20px; padding-right:20px; ">
			<tr>
				<td width="60%" valign="top">
					<table border="0" style="font-size:13px; width:100%;">
					<tr>
						<td style="width:60%; font-weight:bold;" align="left">Quickie Name:</td>
						<td style="width:40%; font-weight:bold;" align="left">Muscle Group:</td>
					</tr>
					<tr>
						<td align="left"><input type="text" name="bqName" maxlength="50" size="30" value="<?php if (isset($_POST["bqName"])) echo $bqName; ?>"/></td>
						<td align="left"><input type="text" name="mGroup" maxlength="50" size="15" value="<?php if (isset($_POST["mGroup"])) echo $mGroup; ?>"/></td>
					</tr>
					<tr><td style="font-weight:bold;" align="left"colspan=2>Description:</td></tr>
					<tr><td colspan=2><textarea rows="3" cols="45" name="descr" maxlength="500" onclick='checkForTextChange(document.betaQuickieForm.descr, "<?php echo $defaultDescr; ?>");'><?php if (isset($_POST["descr"])) { echo $descr; } else { echo $defaultDescr; }?></textarea></td></tr>
					</table>
				</td>
				<td width="40%" valign="top">
					<table border="0" style="font-size:13px; width:100%;">
					<tr>
						<td style="width:20%; font-weight:bold;" align="left">Reps:</td>
						<td style="width:80%; font-weight:bold;" align="left">Exercises:</td>
					</tr>
					<tr>
						<td><input type="text" name="reps1" maxlength="4" size="2" value="<?php if (isset($_POST["reps1"])) echo $reps1; ?>"/></td>
						<td><input type="text" name="exer1" maxlength="50" size="28" value="<?php if (isset($_POST["exer1"])) echo $exer1; ?>"/></td>
					</tr>
					<tr>
						<td><input type="text" name="reps2" maxlength="4" size="2" value="<?php if (isset($_POST["reps2"])) echo $reps2; ?>"/></td>
						<td><input type="text" name="exer2" maxlength="50" size="28" value="<?php if (isset($_POST["exer2"])) echo $exer2; ?>"/></td>
					</tr>
					<tr>
						<td><input type="text" name="reps3" maxlength="4" size="2" value="<?php if (isset($_POST["reps3"])) echo $reps3; ?>"/></td>
						<td><input type="text" name="exer3" maxlength="50" size="28" value="<?php if (isset($_POST["exer3"])) echo $exer3; ?>"/></td>
					</tr>
					<tr>
						<td><input type="text" name="reps4" maxlength="4" size="2" value="<?php if (isset($_POST["reps4"])) echo $reps4; ?>"/></td>
						<td><input type="text" name="exer4" maxlength="50" size="28" value="<?php if (isset($_POST["exer4"])) echo $exer4; ?>"/></td>
					</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan=2>
					<br/><p style="text-align:center; font-size:13px;">
					<div style="text-align:center;">
						<input type="submit" value="Create Beta Quickie" name="submitBetaQuickie"/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="reset" value="Start Over" onclick="hideError('errorMsg');hideError('msg');"/>
					</div>
					<br/>
					<div id="errorMsg" align="center"><?php echo $errorMessage; ?></div>
					<div id="msg" align="center"><?php echo $message; ?></div>
					</p>
				</td>
			</tr>
			</table>
			</form>
		</div>
	<td>
</tr>