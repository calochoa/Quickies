<tr>
	<td>
		<?php
			$arrRejectQuickiesInfo = getAllRejectQuickiesInfo();
			if (is_array($arrRejectQuickiesInfo)) {
				foreach ($arrRejectQuickiesInfo as $rejectQuickiesInfo) {
		?>
					<br/>
					<div class="tableBorder">
						<div class="tableTitle"><?php echo $rejectQuickiesInfo->getBetaQuickieName() ?></div>
						<table border="0" style="font-size:13px; width:100%;">
							<tr>
								<td style="width:60%; padding-left:20px; padding-right:20px;" valign="top">
									<table border="0" style="width:100%;">
										<tr>
											<td style="font-weight:bold; width:30%;">Created by:</td>
											<td><?php echo getLinkTagToMemberProfile($rejectQuickiesInfo->getCreator()); ?></td>
										</tr>
										<tr>
											<td style="font-weight:bold; width:30%;">Date Created:</td>
											<td><?php echo $rejectQuickiesInfo->getDateCreated(); ?></td>
										</tr>
										<tr>
											<td style="font-weight:bold; width:30%;">Muscle Group:</td>
											<td><?php echo $rejectQuickiesInfo->getMuscleGroup(); ?></td>
										</tr>
										<tr>
											<td style="font-weight:bold; width:30%; vertical-align:top;">Description:</td>
											<td><?php echo $rejectQuickiesInfo->getDescription(); ?></td>
										</tr>
									</table>
								</td>
								<td style="width:40%; padding-left:20px; padding-right:20px;" valign="top">
									<table border="0" style="width:100%;">
										<tr><td style="font-weight:bold;">Repetitions &amp; Exercises:</td></tr>
										<tr><td>- <?php echo $rejectQuickiesInfo->getReps1()." ".$rejectQuickiesInfo->getExercise1(); ?></td></tr>
										<tr><td>- <?php echo $rejectQuickiesInfo->getReps2()." ".$rejectQuickiesInfo->getExercise2(); ?></td></tr>
										<tr><td>- <?php echo $rejectQuickiesInfo->getReps3()." ".$rejectQuickiesInfo->getExercise3(); ?></td></tr>
										<tr><td>- <?php echo $rejectQuickiesInfo->getReps4()." ".$rejectQuickiesInfo->getExercise4(); ?></td></tr>
									</table>
								</td>
							</tr>
						</table>
					</div><!--end border-->
		<?php
				}
			} else {
				echo "<span style='font-size:13px; font-weight:bold;'>No rejects yet</span>";
			}
		?>
	</td>
</tr>