import React, { useState, useEffect } from 'react';
import { lessons, Lesson } from './data';
import { LessonView } from './components/LessonView';
import { Sidebar } from './components/Sidebar';
import { Chatbot } from './components/Chatbot';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
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

  const handleSelectLesson = (id: string) => {
    setActiveLessonId(id);
  };

  const handleGoHome = () => {
    setActiveLessonId(null);
  };

  const activeLesson = lessons.find(l => l.id === activeLessonId);

  return (
    <div className="flex h-screen bg-[#0F172A] font-sans text-slate-200 overflow-hidden">
      {activeLessonId && (
        <Sidebar 
          lessons={lessons} 
          activeLessonId={activeLessonId} 
          onSelectLesson={handleSelectLesson}
          completedSteps={completedSteps}
          onGoHome={handleGoHome}
        />
      )}
      <main className="flex-1 flex flex-col relative overflow-auto bg-[#0F172A]">
        {activeLessonId && activeLesson ? (
          <>
            <header className="h-[64px] border-b border-[#334155] flex items-center px-8 bg-[#1E293B] shrink-0">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-sm">Curriculum /</span>
                <span className="text-white text-sm font-semibold">{activeLesson.title}</span>
              </div>
            </header>
            <LessonView 
              lesson={activeLesson} 
              completedSteps={completedSteps}
              onStepComplete={handleStepComplete}
            />
          </>
        ) : (
          <LandingPage 
            onSelectLesson={handleSelectLesson} 
            completedSteps={completedSteps} 
          />
        )}
      </main>
      <Chatbot />
    </div>
  );
}
