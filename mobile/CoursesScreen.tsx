
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Course = {
  id: string | number;
  title: string;
  level: string;
  duration: string;
  icon: string;
  description: string;
  topics: string[];
};

type ApiCourse = {
  _id?: string;
  id?: string | number;
  title?: string;
  name?: string;
  level?: string;
  category?: string;
  duration?: string;
  description?: string;
  topics?: string[];
  icon?: string;
};

const API_URL = 'http://172.30.3.229:5000/api/courses';

const courseIcons = ['📡', '🔌', '🛠️', '🏗️', '🔬', '🌐'];

const defaultTopics = [
  'Course Overview',
  'Important Concepts',
  'Practical Applications',
];

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Unable to connect to the server.');
        }

        const result = await response.json();

        if (!Array.isArray(result.courses)) {
          throw new Error('Invalid course data received from server.');
        }

        const formattedCourses: Course[] = (
          result.courses as ApiCourse[]
        ).map((item, index) => ({
          id: item._id ?? item.id ?? index + 1,
          title: item.title ?? item.name ?? `Course ${index + 1}`,
          level: item.level ?? item.category ?? 'Beginner',
          duration: item.duration ?? 'Self-paced',
          icon: item.icon ?? courseIcons[index % courseIcons.length],
          description:
            item.description ?? 'Explore this course and learn important concepts of fiber optic technology.',
          topics:
            Array.isArray(item.topics) && item.topics.length > 0
              ? item.topics
              : defaultTopics,
        }));

        if (isActive) {
          setCourses(formattedCourses);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : 'Something went wrong while loading courses.'
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || course.level === category;

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
            {selectedCourse.level} • {selectedCourse.duration}
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
            <Text style={styles.infoText}>
              Level: {selectedCourse.level}
            </Text>
            <Text style={styles.infoText}>
              Duration: {selectedCourse.duration}
            </Text>
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
          {loading ? 'Loading Courses...' : `${filteredCourses.length} Courses Available`}
        </Text>

        {loading ? (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color="#19B6C9" />
            <Text style={styles.messageText}>Fetching courses...</Text>
          </View>
        ) : error ? (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => setRetryCount((count) => count + 1)}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : (
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
                      <Text style={styles.detailsText}>
                        View Details →
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.empty}>No courses found.</Text>
            )}
          </ScrollView>
        )}
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
  heading: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 18,
  },
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

  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  messageText: {
    color: '#52647A',
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    color: '#D64545',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#19B6C9',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
  },
  retryText: { color: '#FFFFFF', fontWeight: 'bold' },

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
