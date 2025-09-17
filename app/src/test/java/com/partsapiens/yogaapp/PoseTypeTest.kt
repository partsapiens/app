package com.partsapiens.yogaapp

import org.junit.Test
import org.junit.Assert.*

/**
 * Unit tests for PoseType enum and PoseResult data class
 */
class PoseTypeTest {

    @Test
    fun `test PoseType enum values`() {
        assertEquals("Mountain Pose", PoseType.MOUNTAIN_POSE.displayName)
        assertEquals("Downward Dog", PoseType.DOWNWARD_DOG.displayName)
        assertEquals("Warrior I", PoseType.WARRIOR_1.displayName)
        assertEquals("Unknown Pose", PoseType.UNKNOWN.displayName)
    }

    @Test
    fun `test PoseResult creation`() {
        val poseResult = PoseResult(PoseType.MOUNTAIN_POSE, 0.85f)
        
        assertEquals(PoseType.MOUNTAIN_POSE, poseResult.detectedPose)
        assertEquals(0.85f, poseResult.confidence, 0.001f)
    }

    @Test
    fun `test PoseResult default confidence`() {
        val poseResult = PoseResult(PoseType.UNKNOWN)
        
        assertEquals(PoseType.UNKNOWN, poseResult.detectedPose)
        assertEquals(0f, poseResult.confidence, 0.001f)
    }

    @Test
    fun `test all pose types have non-empty display names`() {
        PoseType.values().forEach { poseType ->
            assertNotNull(poseType.displayName)
            assertTrue("Display name should not be empty", poseType.displayName.isNotEmpty())
        }
    }
}