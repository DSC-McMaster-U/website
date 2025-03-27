"use client";

import { useState } from "react";
import { TfiAgenda } from "react-icons/tfi";
import SectionCard from "./SectionCard";

interface AgendaData {
  title: string,
  agenda: Array<AgendaItem>,
}

interface AgendaItem {
  time: string,
  activity: string,
  description: string,
  audience_type: string,
}

interface EventAgendaProps {
  agenda: {
    days: AgendaData[];
    empty: boolean;
  };
}

export default function EventAgenda({ agenda }: EventAgendaProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (agenda.empty) {
    return null;
  }

  return (
    <SectionCard title="Event Agenda" description="" id={"event-details-agenda-section"}>
      <div className="flex flex-row items-center gap-4 mb-8">
        <div className="p-3 bg-blue-400 text-white rounded-full shrink-0">
          <TfiAgenda size={32}/>
        </div>
        <div className="flex-1">
          <ul className="flex flex-row gap-6 overflow-x-auto pb-2">
            {agenda.days.map((agendaDay: AgendaData, index: number) => (
              <li 
                key={index} 
                className={`text-lg font-semibold hover:text-blue-400 whitespace-nowrap cursor-pointer ${
                  selectedIndex === index ? 'text-blue-400' : ''
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                {agendaDay.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {agenda.days.map((agendaDay: AgendaData, index: number) => (
          <div 
            key={index} 
            className={`space-y-4 ${selectedIndex === index ? 'block' : 'hidden'}`}
          >
            <ul className="space-y-6">
              {agendaDay.agenda.map((item: AgendaItem, innerIndex: number) => (
                <li key={innerIndex} className="flex flex-col gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{item.activity}</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{item.time}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  );
} 