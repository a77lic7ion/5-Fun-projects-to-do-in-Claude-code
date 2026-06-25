import React from 'react';
import { Lesson } from '../data';
import { ScrollArea } from './ui/scroll-area';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  lessons: Lesson[];
  activeLessonId: string;
  onSelectLesson: (id: string) => void;
  completedSteps: Record<string, boolean>;
}

export function Sidebar({ lessons, activeLessonId, onSelectLesson, completedSteps }: SidebarProps) {
  
  const getLessonProgress = (lesson: Lesson) => {
    const total = lesson.steps.length;
    const completed = lesson.steps.filter(s => completedSteps[`${lesson.id}-${s.id}`]).length;
    return { total, completed, isDone: total === completed && total > 0 };
  };

  return (
    <div className="w-[280px] flex flex-col bg-[#1E293B] border-r border-[#334155] h-full shrink-0">
      <div className="p-6 border-b border-[#334155]">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Claude Code Guide
        </h1>
        <p className="text-xs text-slate-400 mt-1">Windows Edition</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {lessons.map(lesson => {
            const { total, completed, isDone } = getLessonProgress(lesson);
            const isActive = activeLessonId === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-all flex flex-col gap-2 border",
                  isActive 
                    ? "bg-slate-800 border-slate-700 shadow-sm" 
                    : isDone
                      ? "bg-blue-500/10 border-blue-500/50"
                      : "bg-transparent border-transparent hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-start justify-between w-full">
                  <span className={cn(
                    "text-sm font-medium leading-snug",
                    isActive ? "text-white" : isDone ? "text-blue-400" : "text-slate-400"
                  )}>
                    {lesson.title}
                  </span>
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 ml-2 mt-0.5">
                      <span className="text-[10px] text-white">✓</span>
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center shrink-0 ml-2 mt-0.5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center shrink-0 ml-2 mt-0.5" />
                  )}
                </div>
                <div className="flex items-center gap-2 w-full mt-1">
                  <div className="flex-1 h-1.5 bg-[#334155] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#38BDF8] transition-all duration-300"
                      style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-blue-400">
                    {Math.round((completed / total) * 100) || 0}%
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
