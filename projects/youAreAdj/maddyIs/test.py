'''

length = 8
first char must be P or Q

'''

myCode = 'Q1234567'

def checkCode(code):
	if (len(code) == 8) and (code[0] == 'P' or code[0] == 'Q'):
		return True
	return False

print(checkCode(myCode))