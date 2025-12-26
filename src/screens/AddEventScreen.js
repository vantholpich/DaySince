import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONTS, LAYOUT } from '../constants/theme';

const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const parseDate = (text) => {
  const [dd, mm, yyyy] = text.split('-').map(Number);
  if (!dd || !mm || !yyyy) return null;

  const parsed = new Date(yyyy, mm - 1, dd);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const AddEventScreen = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState(formatDate(new Date()));
  const [includeStartDate, setIncludeStartDate] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title,
      date: date.toISOString(),
      includeStartDate,
    });
  };

  const onDateChange = (_, selectedDate) => {
    if (!selectedDate) {
      setShowPicker(false);
      return;
    }

    setShowPicker(false);
    setDate(selectedDate);
    setDateText(formatDate(selectedDate));
  };

  const handleDateTextChange = (text) => {
    setDateText(text);

    const parsed = parseDate(text);
    if (parsed) {
      setDate(parsed);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Event</Text>

        <TouchableOpacity onPress={handleSave} disabled={!title.trim()}>
          <Text
            style={[
              styles.saveButton,
              !title.trim() && styles.disabledButton,
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Title */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            placeholderTextColor={COLORS.textSecondary}
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
        </View>

        {/* Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date</Text>

          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <TextInput
              style={styles.input}
              value={dateText}
              onChangeText={handleDateTextChange}
              placeholder="DD-MM-YYYY"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              themeVariant="dark"
            />
          )}
        </View>

        {/* Include start date */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.label}>Include Start Date</Text>
            <Switch
              value={includeStartDate}
              onValueChange={setIncludeStartDate}
              trackColor={{
                false: COLORS.surfaceHighlight,
                true: COLORS.success,
              }}
              thumbColor="#FFF"
            />
          </View>

          <Text style={styles.helperText}>
            {includeStartDate
              ? 'Event starts on Day 1'
              : 'Event starts on Day 0 (Elapsed Time)'}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: LAYOUT.padding,
    paddingTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.divider,
  },
  headerTitle: {
    ...FONTS.headline,
    color: COLORS.text,
  },
  cancelButton: {
    ...FONTS.body,
    color: COLORS.primary,
  },
  saveButton: {
    ...FONTS.headline,
    color: COLORS.primary,
  },
  disabledButton: {
    color: COLORS.textSecondary,
  },
  form: {
    padding: LAYOUT.padding,
    gap: 24,
  },
  inputGroup: {
    backgroundColor: COLORS.surfaceHighlight,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    ...FONTS.body,
    color: COLORS.text,
    height: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 40,
  },
  label: {
    ...FONTS.body,
    color: COLORS.text,
    marginBottom: 8,
  },
  helperText: {
    ...FONTS.caption1,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});

export default AddEventScreen;

