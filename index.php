<!DOCTYPE HTML>
<html lang="pt-BR">
	<head>
		<meta charset=UTF-8>
		<title>Engine Xadrez Randômico</title>
		<link href="css/style.css" rel="stylesheet" type="text/css"/>
	</head>

	<body>
		<div class="box">
			<div class="board"></div>
			<div class="stats">
				<input type="text" name="fen" id="fenStr" placeholder="String Fen"/>
				<button id="aplicarFen">Aplicar</button>

				<div class="status">
					<div class="player"></div>
					<div class="notation">
						<table border="1" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td>#</td>
								<td>Brancas</td>
								<td>Pretas</td>
							</tr>

							<tbody id="jogadas">
							</tbody>
						</table>
					</div>
					<div class="player"></div>
				</div>
			</div>
			<div style="clear:both;"></div>
		</div>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/chess.js"></script>
	</body>
</html>