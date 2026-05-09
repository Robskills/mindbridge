import { useState, useEffect } from 'react';
import { ESCALATION_RULES, CRISIS_PROTOCOLS } from '@/config/escalation-rules';
import { EscalationEvent } from '@/types/escalation';

export function useEscalationCheck() {
  const [activeEscalations, setActiveEscalations] = useState<EscalationEvent[]>([]);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkForEscalation = (content: string, userId: string): EscalationEvent | null => {
    const lowerContent = content.toLowerCase();
    
    for (const rule of ESCALATION_RULES) {
      if (!rule.active) continue;
      
      const matchedKeywords = rule.trigger_keywords.filter(keyword => 
        lowerContent.includes(keyword.toLowerCase())
      );
      
      if (matchedKeywords.length > 0) {
        const newEscalation: EscalationEvent = {
          id: `esc_${Date.now()}`,
          user_id: userId,
          rule_id: rule.id,
          detected_content: content,
          risk_score: rule.risk_threshold,
          escalation_level: rule.escalation_level,
          triggered_at: new Date().toISOString(),
          resolved: false,
        };
        
        // Store the escalation
        setActiveEscalations(prev => [...prev, newEscalation]);
        
        // Trigger appropriate protocol
        triggerProtocol(rule.escalation_level, userId, content);
        
        return newEscalation;
      }
    }
    
    return null;
  };

  const triggerProtocol = (level: number, userId: string, content: string) => {
    const protocol = CRISIS_PROTOCOLS.find(p => p.level === level);
    if (!protocol) return;

    console.log(`Triggering protocol: ${protocol.name} for user ${userId}`);
    
    // In a real implementation, this would trigger backend actions
    // like notifying peer listeners, health scholars, or crisis lines
    
    // For demo purposes, log the action
    switch (level) {
      case 1:
        console.log('Peer listener assigned');
        break;
      case 2:
        console.log('Health scholar review requested');
        break;
      case 3:
        console.log('Crisis line contacted');
        break;
    }
  };

  const resolveEscalation = (escalationId: string) => {
    setActiveEscalations(prev => 
      prev.map(esc => 
        esc.id === escalationId 
          ? { ...esc, resolved: true, handled_at: new Date().toISOString() }
          : esc
      )
    );
  };

  const getActiveEscalations = () => {
    return activeEscalations.filter(esc => !esc.resolved);
  };

  return {
    checkForEscalation,
    resolveEscalation,
    getActiveEscalations,
    activeEscalations,
  };
}
