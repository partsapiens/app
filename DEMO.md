# How to Run the AI-Powered Yoga App Demo

This guide provides step-by-step instructions to run and experience the AI-Powered Yoga App demo.

## 🚀 Quick Overview

The AI-Powered Yoga App is an Android application that uses Google's ML Kit to detect yoga poses in real-time through your device's camera. It currently recognizes:
- **Mountain Pose** (Tadasana)
- **Downward Dog** (Adho Mukha Svanasana)  
- **Warrior I** (Virabhadrasana I)

## 📋 Prerequisites

Before you start, ensure you have:

### Quick Environment Check
Run our environment check script to verify your setup:
```bash
cd app
./check-environment.sh
```
This script will verify your Java, Android SDK, Gradle, and device connectivity.

### System Requirements
- **Android Studio** (Latest stable version recommended - Arctic Fox or newer)
- **Java Development Kit (JDK)** 8 or higher
- **Android SDK** with API level 24 (Android 7.0) or higher
- **Git** for cloning the repository

### Hardware Requirements
- **Android Device** with API level 24+ OR **Android Emulator**
- **Camera** - Physical device with rear camera (recommended for best experience)
- **Adequate processing power** for real-time ML inference

### Android Device Setup (Recommended)
- Android device running Android 7.0 (API 24) or higher
- USB cable for connecting to development machine
- **Developer Options** and **USB Debugging** enabled
  - Go to Settings → About Phone → Tap "Build Number" 7 times
  - Go to Settings → Developer Options → Enable "USB Debugging"

## 📱 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/partsapiens/app.git
cd app
```

### 2. Open in Android Studio
1. Launch Android Studio
2. Choose "Open an existing Android Studio project"
3. Navigate to the cloned `app` directory and select it
4. Click "OK" to open the project

### 3. Sync Project Dependencies
1. Android Studio will automatically prompt to sync the project
2. Click "Sync Now" when prompted
3. Wait for the sync to complete (this may take a few minutes on first run)
4. Ensure all dependencies are downloaded successfully

### 4. Prepare Your Device

#### Option A: Physical Android Device (Recommended)
1. Connect your Android device via USB cable
2. Ensure USB Debugging is enabled
3. When prompted on your device, allow USB debugging from your computer
4. Your device should appear in Android Studio's device selector

#### Option B: Android Emulator
1. In Android Studio, go to "Tools" → "AVD Manager"
2. Create a new Virtual Device if none exists:
   - Choose a device definition (e.g., Pixel 4)
   - Select a system image with API 24 or higher
   - Configure AVD settings and finish
3. Start the emulator
4. Wait for the emulator to fully boot

### 5. Build and Install the App
1. In Android Studio, click the "Run" button (green play icon) or press Shift+F10
2. Select your target device (physical device or emulator)
3. Click "OK" to build and install the app
4. Wait for the build process to complete

## 🎯 Using the Demo

### 1. Launch the App
- The app will automatically launch after installation
- You'll see the app icon "Yoga App" in your device's app drawer

### 2. Grant Camera Permission
- On first launch, the app will request camera permission
- **Tap "Allow"** to grant camera access
- This permission is essential for pose detection functionality

### 3. Position Yourself for Pose Detection
1. **Hold the device steady** with the camera facing you
2. **Stand 3-6 feet away** from the camera for optimal detection
3. **Ensure good lighting** - avoid backlighting or very dark environments
4. **Position your full body** within the camera frame
5. The camera preview will show in real-time

### 4. Perform Yoga Poses

#### Mountain Pose (Tadasana)
- Stand tall with feet together
- Arms at your sides
- Keep your body straight and aligned
- Look straight ahead

#### Downward Dog (Adho Mukha Svanasana)
- Start on hands and knees
- Tuck your toes under
- Lift your hips up and back
- Form an inverted "V" shape with your body
- Keep hands and feet firmly planted

#### Warrior I (Virabhadrasana I)
- Step one foot forward into a lunge position
- Keep your back leg straight
- Bend your front knee
- You can raise your arms overhead (optional)

### 5. View Real-time Feedback
- **Green status bar** appears at the bottom of the screen
- **Pose name** is displayed when detected (e.g., "Pose detected: Mountain Pose")
- **Confidence score** shows detection accuracy (e.g., "Confidence: 85.0%")
- **"No pose detected"** appears when no supported pose is recognized

## 🔧 Troubleshooting

### Build Issues
**Problem**: Gradle build fails or dependencies can't be resolved
**Solutions**:
- Ensure you have a stable internet connection
- Try "File" → "Sync Project with Gradle Files"
- Try "Build" → "Clean Project" then "Build" → "Rebuild Project"
- Check that Android SDK and build tools are properly installed

### Camera Issues
**Problem**: Camera not working or black screen
**Solutions**:
- Ensure camera permission is granted
- Try restarting the app
- Check if other apps can access the camera
- On emulator, ensure camera is enabled in AVD settings

### Pose Detection Issues
**Problem**: Poses not being detected
**Solutions**:
- Ensure adequate lighting
- Move to appropriate distance (3-6 feet from camera)
- Make sure your full body is visible in the frame
- Hold poses steadily for 2-3 seconds
- Try different angles or positions

### Performance Issues
**Problem**: App is slow or laggy
**Solutions**:
- Close other running apps to free up memory
- Try on a more powerful device
- Ensure device meets minimum requirements (API 24+)

### Installation Issues
**Problem**: App won't install on device
**Solutions**:
- Check device compatibility (Android 7.0+)
- Ensure USB debugging is enabled
- Try different USB cable or port
- Restart Android Studio and/or device

## 🎥 Expected Demo Experience

When running successfully, you should see:

1. **Real-time camera preview** filling most of the screen
2. **Green status bar** at the bottom with app title "AI Yoga Pose Detection"
3. **Dynamic text updates** as you perform different poses:
   - "No pose detected" when standing normally
   - "Pose detected: Mountain Pose" with confidence score when in mountain pose
   - "Pose detected: Downward Dog" when performing downward dog
   - "Pose detected: Warrior I" when in warrior pose

## 📊 Technical Details

- **Real-time processing**: ~30 FPS camera analysis
- **ML Kit Pose Detection**: Uses Google's accurate pose detection model
- **Confidence scoring**: Shows detection accuracy from 0-100%
- **Pose classification**: Custom algorithms analyze body landmark positions

## 🔄 Alternative Installation Methods

### Using Command Line (Advanced)
If you prefer command line installation:

```bash
# Navigate to project directory
cd app

# Build debug APK
./gradlew assembleDebug

# Install on connected device
./gradlew installDebug
```

### Manual APK Installation
1. Build the APK using Android Studio ("Build" → "Build Bundle(s)/APK(s)" → "Build APK(s)")
2. Locate the APK in `app/build/outputs/apk/debug/`
3. Transfer to your Android device
4. Enable "Install from Unknown Sources" in device settings
5. Install the APK manually

## 🆘 Additional Help

- **Android Studio Setup**: [Official Android Studio Guide](https://developer.android.com/studio/intro)
- **USB Debugging**: [Enable Developer Options](https://developer.android.com/studio/debug/dev-options)
- **ML Kit Documentation**: [Google ML Kit Pose Detection](https://developers.google.com/ml-kit/vision/pose-detection)

## 🎯 Next Steps

After successfully running the demo:
- Try different poses and lighting conditions
- Experiment with different distances from the camera  
- Check out the source code to understand the pose detection algorithms
- Consider contributing new pose types or improvements

---

**Enjoy exploring AI-powered yoga pose detection!** 🧘‍♀️🤖