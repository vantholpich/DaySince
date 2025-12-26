import { differenceInCalendarDays, parseISO } from 'date-fns';

/**
 * Calculates the number of days between a start date and now.
 * @param {Date | string | number} startDate The event's start date
 * @param {boolean} includeStartDate Whether to include the start date (Day 1)
 * @returns {number} The number of days
 */
export const calculateDaysSince = (startDate, includeStartDate = false) => {
    const start = new Date(startDate);
    const now = new Date();

    // Reset time portions to ensure pure day calculation
    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));

    // If includeStartDate is true, add 1.
    // Example: Start = Today. Diff = 0. Include -> 1 (Day 1).
    return includeStartDate ? diff + 1 : diff;
};
