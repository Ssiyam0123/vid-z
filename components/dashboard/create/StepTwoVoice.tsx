"use client";

import { useWizard } from "./WizardContext";
import { VoiceCard } from "./VoiceCard";
import { useEffect, useMemo } from "react";
import { Info } from "lucide-react";

const VOICE_MODELS = [
  // English Voices
  { id: "v1", name: "Raaga", gender: "Female", model: "Neural V2", language: "English" },
  { id: "v2", name: "Nirvani", gender: "Female", model: "Premium", language: "English" },
  { id: "v3", name: "Leo", gender: "Male", model: "Studio", language: "English" },
  { id: "v4", name: "Sarah", gender: "Female", model: "Standard", language: "English" },
  
  // Hindi Voices
  { id: "v5", name: "Aarav", gender: "Male", model: "Regional", language: "Hindi" },
  { id: "v6", name: "Ishani", gender: "Female", model: "Regional", language: "Hindi" },
  
  // Spanish Voices
  { id: "v7", name: "Mateo", gender: "Male", model: "Multilingual", language: "Spanish" },
  { id: "v8", name: "Sofia", gender: "Female", model: "Multilingual", language: "Spanish" },
  
  // French Voices
  { id: "v9", name: "Lucas", gender: "Male", model: "Euro V2", language: "French" },
  { id: "v10", name: "Chloe", gender: "Female", model: "Euro V2", language: "French" },
  
  // German Voices
  { id: "v11", name: "Hans", gender: "Male", model: "Berlin V3", language: "German" },
  { id: "v12", name: "Elena", gender: "Female", model: "Berlin V3", language: "German" },
];

export function StepTwoVoice() {
  const { data, updateData, setStepValid } = useWizard();

  const filteredVoices = useMemo(() => {
    return VOICE_MODELS.filter(v => v.language === data.language);
  }, [data.language]);

  // Handle auto-deselect if language changes to one that doesn't support the current voice
  useEffect(() => {
    const isCurrentVoiceCompatible = filteredVoices.some(v => v.id === data.voiceId);
    if (!isCurrentVoiceCompatible && data.voiceId) {
      updateData({ voiceId: undefined });
    }
  }, [data.language, filteredVoices, data.voiceId, updateData]);

  // Sync validation state
  useEffect(() => {
    setStepValid(!!data.voiceId);
  }, [data.voiceId, setStepValid]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-foreground">Select Voice</h2>
        <p className="text-muted-foreground mt-2">
          Choose an AI voice model tailored for <span className="text-cyan-500 font-bold">{data.language}</span>.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl text-cyan-700 dark:text-cyan-400 text-sm">
        <Info className="h-5 w-5 flex-shrink-0" />
        <p>
          Voices listed here are optimized for clarity and natural intonation in your selected language.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVoices.map((voice) => (
          <VoiceCard
            key={voice.id}
            id={voice.id}
            name={voice.name}
            gender={voice.gender}
            model={voice.model}
            isSelected={data.voiceId === voice.id}
            onSelect={() => updateData({ voiceId: voice.id })}
          />
        ))}
      </div>

      {filteredVoices.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl">
          <p className="text-muted-foreground">No voices are currently available for this language.</p>
        </div>
      )}
    </div>
  );
}
