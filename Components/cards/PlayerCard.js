
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Zap, Target, Gauge, ArrowUp } from 'lucide-react';

const RARITY_STYLES = {
  common: {
    gradient: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-500/20',
    border: 'border-gray-300'
  },
  rare: {
    gradient: 'from-blue-400 to-blue-600',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-400'
  },
  epic: {
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-500/40',
    border: 'border-purple-400'
  },
  legendary: {
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    glow: 'shadow-orange-500/50',
    border: 'border-yellow-400'
  }
};

const POSITION_ICONS = {
  goalkeeper: Target,
  striker: Zap
};

const LEVEL_UP_COST = (level) => 5 + Math.floor(level * 1.5);

export default function PlayerCard({ player, isNew = false, onClick, onLevelUp, levelUpCost, upgradePoints }) {
  const rarity = player.rarity || 'common';
  const styles = RARITY_STYLES[rarity];
  const PositionIcon = POSITION_ICONS[player.position] || Star;
  const canLevelUp = upgradePoints >= levelUpCost && player.cardInfo.level < 10;

  return (
    <motion.div
      initial={isNew ? { scale: 0, rotateY: 180 } : {}}
      animate={isNew ? { scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={onClick}
      className="cursor-pointer flex flex-col h-full bg-white/5 rounded-lg"
    >
      <Card className={`relative overflow-hidden border-2 ${styles.border} ${styles.glow} shadow-lg transition-all duration-300 bg-transparent flex-grow`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-10`} />
        
        {isNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 animate-pulse"
          />
        )}
        
        <CardHeader className="p-3 pb-2 relative z-10">
          <div className="flex justify-between items-start">
            <Badge className={`${styles.gradient} bg-gradient-to-r text-white border-0 text-xs font-bold`}>
              {rarity.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Lvl {player.cardInfo.level}
              </Badge>
              <PositionIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 pt-0 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-xl font-bold text-gray-700">
                {player.power + player.speed + player.accuracy}
              </span>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-sm truncate">{player.name}</h3>
              <p className="text-xs text-gray-400 capitalize">{player.position}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs text-white">
              <div className="flex flex-col items-center">
                <Gauge className="w-4 h-4 text-red-400 mb-1" />
                <span className="font-semibold">{player.power}</span>
                <span className="text-gray-400">PWR</span>
              </div>
              <div className="flex flex-col items-center">
                <Zap className="w-4 h-4 text-blue-400 mb-1" />
                <span className="font-semibold">{player.speed}</span>
                <span className="text-gray-400">SPD</span>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-4 h-4 text-green-400 mb-1" />
                <span className="font-semibold">{player.accuracy}</span>
                <span className="text-gray-400">ACC</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {onLevelUp && player.cardInfo.level < 10 && (
        <div className="p-2">
          <Button 
            onClick={(e) => { e.stopPropagation(); onLevelUp(); }}
            disabled={!canLevelUp}
            className="w-full h-8 text-xs bg-green-600/20 text-green-300 hover:bg-green-600/40 border border-green-500/30"
          >
            <ArrowUp className="w-3 h-3 mr-1" />
            Level Up ({levelUpCost} pts)
          </Button>
        </div>
      )}
      {player.cardInfo.level >= 10 && (
         <div className="p-2 text-center text-xs text-yellow-400 font-bold">MAX LEVEL</div>
      )}
    </motion.div>
  );
}
