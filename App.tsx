
import React, { useState } from 'react';
import { AppStep, AppState, ProjectType, RoomCount, FurnishingStatus, PaintQuality } from './types';
import { INITIAL_ROOMS, PRICING } from './constants';
import { Stepper } from './components/Stepper';
import { 
  Home, 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  LayoutPanelLeft, 
  Box, 
  Paintbrush, 
  CheckCircle2, 
  Lock, 
  Mail, 
  EyeOff, 
  ArrowRight,
  Globe,
  Sun,
  Moon
} from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, setState] = useState<AppState>({
    step: AppStep.PROJECT_TYPE,
    projectType: 'Residential',
    roomCount: '2+1',
    furnishingStatus: 'Empty',
    scope: 'Whole',
    selectedRooms: INITIAL_ROOMS.map(r => ({ ...r })),
    paintQuality: 'Standard',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoginLoading(false);
    }, 1200);
  };

  const nextStep = () => setState(prev => ({ ...prev, step: Math.min(prev.step + 1, AppStep.QUOTE) }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, AppStep.PROJECT_TYPE) }));
  const goToStep = (step: AppStep) => setState(prev => ({ ...prev, step }));

  const updateState = <K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const calculatePrice = () => {
    let total = 0;
    if (state.scope === 'Whole') {
      const base = PRICING.base[state.projectType];
      const multiplier = PRICING.roomMultiplier[state.roomCount];
      total = base * multiplier;
      if (state.furnishingStatus === 'Furnished') total *= PRICING.furnishingMarkup;
    } else {
      state.selectedRooms.forEach(room => {
        if (room.walls) total += PRICING.regionalRates.wall;
        if (room.ceiling) total += PRICING.regionalRates.ceiling;
      });
      if (state.furnishingStatus === 'Furnished') total *= 1.15;
    }
    return total * PRICING.paintMultiplier[state.paintQuality];
  };

  const commonCardClass = `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 transition-all duration-500 shadow-xl`;

  const ThemeToggle = () => (
    <button 
      onClick={toggleDarkMode}
      className="fixed top-6 right-6 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl text-gray-600 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all z-50 border border-gray-100 dark:border-slate-700"
      title={isDarkMode ? "Aydınlık Mod" : "Karanlık Mod"}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  if (!isLoggedIn) {
    return (
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
          <ThemeToggle />
          
          <div className="w-full max-w-sm animate-in fade-in zoom-in duration-700">
            <div className="text-center mb-6">
              <div className="inline-flex w-12 h-12 bg-blue-600 rounded-xl items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 mb-3 rotate-3">
                <Paintbrush size={24} />
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">ProTeklif</h1>
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Akıllı Boyama Sistemi</p>
            </div>

            <div className={`${commonCardClass} rounded-3xl p-8`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Hoş Geldiniz</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">E-Posta</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input 
                      required
                      type="email" 
                      placeholder="ornek@mail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Şifre</label>
                    <button type="button" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">Unuttum?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input 
                      required
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 outline-none transition-all font-medium text-sm dark:text-white"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 hover:text-gray-600">
                      <EyeOff size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-1">
                  <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-slate-800" />
                  <label htmlFor="remember" className="text-xs font-medium text-gray-500 dark:text-slate-400 cursor-pointer select-none">Beni Hatırla</label>
                </div>

                <button 
                  type="submit" 
                  disabled={loginLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 text-sm active:scale-[0.98]"
                >
                  {loginLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Giriş Yap <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="absolute w-full h-px bg-gray-100 dark:bg-slate-800"></div>
                  <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Veya</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-gray-600 dark:text-slate-300">
                    <Globe size={14} /> Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-gray-600 dark:text-slate-300">
                    Apple
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-center mt-6 text-xs font-medium text-gray-500 dark:text-slate-400">
              Hesabınız yok mu? <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Kaydolun</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (state.step) {
      case AppStep.PROJECT_TYPE:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Proje Tipini Seçin</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Hangi tür alanı boyatmak istiyorsunuz?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'Residential', title: 'Konut / Ev', desc: 'Daire, villa veya müstakil ev projeleri.', icon: <Home className="text-blue-600 dark:text-blue-400" size={32} /> },
                { id: 'Commercial', title: 'Ticari / Ofis', desc: 'Mağaza, ofis veya endüstriyel alanlar.', icon: <Building2 className="text-blue-600 dark:text-blue-400" size={32} /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { updateState('projectType', item.id as ProjectType); nextStep(); }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg active:scale-[0.98] ${
                    state.projectType === item.id ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 ring-2 ring-blue-100 dark:ring-blue-900/40' : 'border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800/50'
                  }`}
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case AppStep.HOME_DETAILS:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{state.projectType === 'Residential' ? 'Konut' : 'Ofis'} Detayları</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Alanınızın büyüklüğünü ve durumunu belirtin.</p>
            </div>
            
            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Oda Sayısı</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {['1+0', '1+1', '2+1', '3+1', '4+1', '5+1+'].map(count => (
                  <button
                    key={count}
                    onClick={() => updateState('roomCount', count as RoomCount)}
                    className={`py-3 px-2 rounded-xl border font-bold transition-all text-sm active:scale-95 ${
                      state.roomCount === count ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-gray-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-800'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Eşya Durumu</label>
              <div className="flex gap-3">
                {[
                  { id: 'Empty', label: 'Boş Daire', desc: 'Hızlı çalışma.' },
                  { id: 'Furnished', label: 'Eşyalı', desc: 'Koruma gerektirir.' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => updateState('furnishingStatus', item.id as FurnishingStatus)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-left active:scale-[0.98] ${
                      state.furnishingStatus === item.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800/50'
                    }`}
                  >
                    <span className="block font-bold text-gray-900 dark:text-white text-sm">{item.label}</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-medium">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button onClick={prevStep} className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-bold hover:text-gray-700 dark:hover:text-slate-300 text-sm">
                <ChevronLeft size={18} /> Geri
              </button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5 text-sm transition-all active:scale-95">
                Devam Et <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );

      case AppStep.SCOPE:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Boyanacak Alanlar</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Hangi kısımları boyatmak istiyorsunuz?</p>
            </div>

            <div className="flex p-1 bg-gray-50 dark:bg-slate-800 rounded-xl w-full max-w-xs mx-auto">
              <button
                onClick={() => updateState('scope', 'Whole')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  state.scope === 'Whole' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
                }`}
              >
                Tüm Alan
              </button>
              <button
                onClick={() => updateState('scope', 'Regional')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  state.scope === 'Regional' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
                }`}
              >
                Bölgesel
              </button>
            </div>

            {state.scope === 'Regional' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {state.selectedRooms.map(room => (
                  <div key={room.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-gray-50 dark:border-slate-700 shadow-sm transition-all hover:border-blue-100 dark:hover:border-blue-900/40">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                      <LayoutPanelLeft size={14} className="text-blue-500 dark:text-blue-400" />
                      {room.name}
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={room.walls}
                          onChange={e => {
                            const newRooms = state.selectedRooms.map(r => r.id === room.id ? { ...r, walls: e.target.checked } : r);
                            updateState('selectedRooms', newRooms);
                          }}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                        />
                        <span className="text-xs text-gray-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">Duvarlar</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={room.ceiling}
                          onChange={e => {
                            const newRooms = state.selectedRooms.map(r => r.id === room.id ? { ...r, ceiling: e.target.checked } : r);
                            updateState('selectedRooms', newRooms);
                          }}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                        />
                        <span className="text-xs text-gray-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">Tavan</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {state.scope === 'Whole' && (
              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 text-center max-w-sm mx-auto">
                <Box size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-3 opacity-80" />
                <h3 className="text-md font-bold text-blue-900 dark:text-blue-200 mb-1">Hızlı Paket</h3>
                <p className="text-xs text-blue-700/70 dark:text-blue-300/60">Tüm odaların duvar ve tavanları dahildir.</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <button onClick={prevStep} className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-bold hover:text-gray-700 dark:hover:text-slate-300 text-sm">
                <ChevronLeft size={18} /> Geri
              </button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5 text-sm transition-all active:scale-95">
                Boya Seçimi <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );

      case AppStep.PAINT_SELECTION:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Boya Kalitesi</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Bütçenize uygun kaliteyi seçin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'Economic', title: 'Ekonomik', features: ['Mat Bitiş', 'Silinebilir', 'Standart Renkler'], desc: 'Uygun fiyatlı.' },
                { id: 'Standard', title: 'Standard', features: ['İpek Mat', 'Tam Silinebilir', 'Küf Karşıtı'], desc: 'En popüler.' },
                { id: 'Premium', title: 'Premium', features: ['Kadifemsi', 'Antibakteriyel', 'Leke Tutmaz'], desc: 'Lüks seçim.' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => updateState('paintQuality', item.id as PaintQuality)}
                  className={`relative p-5 rounded-2xl border-2 transition-all text-left flex flex-col active:scale-[1.01] ${
                    state.paintQuality === item.id ? 'border-blue-600 bg-white dark:bg-slate-800 ring-2 ring-blue-50 dark:ring-blue-900/30 shadow-md scale-[1.02]' : 'border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-800/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">{item.title}</h3>
                  <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-3">{item.desc}</p>
                  <ul className="space-y-1.5 mb-6 flex-grow">
                    {item.features.map(f => (
                      <li key={f} className="text-[11px] text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-blue-300 dark:bg-blue-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`text-xs font-bold ${state.paintQuality === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-300 dark:text-slate-600'}`}>Seçildi</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6">
              <button onClick={prevStep} className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-bold hover:text-gray-700 dark:hover:text-slate-300 text-sm">
                <ChevronLeft size={18} /> Geri
              </button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5 text-sm transition-all active:scale-95">
                Teklifi Gör <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );

      case AppStep.QUOTE:
        const totalPrice = calculatePrice();
        return (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teklifiniz Hazır!</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Detaylı boyama özeti</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-4">
                  <h3 className="text-md font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-slate-700 pb-3">Proje Özeti</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Tip</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.projectType === 'Residential' ? 'Konut' : 'Ticari'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Oda</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.roomCount}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Eşya</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.furnishingStatus === 'Empty' ? 'Boş' : 'Eşyalı'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">Kalite</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{state.paintQuality}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-50 dark:border-slate-700">
                    <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Kapsam</span>
                    {state.scope === 'Whole' ? (
                      <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md uppercase tracking-wider">Tüm Alan (Hızlı Paket)</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {state.selectedRooms.filter(r => r.walls || r.ceiling).map(r => (
                          <span key={r.id} className="text-[10px] font-medium bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-400 px-2 py-0.5 rounded border border-gray-100 dark:border-slate-600">
                            {r.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Paintbrush size={14} className="text-blue-500 dark:text-blue-400" /> Dahil Hizmetler
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Boya & Malzeme', 'İşçilik', 'Eşya Koruma', 'Temizlik'].map(service => (
                      <div key={service} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400">
                        <CheckCircle2 size={12} className="text-green-500 dark:text-green-400" /> {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6 bg-blue-600 dark:bg-blue-700 text-white p-6 rounded-3xl shadow-lg space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-0.5">Toplam Tutar</h3>
                    <p className="text-blue-200 text-[10px] font-medium">Tahmini Uygulama Bedeli</p>
                  </div>

                  <div className="text-3xl font-black tracking-tight">
                    ₺{totalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  <div className="space-y-2.5">
                    <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all text-sm uppercase tracking-wider active:scale-95">
                      Teklifi Onayla
                    </button>
                    <button onClick={() => goToStep(AppStep.PROJECT_TYPE)} className="w-full bg-blue-500/50 text-white font-bold py-2.5 rounded-xl hover:bg-blue-400/50 transition-all text-xs active:scale-95">
                      Düzenle
                    </button>
                  </div>

                  <p className="text-[9px] text-blue-100/60 text-center leading-relaxed font-medium italic">
                    * Yerinde keşif sonrası kesin fiyat verilecektir. KDV hariçtir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen py-8 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
        <ThemeToggle />

        <div className="max-w-4xl mx-auto">
          <header className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <Paintbrush size={18} />
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">ProTeklif</h1>
            </div>
            <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Boya Teklif Sistemi</p>
          </header>

          <Stepper currentStep={state.step} onStepClick={goToStep} />

          <main className={`${commonCardClass} rounded-[2rem] p-6 md:p-8 mt-4 relative overflow-hidden`}>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/5 dark:bg-blue-400/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/5 dark:bg-indigo-400/10 blur-[80px] rounded-full" />
            
            <div className="relative z-10">
              {renderStep()}
            </div>
          </main>

          <footer className="mt-12 text-center text-[10px] text-gray-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] pb-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-6 opacity-60">
              <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Koşullar</button>
              <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Gizlilik</button>
              <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Destek</button>
            </div>
            <p>© 2024 ProTeklif platformu</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
