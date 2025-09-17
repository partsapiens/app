package com.partsapiens.yogaapp

enum class PoseType(val displayName: String) {
    MOUNTAIN_POSE("Mountain Pose"),
    DOWNWARD_DOG("Downward Dog"),
    WARRIOR_1("Warrior I"),
    UNKNOWN("Unknown Pose")
}

data class PoseResult(
    val detectedPose: PoseType,
    val confidence: Float = 0f
)