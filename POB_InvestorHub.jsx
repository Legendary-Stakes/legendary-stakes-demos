import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Shield, Clock, CheckCircle, AlertCircle, DollarSign, Users, Activity, ChevronRight, Lock, Unlock, Play, Pause, Eye, FileText, ArrowRight, Zap, Target, Award, RefreshCw, Building, Coins, BarChart3, PiggyBank } from 'lucide-react';

// Simulated data for the dashboard
const escrowData = {
  committed: 1000000,
  deployed: 155000,
  remaining: 845000,
  valueCreated: 11000000,
  roiMultiplier: 71
};

const jobsData = [
  { id: 1, name: 'Database Schema Design', owner: 'Callum', cost: 2000, value: 10000, status: 'complete', auditStatus: 'approved', week: 1 },
  { id: 2, name: 'AWS Infrastructure Setup', owner: 'Jonathan', cost: 3000, value: 15000, status: 'complete', auditStatus: 'approved', week: 1 },
  { id: 3, name: 'Horse Data Ingestion Pipeline', owner: 'Spencer', cost: 5000, value: 25000, status: 'complete', auditStatus: 'approved', week: 2 },
  { id: 4, name: 'RPI Calculation Engine v0.1', owner: 'Spencer', cost: 8000, value: 40000, status: 'complete', auditStatus: 'approved', week: 3 },
  { id: 5, name: 'User Authentication System', owner: 'Callum', cost: 4000, value: 20000, status: 'complete', auditStatus: 'approved', week: 3 },
  { id: 6, name: 'Horse Profile Page Frontend', owner: 'TBD', cost: 3000, value: 15000, status: 'in_progress', auditStatus: 'pending', week: 4 },
  { id: 7, name: 'RPI API Endpoint', owner: 'Spencer', cost: 5000, value: 25000, status: 'in_progress', auditStatus: 'pending', week: 4 },
  { id: 8, name: 'Performance History Display', owner: 'Frontend Dev', cost: 4000, value: 20000, status: 'scheduled', auditStatus: null, week: 5 },
  { id: 9, name: 'Live Scoreboard System', owner: 'Spencer', cost: 6000, value: 30000, status: 'scheduled', auditStatus: null, week: 5 },
  { id: 10, name: 'Owner Profile Pages', owner: 'Frontend Dev', cost: 3500, value: 17500, status: 'scheduled', auditStatus: null, week: 6 },
];

const multiplierTrend = [
  { week: 1, multiplier: 5, cost: 5000, efficiency: 100 },
  { week: 2, multiplier: 5, cost: 5000, efficiency: 100 },
  { week: 3, multiplier: 6, cost: 4200, efficiency: 116 },
  { week: 4, multiplier: 7, cost: 3500, efficiency: 143 },
  { week: 5, multiplier: 8, cost: 3000, efficiency: 167 },
  { week: 6, multiplier: 10, cost: 2500, efficiency: 200 },
  { week: 7, multiplier: 12, cost: 2000, efficiency: 250 },
  { week: 8, multiplier: 15, cost: 1500, efficiency: 333 },
  { week: 9, multiplier: 18, cost: 1200, efficiency: 417 },
  { week: 10, multiplier: 20, cost: 1000, efficiency: 500 },
  { week: 11, multiplier: 25, cost: 800, efficiency: 625 },
  { week: 12, multiplier: 30, cost: 600, efficiency: 833 },
];

const valueCreationHistory = [
  { month: 'Jan', deployed: 25000, value: 125000, cumDeployed: 25000, cumValue: 125000 },
  { month: 'Feb', deployed: 35000, value: 245000, cumDeployed: 60000, cumValue: 370000 },
  { month: 'Mar', deployed: 45000, value: 540000, cumDeployed: 105000, cumValue: 910000 },
  { month: 'Apr', deployed: 30000, value: 540000, cumDeployed: 135000, cumValue: 1450000 },
  { month: 'May', deployed: 20000, value: 600000, cumDeployed: 155000, cumValue: 2050000 },
];

const exitOptions = [
  { name: 'Phase Buyback', description: 'Sell up to 25% at current valuation', returnRate: '60%', timeline: '6 months', risk: 'Low', color: '#10B981' },
  { name: 'Revenue Share', description: 'Convert to perpetual income stream', returnRate: '$200K/yr', timeline: 'Perpetual', risk: 'Medium', color: '#3B82F6' },
  { name: 'Exchange Trading', description: 'Trade LS Tokens on Bloodstock Exchange', returnRate: 'Variable', timeline: '24/7', risk: 'Medium', color: '#8B5CF6' },
  { name: 'Coin Conversion', description: '25% bonus + platform utility', returnRate: '+25%', timeline: 'Immediate', risk: 'Medium', color: '#F59E0B' },
  { name: 'Secondary Sale', description: 'Company-facilitated buyer matching', returnRate: 'Market', timeline: '30 days', risk: 'Low', color: '#EC4899' },
  { name: 'Profit Distribution', description: '30% quarterly profit share', returnRate: '$54K/yr', timeline: 'Quarterly', risk: 'Low', color: '#06B6D4' },
];

