# Timeline Refactoring Strategy: From Legacy to Class-Based Architecture

## Current State Analysis

### Problems with Current Implementation

1. **Too many optional fields**: `TimeSlot` interface has 25+ optional properties
2. **Multiple data formats**: Legacy German, Spanish, and new translatable formats coexist
3. **Complex conditional rendering**: Modal components have nested conditionals based on optional fields
4. **Duplicate interfaces**: `SlideContent` appears in multiple places with slight variations
5. **Difficult to scale**: Adding new event types requires touching many files
6. **Legacy code**: Unused German timetable files and backup files
7. **Transformation overhead**: Multiple transformation layers between data and UI

### Current Architecture Flow

```
TimetablePage.tsx (server)
  ↓
TimetableClient.tsx
  ↓
TimetableGrid.tsx + EventModal
  ↑
TimetableService → TranslatableTimeSlot[] → TimeSlot[] → Column[] → SelectedEventDetails
```

## Target Architecture

### New Class-Based Design

- **Artist class**: Unified model for all artist types (DJs, dancers, instructors, etc.)
- **ActType class**: Unified model for all event types with proper inheritance
- **TimelineColumn class**: Manages 30-minute intervals and act placement
- **TimelineService class**: Business logic and data management

### Benefits

1. **Scalable**: Easy to add new act/artist types without interface changes
2. **Type-safe**: Full TypeScript support with proper class methods
3. **Maintainable**: Single source of truth for data structures
4. **Flexible**: Modal automatically adapts based on available data
5. **Clean**: No more conditional rendering hell in components

## Migration Plan

### Phase 1: Foundation Setup (Week 1)

**Goal**: Establish new domain models and basic infrastructure

#### Step 1.1: Create Domain Models

- [ ] Create `src/domain/timeline/models/` directory
- [ ] Implement `Artist.ts` class ✅
- [ ] Implement `ActType.ts` class ✅
- [ ] Implement `TimelineColumn.ts` class ✅
- [ ] Add comprehensive unit tests for all classes

#### Step 1.2: Create Services

- [ ] Implement `TimelineService.ts` ✅
- [ ] Create data transformation utilities
- [ ] Add validation and business logic methods

#### Step 1.3: Data Structure Design

- [ ] Design new data file structure for each area/day combination
- [ ] Create example data file (`MainStageSaturday.ts`) ✅
- [ ] Define artist libraries for centralized artist management

### Phase 2: Data Migration (Week 2)

**Goal**: Convert existing data to new format

#### Step 2.1: Create Artist Libraries

- [ ] Extract all artists from current data files
- [ ] Create centralized artist definitions in `src/domain/timeline/data/artists/`
- [ ] Organize artists by type (DJs, dancers, instructors, etc.)

#### Step 2.2: Convert Area Data Files

- [ ] Convert `main-stage/saturday.ts` to new format
- [ ] Convert `main-stage/sunday.ts` to new format
- [ ] Convert `dance-workshops/saturday.ts` to new format
- [ ] Convert `dance-workshops/sunday.ts` to new format
- [ ] Convert `music-workshops/saturday.ts` to new format
- [ ] Convert `music-workshops/sunday.ts` to new format
- [ ] Convert `salsa-talks/saturday.ts` to new format
- [ ] Convert `salsa-talks/sunday.ts` to new format

#### Step 2.3: Create Data Loading Services

- [ ] Implement data loaders for each area
- [ ] Add data validation and error handling
- [ ] Create migration utilities for backward compatibility

### Phase 3: Component Refactoring (Week 3)

**Goal**: Update components to use new class-based data

#### Step 3.1: Update Modal System

- [ ] Refactor `EventModal.tsx` to use `ActType.getModalContent()`
- [ ] Simplify `EventDetails.tsx` by removing conditional logic
- [ ] Update `EventSlider.tsx` to use standardized slide format
- [ ] Remove legacy `SelectedEventDetails` interface

#### Step 3.2: Update Grid Components

- [ ] Refactor `TimetableGrid.tsx` to use `TimelineColumn`
- [ ] Update `TimeSlot.tsx` to work with `ActType` directly
- [ ] Simplify `AreaColumn.tsx` logic

#### Step 3.3: Update Service Integration

- [ ] Refactor `TimetableClient.tsx` to use new `TimelineService`
- [ ] Update `TimetablePage.tsx` data fetching
- [ ] Remove old transformation utilities

### Phase 4: Service Layer Refactoring (Week 4)

**Goal**: Replace old services with new architecture

#### Step 4.1: Replace TimetableService

