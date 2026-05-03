import { motion } from 'framer-motion';
import { LockKeyhole, FileKey2, Building, EyeOff, Users, ShieldAlert, TrendingUp, Search, Calendar, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

export default function Intranet() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [corpId, setCorpId] = useState('');
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Cargar datos de Supabase cuando se inicia sesión
  useEffect(() => {
    if (isLoggedIn) {
      fetchDashboardData();
    }
  }, [isLoggedIn]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from('risk_assessments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (!error && data) {
      setReports(data);
    }
    setLoadingData(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    try {
      // Login simulado - acepta cualquier credencial corporativa para fines de demo
      if (corpId && password) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      alert(t('intranet.login.error'));
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex-1 bg-[#030305] p-6 lg:p-10 pt-28">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header del Dashboard */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{t('intranet.dashboard.title')}</h1>
              <div className="text-gray-500 text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('intranet.dashboard.status')}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchDashboardData}
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="px-6 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-500/20 transition-all cursor-pointer"
              >
                {t('intranet.dashboard.btn_logout')}
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: t('intranet.dashboard.stats.leads'), value: reports.length, icon: Users, color: 'sky' },
              { label: t('intranet.dashboard.stats.alerts'), value: reports.filter(r => r.score < 40).length, icon: ShieldAlert, color: 'red' },
              { label: t('intranet.dashboard.stats.compliance'), value: reports.length > 0 ? `${Math.round(reports.reduce((a,b)=>a+b.score, 0)/reports.length)}%` : t('intranet.dashboard.table.na'), icon: TrendingUp, color: 'emerald' },
              { label: t('intranet.dashboard.stats.ops'), value: '14', icon: Building, color: 'amber' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0B0D14] border border-white/5 p-6 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t('intranet.dashboard.stats.live')}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Reportes Recientes */}
          <div className="bg-[#0B0D14] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-500" />
                {t('intranet.dashboard.table.title')}
              </h3>
              <div className="text-xs text-gray-500 font-mono">DB-VER: 1.0.42</div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('intranet.dashboard.table.col_entity')}</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('intranet.dashboard.table.col_contact')}</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('intranet.dashboard.table.col_score')}</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('intranet.dashboard.table.col_date')}</th>
                    <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">{t('intranet.dashboard.table.col_action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loadingData ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center">
                        <div className="w-10 h-10 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin mx-auto mb-4" />
                        <span className="text-gray-500 text-sm">{t('intranet.dashboard.table.loading')}</span>
                      </td>
                    </tr>
                  ) : reports.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center">
                        <span className="text-gray-500 text-sm">{t('intranet.dashboard.table.empty')}</span>
                      </td>
                    </tr>
                  ) : reports.map((report) => (
                    <tr key={report.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                            <Building className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm">{report.company}</p>
                            <p className="text-gray-500 text-[11px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-sky-500" /> {report.location || t('intranet.dashboard.table.na')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-white text-sm">{report.lead_name}</p>
                        <p className="text-gray-500 text-[11px]">{report.email}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${report.score >= 70 ? 'bg-emerald-500' : report.score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${report.score}%` }} 
                            />
                          </div>
                          <span className={`text-xs font-bold ${report.score >= 70 ? 'text-emerald-400' : report.score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                            {report.score}%
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <button className="text-sky-400 hover:text-sky-300 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          {t('intranet.dashboard.table.btn_view')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center py-24 px-6 relative z-10 bg-[#060608]">
      {/* Background Corporate Grid */}
      <div className="absolute inset-0 top-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-600/20 to-[#EAB308]/20 rounded-2xl blur-xl" />

        <div className="bg-[#0B0D14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1A1C23] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Building className="w-7 h-7 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{t('intranet.login.title')}</h2>
            <p className="text-gray-400 text-sm">{t('intranet.login.subtitle')}</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('intranet.login.id_label')}</label>
              <div className="relative">
                <FileKey2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#12141C] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-gray-600"
                  placeholder={t('intranet.login.id_ph')}
                  disabled={isAuthenticating}
                  value={corpId}
                  onChange={(e) => setCorpId(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('intranet.login.pwd_label')}</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-[#12141C] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-gray-600"
                  placeholder={t('intranet.login.pwd_ph')}
                  disabled={isAuthenticating}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              disabled={isAuthenticating}
              className={`w-full relative overflow-hidden rounded-xl font-semibold py-3.5 transition-all mt-8 cursor-pointer ${
                isAuthenticating 
                  ? 'bg-[#12141C] border border-white/10 text-sky-400 cursor-wait' 
                  : 'bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
              }`}
            >
              {isAuthenticating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
                  <span className="text-sm">{t('intranet.login.btn_auth')}</span>
                </div>
              ) : (
                t('intranet.login.btn_submit')
              )}
            </button>
          </form>

          {/* Warning Banner */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-gray-500 shrink-0" />
            <p className="text-[11px] leading-relaxed text-gray-500 font-medium">
              {t('intranet.login.warning')}
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
