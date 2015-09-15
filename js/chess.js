$(function(){
	var initialPosition = {
		a8: 'rook-black',
		b8: 'knight-black',
		c8: 'bishop-black',
		d8: 'queen-black',
		e8: 'king-black',
		f8: 'bishop-black',
		g8: 'knight-black',
		h8: 'rook-black',

		a7: 'pawn-black',
		b7: 'pawn-black',
		c7: 'pawn-black',
		d7: 'pawn-black',
		e7: 'pawn-black',
		f7: 'pawn-black',
		g7: 'pawn-black',
		h7: 'pawn-black',

		a2: 'pawn-white',
		b2: 'pawn-white',
		c2: 'pawn-white',
		d2: 'pawn-white',
		e2: 'pawn-white',
		f2: 'pawn-white',
		g2: 'pawn-white',
		h2: 'pawn-white',

		a1: 'rook-white',
		b1: 'knight-white',
		c1: 'bishop-white',
		d1: 'queen-white',
		e1: 'king-white',
		f1: 'bishop-white',
		g1: 'knight-white',
		h1: 'rook-white'
	};


	function newGame(){
		$('.square-board').each(function(){
			var square = $(this);
			var sq = square.attr('id');

			if(objSearchIndex(initialPosition, sq) != null){
				//console.log('achou');
				$(this).html('<div class="piece '+initialPosition[sq]+'"></div>');
			}
		});
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

	printBoard();
	newGame();

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