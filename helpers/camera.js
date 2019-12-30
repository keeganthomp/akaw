import * as ImagePicker from 'expo-image-picker'

const askCameraPermisions = async () => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
  const { status } = cameraPermission
  return status
}

export const getCameraPermisions = async () => {
  const cameraPermission = await ImagePicker.getCameraPermissionsAsync()
  const { status: existingCameraPermissions } = cameraPermission
  if (existingCameraPermissions !== 'granted') {
    const permissionFromUser = await askCameraPermisions()
    return permissionFromUser
  } else {
    return existingCameraPermissions
  }
}

const askCameraRollPermisions = async () => {
  const cameraRollPermission = await ImagePicker.requestCameraRollPermissionsAsync()
  const { status } = cameraRollPermission
  return status
}

export const getCameraRollPermisions = async () => {
  const cameraRollPermission = await ImagePicker.getCameraRollPermissionsAsync()
  const { status: existingCameraRollPermissions } = cameraRollPermission
  if (existingCameraRollPermissions !== 'granted') {
    const permissionFromUser = await askCameraRollPermisions()
    return permissionFromUser
  } else {
    return existingCameraRollPermissions
  }
}

export const openImageSelector = async ({ callback }) => {
  const selectedImage = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  })
  const wasImageSelectCancelled = selectedImage.cancelled
  const imageName = selectedImage.uri.split('ImagePicker/')[1]
  if (!wasImageSelectCancelled) {
    callback({ image: selectedImage, imageName })
  }
}

export const openCamera = async ({ callback }) => {
  const selectedImage = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  })
  const wasImageSelectCancelled = selectedImage.cancelled
  if (!wasImageSelectCancelled) {
    callback({ image: selectedImage })
  }
}
