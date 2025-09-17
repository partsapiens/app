# Breathing Meditation App

A beautiful, interactive breathing meditation app with animated orb guidance and real-time health monitoring through wearable device integration.

![Breathing Meditation App](https://github.com/user-attachments/assets/5b702034-5a96-4656-af69-da72505f6f80)

## 🌟 Features

- **Animated Breathing Orb**: Beautiful gradient orb that expands and contracts to guide your breathing rhythm
- **Multiple Breathing Patterns**: Choose from scientifically-backed breathing techniques:
  - 4-4-4-4 (Box Breathing) - Perfect for stress relief and focus
  - 4-7-8 (Relaxing) - Promotes deep relaxation and sleep
  - 6-2-6-2 (Energizing) - Increases alertness and energy
- **Real-time Health Monitoring**: Displays heart rate, stress levels, and breath rate
- **Wearable Device Integration**: Connect to Bluetooth heart rate monitors and fitness trackers
- **Pulse Animations**: Dynamic pulse rings that enhance the meditative experience
- **Session Tracking**: Monitor your breathing sessions with breath counting and progress tracking
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Saves your preferences between sessions

![Active Session](https://github.com/user-attachments/assets/a12b35b2-5f01-4e5c-aa33-175121f826aa)

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/partsapiens/app.git
   cd app
   ```

2. **Start a local server**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js
   npx live-server --port=8000
   ```

3. **Open in your browser**:
   Navigate to `http://localhost:8000`

4. **Start breathing**:
   - Click the green orb or "Start Session" button
   - Follow the breathing instructions
   - Connect a wearable device for real health data (optional)

## 🎯 How to Use

### Basic Session
1. **Choose your settings**: Select session duration (1-15 minutes) and breathing pattern
2. **Start meditation**: Click the orb or press SPACE to begin
3. **Follow the guidance**: The orb will expand during inhale and contract during exhale
4. **Monitor your health**: Watch real-time heart rate, stress levels, and breath rate
5. **Complete your session**: The app will notify you when your session is complete

### Wearable Integration
1. **Click "Connect Device"**: The app will scan for Bluetooth heart rate monitors
2. **Select your device**: Choose from available wearables (fitness trackers, smart watches, etc.)
3. **Real-time data**: Your actual heart rate and derived health metrics will be displayed
4. **Fallback simulation**: If no device is available, the app uses simulated data for demonstration

### Keyboard Shortcuts
- **SPACE**: Start/pause session
- **ESC**: Reset session

## 🛠️ Technical Architecture

The app is built with modern web technologies for maximum compatibility and performance:

### Core Components
- **BreathingEngine** (`js/breathing-engine.js`): Manages breathing patterns and animations
- **HealthMonitor** (`js/health-monitor.js`): Handles health data collection and display
- **WearableConnector** (`js/wearable-connector.js`): Manages Bluetooth device connections
- **App** (`js/app.js`): Main application coordinator

### Technologies Used
- **HTML5**: Semantic markup and Web APIs
- **CSS3**: Advanced animations, gradients, and responsive design
- **JavaScript ES6+**: Modern JavaScript with classes and async/await
- **Web Bluetooth API**: Direct connection to wearable devices
- **CSS Animations**: Smooth breathing orb animations and transitions
- **Local Storage**: Settings persistence

### Browser Compatibility
- Chrome 56+ (full Bluetooth support)
- Firefox 55+ (limited Bluetooth support)
- Safari 14+ (no Bluetooth, simulation mode only)
- Edge 79+ (full Bluetooth support)

## 🔧 Development

### Project Structure
```
app/
├── index.html              # Main application page
├── styles.css              # All styling and animations
├── js/
│   ├── app.js             # Main application logic
│   ├── breathing-engine.js # Breathing patterns and timing
│   ├── health-monitor.js   # Health data management
│   └── wearable-connector.js # Bluetooth device integration
├── package.json           # Project dependencies
└── README.md             # Documentation
```

### Adding New Breathing Patterns
To add a new breathing pattern, modify the `patterns` object in `breathing-engine.js`:

```javascript
this.patterns = {
    'custom-pattern': { 
        inhale: 5, 
        holdIn: 3, 
        exhale: 7, 
        holdOut: 1 
    }
};
```

Then add the option to the HTML select element in `index.html`.

### Customizing Health Metrics
The `HealthMonitor` class can be extended to support additional health metrics. Modify the `updateData` method to handle new data types.

## 🏥 Health Data Integration

### Supported Devices
- **Heart Rate Monitors**: Any Bluetooth LE device with Heart Rate Service (0x180D)
- **Fitness Trackers**: Fitbit, Garmin, Polar (via Bluetooth)
- **Smart Watches**: Apple Watch, Galaxy Watch, Wear OS devices
- **Chest Straps**: Polar H10, Wahoo TICKR, Garmin HRM-Pro

### Health Metrics
- **Heart Rate**: Real-time BPM from connected devices
- **Stress Level**: Calculated from heart rate variability (simplified algorithm)
- **Breath Rate**: Estimated from heart rate patterns or manual counting

### Privacy & Security
- All health data is processed locally in your browser
- No data is sent to external servers
- Bluetooth connections are encrypted and secure
- Session data is only stored locally if you choose to save it

## 🎨 Customization

### Themes
The app uses CSS custom properties for easy theming. Modify the gradient and colors in `styles.css`:

```css
body {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### Animation Speed
Adjust breathing animation timing by modifying the `--breath-duration` CSS property or the pattern timing in JavaScript.

## 🤝 Contributing

We welcome contributions! Here are some areas where you can help:

- **New breathing patterns**: Add scientifically-backed breathing techniques
- **Device support**: Extend wearable device compatibility
- **Health algorithms**: Improve stress level and breath rate calculations
- **UI/UX improvements**: Enhance the visual design and user experience
- **Mobile apps**: Create native iOS/Android versions
- **Accessibility**: Improve screen reader and keyboard navigation support

## 📋 TODO / Future Enhancements

- [ ] Progressive Web App (PWA) support for offline use
- [ ] Audio guidance with breathing sound cues
- [ ] Meditation session history and statistics
- [ ] Social features and community challenges
- [ ] Advanced health analytics and trends
- [ ] Integration with popular health platforms (Apple Health, Google Fit)
- [ ] Guided meditation sessions with voice instructions
- [ ] Background ambient sounds and music
- [ ] Personalized breathing recommendations based on health data

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌐 Live Demo

Try the app online: [Breathing Meditation App](https://your-demo-url.com)

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Check the documentation above
- Review the code comments for implementation details

---

*Take a deep breath and start your journey to mindfulness.* 🧘‍♀️✨
