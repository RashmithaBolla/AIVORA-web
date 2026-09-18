import { motion } from 'framer-motion';
import TeamMember from '../components/TeamMember';

// Team member interface for type safety
interface Member {
  id: string;
  name: string;
  year: string;
  department: string;
  image: string;
  role: 'lead' | 'co-lead' | 'member';
}

const DEPT = 'CSE(AI&ML)';

// Team data populated from ClubCommittee Details AY 2026-27
// Roll number prefix: 24WH → 3rd Year, 25WH → 2nd Year, 26WH → 1st Year
const teamData = {
  president: [
    {
      id: 'p-1',
      name: 'Sai Srinidhi',
      year: '4th Year',
      department: DEPT,
      image: '/images/team/p-1.jpg',
      role: 'lead' as const,
    }
  ] as Member[],

  vicePresident: [
    {
      id: 'vp-1',
      name: 'P. Keerthana',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/vp-1.jpg',
      role: 'lead' as const,
    },
  ] as Member[],

  technicalTeam: [
    {
      id: 'tech-lead-1',
      name: 'K. Revathi',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/tech-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'tech-lead-2',
      name: 'K. Nithya',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/tech-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'tech-co-1',
      name: 'S. Nitya Sree',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/tech-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'tech-co-2',
      name: 'Tarini',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/tech-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  nontechnicalTeam: [
    {
      id: 'cult-lead-1',
      name: 'K. Jyothi Akshaya',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/cult-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'cult-lead-2',
      name: 'S. Rishika',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/cult-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'cult-lead-3',
      name: 'J. Dhathri',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/cult-lead-3.jpg',
      role: 'lead' as const,
    },
    {
      id: 'cult-co-1',
      name: 'K. Amrutha',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/cult-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'cult-co-2',
      name: 'Sharanya',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/cult-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  sportsTeam: [
    {
      id: 'sport-lead-1',
      name: 'S. Nikitha',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/sport-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'sport-lead-2',
      name: 'T. ShivaSri',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/sport-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'sport-lead-3',
      name: 'Surakshitha',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/sport-lead-3.jpg',
      role: 'lead' as const,
    },
    {
      id: 'sport-co-1',
      name: 'T. Apoorva',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/sport-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'sport-co-2',
      name: 'Manasa',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/sport-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  webTeam: [
    {
      id: 'web-lead-1',
      name: 'B. Rashmitha',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/web-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'web-lead-2',
      name: 'M. Saranya',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/web-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'web-lead-3',
      name: 'K. Nithya',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/web-lead-3.jpg',
      role: 'lead' as const,
    },
    {
      id: 'web-co-1',
      name: 'Divya',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/web-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'web-co-2',
      name: 'Sirija',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/web-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  industryRelations: [
    {
      id: 'ir-lead-1',
      name: 'Tabassum',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/ir-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'ir-lead-2',
      name: 'Yashaswini',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/ir-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'ir-co-1',
      name: 'U. Laxmi Priya',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/ir-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'ir-co-2',
      name: 'Samanvi',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/ir-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  marketingTeam: [
    {
      id: 'mkt-lead-1',
      name: 'E. Niharika',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/mkt-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'mkt-lead-2',
      name: 'Y. Spandana',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/mkt-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'mkt-lead-3',
      name: 'Ch. Akshara',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/mkt-lead-3.jpg',
      role: 'lead' as const,
    },
    {
      id: 'mkt-co-1',
      name: 'Varunika',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/mkt-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'mkt-co-2',
      name: 'Srinidhi',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/mkt-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  treasuryTeam: [
    {
      id: 'treas-lead-1',
      name: 'A. Lahari',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/treas-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'treas-lead-2',
      name: 'K. Srilekha',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/treas-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'treas-co-1',
      name: 'D. Anjali',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/treas-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'treas-co-2',
      name: 'Meghana',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/treas-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  hospitalityTeam: [
    {
      id: 'hosp-lead-1',
      name: 'E. Sai Spoorthy',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/hosp-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'hosp-lead-2',
      name: 'K. Sahithi Rithvika',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/hosp-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'hosp-co-1',
      name: 'Sri Harshini',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/hosp-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'hosp-co-2',
      name: 'Praharsha',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/hosp-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  graphicsTeam: [
    {
      id: 'gfx-lead-1',
      name: 'K. Jyothi Akshaya',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/gfx-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'gfx-lead-2',
      name: 'P. Rishika',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/gfx-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'gfx-co-1',
      name: 'Nigama',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/gfx-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'gfx-co-2',
      name: 'Jessika',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/gfx-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  anchoringTeam: [
    {
      id: 'anch-lead-1',
      name: 'S. Sanjana',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/anch-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'anch-lead-2',
      name: 'N. Yashaswini',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/anch-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'anch-co-1',
      name: 'Hasnika Reddy',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/anch-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'anch-co-2',
      name: 'Vaishnavi',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/anch-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  sponsorsTeam: [
    {
      id: 'spon-lead-1',
      name: 'E. Shivani',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/spon-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'spon-lead-2',
      name: 'E. Sai Spoorthy',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/spon-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'spon-lead-3',
      name: 'K. Sahithi Rithvika',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/spon-lead-3.jpg',
      role: 'lead' as const,
    },
    {
      id: 'spon-co-1',
      name: 'Tanmaya',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/spon-co-1.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  photographyTeam: [
    {
      id: 'photo-lead-1',
      name: 'K. Gayathri Praharshitha',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/photo-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'photo-lead-2',
      name: 'Vidhya Sree',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/photo-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'photo-co-1',
      name: 'Ruchitha Sree',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/photo-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'photo-co-2',
      name: 'Ananya',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/photo-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],

  documentationTeam: [
    {
      id: 'doc-lead-1',
      name: 'Glory',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/doc-lead-1.jpg',
      role: 'lead' as const,
    },
    {
      id: 'doc-lead-2',
      name: 'Prijeshni',
      year: '3rd Year',
      department: DEPT,
      image: '/images/team/doc-lead-2.jpg',
      role: 'lead' as const,
    },
    {
      id: 'doc-co-1',
      name: 'A. Samatha',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/doc-co-1.jpg',
      role: 'co-lead' as const,
    },
    {
      id: 'doc-co-2',
      name: 'Yuktha',
      year: '2nd Year',
      department: DEPT,
      image: '/images/team/doc-co-2.jpg',
      role: 'co-lead' as const,
    },
  ] as Member[],
};

const teamSections = [
  { key: 'president', title: 'President', members: teamData.president },
  { key: 'vicePresident', title: 'Vice President', members: teamData.vicePresident },
  { key: 'technicalTeam', title: 'Technical Team', members: teamData.technicalTeam },
  { key: 'nontechnicalTeam', title: 'Non Technical Team', members: teamData.nontechnicalTeam },
  { key: 'sportsTeam', title: 'Sports Team', members: teamData.sportsTeam },
  { key: 'webTeam', title: 'Web Creative & Development', members: teamData.webTeam },
  { key: 'industryRelations', title: 'Industry Relations', members: teamData.industryRelations },
  { key: 'marketingTeam', title: 'Marketing Team', members: teamData.marketingTeam },
  { key: 'treasuryTeam', title: 'Treasury', members: teamData.treasuryTeam },
  { key: 'hospitalityTeam', title: 'Hospitality', members: teamData.hospitalityTeam },
  { key: 'graphicsTeam', title: 'Graphics & Design', members: teamData.graphicsTeam },
  { key: 'anchoringTeam', title: 'Anchoring', members: teamData.anchoringTeam },
  { key: 'sponsorsTeam', title: 'Sponsors', members: teamData.sponsorsTeam },
  { key: 'photographyTeam', title: 'Photography', members: teamData.photographyTeam },
  { key: 'documentationTeam', title: 'Documentation', members: teamData.documentationTeam },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate team behind AIVORA - driving innovation and excellence 
              in artificial intelligence and technology at BVRIT Hyderabad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {teamSections.map((section, sectionIndex) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="mb-16"
            >
              {/* Section Title */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {section.title}
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>

              {/* Team Members Grid */}
              {section.members.length > 0 ? (() => {
                const leads = section.members.filter(m => m.role === 'lead');
                const coLeads = section.members.filter(m => m.role === 'co-lead');
                const showBadge = section.key !== 'president' && section.key !== 'vicePresident';
                return (
                  <div className="space-y-8">
                    {/* Leads row — centered */}
                    {leads.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-8">
                        {leads.map((member, index) => (
                          <div key={member.id} className="w-full sm:w-56">
                            <TeamMember member={member} index={index} showRoleBadge={showBadge} />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Co-leads row — centered */}
                    {coLeads.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-8">
                        {coLeads.map((member, index) => (
                          <div key={member.id} className="w-full sm:w-56">
                            <TeamMember member={member} index={leads.length + index} showRoleBadge={showBadge} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })() : (
                <div className="text-center py-12">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-white/40 text-2xl">👥</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-lg">Details will be added soon</p>
                    <p className="text-white/30 text-sm mt-2">4th Year CSE(AI&ML)</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Club Information Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                About AIVORA
              </span>
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                AIVORA is the premier AI and technology club at BVRIT Hyderabad College of Engineering for Women. 
                We are dedicated to fostering innovation, learning, and excellence in artificial intelligence, 
                machine learning, and emerging technologies.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Our mission is to create a vibrant community where students can explore, learn, and contribute 
                to the rapidly evolving field of AI while building lasting connections and professional skills.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}