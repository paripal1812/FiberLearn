
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

const courses = [
  { id: 1, title: 'Introduction to Fiber Optics', level: 'Beginner', duration: '2 Hours', icon: '📡', description: 'Learn the fundamentals of fiber optic technology and how light travels through optical fibers.', topics: ['Basics of Fiber Optics', 'How Optical Fibers Work', 'Applications of Fiber Optics'] },
  { id: 2, title: 'Fiber Cable Types & Components', level: 'Beginner', duration: '3 Hours', icon: '🔌', description: 'Understand different fiber optic cables, their structures and important components.', topics: ['Single Mode and Multimode Cables', 'Cable Structure', 'Fiber Connectors'] },
  { id: 3, title: 'Fiber Optic Splicing', level: 'Intermediate', duration: '4 Hours', icon: '🛠️', description: 'Explore the basic methods and tools used to join optical fibers.', topics: ['Fusion Splicing', 'Mechanical Splicing', 'Splicing Tools and Safety'] },
  { id: 4, title: 'Fiber Installation', level: 'Intermediate', duration: '3 Hours', icon: '🏗️', description: 'Learn the basic process of planning and installing fiber optic cables.', topics: ['Installation Planning', 'Cable Handling', 'Installation Safety'] },
  { id: 5, title: 'Testing & Troubleshooting', level: 'Advanced', duration: '5 Hours', icon: '🔬', description: 'Understand common fiber testing methods and how to identify network issues.', topics: ['Optical Power Testing', 'OTDR Basics', 'Common Fiber Faults'] },
  { id: 6, title: 'FTTH & Telecom Infrastructure', level: 'Advanced', duration: '4 Hours', icon: '🌐', description: 'Discover how Fiber to the Home technology supports modern telecom networks.', topics: ['FTTH Architecture', 'PON Technology', 'Telecom Infrastructure'] },
];

type Course = (typeof courses)[number];

export default function CoursesScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || course.level === category;
    return matchesSearch && matchesCategory;
  });

  // Course Details Screen
  if (selectedCourse) {
    return (
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <Pressable onPress={() => setSelectedCourse(null)}>
            <Text style={styles.backText}>← Back to Courses</Text>
          </Pressable>

          <Text style={styles.detailIcon}>{selectedCourse.icon}</Text>
          <Text style={styles.detailTitle}>{selectedCourse.title}</Text>
          <Text style={styles.detailMeta}>
            {selectedCourse.level}  •  {selectedCourse.duration}
          </Text>
        </View>

        <ScrollView style={styles.detailContent}>
          <Text style={styles.sectionTitle}>About This Course</Text>
          <Text style={styles.description}>
            {selectedCourse.description}
          </Text>

          <Text style={styles.sectionTitle}>What You'll Learn</Text>

          {selectedCourse.topics.map((topic, index) => (
            <View key={index} style={styles.topicRow}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Course Information</Text>
            <Text style={styles.infoText}>Level: {selectedCourse.level}</Text>
            <Text style={styles.infoText}>Duration: {selectedCourse.duration}</Text>
            <Text style={styles.infoText}>Platform: FiberLearn</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Courses Listing Screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>FiberLearn</Text>
        <Text style={styles.heading}>Explore Courses</Text>
        <Text style={styles.subtitle}>
          Build your skills with professional learning.
        </Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.search}
          placeholder="Search courses..."
          placeholderTextColor="#8492A5"
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setCategory(filter)}
              style={[
                styles.filter,
                category === filter && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  category === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.count}>
          {filteredCourses.length} Courses Available
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <View style={styles.courseIcon}>
                  <Text style={styles.icon}>{course.icon}</Text>
                </View>

                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseMeta}>
                    {course.level} • {course.duration}
                  </Text>

                  <Pressable
                    style={styles.detailsButton}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <Text style={styles.detailsText}>View Details →</Text>
                  </Pressable>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.empty}>No courses found.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },

  header: {
    backgroundColor: '#102B4E',
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },
  logo: { color: '#41D2D8', fontSize: 17, fontWeight: 'bold' },
  heading: { color: '#FFFFFF', fontSize: 27, fontWeight: 'bold', marginTop: 18 },
  subtitle: { color: '#B9D4E8', fontSize: 13, marginTop: 7 },

  content: { flex: 1, paddingHorizontal: 18, paddingTop: 20 },
  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E1E8F0',
  },

  filterScroll: { height: 58, flexGrow: 0, marginTop: 12 },
  filterContainer: { alignItems: 'center', paddingVertical: 5 },
  filter: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    marginRight: 9,
  },
  activeFilter: { backgroundColor: '#19B6C9' },
  filterText: { color: '#52647A', fontSize: 12, fontWeight: '600' },
  activeFilterText: { color: '#FFFFFF' },

  count: {
    color: '#102B4E',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 14,
  },

  courseCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 13,
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  courseIcon: {
    width: 52,
    height: 52,
    borderRadius: 11,
    backgroundColor: '#E6F7F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 25 },
  courseInfo: { flex: 1, marginLeft: 13 },
  courseTitle: { color: '#102B4E', fontSize: 14, fontWeight: 'bold' },
  courseMeta: { color: '#8492A5', fontSize: 12, marginTop: 7 },
  detailsButton: {
    backgroundColor: '#E6F7F8',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 7,
    marginTop: 10,
  },
  detailsText: { color: '#159EB2', fontSize: 12, fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#8492A5', marginTop: 35 },

  // Details screen styles
  detailHeader: {
    backgroundColor: '#102B4E',
    paddingTop: 55,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },
  backText: { color: '#41D2D8', fontSize: 15, fontWeight: 'bold' },
  detailIcon: { fontSize: 45, marginTop: 25 },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  detailMeta: { color: '#B9D4E8', fontSize: 14, marginTop: 12 },

  detailContent: { flex: 1, padding: 22 },
  sectionTitle: {
    color: '#102B4E',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 12,
  },
  description: { color: '#52647A', fontSize: 14, lineHeight: 23 },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  check: {
    color: '#19B6C9',
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: 12,
  },
  topicText: { color: '#52647A', fontSize: 14, flex: 1 },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 13,
    marginTop: 20,
    marginBottom: 30,
    elevation: 2,
  },
  infoTitle: {
    color: '#102B4E',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: { color: '#52647A', fontSize: 14, marginBottom: 9 },
});
