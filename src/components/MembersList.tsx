import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronUp, ChevronDown, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { UserLocation } from "@/lib/locationStore";
import { getColorFromValue } from "./CustomColorPicker";
import { cn } from "@/lib/utils";

interface MembersListProps {
  members: UserLocation[];
  onMemberClick: (member: UserLocation) => void;
}

export function MembersList({ members, onMemberClick }: MembersListProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block"
      >
        <div className="glass rounded-2xl border border-border/50 p-4 shadow-soft">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold">
                {members.length} {t('map.members')}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="max-h-64 space-y-2 overflow-auto scrollbar-thin">
                  {members.map((member) => (
                    <MemberCard 
                      key={member.id} 
                      member={member} 
                      onClick={() => onMemberClick(member)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile View - Bottom Sheet Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <motion.div
          animate={{ y: isMobileExpanded ? 0 : "calc(100% - 60px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass rounded-t-3xl border-t border-x border-border/50 shadow-soft"
        >
          {/* Handle */}
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="w-full flex flex-col items-center pt-2 pb-3 px-4"
          >
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30 mb-3" />
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-display font-semibold">
                  {members.length} {t('map.members')}
                </span>
              </div>
              {isMobileExpanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </button>

          {/* Members List */}
          <div className="px-4 pb-6 max-h-[50vh] overflow-auto">
            <div className="space-y-2">
              {members.map((member) => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  onClick={() => {
                    onMemberClick(member);
                    setIsMobileExpanded(false);
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function MemberCard({ member, onClick }: { member: UserLocation; onClick: () => void }) {
  const { t } = useTranslation();
  const colorStyle = getColorFromValue(member.color);

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 rounded-xl bg-background/50 hover:bg-background/80 p-3 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center shadow-sm"
          style={{ backgroundColor: colorStyle }}
        >
          <span className="text-sm font-bold text-white">
            {member.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="text-left">
          <p className="font-medium">
            {member.name}
            {member.id === 'self' && (
              <span className="ml-1 text-xs text-muted-foreground">
                ({t('map.you')})
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('map.lastSeen')}: {new Date(member.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <Navigation className="h-4 w-4 text-primary shrink-0" />
    </motion.button>
  );
}
