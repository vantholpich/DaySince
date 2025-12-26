import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import AddEventScreen from './AddEventScreen';
import { COLORS, FONTS, LAYOUT } from '../constants/theme';

const HomeScreen = () => {
  const { events, addEvent } = useEvents();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddEvent = (newEvent) => {
    addEvent(newEvent);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus color={COLORS.primary} size={28} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No events yet.</Text>
              <Text style={styles.emptySubtext}>Tap + to start tracking.</Text>
            </View>
          }
        />
      </SafeAreaView>

      {/* ✅ SAFE MODAL */}
      <Modal
        visible={isModalVisible}
        animationType={Platform.OS === 'ios' ? 'pageSheet' : 'slide'}
        presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'fullScreen'}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddEventScreen
          onSave={handleAddEvent}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: LAYOUT.padding,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.largeTitle,
    color: COLORS.text,
  },
  addButton: {
    padding: 4,
    backgroundColor: COLORS.surfaceHighlight,
    borderRadius: 20,
  },
  listContent: {
    padding: LAYOUT.padding,
  },
  emptyState: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.title3,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    opacity: 0.7,
  },
});

export default HomeScreen;
