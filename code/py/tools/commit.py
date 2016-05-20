import sys
from sys import stdin
import os

typTags = {
	'ad': '[ADDS]',
	'cr': '[CREATES]',
	'ud': '[UPDATES]',
	'mv': '[MOVES]',
	'rm': '[REMOVES]',
	'rn': '[RENAMES]',
	'rs': '[RESTRUCTURES]',
}

argCount = len(sys.argv) - 1
if argCount == 0 or argCount > 2:
	print('[type] [message]')
else:

	arg1 = typ = sys.argv[1]
	if argCount > 1:
		arg2 = typ = sys.argv[2]

	if arg1 == '-h':
		print('''
-ad = [ADDS]
-cr = [CREATES]
-ud = [UPDATES]
-mv = [MOVES]
-rm = [REMOVES]
-rn = [RENAMES]
-rs = [RESTRUCTURES]
''')
	else:

		typ = None
		msg = None	
		if argCount == 1:
			if arg1.startswith('-'):
				typ = arg1[1:]
			else:
				msg = arg1
		elif argCount == 2:
			if arg1.startswith('-'):
				typ = arg1[1:]
			else:
				typ = arg1
			msg = arg2

		dr = os.path.abspath('.')

		if not typ:
			if msg:
				commit = dr + ' [] ' + msg
			else:
				commit = ''
		else:
			if typ in typTags:
				typTag = typTags[typ]
			else:
				customTypTag = '[' + typ.upper() + ']'
				print('tag "' + typ + '" not found, use "' + customTypTag + '"? y/n:')
				choice = input().lower()
				if choice == 'y':
					typTag = customTypTag
				else:
					typTag = '[]'
			commit = dr + ' ' + typTag
			if msg:
				commit += ' ' + msg

		os.system("git commit -m '" + commit + "'")