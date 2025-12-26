import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@days_since_events';

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const storedEvents = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedEvents) {
                setEvents(JSON.parse(storedEvents));
            }
        } catch (e) {
            console.error('Failed to load events', e);
        } finally {
            setLoading(false);
        }
    };

    const saveEvents = async (newEvents) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
        } catch (e) {
            console.error('Failed to save events', e);
        }
    };

    const addEvent = async (event) => {
        const newEvents = [
            { id: Date.now().toString(), ...event },
            ...events,
        ];
        setEvents(newEvents);
        await saveEvents(newEvents);
    };

    const deleteEvent = async (id) => {
        const newEvents = events.filter((e) => e.id !== id);
        setEvents(newEvents);
        await saveEvents(newEvents);
    };

    return {
        events,
        loading,
        addEvent,
        deleteEvent,
    };
};
