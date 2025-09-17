# AI-Powered Yoga App

An Android application that uses Google's ML Kit Pose Detection to recognize and provide feedback on yoga poses in real-time.

## Features

- **Real-time Pose Detection**: Uses ML Kit's accurate pose detection to analyze yoga poses through the camera
- **Supported Poses**: 
  - Mountain Pose (Tadasana)
  - Downward Dog (Adho Mukha Svanasana)
  - Warrior I (Virabhadrasana I)
- **Live Camera Feed**: CameraX integration for modern, reliable camera functionality
- **Real-time Feedback**: Instant pose recognition with confidence scores
- **Clean UI**: Simple, intuitive interface focused on pose detection

## Technical Implementation

### Architecture
- **Android Architecture Components**: Modern Android development practices
- **CameraX**: For camera preview and image analysis
- **ML Kit Pose Detection**: Google's accurate pose detection API
- **View Binding**: Type-safe view references
- **Kotlin**: Modern Android development language

### Key Components

#### MainActivity
The main activity that handles:
- Camera permissions
- CameraX setup and lifecycle management
- UI updates based on pose detection results

#### PoseDetectionAnalyzer
The core ML analysis component that:
- Processes camera frames using ML Kit
- Analyzes pose landmarks to classify yoga poses
- Provides confidence scores for detected poses
- Implements pose classification algorithms for:
  - Mountain Pose: Checks for upright posture and body alignment
  - Downward Dog: Detects inverted V-shape with elevated hips
  - Warrior I: Identifies lunge position with wide leg stance

#### PoseType & PoseResult
Data classes that define:
- Supported pose types with display names
- Pose detection results with confidence levels

### Pose Detection Logic

#### Mountain Pose Detection
- Validates vertical body alignment (nose > shoulders > hips > ankles)
- Checks for level shoulders and hips
- Ensures upright standing posture

#### Downward Dog Detection
- Identifies inverted V-shape body position
- Confirms hips are elevated above hands and feet
- Validates hands and feet are at similar ground level

#### Warrior I Detection
- Detects wide leg stance with significant leg separation
- Identifies bent front knee in lunge position
- Analyzes asymmetrical leg positioning

## Requirements

- **Android API Level**: 24+ (Android 7.0)
- **Camera**: Device with rear-facing camera
- **Permissions**: Camera access required
- **Hardware**: Adequate processing power for real-time ML inference

## Dependencies

- **AndroidX Core**: Modern Android components
- **CameraX**: Camera functionality (core, camera2, lifecycle, view, extensions)
- **ML Kit Pose Detection**: Accurate and standard pose detection models
- **Material Design**: UI components and theming
- **Lifecycle Components**: ViewModel and runtime support

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/partsapiens/app.git
   cd app
   ```

2. **Open in Android Studio**
   - Import the project in Android Studio
   - Sync project with Gradle files

3. **Build and Run**
   - Connect an Android device or start an emulator
   - Build and install the app
   - Grant camera permissions when prompted

4. **Use the App**
   - Point the camera at yourself or another person
   - Perform one of the supported yoga poses
   - View real-time pose detection feedback

## Usage Instructions

1. **Launch the app** and grant camera permissions
2. **Position yourself** in front of the camera with your full body visible
3. **Perform yoga poses**:
   - **Mountain Pose**: Stand tall with feet together, arms at sides
   - **Downward Dog**: Hands and feet on ground, hips elevated, forming inverted V
   - **Warrior I**: Step one foot forward into lunge, keep back leg straight
4. **View feedback** in the green status bar at the bottom of the screen
5. **Confidence scores** show how accurately the pose is detected

## Future Enhancements

- Additional yoga poses (Warrior II, Tree Pose, etc.)
- Pose holding duration tracking
- Guided yoga sessions with pose sequences
- Progress tracking and analytics
- Pose correction suggestions
- Voice feedback and instructions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on physical devices
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
