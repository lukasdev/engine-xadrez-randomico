<!DOCTYPE HTML>
<html lang="pt-BR">
	<head>
		<meta charset=UTF-8>
		<title>Engine Xadrez Randômico</title>
		<link href="css/style.css" rel="stylesheet" type="text/css"/>
	</head>

	<body>
		<div class="box">
			<div class="board">
			<div class="square-board light" id="a8"><div class="piece rook-black"></div></div>
			<div class="square-board dark" id="b8"><div class="piece knight-black"></div></div>
			<div class="square-board light" id="c8"><div class="piece bishop-black"></div></div>
			<div class="square-board dark" id="d8"><div class="piece queen-black"></div></div>
			<div class="square-board light" id="e8"><div class="piece king-black"></div></div>
			<div class="square-board dark" id="f8"><div class="piece bishop-black"></div></div>
			<div class="square-board light" id="g8"></div>
			<div class="square-board dark" id="h8"><div class="piece rook-black"></div></div>

			<div class="square-board dark" id="a7"><div class="piece pawn-black"></div></div>
			<div class="square-board light" id="b7"><div class="piece pawn-black"></div></div>
			<div class="square-board dark" id="c7"><div class="piece pawn-black"></div></div>
			<div class="square-board light" id="d7"><div class="piece pawn-black"></div></div>
			<div class="square-board dark" id="e7"><div class="piece pawn-black"></div></div>
			<div class="square-board light" id="f7"></div>
			<div class="square-board dark" id="g7"><div class="piece pawn-black"></div></div>
			<div class="square-board light" id="h7"><div class="piece pawn-black"></div></div>

			<div class="square-board light" id="a6"></div>
			<div class="square-board dark" id="b6"></div>
			<div class="square-board light" id="c6"></div>
			<div class="square-board dark" id="d6"></div>
			<div class="square-board light" id="e6"></div>
			<div class="square-board dark" id="f6"></div>
			<div class="square-board light" id="g6"></div>
			<div class="square-board dark" id="h6"></div>
			<div class="square-board dark" id="a5"></div>
			<div class="square-board light" id="b5"></div>
			<div class="square-board dark" id="c5"></div>
			<div class="square-board light" id="d5"></div>
			<div class="square-board dark" id="e5"><div class="piece knight-white"></div></div>
			<div class="square-board light" id="f5"><div class="piece pawn-black"></div></div>
			<div class="square-board dark" id="g5"></div>
			<div class="square-board light" id="h5"></div>
			<div class="square-board light" id="a4"></div>
			<div class="square-board dark" id="b4"></div>
			<div class="square-board light" id="c4"></div>
			<div class="square-board dark" id="d4"></div>
			<div class="square-board light" id="e4"></div>
			<div class="square-board dark" id="f4"></div>
			<div class="square-board light" id="g4"></div>
			<div class="square-board dark" id="h4"></div>
			<div class="square-board dark" id="a3"></div>
			<div class="square-board light" id="b3"></div>
			<div class="square-board dark" id="c3"></div>
			<div class="square-board light" id="d3"></div>
			<div class="square-board dark" id="e3"></div>
			<div class="square-board light" id="f3"></div>
			<div class="square-board dark" id="g3"><div class="piece knight-black"></div></div>
			<div class="square-board light" id="h3"></div>

			<div class="square-board light" id="a2"><div class="piece pawn-white"></div></div>
			<div class="square-board dark" id="b2"><div class="piece pawn-white"></div></div>
			<div class="square-board light" id="c2"><div class="piece pawn-white"></div></div>
			<div class="square-board dark" id="d2"><div class="piece pawn-white"></div></div>
			<div class="square-board light" id="e2"><div class="piece pawn-white"></div></div>
			<div class="square-board dark" id="f2"><div class="piece pawn-white"></div></div>
			<div class="square-board light" id="g2"><div class="piece pawn-white"></div></div>
			<div class="square-board dark" id="h2"><div class="piece pawn-white"></div></div>

			<div class="square-board dark" id="a1"><div class="piece rook-white"></div></div>
			<div class="square-board light" id="b1"><div class="piece knight-white"></div></div>
			<div class="square-board dark" id="c1"><div class="piece bishop-white"></div></div>
			<div class="square-board light" id="d1"><div class="piece queen-white"></div></div>
			<div class="square-board dark" id="e1"><div class="piece king-white"></div></div>
			<div class="square-board light" id="f1"><div class="piece bishop-white"></div></div>
			<div class="square-board dark" id="g1"></div>
			<div class="square-board light" id="h1"><div class="piece rook-white"></div></div>
			</div>
			<div class="stats">
				<input type="text" name="fen" id="fenStr" placeholder="String Fen"/>
				<button id="aplicarFen">Aplicar</button>
				<div class="player"></div>
				<div class="notation"></div>
				<div class="player"></div>
			</div>
			<div style="clear:both;"></div>
		</div>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/chess.js"></script>
	</body>
</html>