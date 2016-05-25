class OnStart():
	
	def __init__(self):
		print('on start init')
		self.colors = ['red']
	
	def ShouldStart(self, COMP):
		return COMP.name.split('_')[1] in self.colors
	
	def Check(self):
		# buttons = ['red', 'green']
		box = ui.messageBox('color', 'select color', buttons=['no', 'yes'])
		if box:
			op('/project1/container_green').par.reinitnet.pulse()
		# buttonName = buttons[msgBoxIndex]
		# self.color = buttonName
