import re

opTarget = op('constant1')
blacklist = [op('/sys'), op('/ui'), op('/local')]
totalRefCount = 0

print(clear())
print('')
print('===== refScan =====')
if opTarget: print(opTarget.path)
print('')

def opScan(parent):
	for child in parent.children:
		if blacklisted(child): continue
		parScan(child)
		if child.children: opScan(child)

def parScan(node):
	global totalRefCount
	for par in node.pars():
		if par.isOP:
			selectScan(par, node)
			continue
		if par.isDefault:
			continue
		if par.mode == ParMode.EXPRESSION:
			result = re.finditer('op\([\'\"](.+?)[\'\"]\)', par.expr)
			hitCount = 0
			totalCount = 0
			while True:
				try:
					path = next(result).group(1)

					if targetPathCheck(path, node):
						hitCount += 1
					totalCount += 1
					totalRefCount += 1
				except StopIteration:
					break
			if hitCount > 0:
				refs = ''
				if hitCount == totalCount and totalCount > 1:
					refs = str(hitCount) + ' refs |'
				elif hitCount < totalCount:
					refs = str(hitCount) + '/' + str(totalCount) + ' refs |'
				print('| Ref |', node.path, '|', par.name, '|', par.expr, '|', refs)
			else:
				pass #print('|XXXXXX|', node.path, '|', par.name, '|', par.expr, '|')

def selectScan(par, node):
	opCheck = None
	if par.mode == ParMode.CONSTANT:
		opCheck = par.val
	elif par.mode == ParMode.EXPRESSION:
		opCheck = par.eval()
	if opCheck:
		if opTarget == opCheck:
			print('| Sel |', node.path, '|', par.name, '|')


def targetPathCheck(path, node):
	# Make Absolute: The path is local and needs to be made global
	opCheckMakeAbsolute = op(node.parent().path + '/' + path)
	opCheckIsAbsolute = op(path)
	if opCheckMakeAbsolute:
		if opTarget == opCheckMakeAbsolute:
			return True
	elif opCheckIsAbsolute:
		if opTarget == opCheckIsAbsolute:
			return True
	return False

def blacklisted(node):
	for black in blacklist:
		if node == black:
			return True
	return False

if opTarget:
	opScan(root)
else:
	print('Error: invalid target op')

print('')
if opTarget: print('total ref count:', totalRefCount)
print('===================')
print('')