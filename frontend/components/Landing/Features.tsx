import React from "react";
import { motion } from "framer-motion";
import { Crown, Users, Wallet } from "lucide-react";

const MinimalistFeatures = () => {
  const features = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Template Creation",
      description:
        "Create and monetize meme templates with custom revenue sharing. Set your terms and watch your creations spread.",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      gradient: "from-purple-500/20",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Voting",
      description:
        "Simple swipe interface to vote on memes. Right for funny, left for lame. Your votes shape the meme economy.",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
      gradient: "from-red-500/20",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Reward System",
      description:
        "Earn rewards when your memes make people laugh. Smart contracts ensure fair distribution of earnings.",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      gradient: "from-emerald-500/20",
    },
  ];

  return (
    <div className="bg-gray-800 w-full max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="relative group"
          >
            {/* Gradient Orb */}
            <div className={`absolute -z-10 top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-25 bg-gradient-to-br ${feature.gradient} to-transparent transition-opacity duration-500`} />
            
            {/* Card */}
            <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors duration-300">
              {/* Icon */}
              <div className={`w-12 h-12 ${feature.iconBg} ${feature.iconColor} rounded-full flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MinimalistFeatures;