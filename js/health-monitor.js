/**
 * Health Monitor - Manages health data collection and display
 */
class HealthMonitor {
    constructor() {
        this.isMonitoring = false;
        this.data = {
            heartRate: null,
            stressLevel: null,
            breathRate: null,
            timestamp: null
        };
        this.callbacks = {
            onDataUpdate: null
        };
        
        // Get display elements
        this.heartRateElement = document.getElementById('heart-rate');
        this.stressLevelElement = document.getElementById('stress-level');
        this.breathRateElement = document.getElementById('breath-rate');
        
        // Simulated data for demo purposes
        this.simulationInterval = null;
        this.baseHeartRate = 72;
        this.baseStressLevel = 25;
        this.baseBreathRate = 16;
    }

    onDataUpdate(callback) {
        this.callbacks.onDataUpdate = callback;
    }

    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        
        // Start with simulated data
        this.startSimulation();
        
        // Try to connect to real health APIs if available
        this.tryConnectHealthAPIs();
    }

    stopMonitoring() {
        this.isMonitoring = false;
        
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
        
        // Reset display
        this.updateDisplay('--', '--', '--');
    }

    startSimulation() {
        // Simulate realistic health data with some variation
        this.simulationInterval = setInterval(() => {
            if (!this.isMonitoring) return;
            
            // Simulate slight variations in health metrics
            const heartRate = this.baseHeartRate + Math.floor(Math.random() * 20 - 10);
            const stressLevel = Math.max(0, Math.min(100, this.baseStressLevel + Math.floor(Math.random() * 30 - 15)));
            const breathRate = this.baseBreathRate + Math.floor(Math.random() * 6 - 3);
            
            this.updateData({
                heartRate: heartRate,
                stressLevel: stressLevel,
                breathRate: breathRate,
                timestamp: Date.now()
            });
        }, 2000);
    }

    async tryConnectHealthAPIs() {
        // Try Web API for heart rate if available
        if ('navigator' in window && 'bluetooth' in navigator) {
            try {
                // This would be implemented with actual device APIs
                console.log('Bluetooth available - could connect to heart rate monitors');
            } catch (error) {
                console.log('Bluetooth not available:', error);
            }
        }

        // Try to use generic sensor APIs if available
        if ('Sensor' in window) {
            try {
                // Generic sensor API implementation would go here
                console.log('Generic Sensor API available');
            } catch (error) {
                console.log('Sensor API not available:', error);
            }
        }
    }

    updateData(newData) {
        this.data = { ...this.data, ...newData };
        this.updateDisplay(
            this.data.heartRate,
            this.data.stressLevel,
            this.data.breathRate
        );
        
        if (this.callbacks.onDataUpdate) {
            this.callbacks.onDataUpdate(this.data);
        }
    }

    updateDisplay(heartRate, stressLevel, breathRate) {
        this.heartRateElement.textContent = heartRate;
        this.stressLevelElement.textContent = stressLevel;
        this.breathRateElement.textContent = breathRate;
        
        // Update styling based on values
        this.updateMetricStyling(this.heartRateElement, heartRate, { low: 60, high: 100 });
        this.updateMetricStyling(this.stressLevelElement, stressLevel, { low: 30, high: 70 });
        this.updateMetricStyling(this.breathRateElement, breathRate, { low: 12, high: 20 });
    }

    updateMetricStyling(element, value, ranges) {
        if (value === '--' || value === null) {
            element.style.color = '#4ade80';
            return;
        }
        
        const numValue = parseFloat(value);
        if (numValue < ranges.low) {
            element.style.color = '#60a5fa'; // Blue for low
        } else if (numValue > ranges.high) {
            element.style.color = '#f87171'; // Red for high
        } else {
            element.style.color = '#4ade80'; // Green for normal
        }
    }

    getData() {
        return { ...this.data };
    }

    // Simulate breathing session effects on health metrics
    simulateBreathingEffects() {
        if (!this.isMonitoring) return;
        
        // Gradually improve metrics during breathing session
        this.baseStressLevel = Math.max(10, this.baseStressLevel - 2);
        this.baseHeartRate = Math.max(60, this.baseHeartRate - 1);
        this.baseBreathRate = Math.max(12, this.baseBreathRate - 0.5);
    }

    // Reset to baseline after session
    resetToBaseline() {
        this.baseHeartRate = 72;
        this.baseStressLevel = 25;
        this.baseBreathRate = 16;
    }

    // Calculate stress level based on heart rate variability (simplified)
    calculateStressLevel(heartRate) {
        // Simplified stress calculation
        // In reality, this would use HRV and other complex metrics
        const baseStress = 20;
        const hrVariation = Math.abs(heartRate - 70);
        return Math.min(100, baseStress + hrVariation);
    }

    // Estimate breath rate from other metrics (when not directly measured)
    estimateBreathRate(heartRate, stressLevel) {
        // Simplified estimation
        const baseRate = 16;
        const stressAdjustment = (stressLevel - 30) * 0.1;
        const hrAdjustment = (heartRate - 70) * 0.05;
        return Math.max(8, Math.min(25, baseRate + stressAdjustment + hrAdjustment));
    }
}

// Export for use in other modules
window.HealthMonitor = HealthMonitor;