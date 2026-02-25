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
  Leaf,
} from 'lucide-react';

const App = () => {
  // Navigation & Auth State
  const [view, setView] = useState('opening');
  const [authMode, setAuthMode] = useState('signup');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Data State
  const [activeDate, setActiveDate] = useState(25);
  const [isSyncing, setIsSyncing] = useState(false);
  const [healthSynced, setHealthSynced] = useState(false);
  const [userName] = useState('Athhar');

  // App Logic State
  const [kitaPoints, setKitaPoints] = useState(1450);
  const [streak] = useState(12);
  const [showJournalConfirm, setShowJournalConfirm] = useState(false);
  const [showPointAnim, setShowPointAnim] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  // Hardcoded Colors for High Contrast Visibility
  const colors = {
    forest: '#1B4332',
    mint: '#D8F3DC',
    slate: '#495057',
    white: '#FFFFFF',
    bg: '#F3F4F6',
    rose: '#F43F5E',
    emerald: '#10B981',
    orange: '#FB923C',
  };

  // Rewards Data
  const [rewardsList] = useState([
    {
      id: 1,
      partner: 'Los Tropis',
      item: 'Dragon Fruit Bowl',
      cost: 600,
      icon: <UtensilsCrossed size={20} />,
      redeemed: false,
    },
    {
      id: 2,
      partner: 'Kopi Toko Djawa',
      item: 'Es Kopi Awan',
      cost: 350,
      icon: <Coffee size={20} />,
      redeemed: false,
    },
    {
      id: 3,
      partner: 'Langkah Wear',
      item: 'Compression Socks',
      cost: 1200,
      icon: <ShoppingBag size={20} />,
      redeemed: false,
    },
    {
      id: 4,
      partner: 'Fit Hub Bandung',
      item: '1-Day Free Pass',
      cost: 800,
      icon: <Dumbbell size={20} />,
      redeemed: true,
    },
  ]);

  const [calendarData, setCalendarData] = useState({
    24: {
      steps: 8200,
      activities: ['Running'],
      journal: 'Great morning run at Gasibu.',
    },
    25: { steps: 6432, activities: ['Walking'], journal: null },
    22: {
      steps: 1200,
      activities: ['Mental Log'],
      journal: 'Feeling exhausted of my work, will keep up tomorrow!',
    },
  });

  const getDayData = (date) =>
    calendarData[date] || { steps: 0, activities: [], journal: null };

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
    const updatedData = { ...calendarData };
    const currentData = updatedData[activeDate] || {
      steps: 0,
      activities: [],
      journal: '',
    };

    updatedData[activeDate] = {
      ...currentData,
      activities: Array.from(
        new Set([...currentData.activities, 'Mental Log'])
      ),
      journal: journalText || `Athhar feels ${selectedMood} today.`,
    };

    setCalendarData(updatedData);
    setKitaPoints((prev) => prev + 50);
    setShowPointAnim(true);
    setShowJournalConfirm(true);

    setTimeout(() => {
      setShowJournalConfirm(false);
      setShowPointAnim(false);
      setView('dashboard');
      setJournalText('');
      setSelectedMood(null);
    }, 3500);
  };

  // --- UI Components ---

  const OpeningScreen = () => (
    <div className="h-full flex flex-col justify-between p-10 bg-white animate-in fade-in duration-700">
      <div className="mt-16 space-y-6">
        <div
          className="w-20 h-20 rounded-[28px] flex items-center justify-center shadow-2xl rotate-3"
          style={{ backgroundColor: colors.forest }}
        >
          <Footprints size={40} style={{ color: colors.mint }} />
        </div>
        <div className="space-y-2">
          <h1
            className="text-6xl font-black tracking-tighter leading-none"
            style={{ color: colors.forest }}
          >
            Langkah
            <br />
            Kita.
          </h1>
          <div
            className="h-2 w-16 rounded-full"
            style={{ backgroundColor: colors.mint }}
          />
        </div>
        <p className="text-xl font-medium leading-relaxed text-gray-400 max-w-[240px]">
          Your guilt-free companion for a balanced life.
        </p>
      </div>
      <div className="space-y-5">
        <button
          onClick={() => setView('auth')}
          className="w-full py-5 rounded-[32px] text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 group active:scale-95 transition-all"
          style={{ backgroundColor: colors.forest }}
        >
          Get Started{' '}
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <p className="text-center text-sm font-medium text-gray-400">
          Already a member?{' '}
          <span
            className="font-bold cursor-pointer underline decoration-mint underline-offset-4"
            style={{ color: colors.forest }}
            onClick={() => {
              setAuthMode('login');
              setView('auth');
            }}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  const AuthScreen = () => (
    <div className="h-full flex flex-col p-8 bg-white animate-in slide-in-from-right-5">
      <button
        onClick={() => setView('opening')}
        className="p-3 w-fit rounded-2xl bg-gray-50 mb-10 active:scale-90 transition-all"
        style={{ color: colors.forest }}
      >
        <ArrowLeft size={20} />
      </button>
      <div className="mb-10">
        <h2
          className="text-4xl font-black tracking-tight"
          style={{ color: colors.forest }}
        >
          {authMode === 'signup' ? 'Join Us.' : 'Welcome back.'}
        </h2>
        <p className="text-gray-400 mt-2 font-medium italic">
          {authMode === 'signup'
            ? 'Start your journey with Athhar.'
            : 'Consistency starts within.'}
        </p>
      </div>
      <form onSubmit={handleAuthSubmit} className="space-y-5">
        {authMode === 'signup' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Athhar"
              className="w-full py-4 px-6 rounded-[24px] bg-gray-50 border-2 border-transparent focus:border-forest outline-none transition-all font-medium"
            />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="athhar@langkahkita.com"
            className="w-full py-4 px-6 rounded-[24px] bg-gray-50 border-2 border-transparent focus:border-forest outline-none transition-all font-medium"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-gray-400">
            Password
          </label>
          <input
            type="password"
            defaultValue="password123"
            className="w-full py-4 px-6 rounded-[24px] bg-gray-50 border-2 border-transparent focus:border-forest outline-none transition-all font-medium"
          />
        </div>
        <button
          type="submit"
          className="w-full py-5 rounded-[32px] text-white font-bold text-lg shadow-xl mt-4 active:scale-95 transition-all"
          style={{ backgroundColor: colors.forest }}
        >
          {authMode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>
      </form>
    </div>
  );

  const CalendarSection = () => {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <div className="bg-white p-5 rounded-[36px] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-md" style={{ color: colors.forest }}>
            February 2026
          </h3>
          <div className="flex gap-3 text-gray-300">
            <ChevronLeft size={18} />
            <ChevronRight size={18} />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-y-3 text-center mb-4">
          {dayLabels.map((l, i) => (
            <span
              key={i}
              className="text-[9px] font-black text-gray-300 tracking-widest"
            >
              {l}
            </span>
          ))}
          {days.map((d) => {
            const hasData = calendarData[d];
            const isSelected = activeDate === d;
            const hasJournal = hasData?.journal != null;
            const hasActivity = hasData?.activities.some(
              (act) => act !== 'Mental Log'
            );
            return (
              <button
                key={d}
                onClick={() => setActiveDate(d)}
                className={`relative flex items-center justify-center w-9 h-9 mx-auto rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'shadow-md scale-110 z-10 text-white'
                    : 'hover:bg-gray-50 font-bold'
                }`}
                style={{
                  backgroundColor: isSelected ? colors.forest : 'transparent',
                  color: isSelected ? colors.white : colors.forest,
                }}
              >
                <span className="text-xs">{d}</span>
                <div className="absolute bottom-1 flex gap-0.5">
                  {hasActivity && (
                    <div
                      className="w-1 h-1 rounded-full ring-1 ring-white"
                      style={{ backgroundColor: colors.emerald }}
                    />
                  )}
                  {hasJournal && (
                    <div
                      className="w-1 h-1 rounded-full ring-1 ring-white"
                      style={{ backgroundColor: colors.rose }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="pt-4 border-t border-gray-50 flex gap-4">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.emerald }}
            />
            <span className="text-[9px] font-bold text-gray-400 uppercase">
              Sport
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.rose }}
            />
            <span className="text-[9px] font-bold text-gray-400 uppercase">
              Mental
            </span>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const data = getDayData(activeDate);
    const hasJournal = data.journal !== null;
    return (
      <div className="space-y-5 animate-in fade-in duration-500">
        <header className="flex justify-between items-center">
          <div>
            <h1
              className="text-2xl font-black"
              style={{ color: colors.forest }}
            >
              Hi, {userName}!
            </h1>
            <p className="text-xs font-semibold text-gray-400">
              Balance is the key 🌿
            </p>
          </div>
          <div
            onClick={() => setView('profile')}
            className="w-10 h-10 rounded-xl bg-white border-2 shadow-sm flex items-center justify-center cursor-pointer active:scale-90 transition-all overflow-hidden"
            style={{ borderColor: colors.mint }}
          >
            <User size={20} style={{ color: colors.forest }} />
          </div>
        </header>
        <CalendarSection />
        <div
          className="p-4 rounded-[28px] border bg-white flex items-center justify-between shadow-sm"
          style={{ borderColor: 'rgba(27, 67, 50, 0.05)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl text-white`}
              style={{
                backgroundColor: healthSynced ? colors.forest : '#D1D5DB',
              }}
            >
              <Smartphone size={18} />
            </div>
            <div>
              <p
                className="text-xs font-black"
                style={{ color: colors.forest }}
              >
                Apple Health Sync
              </p>
              <p className="text-[9px] font-bold text-gray-400 uppercase">
                {healthSynced ? 'Synced just now' : 'Connect required'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSyncToggle}
            className={`p-1.5 rounded-xl transition-all ${
              isSyncing ? 'animate-spin' : 'text-gray-300 hover:text-forest'
            }`}
            style={{ color: isSyncing ? colors.forest : undefined }}
          >
            <RefreshCcw size={20} />
          </button>
        </div>
        <div
          onClick={() => setView('journal')}
          className="p-5 rounded-[32px] border-2 border-dashed flex items-center gap-4 cursor-pointer hover:bg-opacity-20 transition-all group active:scale-[0.98]"
          style={{
            borderColor: colors.mint,
            backgroundColor: hasJournal ? colors.mint + '40' : 'transparent',
          }}
        >
          <div
            className="p-2.5 bg-white rounded-xl shadow-sm group-hover:rotate-12 transition-transform"
            style={{ color: colors.forest }}
          >
            {hasJournal ? (
              <CheckCircle2 size={20} style={{ color: colors.emerald }} />
            ) : (
              <PenLine size={20} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-black" style={{ color: colors.forest }}>
              {hasJournal ? 'Log Completed' : 'Mental Daily Log'}
            </p>
            <p className="text-[10px] font-medium text-gray-400">
              How are you feeling today?
            </p>
          </div>
          {!hasJournal && (
            <Plus size={16} style={{ color: colors.forest, opacity: 0.3 }} />
          )}
        </div>
        <div className="bg-white p-6 rounded-[36px] border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-end mb-4 relative z-10">
            <div>
              <p className="text-[9px] font-black uppercase text-gray-400 mb-0.5">
                Today's Progress
              </p>
              <h2
                className="text-4xl font-black tracking-tighter"
                style={{ color: colors.forest }}
              >
                {data.steps.toLocaleString()}
              </h2>
              <p
                className="text-[9px] font-black uppercase mt-1"
                style={{ color: colors.emerald }}
              >
                Steps Recorded
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Footprints
                size={32}
                style={{ color: colors.forest, opacity: 0.1 }}
              />
              {hasJournal && (
                <span className="bg-rose-50 text-rose-500 text-[8px] font-black px-1.5 py-0.5 rounded-md border border-rose-100">
                  PROTECTED
                </span>
              )}
            </div>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden relative z-10">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                backgroundColor: colors.forest,
                width: `${Math.min((data.steps / 8000) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const RewardsView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <h2 className="text-2xl font-black" style={{ color: colors.forest }}>
        Rewards Hub
      </h2>
      <div className="p-7 rounded-[40px] text-white shadow-xl relative overflow-hidden bg-forest">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
            Total Balance
          </p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black tracking-tighter">
              {kitaPoints.toLocaleString()}
            </h3>
            <Wallet size={28} style={{ color: colors.mint }} />
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
          <Award size={100} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest px-2 text-gray-400">
          Available For You
        </h3>
        {rewardsList
          .filter((r) => !r.redeemed)
          .map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-[28px] border border-gray-100 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-2.5 bg-gray-50 rounded-2xl shadow-inner"
                  style={{ color: colors.forest }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs font-black mb-0.5"
                    style={{ color: colors.forest }}
                  >
                    {item.partner}
                  </p>
                  <p className="text-[10px] font-medium text-gray-400">
                    {item.item}
                  </p>
                </div>
              </div>
              <div
                className="px-3.5 py-1.5 rounded-xl text-[10px] font-black shadow-sm"
                style={{ backgroundColor: colors.mint, color: colors.forest }}
              >
                {item.cost} Pts
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <h2 className="text-2xl font-black" style={{ color: colors.forest }}>
        Profile
      </h2>
      <div className="flex flex-col items-center py-2 space-y-3">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-[32px] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: colors.forest }}
          >
            <User size={40} style={{ color: colors.mint }} />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-lg border border-gray-50">
            <ShieldCheck size={18} style={{ color: colors.emerald }} />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-black" style={{ color: colors.forest }}>
            {userName}
          </h3>
          <p
            className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mt-1.5"
            style={{ backgroundColor: colors.forest, color: colors.mint }}
          >
            Consistency Sprout 🌱
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-[36px] border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Heart size={18} style={{ color: colors.rose }} />
          <h4
            className="text-xs font-black uppercase tracking-widest"
            style={{ color: colors.forest }}
          >
            Mental Vitality
          </h4>
        </div>
        <div className="flex justify-between items-end h-28 px-1 gap-3">
          {[45, 70, 30, 85, 95, 60, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center h-full justify-end group"
            >
              <div
                className="w-full rounded-t-lg transition-all duration-700 ease-out border-2"
                style={{
                  height: `${h}%`,
                  backgroundColor: colors.mint,
                  borderColor: colors.forest,
                  opacity: 0.9,
                  borderBottom: 'none',
                }}
              />
              <span className="text-[8px] font-black text-gray-300 mt-2 uppercase">
                D{i + 1}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-center italic text-gray-400 font-medium px-2 leading-relaxed">
          "Consistency is the secret to growth."
        </p>
      </div>
      <button
        onClick={() => {
          setIsLoggedIn(false);
          setView('opening');
        }}
        className="w-full py-4 font-black text-xs bg-rose-50 rounded-[24px] hover:bg-rose-100 transition-colors"
        style={{ color: colors.rose }}
      >
        Sign Out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-200 font-sans">
      {/* PHONE FRAME CONTAINER */}
      <div className="w-[375px] h-[812px] bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] relative flex flex-col overflow-hidden border-[12px] border-gray-900">
        {/* Notch Area Simulation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-[200]"></div>

        {/* Floating Point Notification */}
        {showPointAnim && (
          <div
            className="absolute top-16 right-6 z-[250] animate-bounce text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border-2"
            style={{ backgroundColor: colors.forest, borderColor: colors.mint }}
          >
            <div
              className="p-1 rounded-full"
              style={{ backgroundColor: colors.mint }}
            >
              <Plus size={12} style={{ color: colors.forest }} />
            </div>
            <span className="font-black text-[11px] tracking-tight">
              +50 Kita Points
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
          {view === 'opening' && <OpeningScreen />}
          {view === 'auth' && <AuthScreen />}

          <div className="px-6 pt-12 pb-32">
            {isLoggedIn && (
              <>
                {view === 'dashboard' && <Dashboard />}
                {view === 'rewards' && <RewardsView />}
                {view === 'profile' && <ProfileView />}
              </>
            )}

            {view === 'journal' && (
              <div className="space-y-6 py-2 animate-in slide-in-from-bottom-10 duration-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setView('dashboard')}
                    className="p-2.5 bg-gray-50 rounded-2xl active:scale-90 transition-all"
                    style={{ color: colors.forest }}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2
                    className="text-2xl font-black"
                    style={{ color: colors.forest }}
                  >
                    Mental Log
                  </h2>
                </div>

                <div
                  className="p-6 rounded-[32px] space-y-2 border"
                  style={{
                    backgroundColor: colors.mint + '60',
                    borderColor: colors.mint,
                  }}
                >
                  <div
                    className="flex items-center gap-2"
                    style={{ color: colors.forest }}
                  >
                    <Sparkles size={16} />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Mindfulness
                    </p>
                  </div>
                  <p
                    className="text-xs font-semibold leading-relaxed italic"
                    style={{ color: colors.forest }}
                  >
                    "Your mind deserves as much care as your body."
                  </p>
                </div>

                {/* MOOD SELECTOR - HIGH CONTRAST */}
                <div className="flex justify-around py-2">
                  {[
                    {
                      id: 'happy',
                      icon: <Smile size={32} />,
                      label: 'Good',
                      hex: colors.emerald,
                    },
                    {
                      id: 'neutral',
                      icon: <Meh size={32} />,
                      label: 'Okay',
                      hex: colors.orange,
                    },
                    {
                      id: 'exhausted',
                      icon: <Frown size={32} />,
                      label: 'Sad',
                      hex: colors.rose,
                    },
                  ].map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-6 rounded-[36px] border-2 transition-all shadow-md flex flex-col items-center gap-2 active:scale-95 ${
                        selectedMood === mood.id
                          ? 'text-white'
                          : 'bg-white text-gray-400 border-gray-100'
                      }`}
                      style={{
                        backgroundColor:
                          selectedMood === mood.id ? mood.hex : colors.white,
                        borderColor:
                          selectedMood === mood.id ? mood.hex : undefined,
                      }}
                    >
                      {React.cloneElement(mood.icon, {
                        style: {
                          color:
                            selectedMood === mood.id ? colors.mint : undefined,
                        },
                      })}
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest ${
                          selectedMood === mood.id
                            ? 'text-white'
                            : 'text-gray-400'
                        }`}
                      >
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>

                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="How are you feeling today?"
                  className="w-full h-36 p-6 rounded-[32px] bg-gray-50 border-2 border-transparent focus:bg-white outline-none text-xs font-medium leading-relaxed transition-all shadow-inner"
                />

                <button
                  onClick={handleJournalSubmit}
                  className={`w-full py-5 rounded-[32px] text-white font-black text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${
                    !selectedMood ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  style={{
                    backgroundColor: !selectedMood ? '#D1D5DB' : colors.forest,
                  }}
                  disabled={!selectedMood}
                >
                  <ShieldCheck size={24} style={{ color: colors.mint }} />
                  <span>Save Reflection</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM NAV */}
        {isLoggedIn && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white bg-opacity-95 backdrop-blur-xl flex justify-around items-center border-t border-gray-50 z-40">
            <button
              onClick={() => setView('dashboard')}
              className={`p-4 rounded-[20px] transition-all ${
                view === 'dashboard' ? 'scale-110 shadow-sm' : ''
              }`}
              style={{
                backgroundColor:
                  view === 'dashboard' ? colors.mint : 'transparent',
              }}
            >
              <Footprints
                size={22}
                style={{
                  color: view === 'dashboard' ? colors.forest : '#D1D5DB',
                }}
              />
            </button>
            <button
              onClick={() => setView('rewards')}
              className={`p-4 rounded-[20px] transition-all ${
                view === 'rewards' ? 'scale-110 shadow-sm' : ''
              }`}
              style={{
                backgroundColor:
                  view === 'rewards' ? colors.mint : 'transparent',
              }}
            >
              <Wallet
                size={22}
                style={{
                  color: view === 'rewards' ? colors.forest : '#D1D5DB',
                }}
              />
            </button>
            <button
              onClick={() => setView('profile')}
              className={`p-4 rounded-[20px] transition-all ${
                view === 'profile' ? 'scale-110 shadow-sm' : ''
              }`}
              style={{
                backgroundColor:
                  view === 'profile' ? colors.mint : 'transparent',
              }}
            >
              <Smile
                size={22}
                style={{
                  color: view === 'profile' ? colors.forest : '#D1D5DB',
                }}
              />
            </button>
          </div>
        )}

        {/* HOME INDICATOR Simulation */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-200 rounded-full z-50"></div>
      </div>

      {/* Success Modal */}
      {showJournalConfirm && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-8 bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in">
          <div
            className="bg-white p-10 rounded-[56px] text-center space-y-6 shadow-2xl animate-in zoom-in duration-300 max-w-[300px] border-4"
            style={{ borderColor: colors.mint }}
          >
            <div
              className="w-20 h-20 bg-opacity-30 rounded-full flex items-center justify-center mx-auto shadow-inner border-2"
              style={{ backgroundColor: colors.mint, borderColor: colors.mint }}
            >
              <ShieldCheck size={40} style={{ color: colors.forest }} />
            </div>
            <div className="space-y-2">
              <h3
                className="text-2xl font-black tracking-tight"
                style={{ color: colors.forest }}
              >
                Streak Saved!
              </h3>
              <p className="text-xs font-medium text-gray-500 leading-relaxed">
                Consistency saved through mindfulness.
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg border mx-auto w-fit"
              style={{
                backgroundColor: colors.forest,
                borderColor: colors.mint,
              }}
            >
              <Leaf size={14} style={{ color: colors.mint }} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                +50 Kita Points
              </span>
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `,
        }}
      />
    </div>
  );
};

export default App;
