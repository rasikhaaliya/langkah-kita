import React, { useState, useEffect } from 'react';
import { 
  Footprints, 
  Flame, 
  Heart, 
  CheckCircle2, 
  Wind,
  Smile,
  Frown,
  Meh,
  ShieldCheck,
  Award,
  Calendar as CalendarIcon,
  ChevronRight,
  Timer,
  Zap,
  MapPin,
  Bike,
  Activity,
  ArrowLeft,
  Settings,
  User,
  Plus,
  ChevronLeft,
  X,
  Mountain,
  Smartphone,
  RefreshCcw,
  Sparkles,
  Info,
  Wallet,
  Coffee,
  PenLine,
  Dumbbell,
  ShoppingBag,
  History,
  UtensilsCrossed,
  Mail,
  Lock,
  ArrowRight,
  Leaf 
} from 'lucide-react';

const App = () => {
  // Status Navigasi & Auth
  const [view, setView] = useState('opening'); 
  const [authMode, setAuthMode] = useState('signup'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Status Data
  const [activeDate, setActiveDate] = useState(25);
  const [isSyncing, setIsSyncing] = useState(false);
  const [healthSynced, setHealthSynced] = useState(false);
  const [userName] = useState("Athhar");
  
  // Status Logika Aplikasi
  const [kitaPoints, setKitaPoints] = useState(1450);
  const [streak, setStreak] = useState(12);
  const [showJournalConfirm, setShowJournalConfirm] = useState(false);
  const [showPointAnim, setShowPointAnim] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  // Hardcoded Colors for High Contrast Visibility
  const colors = {
    forest: '#1B4332', 
    mint: '#D8F3DC',   
    slate: '#495057',  
    white: '#FFFFFF',
    bg: '#F8F9FA',
    rose: '#F43F5E',
    emerald: '#10B981',
    orange: '#FB923C',
    gray: '#E5E7EB'
  };

  // Mock Rewards Data
  const [rewardsList] = useState([
    { id: 1, partner: "Los Tropis", item: "Dragon Fruit Bowl", cost: 600, icon: <UtensilsCrossed size={20} />, redeemed: false },
    { id: 2, partner: "Kopi Toko Djawa", item: "Es Kopi Awan", cost: 350, icon: <Coffee size={20} />, redeemed: false },
    { id: 3, partner: "Langkah Wear", item: "Compression Socks", cost: 1200, icon: <ShoppingBag size={20} />, redeemed: false },
    { id: 4, partner: "Fit Hub Bandung", item: "1-Day Free Pass", cost: 800, icon: <Dumbbell size={20} />, redeemed: true },
  ]);

  const [calendarData, setCalendarData] = useState({
    24: { steps: 8200, activities: ['Running'], journal: 'Lari pagi yang menyegarkan di Gasibu.' },
    25: { steps: 6432, activities: ['Walking'], journal: null },
    22: { steps: 1200, activities: ['Mental Log'], journal: 'Sangat lelah dengan pekerjaan, streak tetap aman!' }
  });

  const getDayData = (date) => calendarData[date] || { steps: 0, activities: [], journal: null };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView('dashboard');
  };

  const handleSyncToggle = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setHealthSynced(true);
      setIsSyncing(false);
    }, 1500);
  };

  const handleJournalSubmit = () => {
    if (!selectedMood) return;
    setKitaPoints(prev => prev + 50);
    setShowPointAnim(true);
    setShowJournalConfirm(true);
    
    setTimeout(() => {
      setShowJournalConfirm(false);
      setShowPointAnim(false);
      setView('dashboard');
      setJournalText("");
      setSelectedMood(null);
    }, 3000);
  };

  // --- Screens ---

  const OpeningScreen = () => (
    <div className="h-full flex flex-col justify-between p-10 bg-white animate-in fade-in duration-700">
      <div className="mt-16">
        <div className="w-20 h-20 rounded-[28px] flex items-center justify-center shadow-2xl rotate-3 mb-10" style={{ backgroundColor: colors.forest }}>
          <Footprints size={40} style={{ color: colors.mint }} />
        </div>
        
        {/* Perbaikan Spasi: Heading ke garis lebih rapat */}
        <h1 className="text-6xl font-black tracking-tighter leading-none mb-1.5" style={{ color: colors.forest }}>
          Langkah<br />Kita.
        </h1>
        
        {/* Garis ke deskripsi lebih rapat */}
        <div className="h-1.5 w-14 rounded-full mb-2" style={{ backgroundColor: colors.mint }} />
        
        <p className="text-xl font-medium leading-tight text-gray-400 max-w-[240px]">
          Your guilt-free companion for a balanced life.
        </p>
      </div>

      <div className="space-y-6">
        {/* Perbaikan Spasi: Jarak antara deskripsi dan tombol diperlebar */}
        <button 
          onClick={() => setView('auth')} 
          className="w-full py-5 rounded-[32px] text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 group active:scale-95 transition-all mt-20" 
          style={{ backgroundColor: colors.forest }}
        >
          Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-center text-sm font-medium text-gray-400 pb-2">
          Already a member? <span className="font-bold cursor-pointer underline decoration-mint underline-offset-4" style={{ color: colors.forest }} onClick={() => {setAuthMode('login'); setView('auth');}}>Log in</span>
        </p>
      </div>
    </div>
  );

  const AuthScreen = () => (
    <div className="h-full flex flex-col p-10 bg-white animate-in slide-in-from-right-5">
      <button onClick={() => setView('opening')} className="p-3 w-fit rounded-2xl bg-gray-50 mb-12 active:scale-90 transition-all shadow-sm" style={{ color: colors.forest }}><ArrowLeft size={24} /></button>
      <div className="mb-12">
        <h2 className="text-4xl font-black tracking-tight" style={{ color: colors.forest }}>{authMode === 'signup' ? 'Join Us.' : 'Welcome back.'}</h2>
        <p className="text-gray-400 mt-2 font-medium italic">{authMode === 'signup' ? 'Start your journey with Athhar.' : 'Consistency starts within.'}</p>
      </div>
      <form onSubmit={handleAuthSubmit} className="space-y-6">
        {authMode === 'signup' && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest ml-4 text-gray-400">Full Name</label>
            <input type="text" defaultValue="Athhar" className="w-full py-4 px-6 rounded-[24px] bg-gray-50 border-2 border-transparent focus:border-forest outline-none transition-all font-medium shadow-inner" />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest ml-4 text-gray-400">Email Address</label>
          <input type="email" defaultValue="athhar@langkahkita.com" className="w-full py-4 px-6 rounded-[24px] bg-gray-50 border-2 border-transparent focus:border-forest outline-none transition-all font-medium shadow-inner" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest ml-4 text-gray-400">Password</label>
          <input type="password" defaultValue="password123" className="w-full py-4 px-6 rounded-[24px] bg-gray-50 border-2 border-transparent focus:border-forest outline-none transition-all font-medium shadow-inner" />
        </div>
        <button type="submit" className="w-full py-5 rounded-[32px] text-white font-bold text-lg shadow-xl mt-4 active:scale-95 transition-all bg-forest" style={{ backgroundColor: colors.forest }}>
          {authMode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>
      </form>
    </div>
  );

  const CalendarSection = () => {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="font-bold text-lg text-forest" style={{ color: colors.forest }}>February 2026</h3>
          <div className="flex gap-4 text-gray-300"><ChevronLeft size={20} /><ChevronRight size={20} /></div>
        </div>
        <div className="grid grid-cols-7 gap-y-4 text-center mb-6">
          {dayLabels.map((l, i) => <span key={i} className="text-[10px] font-black text-gray-300 tracking-widest">{l}</span>)}
          {days.map(d => {
            const hasData = calendarData[d];
            const isSelected = activeDate === d;
            const hasJournal = hasData?.journal != null;
            const hasActivity = hasData?.activities.some(act => act !== 'Mental Log');
            return (
              <button key={d} onClick={() => setActiveDate(d)} className={`relative flex items-center justify-center w-10 h-10 mx-auto rounded-2xl transition-all duration-300 ${isSelected ? 'shadow-lg scale-110 z-10 text-white' : 'hover:bg-gray-50 font-bold'}`} style={{ backgroundColor: isSelected ? colors.forest : 'transparent', color: isSelected ? colors.white : colors.forest }}>
                <span className="text-xs">{d}</span>
                <div className="absolute bottom-1 flex gap-0.5">
                  {hasActivity && <div className="w-1.5 h-1.5 rounded-full ring-1 ring-white" style={{ backgroundColor: colors.emerald }} />}
                  {hasJournal && <div className="w-1.5 h-1.5 rounded-full ring-1 ring-white" style={{ backgroundColor: colors.rose }} />}
                </div>
              </button>
            );
          })}
        </div>
        <div className="pt-5 border-t border-gray-50 flex gap-6">
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: colors.emerald }} /><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sport</span></div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: colors.rose }} /><span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mental Log</span></div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const data = getDayData(activeDate);
    const hasJournal = data.journal !== null;
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-10">
        <header className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-black" style={{ color: colors.forest }}>Hi, {userName}!</h1>
              <p className="text-sm font-semibold text-gray-400">Balance over burnout 🌿</p>
            </div>
            <div onClick={() => setView('profile')} className="w-14 h-14 rounded-2xl bg-white border-2 border-mint shadow-sm flex items-center justify-center cursor-pointer active:scale-90 transition-all overflow-hidden" style={{ borderColor: colors.mint }}><User size={28} style={{ color: colors.forest }} /></div>
        </header>
        
        <CalendarSection />

        <div className="p-6 rounded-[32px] border bg-white flex items-center justify-between shadow-sm" style={{ borderColor: 'rgba(27, 67, 50, 0.05)' }}>
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl text-white shadow-md`} style={{ backgroundColor: healthSynced ? colors.forest : '#D1D5DB' }}>
              <Smartphone size={22} />
            </div>
            <div>
              <p className="text-sm font-black" style={{ color: colors.forest }}>Apple Health Sync</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{healthSynced ? 'Synced just now' : 'Connect required'}</p>
            </div>
          </div>
          <button onClick={handleSyncToggle} className={`p-2 rounded-xl transition-all ${isSyncing ? 'animate-spin text-forest' : 'text-gray-300 hover:text-forest active:scale-90'}`}><RefreshCcw size={24} /></button>
        </div>

        <div onClick={() => setView('journal')} className="p-8 rounded-[40px] border-2 border-dashed border-mint flex items-center gap-5 cursor-pointer hover:bg-mint hover:bg-opacity-20 transition-all group shadow-sm" style={{ backgroundColor: hasJournal ? colors.mint + '40' : 'transparent' }}>
            <div className="p-4 bg-white rounded-3xl text-forest shadow-md group-hover:rotate-12 transition-transform">{hasJournal ? <CheckCircle2 size={26} style={{ color: colors.emerald }} /> : <PenLine size={26} />}</div>
            <div className="flex-1">
                <p className="text-md font-black text-forest">{hasJournal ? "Log Completed" : "Mental Daily Log"}</p>
                <p className="text-[11px] font-medium text-gray-400 leading-tight">Sync your mind. How are you today?</p>
            </div>
            {!hasJournal && <Plus size={20} className="text-forest opacity-30" />}
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-end mb-6 relative z-10">
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Today's Progress</p>
                  <h2 className="text-5xl font-black text-forest tracking-tighter">{data.steps.toLocaleString()}</h2>
                  <p className="text-[11px] font-bold text-mint uppercase tracking-tighter" style={{ color: colors.emerald }}>Steps recorded</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Footprints size={40} className="text-forest opacity-5" />
                    {hasJournal && <span className="bg-rose-50 text-rose-500 text-[10px] font-black px-2 py-0.5 rounded-lg border border-rose-100 shadow-sm">PROTECTED</span>}
                </div>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-1000 ease-out" style={{ backgroundColor: colors.forest, width: `${Math.min((data.steps/8000)*100, 100)}%` }} />
            </div>
        </div>
      </div>
    );
  };

  const RewardsView = () => {
    const available = rewardsList.filter(r => !r.redeemed);
    const history = rewardsList.filter(r => r.redeemed);
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <h2 className="text-3xl font-black text-forest" style={{ color: colors.forest }}>Rewards Hub</h2>
        
        {/* WALLET CARD - PEKAT FOREST GREEN */}
        <div className="p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden flex justify-between items-center border-[4px] border-white" style={{ backgroundColor: colors.forest }}>
            <div className="relative z-10 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Kita Points Wallet</p>
                <div className="flex items-center gap-5 pt-1">
                    <h3 className="text-6xl font-black tracking-tight" style={{ color: colors.white }}>{kitaPoints.toLocaleString()}</h3>
                    <Wallet size={40} style={{ color: colors.mint }} />
                </div>
            </div>
            <div className="absolute -top-10 -right-10 p-4 opacity-10 rotate-12"><Award size={200} /></div>
        </div>

        <div className="space-y-6">
            <h3 className="text-[12px] font-black uppercase tracking-widest px-4 text-gray-400">Available Deals</h3>
            <div className="space-y-5">
              {available.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-[40px] border border-gray-100 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-5">
                      <div className="p-4 bg-gray-50 rounded-2xl text-forest shadow-inner">{item.icon}</div>
                      <div><p className="text-lg font-black mb-1 text-forest">{item.partner}</p><p className="text-xs font-medium text-gray-400">{item.item}</p></div>
                  </div>
                  {/* PERBAIKAN: whitespace-nowrap agar "Pts" tidak turun ke bawah */}
                  <div className="px-5 py-2.5 rounded-2xl text-[12px] font-black shadow-md whitespace-nowrap" style={{ backgroundColor: colors.mint, color: colors.forest }}>
                    {item.cost} Pts
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* SEPARATOR & HISTORY */}
        {history.length > 0 && (
          <div className="space-y-8 pt-6">
              <div className="flex items-center gap-6 px-4">
                <div className="h-[2px] flex-1" style={{ backgroundColor: colors.gray }} />
                <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2">
                  <History size={18}/> Riwayat Klaim
                </h3>
                <div className="h-[2px] flex-1" style={{ backgroundColor: colors.gray }} />
              </div>
              
              <div className="space-y-4 opacity-50 pb-10">
                {history.map(item => (
                    <div key={item.id} className="bg-gray-50 p-6 rounded-[40px] border border-gray-200 flex items-center justify-between shadow-inner">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-white rounded-2xl text-gray-300 shadow-sm">{item.icon}</div>
                            <div><p className="text-lg font-bold text-gray-400">{item.partner}</p><p className="text-xs text-gray-400">{item.item}</p></div>
                        </div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">Terpakai</div>
                    </div>
                ))}
              </div>
          </div>
        )}
      </div>
    );
  };

  const ProfileView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center"><h2 className="text-3xl font-black text-forest">Profile</h2><Settings size={28} className="text-gray-300" /></div>
      <div className="flex flex-col items-center py-6 space-y-5">
          <div className="relative">
            <div className="w-32 h-32 rounded-[44px] border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: colors.forest }}>
              <User size={56} style={{ color: colors.mint }} />
            </div>
            <div className="absolute -bottom-2 -right-2 p-3 bg-white rounded-full shadow-lg border border-gray-50">
              <ShieldCheck size={24} style={{ color: colors.emerald }} />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-black text-forest">{userName}</h3>
            <p className="text-[11px] font-black uppercase tracking-widest px-5 py-2 rounded-full inline-block mt-2 shadow-sm" style={{ backgroundColor: colors.forest, color: colors.mint }}>Consistency Sprout 🌱</p>
          </div>
      </div>
      <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm space-y-10">
          <div className="flex items-center gap-4"><Heart size={24} style={{ color: colors.rose }} /><h4 className="text-sm font-black uppercase tracking-widest text-forest">Mental Vitality Trends</h4></div>
          
          <div className="flex justify-between items-end h-40 px-2 gap-5">
            {[45, 70, 30, 85, 95, 60, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div 
                  className="w-full rounded-t-xl transition-all duration-700 ease-out border-2 shadow-sm" 
                  style={{ height: `${h}%`, backgroundColor: colors.mint, borderColor: colors.forest, borderBottom: 'none' }} 
                />
                <span className="text-[9px] font-black text-gray-400 mt-4 uppercase tracking-tighter">Day {i+1}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-center italic text-gray-400 font-medium px-4 leading-relaxed">"Balance is the secret to a long and healthy journey."</p>
      </div>
      <button onClick={() => {setIsLoggedIn(false); setView('opening');}} className="w-full py-6 font-black text-sm bg-rose-50 rounded-[32px] hover:bg-rose-100 transition-colors shadow-sm" style={{ color: colors.rose }}>Sign Out</button>
    </div>
  );

  return (
    <div className="h-screen bg-gray-200 font-sans flex justify-center items-center overflow-hidden">
      
      {/* MOBILE APP CONTAINER - UKURAN HP TANPA FRAME */}
      <div className="w-full max-w-[420px] h-full bg-white relative flex flex-col shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Notifikasi Poin Mengambang */}
        {showPointAnim && (
          <div className="absolute top-20 right-8 z-[500] animate-bounce text-white px-6 py-3.5 rounded-3xl shadow-2xl flex items-center gap-3 border-2" style={{ backgroundColor: colors.forest, borderColor: colors.mint }}>
             <div className="p-1.5 rounded-full shadow-inner" style={{ backgroundColor: colors.mint }}><Plus size={16} style={{ color: colors.forest }} /></div>
             <span className="font-black text-sm tracking-tight">+50 Kita Points</span>
          </div>
        )}

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white px-8 pt-12 pb-44">
          {view === 'opening' && <OpeningScreen />}
          {view === 'auth' && <AuthScreen />}
          
          {isLoggedIn && (
            <>
              {view === 'dashboard' && <Dashboard />}
              {view === 'rewards' && <RewardsView />}
              {view === 'profile' && <ProfileView />}
            </>
          )}
          
          {view === 'journal' && (
            <div className="space-y-10 py-4 animate-in slide-in-from-bottom-10 duration-500">
              <div className="flex items-center gap-6"><button onClick={() => setView('dashboard')} className="p-3 bg-gray-50 rounded-2xl active:scale-90 transition-all shadow-sm" style={{ color: colors.forest }}><ArrowLeft size={24} /></button><h2 className="text-3xl font-black text-forest">Mental Log</h2></div>
              
              <div className="p-10 rounded-[50px] space-y-3 border-2 border-mint shadow-inner" style={{ backgroundColor: colors.mint + '60' }}>
                  <div className="flex items-center gap-3" style={{ color: colors.forest }}><Sparkles size={22} /><p className="text-[12px] font-black uppercase tracking-widest">Mindfulness</p></div>
                  <p className="text-sm font-semibold leading-relaxed italic text-forest">"Taking a moment for your mind is the ultimate form of consistency."</p>
              </div>

              {/* MOOD EMOJI SELECTOR */}
              <div className="flex justify-around py-4">
                {[
                  { id: 'happy', icon: <Smile size={44} />, label: 'Good', hex: colors.emerald },
                  { id: 'neutral', icon: <Meh size={44} />, label: 'Okay', hex: colors.orange },
                  { id: 'sad', icon: <Frown size={44} />, label: 'Sad', hex: colors.rose }
                ].map((mood) => (
                  <button 
                    key={mood.id} 
                    onClick={() => setSelectedMood(mood.id)} 
                    className={`p-8 rounded-[44px] border-2 transition-all shadow-lg flex flex-col items-center gap-4 active:scale-95 ${
                      selectedMood === mood.id ? 'text-white shadow-xl scale-110' : 'bg-white text-gray-400 border-gray-100'
                    }`}
                    style={{ 
                      backgroundColor: selectedMood === mood.id ? mood.hex : colors.white,
                      borderColor: selectedMood === mood.id ? mood.hex : undefined
                    }}
                  >
                      {React.cloneElement(mood.icon, { 
                        style: { color: selectedMood === mood.id ? colors.mint : undefined } 
                      })}
                      <span className={`text-[11px] font-black uppercase tracking-widest ${selectedMood === mood.id ? 'text-white' : 'text-gray-400'}`}>{mood.label}</span>
                  </button>
                ))}
              </div>

              <textarea 
                value={journalText} 
                onChange={(e) => setJournalText(e.target.value)} 
                placeholder='I feel exhausted of my work, will keep up tomorrow!' 
                className="w-full h-48 p-8 rounded-[44px] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-forest outline-none text-md font-medium leading-relaxed transition-all shadow-inner placeholder:text-gray-400" 
              />

              <button 
                onClick={handleJournalSubmit} 
                className={`w-full py-7 rounded-[40px] text-white font-black text-xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 ${!selectedMood ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: !selectedMood ? colors.gray : colors.forest }}
                disabled={!selectedMood}
              >
                  <ShieldCheck size={32} style={{ color: colors.mint }} /> 
                  <span>Save Reflection</span>
              </button>
            </div>
          )}
        </div>

        {/* FIXED BOTTOM NAVIGATION PANEL - LOCKED AT BOTTOM */}
        {isLoggedIn && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-white bg-opacity-95 backdrop-blur-2xl flex justify-around items-center border-t border-gray-100 z-[600] px-8 pb-8 shadow-[0_-15px_50px_rgba(0,0,0,0.08)]">
            <button onClick={() => setView('dashboard')} className={`p-5 rounded-[28px] transition-all flex items-center justify-center ${view === 'dashboard' ? 'scale-110 shadow-2xl' : 'hover:bg-gray-50'}`} style={{ backgroundColor: view === 'dashboard' ? colors.mint : 'transparent' }}>
              <Footprints size={28} style={{ color: view === 'dashboard' ? colors.forest : '#D1D5DB' }} />
            </button>
            <button onClick={() => setView('rewards')} className={`p-5 rounded-[28px] transition-all flex items-center justify-center ${view === 'rewards' ? 'scale-110 shadow-2xl' : 'hover:bg-gray-50'}`} style={{ backgroundColor: view === 'rewards' ? colors.mint : 'transparent' }}>
              <Wallet size={28} style={{ color: view === 'rewards' ? colors.forest : '#D1D5DB' }} />
            </button>
            <button onClick={() => setView('profile')} className={`p-5 rounded-[28px] transition-all flex items-center justify-center ${view === 'profile' ? 'scale-110 shadow-2xl' : 'hover:bg-gray-50'}`} style={{ backgroundColor: view === 'profile' ? colors.mint : 'transparent' }}>
              <Smile size={28} style={{ color: view === 'profile' ? colors.forest : '#D1D5DB' }} />
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Popup Modal */}
      {showJournalConfirm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-10 bg-black bg-opacity-70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white p-14 rounded-[70px] text-center space-y-8 shadow-2xl animate-in zoom-in duration-300 max-w-[360px] border-[6px] border-mint">
            <div className="w-24 h-24 bg-mint bg-opacity-40 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-mint">
              <ShieldCheck size={60} style={{ color: colors.forest }} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-forest tracking-tighter leading-none">Streak<br/>Protected!</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed px-4">Well done, Athhar. Consistency is about mind and body. Day saved!</p>
            </div>
            <div className="flex items-center gap-3 px-8 py-4 rounded-full shadow-lg border mx-auto w-fit" style={{ backgroundColor: colors.forest, borderColor: colors.mint }}>
                <Leaf size={18} style={{ color: colors.mint }} />
                <span className="text-sm font-black text-white uppercase tracking-widest">+50 Kita Points</span>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f3f4f6; overflow: hidden; }
      `}} />
    </div>
  );
};

export default App;