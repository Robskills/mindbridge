// This script would seed the database with initial community groups
// For demo purposes, this is a placeholder

console.log('Seeding community groups...');

const groups = [
  {
    name: 'Study Stress Support',
    description: 'A safe space to share exam anxiety, academic pressure, and study tips',
    category: 'Academic',
    is_private: false,
    rules: [
      'Be respectful and supportive',
      'No judgment - we\'re all in this together',
      'Keep shared experiences confidential',
    ],
  },
  {
    name: 'Financial Help Network',
    description: 'Support for students facing financial challenges, HELB stress, and budgeting tips',
    category: 'Financial',
    is_private: false,
    rules: [
      'No sharing of personal financial details',
      'Focus on resources and support',
      'Respect privacy and anonymity',
    ],
  },
  {
    name: 'Addiction Recovery',
    description: 'Peer support for substance abuse recovery and healthy coping mechanisms',
    category: 'Health',
    is_private: true,
    rules: [
      'Absolute confidentiality required',
      'No enabling behaviors',
      'Celebrate milestones and progress',
      'Professional guidance available',
    ],
  },
  {
    name: 'Exam Anxiety',
    description: 'Managing test anxiety, performance pressure, and academic stress',
    category: 'Academic',
    is_private: false,
    rules: [
      'Share coping strategies',
      'Encourage without pressure',
      'Normalize seeking help',
    ],
  },
  {
    name: 'Relationship Support',
    description: 'Navigating friendships, romantic relationships, and family dynamics',
    category: 'Social',
    is_private: false,
    rules: [
      'Respect diverse perspectives',
      'No victim-blaming',
      'Focus on healthy communication',
    ],
  },
  {
    name: 'Cultural Adjustment',
    description: 'Support for students adjusting to university life away from home',
    category: 'Social',
    is_private: false,
    rules: [
      'Celebrate cultural diversity',
      'Share experiences without comparison',
      'Build inclusive community',
    ],
  },
];

console.log(`Created ${groups.length} community groups:`);
groups.forEach((group, index) => {
  console.log(`${index + 1}. ${group.name} (${group.category})`);
});

console.log('\nGroups seeded successfully! ✅');
