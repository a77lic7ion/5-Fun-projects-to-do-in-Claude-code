import React from 'react';
import { Lesson, Step } from '../data';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle, Terminal, HelpCircle, Code2, ClipboardCopy } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LessonViewProps {
  lesson: Lesson;
  completedSteps: Record<string, boolean>;
  onStepComplete: (stepKey: string, isCompleted: boolean) => void;
}

export function LessonView({ lesson, completedSteps, onStepComplete }: LessonViewProps) {
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pb-32">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">{lesson.title}</h1>
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          {lesson.overview}
        </p>
        
        {lesson.prerequisites.length > 0 && (
          <div className="bg-slate-800 border-l-4 border-blue-500 rounded-r-lg p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Prerequisites</h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
              {lesson.prerequisites.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {lesson.steps.map((step, index) => {
          const stepKey = `${lesson.id}-${step.id}`;
          const isCompleted = !!completedSteps[stepKey];

          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-xl border transition-all duration-300 overflow-hidden",
                isCompleted 
                  ? "bg-slate-800/50 border-slate-700" 
                  : "bg-slate-800 border-slate-600 shadow-sm"
              )}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                      isCompleted 
                        ? "bg-blue-500/20 text-blue-400" 
                        : "bg-[#1E293B] text-white border border-[#334155]"
                    )}>
                      {step.id}
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {step.title}
                    </h2>
                  </div>
                  <button 
                    onClick={() => onStepComplete(stepKey, !isCompleted)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-semibold shadow-lg shadow-blue-900/20 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-blue-300" />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {step.command && (
                  <div className="mb-6 relative group">
                    <div className="relative bg-[#020617] rounded-lg p-5 border border-[#334155] flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Terminal</span>
                        <button 
                          onClick={() => handleCopy(step.command!)}
                          className="text-xs text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
                          title="Copy command"
                        >
                          Copy Code
                        </button>
                      </div>
                      <div className="flex items-start gap-4">
                        <Terminal className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                        <code className="flex-1 font-mono text-sm text-[#E2E8F0] break-all">
                          {step.command}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#0F172A] border border-[#334155] rounded-lg p-5">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                      <HelpCircle className="w-4 h-4 text-[#F472B6]" />
                      Why do this?
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.why}
                    </p>
                  </div>
                  
                  <div className="bg-[#0F172A] border border-[#334155] rounded-lg p-5">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                      <Code2 className="w-4 h-4 text-[#38BDF8]" />
                      How it works
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.how}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
