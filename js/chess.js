$(function(){
	var colunas = {};
	colunas[0] = 'a';
	colunas[1] = 'b';
	colunas[2] = 'c';
	colunas[3] = 'd';
	colunas[4] = 'e';
	colunas[5] = 'f';
	colunas[6] = 'g';
	colunas[7] = 'h';
	var mate = false;
	var movesKings = {'black':{}, 'white': {}};
	var movesPecaCheck = {};
	var checking = false;
	var checkLonge = false;

	var jogador = 'white';
	var vezdo = 'white';

	var clicou = 0;
	var pecaEscolhida = '';
	var ultimaCasaEscolhida = '';

	$('#aplicarFen').on('click', function(){
		var fenString = $('#fenStr').val();
		if(fenString == ''){
			alert('informe uma strin fen');
		}else{
			parseFen(fenString);
		}
	});

	$('body').on('click', '.piece', function(){
		var classe = $(this).attr('class');
		var casa = $(this).parent();
		var casaId = casa.attr('id');

		if(vezdo == jogador){
			if(classe.indexOf(jogador) >= 0){
				clicou = 1;
				ultimaCasaEscolhida = casaId;
				pecaEscolhida = $(this);
				$('.square-board').removeClass('possible');
			}
		}
	});

	var vai_para = '';
	$('body').on('click', '.square-board', function(){
		var temPeca = $(this).find('.piece').size();
		var idCasa = $(this).attr('id');
		//verifyPiece(pecaEscolhida, ultimaCasaEscolhida);

		var movimentosPossiveis = verifyPiece(pecaEscolhida, ultimaCasaEscolhida);
		$.each(movimentosPossiveis, function(i, sqr){
			$('#'+sqr).addClass('possible');
		});


		if(idCasa != ultimaCasaEscolhida){
			vai_para = idCasa;

			if(objSearch(movimentosPossiveis, idCasa) != null){
				if(mate == false){
					//jogar($(this));
					alert('Pode jogar');
				}else{
					alert('Check mate');
				}

				//engine(vezdo, checking);
			}else{
				alert('Jogada é invalida');
			}
		}
	});

	var fenStr = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w';
	function parseFen(fen){
		$('.square-board').html('');
		var linha = 8;
		var empty = '';
		var piece = '';
		var col = 0;
		var space = 0;

		for(var i = 0; i<fen.length; ++i){

			if(space == 0){
				switch(fen[i]){
					case 'r': piece = 'piece rook-black'; break;
					case 'R': piece = 'piece rook-white'; break;
					case 'b': piece = 'piece bishop-black'; break;
					case 'B': piece = 'piece bishop-white'; break;
					case 'n': piece = 'piece knight-black'; break;
					case 'N': piece = 'piece knight-white'; break;
					case 'q': piece = 'piece queen-black'; break;
					case 'Q': piece = 'piece queen-white'; break;
					case 'k': piece = 'piece king-black'; break;
					case 'K': piece = 'piece king-white'; break;
					case 'p': piece = 'piece pawn-black'; break;
					case 'P': piece = 'piece pawn-white'; break;

					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
					case '6':
					case '7':
					case '8':
						empty = fen[i];
						break;

					case '/':
						linha--;
					break;
				}
			}

			if(fen[i] == ' '){
				space = 1;
			}
			if(empty != ''){
				for(var n = 0; n<Number(empty); n++){
					col++;
				}
				empty = '';
			}

			if(piece != ''){
				$('#'+colunas[col]+linha).html('<div class="'+piece+'"></div>');
				col++;
				piece = '';
			}

			if(col > 7){
				col =0;
			}

			if(i == (fen.length-1) && fen[i] == 'w'){
				vezdo = 'white';
				jogador = 'white';
			}else if(i == (fen.length-1) && fen[i] == 'b'){
				vezdo = 'black';
				jogador = 'black';
			}
		}
	}

	function verifyPiece(piece, square){
		var tipo = piece.attr('class');
		var possibleMoves = {};

		if(tipo == 'piece pawn-black'){
			possibleMoves = findMovesPawn(square, 'black');
		}else if(tipo == 'piece pawn-white'){
			possibleMoves = findMovesPawn(square, 'white');
		}


		if(tipo.indexOf('bishop') >= 0){
			possibleMoves = findMovesBishop(square, tipo);
		}else if(tipo.indexOf('knight') >= 0){
			possibleMoves = findMovesKnight(square, tipo);
		}else if(tipo.indexOf('rook') >= 0){
			possibleMoves = findMovesRook(square, tipo);
		}else if(tipo.indexOf('queen') >= 0){
			possibleMoves = findMovesQueen(square, tipo);
		}
		return possibleMoves;
	}

	function findMovesQueen(square, tipo){
		var x = 0;
		var moves = {};
		var movesHook = findMovesRook(square, tipo);

		$.each(movesHook, function(i, val){
			x = i;
			moves[i] = val;
		});
		
		var movesBishop = findMovesBishop(square, tipo);
		$.each(movesBishop, function(i, val){
			x++;
			moves[x] = val;
		});
		return moves;
	}

	function findMovesRook(square, tipo){
		if(tipo.indexOf('black') >= 0){
			var typeAttack = 'white';
		}else{
			var typeAttack = 'black';
		}

		var line = Number(square[1]);
		var linha = line+1;
		var coluna = square[0];
		var nColuna = Number(objSearch(colunas, coluna));
		var x = 0;
		var moves = {};

		//para cima

		for(var i = 0; i < 7; i++){
			var casa = coluna+(linha++);
			if($('#'+casa).size() == 1){
				if($('#'+casa).find('.piece').size() == 1){
					var peca = $('#'+casa).find('.piece').attr('class');
					if(peca.indexOf(typeAttack) >= 0){
						x++;
						moves[x] = casa;
						break;
					}else{
						break;
					}
				}else{
					x++;
					moves[x] = casa;
				}
			}
		}
		//pra baixo
		linha = line-1;
		for(var i = 6; i >= 0; --i){
			var casa = coluna+(linha--);

			if($('#'+casa).size() == 1){
				if($('#'+casa).find('.piece').size() == 1){
					var peca = $('#'+casa).find('.piece').attr('class');
					if(peca.indexOf(typeAttack) >= 0){
						x++;
						moves[x] = casa;
						break;
					}else{
						break;
					}
				}else{
					x++;
					moves[x] = casa;
				}
			}
		}

		//para a direita
		var colAtual = nColuna+1;
		for(var i = 0; i < 7; i++){
			var proxima = colAtual++;
			if(objSearchIndex(colunas, proxima) != null){
				var casa = colunas[proxima]+line;
				if($('#'+casa).find('.piece').size() == 1){
					var peca = $('#'+casa).find('.piece').attr('class');
					if(peca.indexOf(typeAttack) >= 0){
						x++;
						moves[x] = casa;
						break;
					}else{
						break;
					}
				}else{
					x++;
					moves[x] = casa;
				}			
			}
		}

		//para a esquerda
		var colAtual = nColuna-1;
		for(var i = 0; i < 7; i++){
			var anterior = colAtual--;
			if(objSearchIndex(colunas, anterior) != null){
				var casa = colunas[anterior]+line;
				if($('#'+casa).find('.piece').size() == 1){
					var peca = $('#'+casa).find('.piece').attr('class');
					if(peca.indexOf(typeAttack) >= 0){
						x++;
						moves[x] = casa;
						break;
					}else{
						break;
					}
				}else{
					x++;
					moves[x] = casa;
				}			
			}
		}

		return moves;
	}

	function findMovesKnight(square, tipo){
		if(tipo.indexOf('black') >= 0){
			var typeAttack = 'white';
		}else{
			var typeAttack = 'black';
		}

		var line = Number(square[1]);
		var coluna = square[0];
		var x = 0;
		var moves = {};

		//pra cima
		//+2 linhas +1 coluna
		//+2 linhas -1 coluna

		//pra baixo
		//-2 linhas +1 coluna
		//-2 linhas -1 coluna

		//pra direita cima e baixo
		//+2 colunas +1 linha
		//+2 colunas -1 linha

		//esquerda
		//-2 colunas +1 linha
		//-2 colunas -1 linha

		var colAtual = Number(objSearch(colunas, coluna));
		var lineTop = line+2;
		var lineBottom = line-2;

		var colEsquerda = colAtual-1;
		var colDireita = colAtual+1;

		var lineTopo = line+1;
		var lineBaixo = line-1;

		var colRight = colAtual+2;
		var colLeft = colAtual-2;

		var squareTopRight = colunas[colDireita]+lineTop;
		var squareTopLeft = colunas[colEsquerda]+lineTop;

		if($('#'+squareTopRight).size()== 1){
			if($('#'+squareTopRight).find('.piece').size() == 1){
				var encontrada = $('#'+squareTopRight).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareTopRight;
				}
			}else{
				x++;
				moves[x] = squareTopRight
			}
		}

		if($('#'+squareTopLeft).size()== 1){
			if($('#'+squareTopLeft).find('.piece').size() == 1){
				var encontrada = $('#'+squareTopLeft).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareTopLeft;
				}
			}else{
				x++;
				moves[x] = squareTopLeft;
			}
		}
		var squareBottomRight = colunas[colDireita]+lineBottom;
		if($('#'+squareBottomRight).size()== 1){
			if($('#'+squareBottomRight).find('.piece').size() == 1){
				var encontrada = $('#'+squareBottomRight).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareBottomRight;
				}
			}else{
				x++;
				moves[x] = squareBottomRight;
			}
		}
		var squareBottomLeft = colunas[colEsquerda]+lineBottom;
		if($('#'+squareBottomLeft).size()== 1){
			if($('#'+squareBottomLeft).find('.piece').size() == 1){
				var encontrada = $('#'+squareBottomLeft).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareBottomLeft;
				}
			}else{
				x++;
				moves[x] = squareBottomLeft;
			}
		}

		var squareRightTop = colunas[colRight]+lineTopo;
		if($('#'+squareRightTop).size()== 1){
			if($('#'+squareRightTop).find('.piece').size() == 1){
				var encontrada = $('#'+squareRightTop).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareRightTop;
				}
			}else{
				x++;
				moves[x] = squareRightTop;
			}
		}
		var squareRightBottom = colunas[colRight]+lineBaixo;	
		if($('#'+squareRightBottom).size()== 1){
			if($('#'+squareRightBottom).find('.piece').size() == 1){
				var encontrada = $('#'+squareRightBottom).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareRightBottom;
				}
			}else{
				x++;
				moves[x] = squareRightBottom;
			}
		}
		var squareLeftTop = colunas[colLeft]+lineTopo;
		if($('#'+squareLeftTop).size()== 1){
			if($('#'+squareLeftTop).find('.piece').size() == 1){
				var encontrada = $('#'+squareLeftTop).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareLeftTop;
				}
			}else{
				x++;
				moves[x] = squareLeftTop;
			}
		}
		var squareLeftBottom = colunas[colLeft]+lineBaixo;
		if($('#'+squareLeftBottom).size()== 1){
			if($('#'+squareLeftBottom).find('.piece').size() == 1){
				var encontrada = $('#'+squareLeftBottom).find('.piece').attr('class');
				if(encontrada.indexOf(typeAttack) >= 0){
					x++;
					moves[x] = squareLeftBottom;
				}
			}else{
				x++;
				moves[x] = squareLeftBottom;
			}
		}
		return moves;
	}


	function findMovesBishop(square, tipo){
		if(tipo.indexOf('black') >= 0){
			var typeAttack = 'white';
		}else{
			var typeAttack = 'black';
		}

		var line = Number(square[1]);
		var linha = line+1;
		var coluna = square[0];
		var x = 0;
		var moves = {};

		var nColunaAtual = '';
		var colTopRight = '';

		//+1 coluna +1 linha pra cima e direita (top right)
		//-1 coluna -1 linha pra baixo esquerda (bottom left)
		//+1 coluna -1 linha pra baixo direita (bottom right)
		//-1 coluna +1 linha pra cima esquerda (top left)

		//subir direita (top right)

		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colTopRight = nColunaAtual++;
			}

			if(objSearchIndex(colunas, colTopRight) != null){
				if(colunas[colTopRight] != coluna){
					var lineTopRight = linha++;
					var casa = colunas[colTopRight]+lineTopRight;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colTopRight++;
			}			
		}

		//top left
		nColunaAtual = '';
		var colTopLeft = '';
		linha = line+1;
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colTopLeft = nColunaAtual-1;
			}
			if(objSearchIndex(colunas, colTopLeft) != null){
				if(colunas[colTopLeft] != coluna){
					var lineTopLeft = linha++;
					var casa = colunas[colTopLeft]+lineTopLeft;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colTopLeft--;
			}			
		}



		//bottom right
		nColunaAtual = '';
		linha = line+1;
		var lineDescer = line-1;
		var colBottomRight = '';
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colBottomRight = nColunaAtual++;
			}
			if(objSearchIndex(colunas, colBottomRight) != null){
				if(colunas[colBottomRight] != coluna){
					var lineBottomRight = lineDescer--;
					var casa = colunas[colBottomRight]+lineBottomRight;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colBottomRight++;
			}			
		}


		//bottom left
		nColunaAtual = '';
		linha = line+1;
		lineDescer = line-1;
		var colBottomLeft = '';
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colBottomLeft = nColunaAtual--;
			}
			if(objSearchIndex(colunas, colBottomLeft) != null){
				if(colunas[colBottomLeft] != coluna){
					var lineBottomLeft = lineDescer--;
					var casa = colunas[colBottomLeft]+lineBottomLeft;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colBottomLeft--;
			}			
		}
		return moves;
	}

	function findMovesPawn(square, type){

		var line = Number(square[1]);
		var column = square[0];
		var linha = line+1;
		var moves = {};
		var x = 0;

		var indiceColum = objSearch(colunas, column);
		var proxima = Number(indiceColum)+1;
		var anterior = Number(indiceColum)-1;

		if(type == 'white'){
			if(line == 2){
				//indo pra frente
				for(var i = 0; i <2; i++){
					var casa = $ ('#'+column+(linha++));
					if(casa.find('.piece').size() == 0){
						x++;
						moves[x] = casa.attr('id');
					}else{
						break;
					}
				}
			}else{
				//indo pra frente
				for(var i = 0; i<1; i++){
					var casa = $('#'+column+(linha++));
					if(casa.find('.piece').size() == 0){
						x++;
						moves[x] = casa.attr('id');
					}else{
						break;
					}
				}
			}

			//verifica duas diagonais
			var linhaDiagonal = line+1;
			if(objSearchIndex(colunas, proxima) != null){
				var coluna = colunas[proxima]+linhaDiagonal;
				//alert('encontrou '+coluna);
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('black') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}

			if(objSearchIndex(colunas, anterior) != null){
				var coluna = colunas[anterior]+linhaDiagonal;
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('black') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}
		}else{
			//movimentos peões pretos
			if(line == 7){
				//indo pra frente
				for(var i = 7; i>=5; --i){

					if(i != 7){
						var casa = $ ('#'+column+i);
						if(casa.find('.piece').size() == 0){
							x++;
							moves[x] = casa.attr('id');
						}else{
							break;
						}
					}
				}
			}else{
				//indo pra frente
				for(var i = line; i >= line-1; --i){
					if(i != line){
						var casa = $('#'+column+i);
						if(casa.find('.piece').size() == 0){
							x++;
							moves[x] = casa.attr('id');
						}else{
							break;
						}
					}
				}
			}

			//verifica duas diagonais
			var linhaDiagonal = line-1;
			if(objSearchIndex(colunas, proxima) != null){
				var coluna = colunas[proxima]+linhaDiagonal;
				//alert('encontrou '+coluna);
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('white') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}

			if(objSearchIndex(colunas, anterior) != null){
				var coluna = colunas[anterior]+linhaDiagonal;
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('white') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}
			//termina movimentos peões pretos
		}

		return moves;
	}
	function newGame(fenString){
		parseFen(fenString);
	}

	function printBoard(){
		var light = 1;
		var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		for(var l = 8; l>=1; --l){
			for(var c = 0; c < columns.length; ++c){
				var sq = columns[c]+l;
				var lightdark = (light == 1) ? 'light' : 'dark';
				$('.board').append('<div class="square-board '+lightdark+'" id="'+sq+'"></div>');
				light ^= 1;
			}
			light ^= 1;
		}
	}

	//printBoard();
	//newGame(fenStr);

	function objSearch(obj, valor){
		var retorno = null;
		$.each(obj, function(i, val){
			if(val == valor){
				retorno = i;
			}
		});

		return retorno;
	}

	function objSearchIndex(obj, index){
		var retorno = null;
		$.each(obj, function(i, val){
			if(i == index){
				retorno = i;
			}
		});

		return retorno;
	}
});