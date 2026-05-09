import { useState } from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface JournalEditorProps {
  onSave: (content: string) => void;
  onCancel: () => void;
}

export function JournalEditor({ onSave, onCancel }: JournalEditorProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSave(content);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts, feelings, and reflections..."
        className="min-h-[200px] resize-none border-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex space-x-3">
        <Button 
          onClick={handleSubmit}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={!content.trim()}
        >
          Save Entry
        </Button>
        <Button 
          variant="outline"
          className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
