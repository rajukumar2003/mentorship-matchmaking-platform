export interface MatchScore {
  userId: string;
  userName: string;
  email: string;
  score: number;
  matchedSkills: string[];
}

export function calculateMatchScore(
  userSkills: string[],
  targetSkills: string[]
): number {
  const normalizedUserSkills = userSkills.map(s => s.trim().toLowerCase());
  const normalizedTargetSkills = targetSkills.map(s => s.trim().toLowerCase());
  
  const matchedSkills = normalizedUserSkills.filter(skill => 
    normalizedTargetSkills.includes(skill)
  );
  
  // Calculate score based on number of matching skills
  return (matchedSkills.length / Math.max(userSkills.length, targetSkills.length)) * 100;
} 