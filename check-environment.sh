#!/bin/bash

# Environment Check Script for AI-Powered Yoga App Demo
# This script helps verify that your development environment is ready

echo "🧘 AI-Powered Yoga App - Environment Check"
echo "============================================"
echo

# Check Java
echo "🔍 Checking Java..."
if command -v java &> /dev/null; then
    java_version=$(java -version 2>&1 | head -n 1)
    echo "✅ Java found: $java_version"
else
    echo "❌ Java not found. Please install JDK 8 or higher."
fi
echo

# Check Android Studio / SDK
echo "🔍 Checking Android SDK..."
if [ -n "$ANDROID_HOME" ] || [ -n "$ANDROID_SDK_ROOT" ]; then
    echo "✅ Android SDK path found: ${ANDROID_HOME:-$ANDROID_SDK_ROOT}"
    
    # Check for adb
    if command -v adb &> /dev/null; then
        echo "✅ ADB (Android Debug Bridge) found"
        
        # Check for connected devices
        echo "📱 Checking connected devices..."
        adb_devices=$(adb devices | grep -v "List of devices" | grep -v "^$")
        if [ -n "$adb_devices" ]; then
            echo "✅ Connected Android devices:"
            echo "$adb_devices"
        else
            echo "⚠️  No connected devices found. Please connect an Android device or start an emulator."
        fi
    else
        echo "⚠️  ADB not found in PATH"
    fi
else
    echo "❌ Android SDK not found. Please install Android Studio and set ANDROID_HOME."
fi
echo

# Check Gradle
echo "🔍 Checking Gradle..."
if [ -f "./gradlew" ]; then
    echo "✅ Gradle wrapper found"
    if command -v ./gradlew &> /dev/null; then
        echo "✅ Gradle wrapper is executable"
    else
        echo "⚠️  Gradle wrapper is not executable. Run: chmod +x gradlew"
    fi
else
    echo "❌ Gradle wrapper not found. Make sure you're in the project root directory."
fi
echo

# Check Git
echo "🔍 Checking Git..."
if command -v git &> /dev/null; then
    git_version=$(git --version)
    echo "✅ Git found: $git_version"
else
    echo "❌ Git not found. Please install Git."
fi
echo

# Summary
echo "📋 Environment Check Complete"
echo "============================================"
echo "Next steps:"
echo "1. Fix any ❌ issues above"
echo "2. Open the project in Android Studio"
echo "3. Follow the detailed instructions in DEMO.md"
echo
echo "🚀 Ready to run the demo? Check out DEMO.md for complete instructions!"