const fs = require('fs');
const file = 'src/components/tabs/CloudRunTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `                  <div className="flex items-center gap-2 text-amber-800">
                    <Globe className="w-5 h-5 text-amber-600 shrink-0" />
                    <h4 className="text-sm font-bold">🌐 డొమైన్ యాక్టివేషన్ గైడ్ (Custom Domain Connection Guide)</h4>
                  </div>
                  <div className="text-xs text-amber-900 space-y-2 leading-relaxed">
                    <p>
                      మీరు కొనుగోలు చేసిన కస్టమ్ డొమైన్ (ఉదాహరణకు <strong className="font-mono text-slate-900 font-bold">phrscrowd.com</strong> లేదా <strong className="font-mono text-slate-900 font-bold">phrscrowd.online</strong>) ఏ బ్రౌజర్‌లోనైనా ఓపెన్ కావాలంటే, మీ డొమైన్ రిజిస్ట్రార్ (Cloudflare, GoDaddy, Namecheap మొదలైనవి) లో ఈ కింది విధంగా <strong className="font-semibold text-amber-950">CNAME Record</strong> ను సెట్ చేయాలి:
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-[11px] space-y-1.5 select-all border border-slate-800">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Record Type:</span>
                        <span className="text-amber-400 font-bold">CNAME</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Name (Host):</span>
                        <span className="text-emerald-400 font-bold">@</span> (or <span className="text-emerald-400 font-bold">www</span>)
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target (Points to):</span>
                        <span className="text-indigo-400 font-bold select-all">
                          {typeof window !== 'undefined' ? window.location.hostname : 'ais-dev-o5if7fqu2usa7mc7klx2wp-398230688462.asia-southeast1.run.app'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-800 font-sans mt-1">
                      💡 <strong>గమనిక:</strong> CNAME రికార్డ్ జోడించిన తర్వాత, DNS వ్యాప్తి (Propagation) కి కొన్ని నిమిషాల సమయం పట్టవచ్చు. ఆ తర్వాత మీ డొమైన్ ప్రపంచవ్యాప్తంగా ఏ బ్రౌజర్‌పైన అయినా పర్ఫెక్ట్ గా ఓపెన్ అవుతుంది!
                    </p>
                  </div>`;

const replacement = `                  <div className="flex items-center gap-2 text-amber-800">
                    <Globe className="w-5 h-5 text-amber-600 shrink-0" />
                    <h4 className="text-[13px] sm:text-sm font-bold">🌐 డొమైన్ యాక్టివేషన్ గైడ్ (Custom Domain Connection Guide)</h4>
                  </div>
                  <div className="text-[11px] text-amber-900 space-y-3 leading-relaxed">
                    <p>
                      మీరు కొనుగోలు చేసిన కస్టమ్ డొమైన్ (ఉదాహరణకు <strong className="font-mono text-slate-900 font-bold text-[10px]">phrscrowd.com</strong> లేదా <strong className="font-mono text-slate-900 font-bold text-[10px]">phrscrowd.online</strong>) ఏ బ్రౌజర్‌లోనైనా ఓపెన్ కావాలంటే, మీ డొమైన్ రిజిస్ట్రార్ (Cloudflare, GoDaddy, Namecheap మొదలైనవి) లో ఈ కింది విధంగా <strong className="font-semibold text-amber-950">CNAME Record</strong> ను సెట్ చేయాలి:
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-5 rounded-lg font-mono text-[11px] space-y-3 select-all border border-slate-800 shadow-inner">
                      <div className="flex justify-between border-b border-slate-700/50 pb-2">
                        <span className="text-slate-400">Record Type:</span>
                        <span className="text-amber-400 font-bold">CNAME</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-700/50 pb-2">
                        <span className="text-slate-400">Name (Host):</span>
                        <div>
                          <span className="text-emerald-400 font-bold">@</span> <span className="text-slate-500">(or</span> <span className="text-emerald-400 font-bold">www</span><span className="text-slate-500">)</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 pt-1">
                        <span className="text-slate-400">Target (Points to):</span>
                        <span className="text-indigo-400 font-bold select-all break-all bg-slate-950/50 p-2.5 rounded border border-slate-800/60 text-[10.5px] sm:text-[11px] leading-tight">
                          {typeof window !== 'undefined' ? window.location.hostname : 'ais-dev-o5if7fqu2usa7mc7klx2wp-398230688462.asia-southeast1.run.app'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-amber-800/80 font-sans mt-1">
                      💡 <strong>గమనిక:</strong> CNAME రికార్డ్ జోడించిన తర్వాత, DNS వ్యాప్తి (Propagation) కి కొన్ని నిమిషాల సమయం పట్టవచ్చు. ఆ తర్వాత మీ డొమైన్ ప్రపంచవ్యాప్తంగా ఏ బ్రౌజర్‌పైన అయినా పర్ఫెక్ట్ గా ఓపెన్ అవుతుంది!
                    </p>
                  </div>`;

if (content.includes(target)) {
    fs.writeFileSync(file, content.replace(target, replacement));
    console.log("Success");
} else {
    console.log("Target not found");
}