export default function POBInvestorHub() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState(null);
  const [liveTime, setLiveTime] = useState(new Date());
  const [animatedValue, setAnimatedValue] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedExit, setSelectedExit] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const target = escrowData.valueCreated;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedValue(target);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-emerald-500';
      case 'in_progress': return 'bg-amber-500';
      case 'scheduled': return 'bg-slate-500';
      default: return 'bg-slate-400';
    }
  };

  const getAuditIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-400" />;
      default: return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const completedJobs = jobsData.filter(j => j.status === 'complete').length;
  const totalJobs = jobsData.length;
  const progressPercent = (completedJobs / totalJobs) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-emerald-400">PROOF-OF-BUILD</span>
                  <span className="text-white ml-2">CAPITAL™</span>
                </h1>
                <p className="text-xs text-slate-400 tracking-widest uppercase">Investor Dashboard • Legendary Stakes</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Live</p>
                <p className="text-sm font-mono text-emerald-400">{liveTime.toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Phase 1 Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'jobs', label: 'Job Tracker', icon: FileText },
              { id: 'ai', label: 'AI Compound Effect', icon: Zap },
              { id: 'exits', label: 'Exit Options', icon: Unlock },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === id
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-emerald-400/80 uppercase tracking-wider mb-1">Value Created</p>
                    <p className="text-5xl font-bold text-white tracking-tight">
                      {formatCurrency(animatedValue)}
                    </p>
                    <p className="text-sm text-slate-400 mt-2">
                      From {formatCurrency(escrowData.deployed)} deployed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-2xl font-bold text-emerald-400">{escrowData.roiMultiplier}x</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">ROI Multiplier</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">Escrow Balance</p>
                </div>
                <p className="text-3xl font-bold text-white">{formatCurrency(escrowData.remaining)}</p>
                <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                    style={{ width: `${(escrowData.remaining / escrowData.committed) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {((escrowData.remaining / escrowData.committed) * 100).toFixed(1)}% remaining
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider">Phase Progress</p>
                </div>
                <p className="text-3xl font-bold text-white">{completedJobs}/{totalJobs}</p>
                <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Jobs Complete</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Value Creation vs Capital Deployed
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={valueCreationHistory}>
                      <defs>
                        <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="deployGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `$${v/1000}K`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#94A3B8' }}
                        formatter={(value) => [`$${(value/1000).toFixed(0)}K`, '']}
                      />
                      <Area type="monotone" dataKey="cumValue" name="Value Created" stroke="#10B981" fill="url(#valueGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="cumDeployed" name="Capital Deployed" stroke="#3B82F6" fill="url(#deployGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-slate-400">Value Created</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm text-slate-400">Capital Deployed</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  ROI Multiplier Acceleration
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={multiplierTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="week" stroke="#64748B" fontSize={12} tickFormatter={(v) => `W${v}`} />
                      <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `${v}x`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#94A3B8' }}
                        formatter={(value, name) => [name === 'multiplier' ? `${value}x` : `$${value}`, name === 'multiplier' ? 'ROI Multiplier' : 'Cost/Feature']}
                      />
                      <Line type="monotone" dataKey="multiplier" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', strokeWidth: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-sm text-slate-500 mt-4">
                  AI compound effect: Multiplier grows as development efficiency increases
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live Activity Feed
              </h3>
              <div className="space-y-3">
                {jobsData.slice(0, 5).map((job, idx) => (
                  <div key={job.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 transition-all cursor-pointer group"
                    onClick={() => setSelectedJob(job)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`} />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{job.name}</p>
                        <p className="text-xs text-slate-500">{job.owner} • Week {job.week}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-400">+{formatCurrency(job.value)}</p>
                        <p className="text-xs text-slate-500">-{formatCurrency(job.cost)}</p>
                      </div>
                      {getAuditIcon(job.auditStatus)}
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Job Execution Tracker</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-slate-400">Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm text-slate-400">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500" />
                  <span className="text-sm text-slate-400">Scheduled</span>
                </div>
              </div>
            </div>

            {/* 7-Step Workflow */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-6">Proof-of-Build 7-Step Cycle</h3>
              <div className="flex items-center justify-between">
                {[
                  { step: 1, label: 'Escrow Setup', icon: Lock, color: 'blue' },
                  { step: 2, label: 'Job Scheduled', icon: FileText, color: 'slate' },
                  { step: 3, label: 'Work Begins', icon: Play, color: 'amber' },
                  { step: 4, label: 'Completion', icon: CheckCircle, color: 'cyan' },
                  { step: 5, label: 'CTO Audit', icon: Eye, color: 'purple' },
                  { step: 6, label: 'Withdrawal', icon: DollarSign, color: 'emerald' },
                  { step: 7, label: 'Value Credited', icon: TrendingUp, color: 'emerald' },
                ].map(({ step, label, icon: Icon, color }, idx) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full bg-${color}-500/20 flex items-center justify-center mb-2`}>
                        <Icon className={`w-5 h-5 text-${color}-400`} />
                      </div>
                      <p className="text-xs text-slate-400 text-center max-w-16">{label}</p>
                    </div>
                    {idx < 6 && <ArrowRight className="w-5 h-5 text-slate-600" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Jobs Table */}
            <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left p-4 text-xs text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-left p-4 text-xs text-slate-400 uppercase tracking-wider">Job Name</th>
                    <th className="text-left p-4 text-xs text-slate-400 uppercase tracking-wider">Owner</th>
                    <th className="text-right p-4 text-xs text-slate-400 uppercase tracking-wider">Cost</th>
                    <th className="text-right p-4 text-xs text-slate-400 uppercase tracking-wider">Value</th>
                    <th className="text-right p-4 text-xs text-slate-400 uppercase tracking-wider">Multiplier</th>
                    <th className="text-center p-4 text-xs text-slate-400 uppercase tracking-wider">Audit</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsData.map((job) => (
                    <tr 
                      key={job.id} 
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`} />
                          <span className="text-xs text-slate-400 capitalize">{job.status.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-white font-medium">{job.name}</td>
                      <td className="p-4 text-sm text-slate-400">{job.owner}</td>
                      <td className="p-4 text-sm text-slate-400 text-right">{formatCurrency(job.cost)}</td>
                      <td className="p-4 text-sm text-emerald-400 text-right font-semibold">{formatCurrency(job.value)}</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                          {(job.value / job.cost).toFixed(0)}x
                        </span>
                      </td>
                      <td className="p-4 text-center">{getAuditIcon(job.auditStatus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Jobs</p>
                <p className="text-2xl font-bold text-white">{totalJobs}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Completed</p>
                <p className="text-2xl font-bold text-emerald-400">{completedJobs}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(jobsData.reduce((a, b) => a + b.cost, 0))}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Value</p>
                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(jobsData.reduce((a, b) => a + b.value, 0))}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">The Compound AI Effect</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Watch our AI development machine get smarter every week. Same work, lower cost, higher value.
              </p>
            </div>

            {/* AI Progress Timeline */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { weeks: '1-4', phase: 'Foundation', cost: '$1,000', time: '5 days', quality: 'Good', multiplier: '5x', color: 'slate' },
                { weeks: '5-8', phase: 'AI Assists', cost: '$700', time: '3 days', quality: 'Better', multiplier: '7x', color: 'blue' },
                { weeks: '9-12', phase: 'AI Leads', cost: '$400', time: '1 day', quality: 'Excellent', multiplier: '12x', color: 'purple' },
                { weeks: '13-16', phase: 'AI Compounds', cost: '$200', time: '4 hours', quality: 'Superior', multiplier: '20x', color: 'emerald' },
              ].map((stage, idx) => (
                <div key={idx} className={`p-6 rounded-2xl bg-gradient-to-br from-${stage.color}-500/10 to-${stage.color}-500/5 border border-${stage.color}-500/20 backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Week {stage.weeks}</span>
                    <span className={`text-2xl font-bold text-${stage.color}-400`}>{stage.multiplier}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">{stage.phase}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cost/Feature:</span>
                      <span className="text-white font-medium">{stage.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Build Time:</span>
                      <span className="text-white font-medium">{stage.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Quality:</span>
                      <span className="text-white font-medium">{stage.quality}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Efficiency Chart */}
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-cyan-400" />
                Development Efficiency Over Time
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={multiplierTrend}>
                    <defs>
                      <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="week" stroke="#64748B" fontSize={12} tickFormatter={(v) => `Week ${v}`} />
                    <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#94A3B8' }}
                      formatter={(value) => [`${value}%`, 'Efficiency Gain']}
                    />
                    <Area type="monotone" dataKey="efficiency" stroke="#06B6D4" fill="url(#efficiencyGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-sm text-cyan-400">
                  <strong>833% efficiency gain by Week 12</strong> — The same feature that cost $5,000 in Week 1 
                  costs just $600 in Week 12, while creating MORE value due to improved quality and integration.
                </p>
              </div>
            </div>

            {/* Investor Psychology */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                The Investor's Reaction
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  '"Holy shit, this is a compounding machine"',
                  '"I need to fund Phase 2 IMMEDIATELY"',
                  '"Can I increase my escrow commitment?"',
                ].map((quote, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <p className="text-white italic text-sm">{quote}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exits' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Multi-Path Liquidity Options</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Unlike traditional startups where you wait 10 years, Legendary Stakes offers 6 exit paths starting at 6 months.
              </p>
            </div>

            {/* Exit Options Grid */}
            <div className="grid grid-cols-3 gap-4">
              {exitOptions.map((option, idx) => (
                <div 
                  key={idx}
                  onClick={() => { setSelectedExit(option); setShowExitModal(true); }}
                  className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${option.color}20` }}
                    >
                      {idx === 0 && <PiggyBank className="w-6 h-6" style={{ color: option.color }} />}
                      {idx === 1 && <DollarSign className="w-6 h-6" style={{ color: option.color }} />}
                      {idx === 2 && <BarChart3 className="w-6 h-6" style={{ color: option.color }} />}
                      {idx === 3 && <Coins className="w-6 h-6" style={{ color: option.color }} />}
                      {idx === 4 && <Users className="w-6 h-6" style={{ color: option.color }} />}
                      {idx === 5 && <Building className="w-6 h-6" style={{ color: option.color }} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">{option.name}</h3>
                      <p className="text-xs text-slate-500">{option.timeline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{option.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: option.color }}>{option.returnRate}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      option.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {option.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Example Scenario */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Example: $100K Investment Journey
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { month: 'Month 6', action: 'Sell 25%', result: '$40K cash', detail: '40% return' },
                  { month: 'Month 12', action: 'Sell 30%', result: '$112.5K cash', detail: '152% cumulative' },
                  { month: 'Month 18', action: 'Convert 25%', result: '$50K/year', detail: 'Revenue share' },
                  { month: 'Year 5', action: 'Hold 20%', result: '$2.5M equity', detail: 'At IPO' },
                ].map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">{step.month}</p>
                    <p className="text-sm text-slate-400 mb-2">{step.action}</p>
                    <p className="text-xl font-bold text-white">{step.result}</p>
                    <p className="text-xs text-slate-500 mt-1">{step.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-sm text-emerald-400">
                  <strong>Total Value at Year 5:</strong> $152.5K cashed out + $150K income received + $2.5M equity = 
                  <span className="text-white font-bold ml-2">$2.8M (28x return)</span>
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Traditional vs. Proof-of-Build Exits</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <h4 className="text-red-400 font-semibold mb-3">Traditional Model ❌</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Money gone immediately</li>
                    <li>• Quarterly updates with vague metrics</li>
                    <li>• No accountability until exit (5+ years)</li>
                    <li>• 80% of startups miss milestones</li>
                    <li>• Zero liquidity options</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-emerald-400 font-semibold mb-3">Proof-of-Build Model ✅</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Funds stay locked & safe</li>
                    <li>• Daily/weekly visibility into progress</li>
                    <li>• Immediate ROI validation on every dollar</li>
                    <li>• CTO approval before any withdrawal</li>
                    <li>• 6 exit paths starting at 6 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedJob(null)}>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedJob.name}</h3>
                <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedJob.status)}`} />
                  <span className="text-slate-400 capitalize">{selectedJob.status.replace('_', ' ')}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Owner</p>
                    <p className="text-white">{selectedJob.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Week</p>
                    <p className="text-white">{selectedJob.week}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Build Cost</p>
                    <p className="text-white">{formatCurrency(selectedJob.cost)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Value Created</p>
                    <p className="text-emerald-400 font-bold">{formatCurrency(selectedJob.value)}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">ROI Multiplier</span>
                    <span className="text-2xl font-bold text-emerald-400">{(selectedJob.value / selectedJob.cost).toFixed(0)}x</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Audit Status:</span>
                  {getAuditIcon(selectedJob.auditStatus)}
                  <span className="text-white capitalize">{selectedJob.auditStatus || 'Not Started'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/50 backdrop-blur-sm bg-slate-900/20 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-500">© 2026 Legendary Stakes. Proof-of-Build Capital™ is patent-pending.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>Phase 1 Escrow: <span className="text-emerald-400">{formatCurrency(escrowData.committed)}</span></span>
              <span>•</span>
              <span>Contact: <span className="text-white">investors@legendarystakes.com</span></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