- [ ] Implement new `TimelineService.loadTimelineData()`
- [ ] Update server-side data fetching
- [ ] Add caching and performance optimizations

#### Step 4.2: Update Translation System

- [ ] Integrate translation keys into new classes
- [ ] Update `translateTimeSlotsServer` for new format
- [ ] Ensure all text content is translatable

#### Step 4.3: Update Validation System

- [ ] Implement timeline validation in new service
- [ ] Add business rule validation
- [ ] Create data integrity checks

### Phase 5: Testing and Cleanup (Week 5)

**Goal**: Ensure stability and remove legacy code

#### Step 5.1: Comprehensive Testing

- [ ] Add unit tests for all new classes
- [ ] Add integration tests for timeline functionality
- [ ] Test modal system with various content types
- [ ] Performance testing with full dataset

#### Step 5.2: Legacy Code Cleanup

- [ ] Remove `GermanSaturdayTimetable.ts`
- [ ] Remove `GermanSundayTimetable.ts`
- [ ] Remove `saturdayTimetable.ts`
- [ ] Remove `sundayTimetable.ts`
- [ ] Remove `.backup` files
- [ ] Remove old transformation services
- [ ] Remove unused type definitions

#### Step 5.3: Documentation and Polish

- [ ] Update documentation for new architecture
- [ ] Create migration guide for future changes
- [ ] Add JSDoc comments to all public methods
- [ ] Performance optimization and code review

## Implementation Details

### Data File Structure

```
src/domain/timeline/data/
├── artists/
│   ├── djs.ts                 # All DJ definitions
│   ├── dancers.ts             # All dancer definitions
│   ├── instructors.ts         # All instructor definitions
│   └── presenters.ts          # All presenter definitions
├── areas/
│   ├── main-stage/
│   │   ├── saturday.ts        # ActType[] for main stage Saturday
│   │   └── sunday.ts          # ActType[] for main stage Sunday
│   ├── dance-workshops/
│   │   ├── saturday.ts        # ActType[] for dance workshops Saturday
│   │   └── sunday.ts          # ActType[] for dance workshops Sunday
│   ├── music-workshops/
│   │   ├── saturday.ts        # ActType[] for music workshops Saturday
│   │   └── sunday.ts          # ActType[] for music workshops Sunday
│   └── salsa-talks/
│       ├── saturday.ts        # ActType[] for salsa talks Saturday
│       └── sunday.ts          # ActType[] for salsa talks Sunday
└── timeline.config.ts         # Timeline configuration
```

### Modal Content Strategy

Instead of complex conditional rendering, the modal will call `act.getModalContent()` which returns a structured object containing only the relevant information for that act type:

```typescript
const modalContent = act.getModalContent();
// modalContent automatically contains only relevant fields:
// - For workshops: instructors, level, prerequisites
// - For performances: performers, setlist, danceShow
// - For talks: presenters, moderators, topics
```

### Backward Compatibility

During migration, we'll maintain backward compatibility by:

1. Creating adapter methods that convert new classes to old interfaces
2. Keeping old API endpoints working until all consumers are updated
3. Using feature flags to gradually roll out new functionality

## Risk Mitigation

### Potential Risks and Solutions

1. **Data inconsistency**: Implement comprehensive validation
2. **Performance impact**: Add proper caching and lazy loading
3. **Translation issues**: Maintain translation key consistency
4. **UI regressions**: Extensive testing and staged rollout

### Testing Strategy

1. **Unit tests**: Test all class methods and business logic
2. **Integration tests**: Test component interactions with new data
3. **Visual regression tests**: Ensure UI remains consistent
4. **Performance tests**: Validate no performance degradation

## Success Metrics

### Before Migration

- 25+ optional fields in TimeSlot interface
- 6 different data formats/files
- Complex conditional rendering in 5+ components
- 200+ lines of transformation code

### After Migration

- 2 main classes (Artist, ActType) with clear responsibilities
- 1 unified data format
- Simplified component logic with automatic content adaptation
- 50+ lines of clean transformation code
- Easy addition of new event/artist types without touching existing code

## Timeline Summary

| Phase | Duration | Key Deliverables                                    |
| ----- | -------- | --------------------------------------------------- |
| 1     | Week 1   | Domain models, services, basic infrastructure       |
| 2     | Week 2   | Data migration, artist libraries, new data files    |
| 3     | Week 3   | Component refactoring, modal system update          |
| 4     | Week 4   | Service layer replacement, performance optimization |
| 5     | Week 5   | Testing, cleanup, documentation                     |

**Total Duration**: 5 weeks
**Risk Level**: Medium (manageable with proper testing)
**Impact**: High (significant improvement in maintainability and scalability)
