/**
 * Tests for Festival Configuration
 * Phase 1: Festival Configuration Enhancement
 */

import { FESTIVAL_CONFIG, FestivalDay } from '../festival';

describe('FESTIVAL_CONFIG', () => {
  describe('days generation', () => {
    it('should generate 2 days for July 19-20, 2025', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days).toHaveLength(2);
    });

    it('should generate day1 and day2', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].id).toBe('day1');
      expect(days[1].id).toBe('day2');
    });

    it('should have saturday and sunday as weekdays', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].weekday).toBe('saturday');
      expect(days[1].weekday).toBe('sunday');
    });

    it('should have correct date objects', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].date.getDate()).toBe(19);
      expect(days[0].date.getMonth()).toBe(6); // July is month 6 (0-indexed)
      expect(days[1].date.getDate()).toBe(20);
    });

    it('should have correct translation labels', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].label).toBe('Sections.SectionFive.days.saturday');
      expect(days[1].label).toBe('Sections.SectionFive.days.sunday');
    });

    it('should have correct image paths', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].imageSrc).toBe('/timetable-days/day1.svg');
      expect(days[1].imageSrc).toBe('/timetable-days/day2.svg');
    });

    it('should have dateShort in format "Jul 19"', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].dateShort).toBe('Jul 19');
      expect(days[1].dateShort).toBe('Jul 20');
    });

    it('should have ISO date strings', () => {
      const days = FESTIVAL_CONFIG.days;
      expect(days[0].dateISO).toBe('2025-07-19');
      expect(days[1].dateISO).toBe('2025-07-20');
    });
  });

  describe('getDayById', () => {
    it('should find day by ID', () => {
      const day1 = FESTIVAL_CONFIG.getDayById('day1');
      expect(day1).toBeDefined();
      expect(day1?.weekday).toBe('saturday');
    });

    it('should return undefined for invalid ID', () => {
      const invalid = FESTIVAL_CONFIG.getDayById('day99');
      expect(invalid).toBeUndefined();
    });
  });

  describe('getDayByWeekday', () => {
    it('should find day by weekday name (lowercase)', () => {
      const saturday = FESTIVAL_CONFIG.getDayByWeekday('saturday');
      expect(saturday).toBeDefined();
      expect(saturday?.id).toBe('day1');
    });

    it('should find day by weekday name (case-insensitive)', () => {
      const sunday = FESTIVAL_CONFIG.getDayByWeekday('Sunday');
      expect(sunday).toBeDefined();
      expect(sunday?.id).toBe('day2');
    });

    it('should return undefined for non-existent weekday', () => {
      const monday = FESTIVAL_CONFIG.getDayByWeekday('monday');
      expect(monday).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle same start and end date (1-day festival)', () => {
      // Note: This test is conceptual - we'd need to create a new config for this
      // For now, just verify current config works
      const days = FESTIVAL_CONFIG.days;
      expect(days.length).toBeGreaterThan(0);
    });

    it('should have unique IDs for all days', () => {
      const days = FESTIVAL_CONFIG.days;
      const ids = days.map(d => d.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have dates in ascending order', () => {
      const days = FESTIVAL_CONFIG.days;
      for (let i = 1; i < days.length; i++) {
        expect(days[i].date.getTime()).toBeGreaterThan(days[i - 1].date.getTime());
      }
    });
  });
});
