import React, {useState} from 'react'
import Webcam from 'react-webcam'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const ProductImageCapture = () => {
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [capturedImages, setCapturedImages] = useState([])
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [consentVisible, setConsentVisible] = useState(false)

  const webcamRef = React.useRef(null)
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  const handleConsent = () => {
    setConsentVisible(false)
    setCameraEnabled(true)
  }

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setCapturedImages((prev) => [...prev, imageSrc])
    }
  }

  const deleteImage = (index) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const retakeImages = () => {
    setCapturedImages([])
  }

  const handleProcessImages = () => {
    setConfirmationVisible(true)
  }

  const confirmProcess = () => {
    console.log('Processing images:', capturedImages)
    setConfirmationVisible(false)
  }

  const cancelProcess = () => {
    setCapturedImages([])
    setConfirmationVisible(false)
  }

  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          p: 3,
          backgroundColor: '#0d47a1',
          color: '#fff',
        }}
      >
        <Typography variant="h4">
          Welcome to Capital One Product Processing
        </Typography>
        <Typography variant="subtitle1">
          A seamless experience for capturing and processing product images.
        </Typography>
      </Box>

      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Upload Product Images
        </Typography>

        <Dialog open={consentVisible}>
          <DialogTitle>Camera Access</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This application requires access to your camera to capture product
              images. Do you consent to enabling the camera?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConsentVisible(false)} color="error">
              Deny
            </Button>
            <Button onClick={handleConsent} color="primary">
              Allow
            </Button>
          </DialogActions>
        </Dialog>

        {!cameraEnabled && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setConsentVisible(true)}
          >
            Click here to upload the product image
          </Button>
        )}

        {cameraEnabled && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              border: '25px solid #ccc',
              borderRadius: 2,
              overflow: 'hidden',
              '@media (max-width: 600px)': {
                maxWidth: '100%',
              },
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              style={{width: '100%', maxWidth: '500px'}}
            />
          </Box>
        )}

        {cameraEnabled && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={captureImage}
              disabled={!cameraEnabled || capturedImages.length >= 5}
            >
              Capture Image
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={retakeImages}
              disabled={capturedImages.length === 0}
            >
              Retake Images
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProcessImages}
              disabled={capturedImages.length < 2}
            >
              Process Images
            </Button>
          </Box>
        )}

        {cameraEnabled && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Captured Images
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 2,
              }}
            >
              {capturedImages.map((image, index) => (
                <Box key={index} sx={{position: 'relative'}}>
                  <img
                    src={image}
                    alt={`Captured ${index + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => deleteImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Dialog
          open={confirmationVisible}
          onClose={() => setConfirmationVisible(false)}
        >
          <DialogTitle>Confirm Process</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to process these images?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelProcess} color="error">
              Cancel
            </Button>
            <Button onClick={confirmProcess} color="primary">
              Yes, Process
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default ProductImageCapture
