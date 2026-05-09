import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';

interface PHQ9FlowProps {
  onComplete: (scores: number[]) => void;
}

export function PHQ9Flow({ onComplete }: PHQ9FlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>(Array(9).fill(0));

  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead, or of hurting yourself in some way?"
  ];

  const handleResponse = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    if (currentQuestion < 8) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newResponses);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 mb-2">
          Question {currentQuestion + 1} of 9
        </h3>
        <p className="text-gray-600 mb-4">
          Over the past 2 weeks, how often have you been bothered by...
        </p>
        <p className="text-lg font-medium text-gray-800 mb-6">
          {questions[currentQuestion]}
        </p>
      </div>

      <div className="space-y-4">
        <Slider
          value={[responses[currentQuestion]]}
          onValueChange={(value) => handleResponse(value[0])}
          max={3}
          min={0}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Not at all</span>
          <span>Several days</span>
          <span>More than half the days</span>
          <span>Nearly every day</span>
        </div>
      </div>

      {currentQuestion > 0 && (
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="w-full"
        >
          Previous
        </Button>
      )}
    </div>
  );
}
