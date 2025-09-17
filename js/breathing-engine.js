/**
 * Breathing Engine - Handles breathing patterns and animations
 */
class BreathingEngine {
    constructor() {
        this.isActive = false;
        this.isPaused = false;
        this.currentPhase = 'idle'; // idle, inhale, hold-in, exhale, hold-out
        this.breathCount = 0;
        this.sessionStartTime = null;
        this.sessionDuration = 5; // minutes
        this.currentPattern = '4-4-4-4';
        this.patterns = {
            '4-4-4-4': { inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 },
            '4-7-8': { inhale: 4, holdIn: 7, exhale: 8, holdOut: 0 },
            '6-2-6-2': { inhale: 6, holdIn: 2, exhale: 6, holdOut: 2 }
        };
        this.currentTimeout = null;
        this.callbacks = {
            onPhaseChange: null,
            onBreathComplete: null,
            onSessionComplete: null
        };
        
        this.orbElement = document.getElementById('breathing-orb');
        this.instructionElement = document.getElementById('instruction-text');
        this.breathCountElement = document.getElementById('breath-count');
    }

    setPattern(patternName) {
        this.currentPattern = patternName;
    }

    setDuration(minutes) {
        this.sessionDuration = minutes;
    }

    onPhaseChange(callback) {
        this.callbacks.onPhaseChange = callback;
    }

    onBreathComplete(callback) {
        this.callbacks.onBreathComplete = callback;
    }

    onSessionComplete(callback) {
        this.callbacks.onSessionComplete = callback;
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.isPaused = false;
        this.breathCount = 0;
        this.sessionStartTime = Date.now();
        this.updateBreathCount();
        
        // Enable pulse animation
        this.orbElement.classList.add('pulsing');
        
        // Start first breath cycle
        this.startBreathCycle();
    }

    pause() {
        this.isPaused = true;
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
        this.updateInstruction('Paused - Click resume to continue');
        this.orbElement.classList.remove('inhaling', 'exhaling');
    }

    resume() {
        if (!this.isActive || !this.isPaused) return;
        this.isPaused = false;
        this.startBreathCycle();
    }

    stop() {
        this.isActive = false;
        this.isPaused = false;
        this.currentPhase = 'idle';
        
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
        
        // Reset UI
        this.orbElement.classList.remove('inhaling', 'exhaling', 'pulsing');
        this.updateInstruction('Tap to begin');
        this.breathCount = 0;
        this.updateBreathCount();
    }

    startBreathCycle() {
        if (!this.isActive || this.isPaused) return;
        
        // Check if session is complete
        const elapsed = (Date.now() - this.sessionStartTime) / 1000 / 60; // minutes
        if (elapsed >= this.sessionDuration) {
            this.stop();
            if (this.callbacks.onSessionComplete) {
                this.callbacks.onSessionComplete();
            }
            return;
        }

        const pattern = this.patterns[this.currentPattern];
        
        // Start inhale phase
        this.setPhase('inhale', pattern.inhale);
        
        // Schedule hold-in phase
        this.currentTimeout = setTimeout(() => {
            if (!this.isActive || this.isPaused) return;
            this.setPhase('hold-in', pattern.holdIn);
            
            // Schedule exhale phase
            this.currentTimeout = setTimeout(() => {
                if (!this.isActive || this.isPaused) return;
                this.setPhase('exhale', pattern.exhale);
                
                // Schedule hold-out phase
                this.currentTimeout = setTimeout(() => {
                    if (!this.isActive || this.isPaused) return;
                    this.setPhase('hold-out', pattern.holdOut);
                    
                    // Complete breath cycle
                    this.currentTimeout = setTimeout(() => {
                        if (!this.isActive || this.isPaused) return;
                        this.breathCount++;
                        this.updateBreathCount();
                        
                        if (this.callbacks.onBreathComplete) {
                            this.callbacks.onBreathComplete(this.breathCount);
                        }
                        
                        // Start next cycle
                        this.startBreathCycle();
                    }, pattern.holdOut * 1000);
                    
                }, pattern.exhale * 1000);
            }, pattern.holdIn * 1000);
        }, pattern.inhale * 1000);
    }

    setPhase(phase, duration) {
        this.currentPhase = phase;
        
        // Update orb animation
        this.orbElement.classList.remove('inhaling', 'exhaling');
        this.orbElement.style.setProperty('--breath-duration', `${duration}s`);
        
        if (phase === 'inhale') {
            this.orbElement.classList.add('inhaling');
            this.updateInstruction('Breathe in...');
        } else if (phase === 'exhale') {
            this.orbElement.classList.add('exhaling');
            this.updateInstruction('Breathe out...');
        } else if (phase === 'hold-in') {
            this.updateInstruction('Hold...');
        } else if (phase === 'hold-out') {
            this.updateInstruction('Hold...');
        }
        
        if (this.callbacks.onPhaseChange) {
            this.callbacks.onPhaseChange(phase, duration);
        }
    }

    updateInstruction(text) {
        this.instructionElement.textContent = text;
    }

    updateBreathCount() {
        this.breathCountElement.textContent = this.breathCount;
    }

    getSessionProgress() {
        if (!this.sessionStartTime) return 0;
        const elapsed = (Date.now() - this.sessionStartTime) / 1000 / 60; // minutes
        return Math.min(elapsed / this.sessionDuration, 1);
    }

    getRemainingTime() {
        if (!this.sessionStartTime) return this.sessionDuration * 60;
        const elapsed = (Date.now() - this.sessionStartTime) / 1000;
        return Math.max(this.sessionDuration * 60 - elapsed, 0);
    }
}

// Export for use in other modules
window.BreathingEngine = BreathingEngine;