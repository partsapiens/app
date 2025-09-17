/**
 * Main Application - Coordinates all components
 */
class BreathingMeditationApp {
    constructor() {
        this.breathingEngine = new BreathingEngine();
        this.healthMonitor = new HealthMonitor();
        this.wearableConnector = new WearableConnector();
        
        this.elements = {
            startBtn: document.getElementById('start-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            resetBtn: document.getElementById('reset-btn'),
            connectDeviceBtn: document.getElementById('connect-device-btn'),
            sessionDuration: document.getElementById('session-duration'),
            breathingPattern: document.getElementById('breathing-pattern'),
            breathingOrb: document.getElementById('breathing-orb')
        };
        
        this.isSessionActive = false;
        this.sessionData = {
            startTime: null,
            totalBreaths: 0,
            avgHeartRate: null,
            avgStressLevel: null,
            heartRateData: [],
            stressLevelData: []
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCallbacks();
        this.loadSettings();
        
        // Show initial instructions
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        // Button event listeners
        this.elements.startBtn.addEventListener('click', () => {
            if (!this.isSessionActive) {
                this.startSession();
            } else {
                this.resumeSession();
            }
        });

        this.elements.pauseBtn.addEventListener('click', () => {
            this.pauseSession();
        });

        this.elements.resetBtn.addEventListener('click', () => {
            this.resetSession();
        });

        this.elements.connectDeviceBtn.addEventListener('click', () => {
            this.connectDevice();
        });

        // Settings event listeners
        this.elements.sessionDuration.addEventListener('change', (e) => {
            this.breathingEngine.setDuration(parseInt(e.target.value));
            this.saveSettings();
        });

        this.elements.breathingPattern.addEventListener('change', (e) => {
            this.breathingEngine.setPattern(e.target.value);
            this.saveSettings();
        });

        // Orb click to start/pause
        this.elements.breathingOrb.addEventListener('click', () => {
            if (!this.isSessionActive) {
                this.startSession();
            } else if (this.breathingEngine.isPaused) {
                this.resumeSession();
            } else {
                this.pauseSession();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!this.isSessionActive) {
                    this.startSession();
                } else if (this.breathingEngine.isPaused) {
                    this.resumeSession();
                } else {
                    this.pauseSession();
                }
            } else if (e.code === 'Escape') {
                this.resetSession();
            }
        });
    }

    setupCallbacks() {
        // Breathing engine callbacks
        this.breathingEngine.onPhaseChange((phase, duration) => {
            console.log(`Breathing phase: ${phase} for ${duration}s`);
        });

        this.breathingEngine.onBreathComplete((breathCount) => {
            this.sessionData.totalBreaths = breathCount;
            
            // Simulate breathing benefits
            this.healthMonitor.simulateBreathingEffects();
        });

        this.breathingEngine.onSessionComplete(() => {
            this.completeSession();
        });

        // Health monitor callbacks
        this.healthMonitor.onDataUpdate((data) => {
            this.updateSessionData(data);
        });

        // Wearable connector callbacks
        this.wearableConnector.onConnect((device) => {
            console.log('Connected to device:', device.name);
            this.showNotification(`Connected to ${device.name || 'device'}`, 'success');
        });

        this.wearableConnector.onDisconnect(() => {
            console.log('Device disconnected');
            this.showNotification('Device disconnected', 'warning');
        });

        this.wearableConnector.onDataReceived((data) => {
            // Update health monitor with real device data
            this.healthMonitor.updateData(data);
        });

        this.wearableConnector.onError((error) => {
            console.error('Wearable error:', error);
            this.showNotification(`Device error: ${error}`, 'error');
        });
    }

    startSession() {
        this.isSessionActive = true;
        this.sessionData.startTime = Date.now();
        this.sessionData.heartRateData = [];
        this.sessionData.stressLevelData = [];
        
        // Start components
        this.breathingEngine.start();
        this.healthMonitor.startMonitoring();
        
        // Update UI
        this.elements.startBtn.textContent = 'Resume';
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        
        this.showNotification('Meditation session started', 'success');
    }

    pauseSession() {
        this.breathingEngine.pause();
        
        // Update UI
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        this.showNotification('Session paused', 'info');
    }

    resumeSession() {
        this.breathingEngine.resume();
        
        // Update UI
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        
        this.showNotification('Session resumed', 'info');
    }

    resetSession() {
        this.isSessionActive = false;
        
        // Stop components
        this.breathingEngine.stop();
        this.healthMonitor.stopMonitoring();
        this.healthMonitor.resetToBaseline();
        
        // Reset UI
        this.elements.startBtn.textContent = 'Start Session';
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        // Reset session data
        this.sessionData = {
            startTime: null,
            totalBreaths: 0,
            avgHeartRate: null,
            avgStressLevel: null,
            heartRateData: [],
            stressLevelData: []
        };
        
        this.showNotification('Session reset', 'info');
    }

    completeSession() {
        this.isSessionActive = false;
        
        // Calculate session statistics
        const sessionDuration = (Date.now() - this.sessionData.startTime) / 1000 / 60; // minutes
        const avgHeartRate = this.calculateAverage(this.sessionData.heartRateData);
        const avgStressLevel = this.calculateAverage(this.sessionData.stressLevelData);
        
        // Stop components
        this.healthMonitor.stopMonitoring();
        this.healthMonitor.resetToBaseline();
        
        // Update UI
        this.elements.startBtn.textContent = 'Start Session';
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        // Show completion message
        this.showSessionSummary({
            duration: sessionDuration,
            breaths: this.sessionData.totalBreaths,
            avgHeartRate: avgHeartRate,
            avgStressLevel: avgStressLevel
        });
    }

    async connectDevice() {
        try {
            this.elements.connectDeviceBtn.disabled = true;
            this.elements.connectDeviceBtn.textContent = 'Connecting...';
            
            const connected = await this.wearableConnector.connect();
            
            if (connected) {
                this.elements.connectDeviceBtn.textContent = 'Disconnect';
                this.elements.connectDeviceBtn.onclick = () => this.disconnectDevice();
            } else {
                // Fallback to simulation
                this.wearableConnector.startSimulation();
                this.elements.connectDeviceBtn.textContent = 'Stop Simulation';
                this.elements.connectDeviceBtn.onclick = () => this.stopSimulation();
            }
            
        } catch (error) {
            console.error('Connection error:', error);
            this.showNotification('Failed to connect device', 'error');
        } finally {
            this.elements.connectDeviceBtn.disabled = false;
        }
    }

    async disconnectDevice() {
        await this.wearableConnector.disconnect();
        this.elements.connectDeviceBtn.textContent = 'Connect Device';
        this.elements.connectDeviceBtn.onclick = () => this.connectDevice();
    }

    stopSimulation() {
        this.wearableConnector.stopSimulation();
        this.elements.connectDeviceBtn.textContent = 'Connect Device';
        this.elements.connectDeviceBtn.onclick = () => this.connectDevice();
    }

    updateSessionData(healthData) {
        if (healthData.heartRate && healthData.heartRate !== '--') {
            this.sessionData.heartRateData.push(parseFloat(healthData.heartRate));
        }
        if (healthData.stressLevel && healthData.stressLevel !== '--') {
            this.sessionData.stressLevelData.push(parseFloat(healthData.stressLevel));
        }
    }

    calculateAverage(dataArray) {
        if (dataArray.length === 0) return null;
        const sum = dataArray.reduce((a, b) => a + b, 0);
        return Math.round(sum / dataArray.length);
    }

    showSessionSummary(stats) {
        const message = `
            Session Complete! 🎉
            
            Duration: ${stats.duration.toFixed(1)} minutes
            Breaths: ${stats.breaths}
            Avg Heart Rate: ${stats.avgHeartRate || 'N/A'} bpm
            Avg Stress Level: ${stats.avgStressLevel || 'N/A'}%
        `;
        
        this.showNotification(message, 'success', 5000);
    }

    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transition: 'all 0.3s ease',
            opacity: '0',
            transform: 'translateX(100%)'
        });
        
        // Set colors based on type
        const colors = {
            success: '#059669',
            error: '#dc2626',
            warning: '#d97706',
            info: '#2563eb'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    showWelcomeMessage() {
        const message = `Welcome to Breathing Meditation! 
        
        🔹 Click the orb or press SPACE to start
        🔹 Connect a wearable device for real health data
        🔹 Use ESC to reset the session
        
        Take a deep breath and begin your journey to mindfulness.`;
        
        this.showNotification(message, 'info', 6000);
    }

    loadSettings() {
        try {
            const settings = JSON.parse(localStorage.getItem('breathingMeditationSettings') || '{}');
            
            if (settings.duration) {
                this.elements.sessionDuration.value = settings.duration;
                this.breathingEngine.setDuration(settings.duration);
            }
            
            if (settings.pattern) {
                this.elements.breathingPattern.value = settings.pattern;
                this.breathingEngine.setPattern(settings.pattern);
            }
        } catch (error) {
            console.log('Could not load settings:', error);
        }
    }

    saveSettings() {
        const settings = {
            duration: this.elements.sessionDuration.value,
            pattern: this.elements.breathingPattern.value
        };
        
        try {
            localStorage.setItem('breathingMeditationSettings', JSON.stringify(settings));
        } catch (error) {
            console.log('Could not save settings:', error);
        }
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BreathingMeditationApp();
    console.log('Breathing Meditation App initialized');
});