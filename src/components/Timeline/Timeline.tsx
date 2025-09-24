/**
 * Simple Timeline Component
 *
 * Just provide the timeline configuration and it renders automatically.
 * The modal adapts based on the event structure.
 */

import React from "react";
import { EventModal } from "../EventModal/EventModal";
import { generateTimelineSlots } from "@/data/timetable/timelines/main-stage-saturday-timeline";

interface TimelineProps {
  className?: string;
}

export function Timeline({ className }: TimelineProps) {
  const timeSlots = generateTimelineSlots();

  return (
    <div className={`timeline ${className || ""}`}>
      {timeSlots.map((slot, index) => (
        <div key={slot.time} className="timeline-slot">
          <div className="time-label">{slot.time}</div>

          <div className="event-content">
            {slot.event ? (
              <EventModal
                event={{
                  // Convert our event to the format expected by EventModal
                  title: slot.event.title,
                  venue: "Main Stage", // or derive from timeline config
                  image: slot.event.image,
                  acts: slot.event.acts,
                  // Dance show properties are automatically included
                  hasShow: slot.event.hasShow,
                  danceShow: slot.event.danceShow,
                  dancers: slot.event.dancers,
                  endTime: slot.event.endTime,
                }}
                trigger={
                  <div className="event-card">
                    <img
                      src={slot.event.image}
                      alt={slot.event.title}
                      className="event-image"
                    />
                    <div className="event-info">
                      <h3 className="event-title">{slot.event.title}</h3>
                      {/* Show main acts */}
                      <div className="event-acts">
                        {slot.event.acts.slice(0, 2).map((act: any) => (
                          <span key={act.name} className="act-name">
                            {act.name}
                          </span>
                        ))}
                        {slot.event.acts.length > 2 && (
                          <span className="more-acts">
                            +{slot.event.acts.length - 2} more
                          </span>
                        )}
                      </div>
                      {/* Show if it's a dance show */}
                      {slot.event.hasShow && (
                        <div className="dance-show-indicator">
                          🕺 Dance Show
                        </div>
                      )}
                    </div>
                    <div className="event-time">
                      {slot.time} - {slot.event.endTime}
                    </div>
                  </div>
                }
              />
            ) : (
              <div className="empty-slot">{/* Empty time slot */}</div>
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .timeline-slot {
          display: flex;
          align-items: stretch;
          background: white;
          min-height: 60px;
        }

        .time-label {
          flex: 0 0 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          font-weight: 600;
          font-size: 14px;
          color: #495057;
          border-right: 2px solid #e9ecef;
        }

        .event-content {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .event-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
        }

        .event-card:hover {
          background: #f8f9fa;
        }

        .event-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .event-info {
          flex: 1;
          min-width: 0;
        }

        .event-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #212529;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-acts {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .act-name {
          font-size: 12px;
          color: #6c757d;
          background: #e9ecef;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .more-acts {
          font-size: 12px;
          color: #6c757d;
          font-style: italic;
        }

        .dance-show-indicator {
          font-size: 12px;
          color: #007bff;
          font-weight: 600;
          margin-top: 4px;
        }

        .event-time {
          flex: 0 0 100px;
          font-size: 12px;
          color: #6c757d;
          text-align: right;
          font-weight: 500;
        }

        .empty-slot {
          width: 100%;
          min-height: 30px;
        }
      `}</style>
    </div>
  );
}
