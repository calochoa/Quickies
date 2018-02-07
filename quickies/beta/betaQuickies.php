<tr>
	<td>
		<?php
			$arrBetaQuickiesInfo = getAllBetaQuickiesInfo();
			if (is_array($arrBetaQuickiesInfo)) {
				foreach ($arrBetaQuickiesInfo as $betaQuickiesInfo) {
		?>
					<br/>
					<div class="tableBorder">
						<div class="tableTitle"><?php echo $betaQuickiesInfo->getBetaQuickieName() ?></div>
						<table border="0" style="font-size:13px; width:100%;">
							<tr>
								<td style="width:60%; padding-left:20px; padding-right:20px;" valign="top">
									<table border="0" style="width:100%;">
										<tr>
											<td style="font-weight:bold; width:30%;">Created by:</td>
											<td><?php echo getLinkTagToMemberProfile($betaQuickiesInfo->getCreator()); ?></td>
										</tr>
										<tr>
											<td style="font-weight:bold; width:30%;">Date Created:</td>
											<td><?php echo $betaQuickiesInfo->getDateCreated(); ?></td>
										</tr>
										<tr>
											<td style="font-weight:bold; width:30%;">Muscle Group:</td>
											<td><?php echo $betaQuickiesInfo->getMuscleGroup(); ?></td>
										</tr>
										<tr>
											<td style="font-weight:bold; width:30%; vertical-align:top;">Description:</td>
											<td><?php echo $betaQuickiesInfo->getDescription(); ?></td>
										</tr>
									</table>
								</td>
								<td style="width:40%; padding-left:20px; padding-right:20px;" valign="top">
									<table border="0" style="width:100%;">
										<tr><td style="font-weight:bold;">Repetitions &amp; Exercises:</td></tr>
										<tr><td>- <?php echo $betaQuickiesInfo->getReps1()." ".$betaQuickiesInfo->getExercise1(); ?></td></tr>
										<tr><td>- <?php echo $betaQuickiesInfo->getReps2()." ".$betaQuickiesInfo->getExercise2(); ?></td></tr>
										<tr><td>- <?php echo $betaQuickiesInfo->getReps3()." ".$betaQuickiesInfo->getExercise3(); ?></td></tr>
										<tr><td>- <?php echo $betaQuickiesInfo->getReps4()." ".$betaQuickiesInfo->getExercise4(); ?></td></tr>
									</table>
								</td>
							</tr>
						</table>
					</div><!--end border-->
		<?php
				}
			} else {
				echo "<span style='font-size:13px; font-weight:bold;'>No betas yet</span>";
			}
		?>
	</td>
</tr>