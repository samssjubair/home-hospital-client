import React from "react";

const AchievementItem = ({ value, description, color }: {value: string, description: string, color: string}) => {
  return (
    <div
      className={`w-full sm:w-1/2 md:w-1/4 text-center px-4 py-2 text-${color}`}
    >
      <div className="text-6xl text-pink-700 font-bold">{value}</div>
      <div className="text-lg">{description}</div>
    </div>
  );
};

const Achievements = ({ achievements }: { achievements : any[]}) => {
  return (
    <div className="py-4">
      <div className="container mx-auto flex flex-wrap justify-around items-center pb-2 border-b-2 border-pink-200">
        {achievements.map((achievement, index) => (
          <AchievementItem
            key={index}
            value={achievement.value}
            description={achievement.description}
            color={achievement.color || "pink-800"}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
