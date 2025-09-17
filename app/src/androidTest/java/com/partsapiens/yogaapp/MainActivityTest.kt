package com.partsapiens.yogaapp

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

/**
 * Instrumented test for MainActivity
 */
@RunWith(AndroidJUnit4::class)
class MainActivityTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test
    fun testUIElementsAreDisplayed() {
        // Check that the camera preview is displayed
        onView(withId(R.id.camera_preview))
            .check(matches(isDisplayed()))

        // Check that the pose title is displayed
        onView(withId(R.id.pose_title))
            .check(matches(isDisplayed()))
            .check(matches(withText(R.string.pose_detection_title)))

        // Check that the pose status is displayed
        onView(withId(R.id.pose_status))
            .check(matches(isDisplayed()))

        // Check that the pose confidence is initially hidden
        onView(withId(R.id.pose_confidence))
            .check(matches(withEffectiveVisibility(Visibility.GONE)))
    }

    @Test
    fun testDefaultPoseStatus() {
        // Check that initially "No pose detected" is shown
        onView(withId(R.id.pose_status))
            .check(matches(withText(R.string.no_pose_detected)))
    }
}