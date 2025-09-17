/**
 * Wearable Connector - Handles connections to wearable devices via Bluetooth
 */
class WearableConnector {
    constructor() {
        this.isConnected = false;
        this.device = null;
        this.service = null;
        this.characteristics = {};
        this.callbacks = {
            onConnect: null,
            onDisconnect: null,
            onDataReceived: null,
            onError: null
        };
        
        // Standard Bluetooth service UUIDs
        this.serviceUUIDs = {
            heartRate: '0000180d-0000-1000-8000-00805f9b34fb',
            battery: '0000180f-0000-1000-8000-00805f9b34fb',
            deviceInfo: '0000180a-0000-1000-8000-00805f9b34fb'
        };
        
        this.characteristicUUIDs = {
            heartRateMeasurement: '00002a37-0000-1000-8000-00805f9b34fb',
            batteryLevel: '00002a19-0000-1000-8000-00805f9b34fb',
            manufacturerName: '00002a29-0000-1000-8000-00805f9b34fb'
        };
        
        this.statusElement = document.getElementById('connection-status');
        this.statusDot = this.statusElement.querySelector('.status-dot');
        this.statusText = this.statusElement.querySelector('.status-text');
    }

    onConnect(callback) {
        this.callbacks.onConnect = callback;
    }

    onDisconnect(callback) {
        this.callbacks.onDisconnect = callback;
    }

    onDataReceived(callback) {
        this.callbacks.onDataReceived = callback;
    }

    onError(callback) {
        this.callbacks.onError = callback;
    }

    async connect() {
        if (!this.isBluetoothSupported()) {
            this.handleError('Bluetooth not supported in this browser');
            return false;
        }

        try {
            this.updateStatus('Scanning for devices...', false);
            
            // Request device with heart rate service
            this.device = await navigator.bluetooth.requestDevice({
                filters: [
                    { services: [this.serviceUUIDs.heartRate] }
                ],
                optionalServices: [
                    this.serviceUUIDs.battery,
                    this.serviceUUIDs.deviceInfo
                ]
            });

            // Add disconnect listener
            this.device.addEventListener('gattserverdisconnected', () => {
                this.handleDisconnect();
            });

            this.updateStatus('Connecting...', false);
            
            // Connect to GATT server
            const server = await this.device.gatt.connect();
            
            // Get heart rate service
            this.service = await server.getPrimaryService(this.serviceUUIDs.heartRate);
            
            // Get heart rate measurement characteristic
            const hrCharacteristic = await this.service.getCharacteristic(
                this.characteristicUUIDs.heartRateMeasurement
            );
            
            // Start notifications
            await hrCharacteristic.startNotifications();
            hrCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
                this.handleHeartRateData(event.target.value);
            });
            
            this.characteristics.heartRate = hrCharacteristic;
            
            // Try to get battery service (optional)
            try {
                const batteryService = await server.getPrimaryService(this.serviceUUIDs.battery);
                const batteryCharacteristic = await batteryService.getCharacteristic(
                    this.characteristicUUIDs.batteryLevel
                );
                this.characteristics.battery = batteryCharacteristic;
            } catch (error) {
                console.log('Battery service not available:', error);
            }
            
            this.isConnected = true;
            this.updateStatus(`Connected to ${this.device.name || 'Unknown Device'}`, true);
            
            if (this.callbacks.onConnect) {
                this.callbacks.onConnect(this.device);
            }
            
            return true;
            
        } catch (error) {
            this.handleError(`Connection failed: ${error.message}`);
            return false;
        }
    }

    async disconnect() {
        if (!this.isConnected || !this.device) return;
        
        try {
            if (this.device.gatt.connected) {
                await this.device.gatt.disconnect();
            }
        } catch (error) {
            console.error('Error during disconnect:', error);
        }
        
        this.handleDisconnect();
    }

    handleDisconnect() {
        this.isConnected = false;
        this.device = null;
        this.service = null;
        this.characteristics = {};
        
        this.updateStatus('No device connected', false);
        
        if (this.callbacks.onDisconnect) {
            this.callbacks.onDisconnect();
        }
    }

    handleHeartRateData(dataView) {
        // Parse heart rate data according to Bluetooth specification
        let heartRate;
        
        if (dataView.getUint8(0) & 0x01) {
            // 16-bit heart rate value
            heartRate = dataView.getUint16(1, true);
        } else {
            // 8-bit heart rate value
            heartRate = dataView.getUint8(1);
        }
        
        // Calculate estimated stress level and breath rate
        const stressLevel = this.estimateStressLevel(heartRate);
        const breathRate = this.estimateBreathRate(heartRate);
        
        const data = {
            heartRate: heartRate,
            stressLevel: stressLevel,
            breathRate: breathRate,
            timestamp: Date.now(),
            source: 'wearable'
        };
        
        if (this.callbacks.onDataReceived) {
            this.callbacks.onDataReceived(data);
        }
    }

    async getBatteryLevel() {
        if (!this.isConnected || !this.characteristics.battery) return null;
        
        try {
            const value = await this.characteristics.battery.readValue();
            return value.getUint8(0);
        } catch (error) {
            console.error('Failed to read battery level:', error);
            return null;
        }
    }

    estimateStressLevel(heartRate) {
        // Simplified stress estimation based on heart rate
        // In reality, this would use HRV and other complex algorithms
        const restingHR = 70;
        const deviation = Math.abs(heartRate - restingHR);
        return Math.min(100, Math.max(0, 20 + deviation * 2));
    }

    estimateBreathRate(heartRate) {
        // Simplified breath rate estimation
        // Typically, breath rate correlates with heart rate
        const baseBreathRate = 16;
        const hrFactor = (heartRate - 70) * 0.1;
        return Math.max(8, Math.min(25, baseBreathRate + hrFactor));
    }

    isBluetoothSupported() {
        return 'bluetooth' in navigator;
    }

    updateStatus(message, connected) {
        this.statusText.textContent = message;
        
        if (connected) {
            this.statusDot.classList.add('connected');
        } else {
            this.statusDot.classList.remove('connected');
        }
    }

    handleError(message) {
        console.error('Wearable Connector Error:', message);
        this.updateStatus('Connection failed', false);
        
        if (this.callbacks.onError) {
            this.callbacks.onError(message);
        }
    }

    // Method to simulate wearable data for testing
    startSimulation() {
        if (this.isConnected) return; // Don't simulate if real device connected
        
        this.simulationInterval = setInterval(() => {
            const heartRate = 70 + Math.floor(Math.random() * 30 - 15);
            const stressLevel = this.estimateStressLevel(heartRate);
            const breathRate = this.estimateBreathRate(heartRate);
            
            const data = {
                heartRate: heartRate,
                stressLevel: stressLevel,
                breathRate: breathRate,
                timestamp: Date.now(),
                source: 'simulation'
            };
            
            if (this.callbacks.onDataReceived) {
                this.callbacks.onDataReceived(data);
            }
        }, 3000);
        
        this.updateStatus('Simulated device', true);
    }

    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
        
        if (!this.isConnected) {
            this.updateStatus('No device connected', false);
        }
    }
}

// Export for use in other modules
window.WearableConnector = WearableConnector;