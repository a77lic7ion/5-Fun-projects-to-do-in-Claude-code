import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { lessons, Lesson } from '../data';
import { BookOpen, ChevronRight, ChevronLeft, Target, AlertTriangle, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onSelectLesson: (id: string) => void;
  completedSteps: Record<string, boolean>;
}

export function LandingPage({ onSelectLesson, completedSteps }: LandingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % lessons.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + lessons.length) % lessons.length);
  };

  const currentLesson = lessons[currentIndex];

  const getLessonProgress = (lesson: Lesson) => {
    const total = lesson.steps.length;
    const completed = lesson.steps.filter(s => completedSteps[`${lesson.id}-${s.id}`]).length;
    const isDone = total > 0 && total === completed;
    return { total, completed, isDone };
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0F172A] overflow-hidden">
      {/* Header */}
      <header className="h-[64px] border-b border-[#334155] flex items-center px-8 bg-[#1E293B] shrink-0">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Claude Code Interactive Guide
        </h1>
      </header>

      {/* Main Content Gallery */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col relative pb-32">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Project</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Master AI-assisted development on Windows. Select a project below to start learning step-by-step.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Nav Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 bg-[#1E293B] hover:bg-slate-800 border border-[#334155] rounded-full text-white transition-all shadow-lg z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 bg-[#1E293B] hover:bg-slate-800 border border-[#334155] rounded-full text-white transition-all shadow-lg z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Current Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          currentLesson.difficulty === 'Beginner' && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
                          currentLesson.difficulty === 'Intermediate' && "bg-blue-500/20 text-blue-400 border border-blue-500/30",
                          currentLesson.difficulty === 'Advanced' && "bg-purple-500/20 text-purple-400 border border-purple-500/30",
                        )}>
                          {currentLesson.difficulty}
                        </span>
                        <span className="text-sm text-slate-400 font-medium font-mono">
                          Module {currentIndex + 1} of {lessons.length}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">{currentLesson.title}</h3>
                    </div>
                    
                    {/* Progress Indicator inside card */}
                    {(() => {
                      const { total, completed, isDone } = getLessonProgress(currentLesson);
                      if (total === 0) return null;
                      return (
                        <div className="text-right">
                          <div className="text-sm font-semibold text-slate-300 mb-1">
                            {completed} / {total} Steps
                          </div>
                          <div className="w-32 h-2 bg-[#0F172A] rounded-full overflow-hidden border border-[#334155]">
                            <div 
                              className={cn(
                                "h-full transition-all duration-500",
                                isDone ? "bg-emerald-500" : "bg-blue-500"
                              )}
                              style={{ width: `${(completed / total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {currentLesson.overview}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Achievements */}
                    <div className="bg-[#0F172A] rounded-xl p-5 border border-[#334155]">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                        <Target className="w-4 h-4 text-emerald-400" />
                        What You Will Achieve
                      </h4>
                      <ul className="space-y-3">
                        {currentLesson.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                            <span className="text-sm text-slate-300 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pre-flight Checks */}
                    <div className="bg-[#0F172A] rounded-xl p-5 border border-[#334155]">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        Pre-flight Checks
                      </h4>
                      <ul className="space-y-3">
                        {currentLesson.preflightChecks.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span className="text-sm text-slate-300 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button 
                      onClick={() => onSelectLesson(currentLesson.id)}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-3 shadow-lg shadow-blue-900/20 text-lg"
                    >
                      <Code2 className="w-5 h-5" />
                      Start Project
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {lessons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    currentIndex === idx ? "bg-blue-500 w-8" : "bg-[#334155] hover:bg-[#475569]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
