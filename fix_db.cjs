const fs = require('fs');
const file = 'src/components/tabs/DatabaseTab.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `            {selectedSubMenu === 'Firestore' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Firestore</h1>
                <p className="text-slate-600 mb-6">A flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development.</p>
                <div className="p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Database className="w-16 h-16 text-slate-300 mb-4" />
                  <button 
                    onClick={() => {
                      setPhrsDbSubTab('Firestore Database');
                      setHomeToast("✓ Switched to Firestore Management");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Create Database
                  </button>
                </div>
              </div>
            )}`;

const replacement = `            {selectedSubMenu === 'Firestore' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Firestore</h1>
                <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">A flexible, scalable NoSQL cloud database to store and sync data for client- and server-side development.</p>
                <div className="p-6 sm:p-10 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center mx-auto max-w-lg">
                  <Database className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mb-4" />
                  <button 
                    onClick={() => {
                      setPhrsDbSubTab('Firestore Database');
                      setHomeToast("✓ Switched to Firestore Management");
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="mt-2 sm:mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition w-full sm:w-auto"
                  >
                    Create Database
                  </button>
                </div>
              </div>
            )}`;

if (content.includes(target)) {
    fs.writeFileSync(file, content.replace(target, replacement));
    console.log("Success: DatabaseTab.tsx");
} else {
    console.log("Target not found in DatabaseTab.tsx");
}
