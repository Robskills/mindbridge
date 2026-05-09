import { ESGALATION_RULES, CRISIS_PROTOCOLS } from '@/config/escalation-rules';
import { EscalationEvent } from '@/types/escalation';

export function checkForEscalation(content: string, userId: string): EscalationEvent | null {
  const lowerContent = content.toLowerCase();
  
  for (const rule of ESGALATION_RULES) {
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
      
      // Trigger appropriate protocol
      triggerProtocol(rule.escalation_level, userId, content);
      
      return newEscalation;
    }
  }
  
  return null;
}

function triggerProtocol(level: number, userId: string, content: string) {
  const protocol = CRISIS_PROTOCOLS.find(p => p.level === level);
  if (!protocol) return;

  console.log(`Triggering protocol: ${protocol.name} for user ${userId}`);
  
  // In a real implementation, this would:
  // - Send notifications to peer listeners/health scholars
  // - Log the escalation event to database
  // - Trigger SMS/WhatsApp alerts for critical cases
  
  switch (level) {
    case 1:
      console.log('Tier 1: Peer listener assigned');
      break;
    case 2:
      console.log('Tier 2: Health scholar review requested');
      break;
    case 3:
      console.log('Tier 3: Crisis line contacted');
      break;
  }
}

export function getRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'critical' {
  if (score >= 0.8) return 'critical';
  if (score >= 0.6) return 'high';
  if (score >= 0.4) return 'moderate';
  return 'low';
}

export function shouldEscalate(content: string): boolean {
  const crisisKeywords = [
    'kill myself', 'want to die', 'suicide', 'ending it all',
    'hurt myself', 'cutting', 'self-harm',
    'no point living', 'better off dead'
  ];
  
  const lowerContent = content.toLowerCase();
  return crisisKeywords.some(keyword => lowerContent.includes(keyword));
}
