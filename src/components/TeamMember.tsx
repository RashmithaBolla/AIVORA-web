import { motion } from 'framer-motion';

interface Member {
  id: string;
  name: string;
  year: string;
  department: string;
  image: string;
  role: 'lead' | 'co-lead' | 'member';
}

interface TeamMemberProps {
  member: Member;
  index: number;
  showRoleBadge?: boolean;
}

export default function TeamMember({ member, index, showRoleBadge = true }: TeamMemberProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'lead':
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
            Lead
          </span>
        );
      case 'co-lead':
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
            Co-Lead
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
        {/* Member Image */}
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-1">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-full bg-white/10"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                // Fallback to initials if image fails to load
                el.style.display = 'none';
                const parent = el.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-xl rounded-full';
                  fallback.textContent = member.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          {/* Role Badge - only show if showRoleBadge is true and role is not 'member' */}
          {showRoleBadge && member.role !== 'member' && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              {getRoleBadge(member.role)}
            </div>
          )}
        </div>

        {/* Member Info */}
        <div className="text-center space-y-2">
          {/* Name in Bold */}
          <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
            {member.name}
          </h3>
          
          {/* Year and Department in smaller font */}
          <div className="space-y-1">
            <p className="text-sm text-white/60">
              {member.year}
            </p>
            <p className="text-sm text-white/60">
              {member.department}
            </p>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}