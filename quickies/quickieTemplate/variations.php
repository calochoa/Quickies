<div id="quickieVariations<?php echo $templateQuickieId; ?>" style="display:none; line-height:125%;">
	<table border="0" style="font-size:13px; width:100%;">
		<tr>
			<td style="width:20%; padding-left:20px; padding-right:10px; font-weight:bold;" valign="top">Original:</td>
			<td style="padding-right:30px;">
				<?php
					echo popUpLinkDescription($templateQuickieRep1, $templateQuickieEx1, $templateQuickieEx1pl).", ";
					echo popUpLinkDescription($templateQuickieRep2, $templateQuickieEx2, $templateQuickieEx2pl).", ";
					echo popUpLinkDescription($templateQuickieRep3, $templateQuickieEx3, $templateQuickieEx3pl).", ";
					echo popUpLinkDescription($templateQuickieRep4, $templateQuickieEx4, $templateQuickieEx4pl);
				?>
			</td>
		</tr>
		<tr>
			<td style="width:20%; padding-left:20px; padding-right:10px; font-weight:bold;" valign="top">Like A Boss:</td>
			<td style="padding-right:30px;">
				<?php
					echo popUpLinkDescription(getLikeABoss($templateQuickieRep1), $templateQuickieEx1, $templateQuickieEx1pl).", ";
					echo popUpLinkDescription(getLikeABoss($templateQuickieRep2), $templateQuickieEx2, $templateQuickieEx2pl).", ";
					echo popUpLinkDescription(getLikeABoss($templateQuickieRep3), $templateQuickieEx3, $templateQuickieEx3pl).", ";
					echo popUpLinkDescription(getLikeABoss($templateQuickieRep4), $templateQuickieEx4, $templateQuickieEx4pl);
				?>
			</td>
		</tr>
		<tr>
			<td style="width:20%; padding-left:20px; padding-right:10px; font-weight:bold;" valign="top">Like A BAMF:</td>
			<td style="padding-right:30px;">
				<?php
					echo popUpLinkDescription(getLikeABAMF($templateQuickieRep1), $templateQuickieEx1, $templateQuickieEx1pl).", ";
					echo popUpLinkDescription(getLikeABAMF($templateQuickieRep2), $templateQuickieEx2, $templateQuickieEx2pl).", ";
					echo popUpLinkDescription(getLikeABAMF($templateQuickieRep3), $templateQuickieEx3, $templateQuickieEx3pl).", ";
					echo popUpLinkDescription(getLikeABAMF($templateQuickieRep4), $templateQuickieEx4, $templateQuickieEx4pl);
				?>
			</td>
		</tr>
		<tr>
			<td style="width:20%; padding-left:20px; padding-right:10px;" valign="top">
				<span style="font-weight:bold">Ladder Style:</span><br/>(ex: ladder 7)
			</td>
			<td style="padding-right:30px;">
				<?php
					echo popUpLinkDescription("7", $templateQuickieEx1, $templateQuickieEx1pl).", ";
					echo popUpLinkDescription("7", $templateQuickieEx2, $templateQuickieEx2pl).", ";
					echo popUpLinkDescription("7", $templateQuickieEx3, $templateQuickieEx3pl).", ";
					echo popUpLinkDescription("7", $templateQuickieEx4, $templateQuickieEx4pl)."<br/>";
					echo popUpLinkDescription("6", $templateQuickieEx1, $templateQuickieEx1pl).", ";
					echo popUpLinkDescription("6", $templateQuickieEx2, $templateQuickieEx2pl).", ";
					echo popUpLinkDescription("6", $templateQuickieEx3, $templateQuickieEx3pl).", ";
					echo popUpLinkDescription("6", $templateQuickieEx4, $templateQuickieEx4pl)."<br/>. . . <br/>";
					echo popUpLinkDescription("1", $templateQuickieEx1, $templateQuickieEx1).", ";
					echo popUpLinkDescription("1", $templateQuickieEx2, $templateQuickieEx2).", ";
					echo popUpLinkDescription("1", $templateQuickieEx3, $templateQuickieEx3).", ";
					echo popUpLinkDescription("1", $templateQuickieEx4, $templateQuickieEx4)."<br/>";
				?>
			</td>
		</tr>
	</table>
</div>
