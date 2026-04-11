"use client";

import { useWizard } from "./WizardContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function StepSixDetails() {
  const { data, updateData, setStepValid, submitSeries } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isValid = !!(data.seriesTitle?.trim());
    setStepValid(isValid);
  }, [data.seriesTitle, setStepValid]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitSeries();
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save series", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Series Details</h2>
        <p className="text-muted-foreground mt-2">Give your series a name and description.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div>
          <Label htmlFor="title" className="text-base font-semibold">Series Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Mysteries of the Deep"
            value={data.seriesTitle || ""}
            onChange={(e) => updateData({ seriesTitle: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-base font-semibold">Description (optional)</Label>
          <Textarea
            id="description"
            placeholder="What is this series about?"
            value={data.seriesDescription || ""}
            onChange={(e) => updateData({ seriesDescription: e.target.value })}
            className="mt-1"
            rows={4}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!data.seriesTitle?.trim() || isSubmitting}
          className="w-full bg-cyan-500 hover:bg-cyan-400"
        >
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create Series
        </Button>
      </div>
    </div>
  );
}
