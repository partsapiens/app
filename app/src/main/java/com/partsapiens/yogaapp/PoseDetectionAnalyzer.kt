package com.partsapiens.yogaapp

import android.content.Context
import android.util.Log
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.pose.Pose
import com.google.mlkit.vision.pose.PoseDetection
import com.google.mlkit.vision.pose.PoseDetector
import com.google.mlkit.vision.pose.PoseLandmark
import com.google.mlkit.vision.pose.accurate.AccuratePoseDetectorOptions
import kotlin.math.*

class PoseDetectionAnalyzer(
    private val context: Context,
    private val onPoseDetected: (PoseResult) -> Unit
) : ImageAnalysis.Analyzer {

    private val poseDetector: PoseDetector

    init {
        val options = AccuratePoseDetectorOptions.Builder()
            .setDetectorMode(AccuratePoseDetectorOptions.STREAM_MODE)
            .build()
        poseDetector = PoseDetection.getClient(options)
    }

    override fun analyze(imageProxy: ImageProxy) {
        val inputImage = InputImage.fromMediaImage(
            imageProxy.image!!, 
            imageProxy.imageInfo.rotationDegrees
        )

        poseDetector.process(inputImage)
            .addOnSuccessListener { pose ->
                val poseResult = analyzePose(pose)
                onPoseDetected(poseResult)
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "Pose detection failed", e)
                onPoseDetected(PoseResult(PoseType.UNKNOWN))
            }
            .addOnCompleteListener {
                imageProxy.close()
            }
    }

    private fun analyzePose(pose: Pose): PoseResult {
        val landmarks = pose.allPoseLandmarks
        if (landmarks.isEmpty()) {
            return PoseResult(PoseType.UNKNOWN)
        }

        // Get key landmarks for pose classification
        val nose = pose.getPoseLandmark(PoseLandmark.NOSE)
        val leftShoulder = pose.getPoseLandmark(PoseLandmark.LEFT_SHOULDER)
        val rightShoulder = pose.getPoseLandmark(PoseLandmark.RIGHT_SHOULDER)
        val leftElbow = pose.getPoseLandmark(PoseLandmark.LEFT_ELBOW)
        val rightElbow = pose.getPoseLandmark(PoseLandmark.RIGHT_ELBOW)
        val leftWrist = pose.getPoseLandmark(PoseLandmark.LEFT_WRIST)
        val rightWrist = pose.getPoseLandmark(PoseLandmark.RIGHT_WRIST)
        val leftHip = pose.getPoseLandmark(PoseLandmark.LEFT_HIP)
        val rightHip = pose.getPoseLandmark(PoseLandmark.RIGHT_HIP)
        val leftKnee = pose.getPoseLandmark(PoseLandmark.LEFT_KNEE)
        val rightKnee = pose.getPoseLandmark(PoseLandmark.RIGHT_KNEE)
        val leftAnkle = pose.getPoseLandmark(PoseLandmark.LEFT_ANKLE)
        val rightAnkle = pose.getPoseLandmark(PoseLandmark.RIGHT_ANKLE)

        // Check if we have the minimum required landmarks
        if (nose == null || leftShoulder == null || rightShoulder == null || 
            leftHip == null || rightHip == null) {
            return PoseResult(PoseType.UNKNOWN, 0f)
        }

        // Classify the pose based on body position
        return when {
            isMountainPose(nose, leftShoulder, rightShoulder, leftHip, rightHip, leftAnkle, rightAnkle) -> {
                PoseResult(PoseType.MOUNTAIN_POSE, 0.85f)
            }
            isDownwardDog(nose, leftShoulder, rightShoulder, leftWrist, rightWrist, leftHip, rightHip, leftAnkle, rightAnkle) -> {
                PoseResult(PoseType.DOWNWARD_DOG, 0.80f)
            }
            isWarrior1(leftShoulder, rightShoulder, leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle) -> {
                PoseResult(PoseType.WARRIOR_1, 0.75f)
            }
            else -> PoseResult(PoseType.UNKNOWN, 0f)
        }
    }

    private fun isMountainPose(
        nose: PoseLandmark?,
        leftShoulder: PoseLandmark,
        rightShoulder: PoseLandmark,
        leftHip: PoseLandmark,
        rightHip: PoseLandmark,
        leftAnkle: PoseLandmark?,
        rightAnkle: PoseLandmark?
    ): Boolean {
        // Mountain pose: standing upright, body aligned vertically
        
        // Check if person is upright (nose above shoulders, shoulders above hips)
        val noseY = nose?.position?.y ?: return false
        val shoulderY = (leftShoulder.position.y + rightShoulder.position.y) / 2
        val hipY = (leftHip.position.y + rightHip.position.y) / 2
        
        if (leftAnkle == null || rightAnkle == null) return false
        val ankleY = (leftAnkle.position.y + rightAnkle.position.y) / 2
        
        // Check vertical alignment (nose < shoulder < hip < ankle in Y coordinates)
        val isUpright = noseY < shoulderY && shoulderY < hipY && hipY < ankleY
        
        // Check if shoulders and hips are roughly level
        val shoulderLevelness = abs(leftShoulder.position.y - rightShoulder.position.y) < 50
        val hipLevelness = abs(leftHip.position.y - rightHip.position.y) < 50
        
        return isUpright && shoulderLevelness && hipLevelness
    }

    private fun isDownwardDog(
        nose: PoseLandmark?,
        leftShoulder: PoseLandmark,
        rightShoulder: PoseLandmark,
        leftWrist: PoseLandmark?,
        rightWrist: PoseLandmark?,
        leftHip: PoseLandmark,
        rightHip: PoseLandmark,
        leftAnkle: PoseLandmark?,
        rightAnkle: PoseLandmark?
    ): Boolean {
        // Downward dog: inverted V shape, hands and feet on ground, hips high
        
        if (nose == null || leftWrist == null || rightWrist == null || 
            leftAnkle == null || rightAnkle == null) return false
            
        val hipY = (leftHip.position.y + rightHip.position.y) / 2
        val wristY = (leftWrist.position.y + rightWrist.position.y) / 2
        val ankleY = (leftAnkle.position.y + rightAnkle.position.y) / 2
        
        // In downward dog, hips should be higher (smaller Y) than both hands and feet
        val hipsElevated = hipY < wristY && hipY < ankleY
        
        // Hands and feet should be roughly at similar levels
        val handsAndFeetLevel = abs(wristY - ankleY) < 100
        
        return hipsElevated && handsAndFeetLevel
    }

    private fun isWarrior1(
        leftShoulder: PoseLandmark,
        rightShoulder: PoseLandmark,
        leftHip: PoseLandmark,
        rightHip: PoseLandmark,
        leftKnee: PoseLandmark?,
        rightKnee: PoseLandmark?,
        leftAnkle: PoseLandmark?,
        rightAnkle: PoseLandmark?
    ): Boolean {
        // Warrior 1: One leg forward in lunge, arms typically raised
        
        if (leftKnee == null || rightKnee == null || 
            leftAnkle == null || rightAnkle == null) return false
            
        // Check for lunge position - one leg significantly more forward than the other
        val legSeparation = abs(leftAnkle.position.x - rightAnkle.position.x)
        val kneeSeparation = abs(leftKnee.position.x - rightKnee.position.x)
        
        // Check if one knee is significantly lower (bent) than the other
        val kneeLevelDifference = abs(leftKnee.position.y - rightKnee.position.y)
        
        // Warrior 1 typically has wide leg stance and one knee bent
        val isLunge = legSeparation > 100 && kneeLevelDifference > 50
        
        return isLunge
    }

    fun close() {
        poseDetector.close()
    }

    companion object {
        private const val TAG = "PoseDetectionAnalyzer"
    }
}