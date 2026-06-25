import React, { useState, useEffect } from 'react';
import { lessons, Lesson } from './data';
import { LessonView } from './components/LessonView';
import { Sidebar } from './components/Sidebar';
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [activeLessonId, setActiveLessonId] = useState<string>(lessons[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('completedSteps');
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved progress');
      }
    }
  }, []);

  const handleStepComplete = (stepKey: string, isCompleted: boolean) => {
    const updated = { ...completedSteps, [stepKey]: isCompleted };
    setCompletedSteps(updated);
    localStorage.setItem('completedSteps', JSON.stringify(updated));
  };

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  return (
    <div className="flex h-screen bg-[#0F172A] font-sans text-slate-200 overflow-hidden">
      <Sidebar 
        lessons={lessons} 
        activeLessonId={activeLessonId} 
        onSelectLesson={setActiveLessonId}
        completedSteps={completedSteps}
      />
      <main className="flex-1 flex flex-col relative overflow-auto bg-[#0F172A]">
        <LessonView 
          lesson={activeLesson} 
          completedSteps={completedSteps}
          onStepComplete={handleStepComplete}
        />
      </main>
      <Chatbot />
    </div>
  );
}
