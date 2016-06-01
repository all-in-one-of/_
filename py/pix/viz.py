from scipy import misc
import matplotlib.pyplot as plt
# face = misc.face()
# print(face)
# misc.imsave('face.png', face)
face = misc.imread('face.png')

#face = face[:,:,0]

#plt.imshow(face)
plt.imshow(face[320:340, 510:530], )
#interpolation='nearest'  
plt.show()

#print(face)