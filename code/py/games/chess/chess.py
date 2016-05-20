import numpy as np

class Move():
	#...

class Piece():
	team = None
	kind = None
	moves = []
	def __init__(self, team, kind, moves):
		self.team = team
		self.kind = kind
		self.moves = moves
 		prit('init piece:', team, kind)

class Pawn(Piece):
	moves = []
	def __init__(self, team):
		moves.append(Move([0, 1],['move'],'directional'))
		moves.append(Move([0, 2],['move'],'directional'))
		moves.append(Move([1, 1],['kill'],'directional'))
		moves.append(Move([-1, 1],['kill'],'directional'))
		#moves.append(Move([-1, 1],['kill', 'move'],'movekill'))
		super(Pawn, self).__init__(team, 'pawn', moves)

class King(Piece):
	moves = []
	def __init__(self, team):
		moves.append(Move([0, 1],['move', 'kill'],'directional'))
		moves.append(Move([1, 1],['move', 'kill'],'directional'))
		#moves.append(Move([0, 1],['move', 'kill'],'swap'))
		super(King, self).__init__(team, 'pawn', moves)

class Chess():
	board = np.array([
		[Piece('black', 'rook'), Piece('black', 'knight'], Piece('black', 'bishop'), Piece('black', 'king'), Piece('black', 'queen'), Piece('black', 'bishop'), Piece('black', 'knight'), Piece('black', 'rook')],
		[Piece('black', 'pawn'), Piece('black', 'pawn'), Piece('black', 'pawn'), Piece('black', 'pawn'), Piece('black', 'pawn'), Piece('black', 'pawn'), Piece('black', 'pawn'), Piece('black', 'pawn')],
		[None, None, None, None, None, None, None, None],
		[None, None, None, None, None, None, None, None],
		[None, None, None, None, None, None, None, None],
		[None, None, None, None, None, None, None, None],
		[Piece('white', 'pawn'), Piece('white', 'pawn'), Piece('white', 'pawn'), Piece('white', 'pawn'), Piece('white', 'pawn'), Piece('white', 'pawn'), Piece('white', 'pawn'), Piece('white', 'pawn')],
		[Piece('white', 'rook'), Piece('white', 'knight'), Piece('white', 'bishop'), Piece('white', 'king'), Piece('white', 'queen'), Piece('white', 'bishop'), Piece('white', 'knight'),  Piece('white', 'rook')]
	])
	def __init__(self):
		print('init chess:', 'board:', board)

if __init__ == '__main__':
	print('sss')
# class Pawn(Piece):
# 	def __init__(self):
# 		print('Init Pawn')