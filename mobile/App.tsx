

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import CoursesScreen from './CoursesScreen';
import AuthScreen from './AuthScreen';

const courses = [
  {
    title: 'Introduction to Fiber Optics',
    level: 'Beginner',
    duration: '2 Hours',
    icon: '📡',
  },
  {
    title: 'Fiber Cable Types & Components',
    level: 'Beginner',
    duration: '3 Hours',
    icon: '🔌',
  },
  {
    title: 'Fiber Optic Splicing',
    level: 'Intermediate',
    duration: '4 Hours',
    icon: '🛠️',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Login and Signup Screen
  if (currentScreen === 'auth') {
    return (
      <>
        <StatusBar style="light" />
        <AuthScreen onBack={() => setCurrentScreen('home')} />
      </>
    );
  }

  // Courses Screen
  if (currentScreen === 'courses') {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />

        <Pressable
          onPress={() => setCurrentScreen('home')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back to Home</Text>
        </Pressable>

        <CoursesScreen />
      </View>
    );
  }

  // Home Screen
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>FiberLearn</Text>
            <Text style={styles.tagline}>Learn. Connect. Grow.</Text>
          </View>

          <Pressable
            style={styles.profile}
            onPress={() => setCurrentScreen('auth')}
          >
            <Text style={styles.profileText}>P</Text>
          </Pressable>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcome}>
          <Text style={styles.hello}>HELLO, LEARNER 👋</Text>

          <Text style={styles.heading}>
            Build Your Future{'\n'}
            in <Text style={styles.highlight}>Fiber Optics.</Text>
          </Text>

          <Text style={styles.description}>
            Explore practical courses and develop skills
            for the telecom industry.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => setCurrentScreen('courses')}
          >
            <Text style={styles.primaryButtonText}>
              Explore Courses →
            </Text>
          </Pressable>

          <Pressable
            style={styles.loginButton}
            onPress={() => setCurrentScreen('auth')}
          >
            <Text style={styles.loginButtonText}>
              Login / Sign Up
            </Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>06</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>03</Text>
            <Text style={styles.statLabel}>Levels</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Learning</Text>
          </View>
        </View>

        {/* Popular Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Courses</Text>

            <Pressable onPress={() => setCurrentScreen('courses')}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          {courses.map((course, index) => (
            <View style={styles.courseCard} key={index}>
              <View style={styles.courseIcon}>
                <Text style={styles.iconText}>{course.icon}</Text>
              </View>

              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>

                <Text style={styles.courseMeta}>
                  {course.level} • {course.duration}
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>FiberLearn</Text>

          <Text style={styles.footerText}>
            Empowering the next generation of fiber
            optic professionals.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  backButton: {
    backgroundColor: '#102B4E',
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 12,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#102B4E',
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  tagline: {
    color: '#B9D4E8',
    fontSize: 12,
    marginTop: 3,
  },
  profile: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: '#19B6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  welcome: {
    backgroundColor: '#102B4E',
    paddingHorizontal: 22,
    paddingBottom: 35,
  },
  hello: {
    color: '#41D2D8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 15,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 39,
    marginTop: 12,
  },
  highlight: {
    color: '#41D2D8',
  },
  description: {
    color: '#D0DFEB',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: '#19B6C9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 22,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#41D2D8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  loginButtonText: {
    color: '#41D2D8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    color: '#102B4E',
    fontSize: 21,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#77869A',
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#102B4E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#159EB2',
    fontWeight: '600',
    fontSize: 13,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#E6F7F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 23,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    color: '#102B4E',
    fontSize: 13,
    fontWeight: 'bold',
  },
  courseMeta: {
    color: '#8492A5',
    fontSize: 11,
    marginTop: 7,
  },
  arrow: {
    color: '#159EB2',
    fontSize: 27,
    marginLeft: 5,
  },
  footer: {
    backgroundColor: '#102B4E',
    marginTop: 25,
    padding: 25,
    alignItems: 'center',
  },
  footerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#B9D4E8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },
});
