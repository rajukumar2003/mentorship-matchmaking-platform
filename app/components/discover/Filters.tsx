'use client';

import { useState } from 'react';

interface FiltersProps {
  filters: {
    role: string;
    skills: string[];
    interests: string[];
  };
  setFilters: (filters: any) => void;
}

export function Filters({ filters, setFilters }: FiltersProps) {
  const handleRoleChange = (role: string) => {
    setFilters({ ...filters, role });
  };

  const handleSkillsChange = (skill: string) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    setFilters({ ...filters, skills: updatedSkills });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Role</h3>
          <select
            value={filters.role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Roles</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Skills</h3>
          <div className="space-y-2">
            {['JavaScript', 'Python', 'React', 'Node.js', 'DSA'].map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => handleSkillsChange(skill)}
                  className="mr-2"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 