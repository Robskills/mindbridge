import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Label } from '@/components/ui/Label';

interface PHQ2CheckInProps {
  onComplete: (score: number) => void;
}

export function PHQ2CheckIn({ onComplete }: PHQ2CheckInProps) {
  const [question1, setQuestion1] = useState<number | null>(null);
  const [question2, setQuestion2] = useState<number | null>(null);

  const handleSubmit = () => {
    if (question1 !== null && question2 !== null) {
      const totalScore = question1 + question2;
      onComplete(totalScore);
    }
  };

  const options = [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Several days' },
    { value: 2, label: 'More than half the days' },
    { value: 3, label: 'Nearly every day' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Over the past 2 weeks, how often have you been bothered by...</h3>
        
        <div className="space-y-4 mb-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Little interest or pleasure in doing things?
            </Label>
            <RadioGroup value={question1?.toString()} onValueChange={(v) => setQuestion1(parseInt(v))}>
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`q1-${option.value}`} />
                  <Label htmlFor={`q1-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Feeling down, depressed, or hopeless?
            </Label>
            <RadioGroup value={question2?.toString()} onValueChange={(v) => setQuestion2(parseInt(v))}>
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`q2-${option.value}`} />
                  <Label htmlFor={`q2-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        disabled={question1 === null || question2 === null}
      >
        Submit
      </Button>
    </div>
  );
}
