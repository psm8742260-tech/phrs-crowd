import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PhrsMapsTab({ state }: { state: any }) {
  const {
    isDarkMode,
    mapsApiKey,
    setMapsApiKey,
    mapsSelectedEndpoint,
    setMapsSelectedEndpoint,
    mapsActiveTrackingId,
    setMapsActiveTrackingId,
    phrsMapsSubTab,
    setHomeToast
  } = state;

  const {
    MapPin, Globe, Compass, Shield, Key, Sliders, HelpCircle, FileJson,
    Upload, Play, CheckCircle, Database, Check, AlertTriangle, RefreshCw,
    Star, Info, Settings, Code, BarChart2, CheckCircle2, ChevronRight, Activity, Cpu
  } = LucideIcons;

  // Overview Stats
  const overviewStats = [
    { label: 'Total API Requests', value: '184,290', change: '+12.4%', icon: Activity, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Avg Latency', value: '42 ms', change: '-4 ms', icon: Cpu, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Success Rate', value: '99.98%', change: 'Stable', icon: CheckCircle2, color: 'text-sky-600 bg-sky-50' },
    { label: 'Active Map IDs', value: '4', change: '2 Custom Styles', icon: Globe, color: 'text-amber-600 bg-amber-50' },
  ];

  // API Status State
  const [enabledApis, setEnabledApis] = useState<{ [key: string]: boolean }>({
    'Maps SDK for Android': true,
    'Geocoding API': true,
    'Distance Matrix API': true,
    'Places API': true,
    'Directions API': true,
    'Roads API': false,
    'Elevation API': false,
    'Air Quality API': true,
  });

  const toggleApi = (name: string) => {
    setEnabledApis(prev => {
      const updated = { ...prev, [name]: !prev[name] };
      setHomeToast(`Maps API "${name}" ${updated[name] ? 'Enabled' : 'Disabled'} successfully!`);
      setTimeout(() => setHomeToast(null), 2500);
      return updated;
    });
  };

  // Metrics Data
  const metricsData = [
    { name: '00:00', MapsSDK: 400, Geocoding: 240, Places: 100 },
    { name: '04:00', MapsSDK: 300, Geocoding: 139, Places: 80 },
    { name: '08:00', MapsSDK: 900, Geocoding: 980, Places: 300 },
    { name: '12:00', MapsSDK: 1400, Geocoding: 3908, Places: 500 },
    { name: '16:00', MapsSDK: 1200, Geocoding: 4800, Places: 800 },
    { name: '20:00', MapsSDK: 800, Geocoding: 3800, Places: 400 },
  ];

  // Map Styles Editor State
  const [selectedStyle, setSelectedStyle] = useState('Retro');
  const [customStyleJson, setCustomStyleJson] = useState(`[
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#193341" }]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{ "color": "#2c5a71" }]
  }
]`);

  // Geocoding API sandbox state
  const [geoInput, setGeoInput] = useState('Hyderabad, Telangana, India');
  const [geoOutput, setGeoOutput] = useState<any>({
    formatted_address: 'Hyderabad, Telangana, India',
    geometry: {
      location: { lat: 17.3850, lng: 78.4867 },
      location_type: 'APPROXIMATE',
    },
    place_id: 'ChIJK49bM_mSyzsR747S5L814m0',
    types: ['locality', 'political'],
  });
  const [geoLoading, setGeoLoading] = useState(false);

  const handleGeocode = () => {
    setGeoLoading(true);
    setTimeout(() => {
      // Simple simulation of lat/long for demo addresses
      let lat = 17.3850;
      let lng = 78.4867;
      if (geoInput.toLowerCase().includes('bangalore') || geoInput.toLowerCase().includes('bengaluru')) {
        lat = 12.9716; lng = 77.5946;
      } else if (geoInput.toLowerCase().includes('delhi')) {
        lat = 28.6139; lng = 77.2090;
      } else if (geoInput.toLowerCase().includes('mumbai')) {
        lat = 19.0760; lng = 72.8777;
      } else {
        // Pseudo-random nearby offset for other inputs
        lat = 17.3850 + (Math.random() - 0.5) * 0.1;
        lng = 78.4867 + (Math.random() - 0.5) * 0.1;
      }

      setGeoOutput({
        formatted_address: geoInput,
        geometry: {
          location: { lat: Number(lat.toFixed(4)), lng: Number(lng.toFixed(4)) },
          location_type: 'ROOFTOP_SIMULATED',
        },
        place_id: 'ChI' + Math.random().toString(36).substr(2, 9),
        types: ['establishment', 'point_of_interest'],
      });
      setGeoLoading(false);
      setHomeToast("✓ Geocode result fetched successfully!");
      setTimeout(() => setHomeToast(null), 2000);
    }, 800);
  };

  // Datasets CSV State
  const [uploadedDatasetName, setUploadedDatasetName] = useState('phrs_delivery_points.csv');
  const [uploadedRows, setUploadedRows] = useState([
    { id: '1', label: 'Hub Hyderabad', lat: 17.3850, lng: 78.4867, status: 'Active' },
    { id: '2', label: 'Hub Secunderabad', lat: 17.4399, lng: 78.4983, status: 'Active' },
    { id: '3', label: 'Node Gachibowli', lat: 17.4401, lng: 78.3489, status: 'Warning' },
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDatasetDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setUploadedDatasetName(file.name);
      // Add fake rows to show responsiveness
      setUploadedRows([
        { id: '1', label: 'Point Alpha', lat: 17.4120, lng: 78.4321, status: 'Active' },
        { id: '2', label: 'Point Beta', lat: 17.4561, lng: 78.3982, status: 'Active' },
        { id: '3', label: 'Point Gamma', lat: 17.3541, lng: 78.5121, status: 'Active' },
      ]);
      setHomeToast(`✓ Dataset "${file.name}" uploaded & parsed successfully!`);
      setTimeout(() => setHomeToast(null), 2500);
    }
  };

  // Support ticket form
  const [supportSubject, setSupportSubject] = useState('');
  const [supportDesc, setSupportDesc] = useState('');
  const [tickets, setTickets] = useState([
    { id: 'TKT-9912', subject: 'Map tiling delay on Android SDK', status: 'In Progress', date: '2026-09-02' }
  ]);

  const handleCreateTicket = () => {
    if (!supportSubject || !supportDesc) {
      alert('Please fill subject and description!');
      return;
    }
    const newId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    setTickets([
      { id: newId, subject: supportSubject, status: 'Open', date: new Date().toISOString().split('T')[0] },
      ...tickets
    ]);
    setSupportSubject('');
    setSupportDesc('');
    setHomeToast(`✓ Ticket ${newId} submitted successfully!`);
    setTimeout(() => setHomeToast(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title Header */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-6 h-6 text-indigo-600 animate-spin-slow" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PHRS Maps Platform</h1>
        </div>
        <p className="text-sm text-slate-500 max-w-2xl">
          గూగుల్ మ్యాప్స్ ఏపిఐలని (Google Maps Platform API) మేనేజ్ చేయడానికి, జియో-కోడింగ్, రూట్స్ ప్లాటింగ్, మరియు స్పేషియల్ డేటా సెట్స్ అనాలిసిస్ చేయడానికి ఈ క్రింది ట్యాబ్స్ ఉపయోగించండి.
        </p>
      </div>

      {/* Overview Sub-Tab */}
      {phrsMapsSubTab === 'Overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {overviewStats.map((stat, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-lg font-extrabold text-slate-900">{stat.value}</span>
                    <span className="text-[10px] font-bold text-emerald-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Quick Map Sandbox Preview */}
            <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" /> LIVE SPATIAL VIEW
                </h3>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">API ACTIVE</span>
              </div>

              {/* Map Canvas with SVG plots */}
              <div className="relative w-full h-[320px] rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                {/* SVG Mock Map Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Mock Streets */}
                  <path d="M 0 100 Q 200 120 400 80 T 800 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 150 0 C 120 150 250 250 220 400" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 0 240 Q 300 220 800 260" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                {/* Map Pins Plotted dynamically */}
                {uploadedRows.map((row, idx) => {
                  // Normalize coordinate maps to fits the 320x600 grid visually around Hyderabad
                  const x = 100 + (idx * 160) + (Math.sin(idx) * 20);
                  const y = 80 + (idx * 80);
                  return (
                    <div key={idx} className="absolute flex flex-col items-center animate-bounce-slow" style={{ left: `${x}px`, top: `${y}px` }}>
                      <MapPin className={`w-6 h-6 ${row.status === 'Warning' ? 'text-amber-500' : 'text-rose-600'}`} />
                      <span className="mt-1 bg-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-slate-200 text-slate-800 whitespace-nowrap">
                        {row.label}
                      </span>
                    </div>
                  );
                })}

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200/80 shadow-sm text-[10px] space-y-1.5">
                  <p className="font-bold text-slate-800">MAP COORDINATES RANGE</p>
                  <p className="font-mono text-slate-500">Center: 17.3850° N, 78.4867° E</p>
                  <p className="font-mono text-slate-500">Style: {selectedStyle}</p>
                </div>
              </div>
            </div>

            {/* Quick Map Config Status */}
            <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase border-b border-slate-100 pb-3">PLATFORM METRICS</h3>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">MAPS CREDITS BALANCE</span>
                  <span className="text-xl font-extrabold text-slate-800">$200.00</span>
                  <span className="text-[10px] text-slate-500 ml-1">of monthly free tier remaining</span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">QUICK LINKS</span>
                  <a href="#apis" onClick={() => setMapsSelectedEndpoint('Geocoding API')} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-150 text-indigo-600 font-semibold">
                    <span>Geocoding Sandbox</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                  <a href="#styles" className="flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-150 text-indigo-600 font-semibold">
                    <span>Change Theme Style</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APIs & Services Sub-Tab */}
      {phrsMapsSubTab === 'APIs & Services' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* APIs toggles */}
            <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <Sliders className="w-4 h-4 text-indigo-500" /> ENABLE / DISABLE GOOGLE MAPS APIS
              </h3>
              <p className="text-xs text-slate-500">
                మీ క్లయింట్ అప్లికేషన్లు ఉపయోగించే ఏపిఐ సర్వీసులను ఇక్కడ ఎనేబుల్ లేదా డిసేబుల్ చేసుకోవచ్చు.
              </p>

              <div className="divide-y divide-slate-100">
                {Object.keys(enabledApis).map((api) => (
                  <div key={api} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{api}</span>
                      <span className="text-[9px] text-slate-400 font-mono">PHRS Maps SDK Compliant</span>
                    </div>
                    <button
                      onClick={() => toggleApi(api)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono transition-all ${
                        enabledApis[api] 
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100/80 border border-emerald-200'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {enabledApis[api] ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Geocoding API sandbox playground */}
            <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <Code className="w-4 h-4 text-rose-500" /> GEOCODING API PLAYGROUND
              </h3>
              <p className="text-xs text-slate-500">
                ఆడ్రెస్ టైప్ చేసి దాని లాటిట్యూడ్ (Latitude) మరియు లాంగిట్యూడ్ (Longitude) నిమిషాల్లో కనుగొనండి.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-[9px] text-slate-400 font-bold mb-1">SEARCH ADDRESS</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={geoInput}
                      onChange={(e) => setGeoInput(e.target.value)}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      placeholder="e.g. Bangalore, Karnataka"
                    />
                    <button
                      onClick={handleGeocode}
                      disabled={geoLoading}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition shrink-0"
                    >
                      {geoLoading ? 'SEARCHING...' : 'GEOCODE'}
                    </button>
                  </div>
                </div>

                {geoOutput && (
                  <div className="p-3.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-[11px] overflow-x-auto space-y-2">
                    <div className="flex justify-between items-center text-[9px] border-b border-slate-800 pb-1.5 mb-1.5 text-slate-400 font-bold">
                      <span>GEOMETRY LOG RESULT</span>
                      <span className="text-emerald-500">HTTP 200 OK</span>
                    </div>
                    <pre className="text-slate-200">{JSON.stringify(geoOutput, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Sub-Tab */}
      {phrsMapsSubTab === 'Metrics' && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-indigo-500" /> API LATENCY & TRAFFIC LOGS
          </h3>
          <p className="text-xs text-slate-500">
            మ్యాప్స్ SDK రిక్వెస్ట్లు మరియు ఎర్రర్ రేట్ల ట్రాఫిక్ అనాలిసిస్ ఈ కింద చార్ట్ ద్వారా చూడవచ్చు.
          </p>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMaps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGeo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip />
                <Area type="monotone" dataKey="MapsSDK" stroke="#4f46e5" fillOpacity={1} fill="url(#colorMaps)" name="Maps SDK" />
                <Area type="monotone" dataKey="Geocoding" stroke="#ec4899" fillOpacity={1} fill="url(#colorGeo)" name="Geocoding" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quotas Sub-Tab */}
      {phrsMapsSubTab === 'Quotas' && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">MAPS PLATFORM LIMITS</h3>
          <p className="text-xs text-slate-500">
            మీ ఏపిఐ కీలకు సంబంధించిన రోజువారి లిమిట్స్ మరియు వినియోగాన్ని ట్రాక్ చేయండి.
          </p>

          <div className="space-y-4 pt-2">
            {[
              { label: 'Geocoding requests per day', current: 1200, limit: 10000, color: 'bg-indigo-600' },
              { label: 'Distance Matrix queries per hour', current: 430, limit: 1500, color: 'bg-sky-500' },
              { label: 'Static Maps Tile requests per day', current: 3200, limit: 25000, color: 'bg-emerald-500' },
              { label: 'Places API text search request per day', current: 90, limit: 1000, color: 'bg-amber-500' },
            ].map((quota, i) => {
              const pct = Math.min((quota.current / quota.limit) * 100, 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700">{quota.label}</span>
                    <span className="text-slate-500 font-mono">{quota.current} / {quota.limit} ({pct.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${quota.color} transition-all`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Keys & Credentials Sub-Tab */}
      {phrsMapsSubTab === 'Keys & Credentials' && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 animate-fade-in">
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Key className="w-4 h-4 text-amber-500" /> API KEYS & SECURITY CONFIG
          </h3>
          <p className="text-xs text-slate-500">
            గూగుల్ మ్యాప్స్ ఏపిఐని యాక్సెస్ చేయడానికి ఈ క్రింది ఏపిఐ కీని ఉపయోగించండి. ప్రొడక్షన్ లో ఎల్లప్పుడూ కీని రెస్ట్రిక్ట్ చేసి వాడటం సురక్షితం.
          </p>

          <div className="space-y-4 pt-2 font-mono text-xs">
            <div>
              <label className="block text-[9px] text-slate-400 font-bold mb-1">ACTIVE GOOGLE MAPS API KEY</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={mapsApiKey}
                  onChange={(e) => setMapsApiKey(e.target.value)}
                  className="flex-1 p-2.5 font-mono border rounded-lg text-xs bg-slate-50 text-slate-800"
                />
                <button
                  onClick={() => {
                    const newKey = 'AIzaSy' + Math.random().toString(36).substr(2, 24);
                    setMapsApiKey(newKey);
                    setHomeToast("✓ API Key regenerated successfully!");
                    setTimeout(() => setHomeToast(null), 2000);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition shrink-0"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* HTTP restrictions settings */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 space-y-3">
              <span className="font-bold text-[10px] text-slate-400 uppercase block">KEY APPLICATION RESTRICTIONS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['HTTP Referrers (Websites)', 'IP Addresses (Servers)', 'None'].map((opt) => (
                  <label key={opt} className="p-3 border rounded-lg bg-white shadow-sm cursor-pointer hover:border-indigo-500 flex items-center gap-2">
                    <input type="radio" name="restriction" defaultChecked={opt === 'HTTP Referrers (Websites)'} />
                    <span className="text-xs font-semibold text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Sub-Tab */}
      {phrsMapsSubTab === 'Support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Create Help Ticket */}
          <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <HelpCircle className="w-4 h-4 text-indigo-500" /> PHRS MAPS SUPPORT TICKET
            </h3>
            <p className="text-xs text-slate-500">
              గూగుల్ మ్యాప్స్ లేదా ఏపిఐ కనెక్టివిటీ లో లోపాలు వస్తే ఇక్కడ మా ఎక్స్‌పర్ట్ టీమ్‌కు టికెట్ రేజ్ చేయండి.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[9px] text-slate-400 font-bold mb-1">ISSUE SUBJECT</label>
                <input
                  type="text"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-slate-800"
                  placeholder="e.g., Geocoding API returning 403 Forbidden"
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 font-bold mb-1">DETAILED DESCRIPTION</label>
                <textarea
                  rows={4}
                  value={supportDesc}
                  onChange={(e) => setSupportDesc(e.target.value)}
                  className="w-full p-3 border rounded-lg text-slate-800"
                  placeholder="Paste response payloads, error logs, or map sdk configuration screenshots description..."
                />
              </div>

              <button
                onClick={handleCreateTicket}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg transition"
              >
                Submit Support Ticket
              </button>
            </div>
          </div>

          {/* Active Tickets List */}
          <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase border-b border-slate-100 pb-3">OPEN CASES</h3>
            <div className="space-y-3 font-mono text-xs">
              {tickets.map((tkt, i) => (
                <div key={i} className="p-3 bg-slate-50 border rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-bold text-indigo-600 block">{tkt.id}</span>
                    <p className="text-slate-800 font-semibold mt-0.5">{tkt.subject}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{tkt.date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    tkt.status === 'Open' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-sky-50 text-sky-600 border border-sky-200'
                  }`}>
                    {tkt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Solution Library Sub-Tab */}
      {phrsMapsSubTab === 'Solution Library' && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase">SOLUTIONS LIBRARY</h3>
          <p className="text-xs text-slate-500">
            గూగుల్ మ్యాప్స్ ఉపయోగించి నిర్మించగల పాపులర్ ప్రీ-బిల్ట్ టెంప్లేట్స్. మీ అవసరానికి తగిన సొల్యూషన్ ని క్లిక్ చేసి కోడ్ స్నిప్పెట్ ని పొందండి.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              { title: 'Store Locator Template', desc: 'Plot physical stores with distances, filters, and dynamic map bounds routing.', complexity: 'Intermediate' },
              { title: 'Distance Matrix Tracker', desc: 'Calculate accurate travel times and ETA routes for logistics & driver partners.', complexity: 'Advanced' },
              { title: 'Address Validation widget', desc: 'Standardize customer addresses with Geocoding parsing at checkout instantly.', complexity: 'Simple' },
            ].map((sol, i) => (
              <div key={i} className="p-4 border rounded-xl hover:border-indigo-500 hover:shadow-md transition bg-slate-50/50 space-y-3">
                <div className="flex justify-between items-center">
                  <Star className="w-5 h-5 text-indigo-600" />
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded uppercase">{sol.complexity}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{sol.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sol.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setHomeToast(`✓ Code template for "${sol.title}" added to clipboard!`);
                    setTimeout(() => setHomeToast(null), 2500);
                  }}
                  className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-indigo-600 py-1.5 rounded-lg transition"
                >
                  GET SOURCE CODE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map Management Sub-Tab */}
      {phrsMapsSubTab === 'Map Management' && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-indigo-500" /> REGISTER MAP ID CONFIG
          </h3>
          <p className="text-xs text-slate-500">
            వెరిఫైడ్ మ్యాప్ ఐడీలని (Map IDs) క్రియేట్ చేయండి. దీనివల్ల వెక్టర్ మ్యాప్స్ (Vector Maps) మరియు లైవ్ త్రీడీ సిటీ వ్యూలను లోడ్ చేయవచ్చు.
          </p>

          <div className="space-y-4 pt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-[10px]">
                    <th className="pb-2">MAP ID</th>
                    <th className="pb-2">PLATFORM TYPE</th>
                    <th className="pb-2">MAP TYPE</th>
                    <th className="pb-2">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: 'mid_91023812', type: 'JavaScript (Web)', style: 'Vector (3D active)', status: 'ACTIVE' },
                    { id: 'mid_20398412', type: 'Android SDK', style: 'Raster (Styling enabled)', status: 'ACTIVE' },
                    { id: 'mid_09823122', type: 'iOS SDK', style: 'Vector', status: 'PROVISIONING' }
                  ].map((map, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-bold text-slate-800">{map.id}</td>
                      <td className="py-2.5 text-indigo-600 font-semibold">{map.type}</td>
                      <td className="py-2.5 text-slate-500">{map.style}</td>
                      <td className="py-2.5 text-emerald-600 font-bold">{map.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Map Styles Sub-Tab */}
      {phrsMapsSubTab === 'Map Styles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="styles">
          {/* Select styling profile */}
          <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-indigo-500" /> SELECT VISUAL PROFILE
            </h3>
            <p className="text-xs text-slate-500">
              మ్యాప్స్ యొక్క విజువల్స్ ని ఎలైట్ గా స్టైల్ చేయడానికి ఈ కింద థీమ్ ప్రొఫైల్స్ ని ఎంచుకోండి.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              {[
                { name: 'Retro', desc: 'Warm cream tones for high aesthetic pairings.' },
                { name: 'Dark Mode', desc: 'Eye-safe cool twilight dark slate style.' },
                { name: 'Aubergine', desc: 'Sophisticated deep luxury purple layouts.' },
                { name: 'Silver Minimalist', desc: 'Ultra-thin borders and reduced noise grids.' },
              ].map((style) => (
                <button
                  key={style.name}
                  onClick={() => {
                    setSelectedStyle(style.name);
                    setHomeToast(`✓ Changed Map Style to "${style.name}"`);
                    setTimeout(() => setHomeToast(null), 2500);
                  }}
                  className={`w-full p-3 border rounded-xl flex items-center justify-between text-left transition-all ${
                    selectedStyle === style.name
                      ? 'border-indigo-600 bg-indigo-50/30'
                      : 'border-slate-150 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-800 block">{style.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{style.desc}</span>
                  </div>
                  {selectedStyle === style.name && <CheckCircle className="w-5 h-5 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* JSON styling editor */}
          <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <FileJson className="w-4 h-4 text-rose-500" /> JSON CUSTOM STYLING CODE
            </h3>
            <p className="text-xs text-slate-500">
              గూగుల్ మ్యాప్స్ డిజైన్స్ ని మీ అప్లికేషన్ కోడ్ తో సింక్ చేయడానికి ఈ కింది JSON పారామీటర్లను వాడండి.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <textarea
                rows={10}
                value={customStyleJson}
                onChange={(e) => setCustomStyleJson(e.target.value)}
                className="w-full p-3 font-mono text-[11px] rounded-lg border border-slate-200 bg-slate-900 text-emerald-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={() => {
                  setHomeToast("✓ Applied Custom JSON styles safely!");
                  setTimeout(() => setHomeToast(null), 2500);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg transition"
              >
                APPLY MAP CUSTOM JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Datasets Sub-Tab */}
      {phrsMapsSubTab === 'Datasets' && (
        <div className="space-y-6 animate-fade-in">
          {/* Drag & drop CSV dataset */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDatasetDrop}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${
              isDragging
                ? 'border-indigo-600 bg-indigo-50/20'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <Upload className="w-10 h-10 text-indigo-500 mb-3" />
            <p className="text-sm font-semibold text-slate-800">Drag and drop coordinates CSV file here or click to upload</p>
            <p className="text-xs text-slate-500 mt-1">supports .csv or .json datasets representing logistics hub points, coordinates range</p>

            {/* Hidden Input File Click */}
            <input
              type="file"
              id="maps_csv_upload_input"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  setUploadedDatasetName(file.name);
                  setUploadedRows([
                    { id: '1', label: 'Custom Spot 1', lat: 17.3850, lng: 78.4867, status: 'Active' },
                    { id: '2', label: 'Custom Spot 2', lat: 17.4300, lng: 78.4700, status: 'Active' },
                  ]);
                  setHomeToast(`✓ Dataset "${file.name}" imported successfully!`);
                  setTimeout(() => setHomeToast(null), 2500);
                }
              }}
            />
            <button
              onClick={() => document.getElementById('maps_csv_upload_input')?.click()}
              className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold text-xs transition"
            >
              CHOOSE FILE
            </button>
          </div>

          {/* Dataset points parsed table */}
          {uploadedRows && (
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="font-mono font-bold text-xs tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-indigo-500" /> PARSED DATASET ENTRIES ({uploadedDatasetName})
                </span>
                <span className="text-[10px] font-mono text-slate-400">Total Rows Loaded: {uploadedRows.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px]">
                      <th className="pb-2">ID</th>
                      <th className="pb-2">LOCATION LABEL</th>
                      <th className="pb-2">LATITUDE</th>
                      <th className="pb-2">LONGITUDE</th>
                      <th className="pb-2">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {uploadedRows.map((row) => (
                      <tr key={row.id}>
                        <td className="py-2 font-bold text-slate-800">#{row.id}</td>
                        <td className="py-2 text-indigo-600 font-semibold">{row.label}</td>
                        <td className="py-2 font-mono">{row.lat}° N</td>
                        <td className="py-2 font-mono">{row.lng}° E</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            row.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-150'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
