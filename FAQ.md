# Frequently Asked Questions (FAQ)

## 🤔 How do I run the demo to see what it looks like?

**👉 Check out [DEMO.md](DEMO.md) for complete step-by-step instructions!**

The demo requires:
1. Android Studio installed
2. An Android device (recommended) or emulator
3. Following the setup steps in DEMO.md

## 📱 What will I see when running the demo?

When you run the app successfully, you'll see:
- **Real-time camera preview** of yourself
- **Green status bar** at the bottom showing pose detection results
- **Live feedback** like "Pose detected: Mountain Pose" with confidence scores
- **Dynamic updates** as you change between different yoga poses

## 🧘 What yoga poses does the app recognize?

Currently, the app detects three yoga poses:
- **Mountain Pose** (Tadasana) - Standing upright with good posture
- **Downward Dog** (Adho Mukha Svanasana) - Inverted V-shape position
- **Warrior I** (Virabhadrasana I) - Lunge position with one foot forward

## 🔧 Do I need special equipment?

**Required:**
- Android device with camera (Android 7.0+ / API level 24+)
- Android Studio for development
- USB cable (for physical device)

**Recommended:**
- Physical Android device (better camera quality than emulator)
- Good lighting for better pose detection
- Stable surface to place/hold the device

## ⚡ Can I run this without Android Studio?

For development and building from source, you need Android Studio. However, if someone provides you with a pre-built APK file, you can install it directly on an Android device.

## 🎯 How accurate is the pose detection?

The app provides confidence scores (0-100%) for detected poses. Accuracy depends on:
- **Lighting conditions** (good lighting improves detection)
- **Distance from camera** (3-6 feet is optimal)
- **Full body visibility** (make sure your whole body is in frame)
- **Pose precision** (closer to traditional pose form = higher confidence)

## 🚨 What if the app doesn't detect my poses?

**Troubleshooting tips:**
1. **Check lighting** - Avoid backlighting or very dark rooms
2. **Adjust distance** - Stand 3-6 feet from the camera
3. **Full body in frame** - Make sure your entire body is visible
4. **Hold poses steadily** - Stay in position for 2-3 seconds
5. **Camera permissions** - Ensure the app has camera access

## 🔄 Can I use this on iOS?

Currently, this is an Android-only application built with Android Studio and Android-specific libraries (CameraX, ML Kit). It cannot run on iOS devices.

## 🛠️ How do I contribute or modify the app?

1. Fork the repository on GitHub
2. Follow the setup instructions in [DEMO.md](DEMO.md)
3. Make your changes
4. Test thoroughly on physical devices
5. Submit a pull request

See the [Contributing section in README.md](README.md#contributing) for more details.

## 🔍 Can I add more yoga poses?

Yes! The app is designed to be extensible. You would need to:
1. Add new pose types to `PoseType.kt`
2. Implement detection logic in `PoseDetectionAnalyzer.kt`
3. Add pose classification algorithms based on body landmarks
4. Test with real poses to tune the detection parameters

## 📊 What technology powers the pose detection?

- **Google ML Kit Pose Detection** - AI model for identifying body landmarks
- **CameraX** - Modern Android camera API
- **Kotlin** - Programming language
- **Android Architecture Components** - Modern Android development patterns

## 🎮 Is this app ready for production use?

This is a demo/educational project showcasing AI pose detection. For production use, you might want to add:
- More robust error handling
- Additional pose types
- Better UI/UX design
- Performance optimizations
- User accounts and data persistence

## 📱 What Android versions are supported?

- **Minimum**: Android 7.0 (API level 24)
- **Target**: Android 14 (API level 34)
- **Recommended**: Android 8.0+ for best performance

---

**Still have questions?** Check out [DEMO.md](DEMO.md) for detailed instructions or open an issue on GitHub!