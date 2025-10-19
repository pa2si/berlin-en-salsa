# Berlin En Salsa - Documentation

This directory contains comprehensive documentation for the Berlin En Salsa festival website project.

## 📁 Directory Structure

### `/architecture`
Technical architecture documentation and design decisions:
- **ARCHITECTURE_BENEFITS.md** - Benefits of the unified event architecture
- **TIMETABLE_ARCHITECTURE_ANALYSIS.md** - Deep dive into timetable system architecture
- **UNIFIED_EVENTS_REFACTOR_COMPLETE.md** - Documentation of the unified events refactoring
- **TYPE_SYSTEM_REFACTOR_COMPLETE.md** - TypeScript type system improvements

### `/features`
Individual feature implementation documentation:
- **TIMETABLE_AVAILABILITY_FEATURE.md** - Timetable visibility toggle feature ⭐ **Active**
- **INTERNATIONALIZATION_ERROR_PAGES.md** - Internationalized error pages implementation
- **SITEMAP_IMPLEMENTATION.md** - SEO sitemap implementation
- **SECTIONFIVE_DYNAMIC_IMPLEMENTATION.md** - Dynamic festival days in SectionFive

### `/guides`
Developer guides and integration documentation:
- **INTEGRATION_GUIDE.md** - Guide for integrating new features
- **METADATA_IMPLEMENTATION_PLAN.md** - SEO metadata implementation guide
- **PROJECT_SUMMARY.md** - High-level project overview and structure

### `/archive`
Historical documentation from refactoring phases (kept for reference):
- Adapter removal documentation
- Phase verification documents
- Refactor planning and timeline documents
- Various analysis documents

## 🚀 Quick Start

### For New Developers
1. Start with **PROJECT_SUMMARY.md** in `/guides` for project overview
2. Read **ARCHITECTURE_BENEFITS.md** in `/architecture` to understand design decisions
3. Check **INTEGRATION_GUIDE.md** in `/guides` for development workflows

### For Feature Development
1. Review relevant feature docs in `/features`
2. Consult architecture docs in `/architecture` for patterns
3. Follow integration patterns from `/guides`

### Active Features

#### Timetable Availability Toggle
See `/features/TIMETABLE_AVAILABILITY_FEATURE.md`

Control timetable visibility with a single config flag:
```typescript
// src/config/festival.ts
timetable: {
  isAvailable: false, // Change to true when ready
}
```

## 🏗️ Architecture Highlights

### Unified Event System
- Single source of truth for all events
- Type-safe event creation with EventFactory
- Timeline-based configuration for scheduling
- Centralized translation management

### Dynamic Configuration
- Festival dates and days generated automatically
- Configuration-driven feature flags
- Flexible and scalable structure

### Internationalization
- Full i18n support (German/Spanish)
- Smart translation utilities
- SEO-optimized with proper metadata

## 📚 Additional Resources

- Main README: `/README.md`
- Component documentation: Check inline JSDoc in source files
- Type definitions: `/src/types/*`

## 🔄 Maintenance

When adding new documentation:
- **Architecture changes** → `/architecture`
- **New features** → `/features`
- **Developer guides** → `/guides`
- **Historical/deprecated** → `/archive`

Keep documentation updated alongside code changes for future reference.
