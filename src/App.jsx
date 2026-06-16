import './index.css'
import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';

const r6Data = {
  "Ace": { weapons: ["AK-12", "M1014", "P9"] },
  "Amaru": { weapons: ["G8A1", "Supernova", "ITA12S", "SMG-11"] },
  "Ash": { weapons: ["R4-C", "G36C", "5.7 USG", "M45 MEUSOC"] },
  "Blackbeard": { weapons: ["Mk17 CQB", "SR-25", "D-50"] },
  "Blitz": { weapons: ["G52-Tactical Shield", "P12"] },
  "Brava": { weapons: ["PARA-308", "CAMRS", "USP40", "Super Shorty"] },
  "Buck": { weapons: ["C8-SFW", "CAMRS", "Mk1 9mm", "Gonne-6"] },
  "Capitão": { weapons: ["PARA-308", "M249", "PRB92", "Gonne-6"] },
  "Deimos": { weapons: ["AK-74M", "M590A1", ".44 Vendetta"] },
  "Dokkaebi": { weapons: ["Mk 14 EBR", "BOSG.12.2", "SMG-12", "C75 Auto", "Gonne-6"] },
  "Finka": { weapons: ["Spear .308", "6P41", "SASG-12", "PMM", "GSh-18", "Gonne-6"] },
  "Flores": { weapons: ["AR33", "SR-25", "GSh-18"] },
  "Fuze": { weapons: ["AK-12", "6P41", "Ballistic Shield", "PMM", "GSh-18"] },
  "Glaz": { weapons: ["OTs-03", "PMM", "GSh-18", "Bearing 9"] },
  "Gridlock": { weapons: ["F90", "M249 SAW", "Super Shorty", "SDP 9mm", "Gonne-6"] },
  "Grim": { weapons: ["552 Commando", "SG-CQB", "P229", "Bailiff 410"] },
  "Hibana": { weapons: ["Type-89", "SuperNova", "P229", "Bearing 9"] },
  "Iana": { weapons: ["ARX200", "G36C", "Mk1 9mm", "Gonne-6"] },
  "IQ": { weapons: ["AUG A2", "552 Commando", "G8A1", "P12"] },
  "Jackal": { weapons: ["C7E", "PDW9", "ITA12L", "USP40", "ITA12S"] },
  "Kali": { weapons: ["CSRX 300", "SPSMG9", "C75 Auto", "P226 Mk 25"] },
  "Lion": { weapons: ["V308", "417", "SG-CQB", "LFP586", "P9", "Gonne-6"] },
  "Maverick": { weapons: ["M4", "AR-15.50", "1911 TACOPS"] },
  "Montagne": { weapons: ["Le Roc Shield", "P9", "LFP586"] },
  "Nomad": { weapons: ["AK-74M", "ARX200", "PRB92"] },
  "Nøkk": { weapons: ["FMG-9", "SIX12 SD", "5.7 USG", "D-50"] },
  "Osa": { weapons: ["556XI", "PDW9", "PMM"] },
  "Ram": { weapons: ["R4-C", "LMG-E", "Mk1 9mm", "ITA12S"] },
  "Sens": { weapons: ["POF-9", "417", "SDP 9mm", "Gonne-6"] },
  "Sledge": { weapons: ["L85A2", "M590A1", "P226 Mk 25"] },
  "Thatcher": { weapons: ["AR33", "L85A2", "M590A1", "P226 Mk 25"] },
  "Thermite": { weapons: ["556XI", "M1014", "5.7 USG", "M45 MEUSOC"] },
  "Twitch": { weapons: ["F2", "417", "SG-CQB", "P9", "LFP586"] },
  "Ying": { weapons: ["T-95 LSW", "SIX12", "Q-929"] },
  "Zero": { weapons: ["SC3000K", "MP7", "5.7 USG", "Gonne-6"] },
  "Zofia": { weapons: ["LMG-E", "M762", "RG15"] },
  "Alibi": { weapons: ["Mx4 Storm", "ACS12", "Keratos .357", "Bailiff 410"] },
  "Aruni": { weapons: ["P10 RONI", "Mk 14 EBR", "PRB92"] },
  "Azami": { weapons: ["9x19VSN", "ACS12", "D-50"] },
  "Bandit": { weapons: ["MP7", "M870", "P12"] },
  "Castle": { weapons: ["UMP45", "M1014", "5.7 USG", "Super Shorty"] },
  "Caveira": { weapons: ["M12", "SPAS-15", "Luison"] },
  "Clash": { weapons: ["CCE Shield", "SPSMG9", "P-10C"] },
  "Doc": { weapons: ["MP5", "P90", "SG-CQB", "P9", "LFP586", "Bailiff 410"] },
  "Echo": { weapons: ["MP5SD", "SuperNova", "P229", "Bearing 9"] },
  "Ela": { weapons: ["Scorpion EVO 3 A1", "FO-12", "RG15"] },
  "Fenrir": { weapons: ["MP7", "SASG-12", "Bailiff 410", "5.7 USG"] },
  "Frost": { weapons: ["9mm C1", "Super 90", "Mk1 9mm", "ITA12S"] },
  "Goyo": { weapons: ["Vector .45 ACP", "TCSG12", "P229"] },
  "Jäger": { weapons: ["416-C Carbine", "M870", "P12"] },
  "Kaid": { weapons: ["AUG A3", "TCSG12", ".44 Mag Semi-Auto", "LFP586"] },
  "Kapkan": { weapons: ["9x19VSN", "SASG-12", "PMM", "GSh-18"] },
  "Lesion": { weapons: ["T-5 SMG", "SIX12 SD", "Q-929", "Super Shorty"] },
  "Maestro": { weapons: ["ALDA 5.56", "ACS12", "Keratos .357", "Bailiff 410"] },
  "Melusi": { weapons: ["MP5", "Super 90", "RG15"] },
  "Mira": { weapons: ["Vector .45 ACP", "ITA12L", "USP40", "ITA12S"] },
  "Mozzie": { weapons: ["Commando 9", "P10 RONI", "SDP 9mm"] },
  "Mute": { weapons: ["MP5K", "M590A1", "P226 Mk 25", "SMG-11"] },
  "Oryx": { weapons: ["T-5 SMG", "SPAS-12", "Bailiff 410", "USP40"] },
  "Pulse": { weapons: ["UMP45", "M1014", "M45 MEUSOC", "5.7 USG"] },
  "Rook": { weapons: ["MP5", "P90", "SG-CQB", "P9", "LFP586"] },
  "Smoke": { weapons: ["FMG-9", "M590A1", "P226 Mk 25", "SMG-11"] },
  "Solis": { weapons: ["P90", "ITA12L", "SMG-11"] },
  "Tachanka": { weapons: ["DP27", "9x19VSN", "PMM", "GSh-18", "Bearing 9"] },
  "Thorn": { weapons: ["UZK50GI", "M870", "1911 TACOPS", "C75 Auto"] },
  "Thunderbird": { weapons: ["SPEAR .308", "SPAS-15", "Bearing 9", "Q-929"] },
  "Tubarão": { weapons: ["MPX", "AR-15.50", "P226 Mk 25"] },
  "Valkyrie": { weapons: ["MPX", "SPAS-12", "D-50"] },
  "Vigil": { weapons: ["K1A", "BOSG.12.2", "C75 Auto", "SMG-12"] },
  "Wamai": { weapons: ["AUG A2", "MP5K", "Keratos .357", "P12"] },
  "Warden": { weapons: ["MPX", "M590A1", "P-10C", "SMG-12"] }
};

const operatorsList = Object.keys(r6Data);

const r6HudColors = [
  { name: "Blue (Ally)", hex: "#145c9e" },
  { name: "Orange (Opponent)", hex: "#d97316" },
  { name: "Red (Enemy)", hex: "#b82d3e" },
  { name: "Cyan", hex: "#0891b2" },
  { name: "Yellow", hex: "#ca8a04" },
  { name: "Green", hex: "#16a34a" },
  { name: "Purple", hex: "#7e22ce" }
];

const WeaponIconFallback = () => (
  <svg width="42" height="14" viewBox="0 0 120 40" style={{ fill: '#FFFFFF' }}>
    <path d="M5,15 h30 l5,-5 h10 l5,5 h40 l15,-5 v20 l-15,5 h-40 l-5,-5 h-10 l-5,5 h-30 Z" />
    <path d="M40,5 v10 M80,5 v10" stroke="#FFFFFF" strokeWidth="2"/>
    <rect x="100" y="5" width="20" height="30" fill="#FFFFFF"/>
  </svg>
);

const WeaponDisplay = ({ weapon }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [weapon]);

  if (hasError) {
    return <WeaponIconFallback />;
  }

  return (
    <img 
      src={`/icons/weapons/${weapon.toLowerCase()}.png`} 
      alt={weapon}
      style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
      onError={() => setHasError(true)}
    />
  );
};

const HeadshotIcon = () => (
  <img 
    src="/icons/headshot.png" 
    alt="Headshot"
    style={{ 
      height: '28px', 
      width: 'auto', 
      objectFit: 'contain',  
    }} 
  />
);

function App() {
  
  const [operatorKiller, setOperatorKiller] = useState(operatorsList[0]);
  const [operatorVictim, setOperatorVictim] = useState(operatorsList[1]); 
  
  const [weapon, setWeapon] = useState(r6Data[operatorsList[0]].weapons[0]);
  const [isHeadshot, setIsHeadshot] = useState(true);
  const [killerNick, setKillerNick] = useState("ivoocks"); 
  const [victimNick, setVictimNick] = useState("Spoit.SR");

  const [colorKiller, setColorKiller] = useState(r6HudColors[0].hex); 
  const [colorVictim, setColorVictim] = useState(r6HudColors[2].hex); 

  // Estado para controlar o Modal de Operadores
  const [activeModal, setActiveModal] = useState(null); // 'killer' | 'victim' | null
  const [searchQuery, setSearchQuery] = useState("");

  const killFeedRef = useRef(null);

  // Filtra os operadores baseado na pesquisa
  const filteredOperators = operatorsList.filter(op => 
    op.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOperator = (op) => {
    if (activeModal === 'killer') {
      setOperatorKiller(op);
      setWeapon(r6Data[op].weapons[0]); 
    } else if (activeModal === 'victim') {
      setOperatorVictim(op);
    }
    closeModal();
  };

  const closeModal = () => {
    setActiveModal(null);
    setSearchQuery("");
  };

  const handleDownload = async () => {
    if (killFeedRef.current === null) return;
    
    try {
      const node = killFeedRef.current;
      
      const dataUrl = await toPng(node, { 
        cacheBust: true,
        backgroundColor: 'transparent',
        pixelRatio: 2, 
        width: node.offsetWidth,
        height: node.offsetHeight,
        style: {
          transform: 'scale(1)', 
          transformOrigin: 'top left',
          margin: 0
        }
      });
      
      const link = document.createElement('a');
      link.download = `killfeed-${killerNick}-vs-${victimNick}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center py-12 font-sans selection:bg-yellow-500 selection:text-black">
      
      {/* ========================================= */}
      {/* MODAL DE SELEÇÃO DE OPERADORES              */}
      {/* ========================================= */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all"
          onClick={closeModal}
        >
          <div 
            className="bg-neutral-900 border-2 border-neutral-700/80 p-6 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={e => e.stopPropagation()} // Impede que o clique dentro da janela a feche
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-black uppercase tracking-widest text-yellow-500">
                Select {activeModal === 'killer' ? 'Killer' : 'Victim'}
              </h3>
              <button 
                onClick={closeModal} 
                className="text-neutral-500 hover:text-white font-bold text-xl px-2 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Search operator..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-neutral-700 p-4 mb-6 text-white text-lg font-medium focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 placeholder-neutral-600"
              autoFocus
            />
            
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4 overflow-y-auto pr-2 pb-2">
              {filteredOperators.map(op => (
                <button 
                  key={op} 
                  onClick={() => handleSelectOperator(op)} 
                  className="flex flex-col items-center gap-3 p-3 bg-black/30 border border-neutral-800 hover:border-yellow-500/50 hover:bg-black/60 rounded-none transition-all group"
                >
                  <img 
                    src={`/icons/operators/${op.toLowerCase()}.png`} 
                    alt={op} 
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-12 h-12 flex items-center justify-center bg-neutral-800 text-neutral-400 font-bold text-lg">${op.substring(0,2).toUpperCase()}</div><span class="text-[10px] uppercase tracking-wider text-neutral-400 font-bold text-center mt-3">${op}</span>`;
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold group-hover:text-yellow-400 text-center">
                    {op}
                  </span>
                </button>
              ))}
              
              {filteredOperators.length === 0 && (
                <div className="col-span-full py-10 text-center text-neutral-500 font-bold uppercase tracking-widest">
                  No operators found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HEADER ATUALIZADO COM IMAGEM */}
      <div className="text-center mb-10 flex flex-col items-center">
        <img 
          src="/logo.png" 
          alt="Kill Feed Logo" 
          className="h-20 md:h-24 object-contain drop-shadow-lg" 
        />
        <p className="text-neutral-500 uppercase tracking-[0.3em] text-sm mt-4 font-bold">
          Generator
        </p>
      </div>
      
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl px-4 lg:px-8">
        
        {/* CONTROL PANEL */}
        <div className="bg-neutral-900/80 backdrop-blur-md p-8 shadow-2xl w-full xl:w-2/5 flex flex-col gap-6 border border-white/5 border-t-4 border-t-yellow-500 relative">
          
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-neutral-700/50 pb-3 text-white flex items-center gap-3">
            <span className="w-2 h-2 bg-yellow-500 inline-block"></span>
            Operations Panel
          </h2>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-neutral-400 uppercase font-bold tracking-widest mb-2">Killer Nick</label>
              <input 
                type="text" 
                value={killerNick} 
                onChange={(e) => setKillerNick(e.target.value)} 
                className="w-full bg-black/40 text-white p-3 border border-neutral-700/50 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors font-medium shadow-inner" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-neutral-400 uppercase font-bold tracking-widest mb-2">Victim Nick</label>
              <input 
                type="text" 
                value={victimNick} 
                onChange={(e) => setVictimNick(e.target.value)} 
                className="w-full bg-black/40 text-white p-3 border border-neutral-700/50 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors font-medium shadow-inner" 
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* ZONA DOS BOTÕES DE OPERADOR */}
            <div className="flex-1 flex flex-col gap-4">
              
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-widest mb-2">Killer Op.</label>
                <button 
                  onClick={() => setActiveModal('killer')} 
                  className="w-full bg-black/40 p-2 border border-neutral-700/50 hover:border-yellow-500 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={`/icons/operators/${operatorKiller.toLowerCase()}.png`} alt={operatorKiller} className="w-10 h-10 object-contain drop-shadow-md" />
                    <span className="font-bold uppercase tracking-widest text-white group-hover:text-yellow-400 transition-colors">{operatorKiller}</span>
                  </div>
                  <span className="text-neutral-500 pr-2 group-hover:text-yellow-500 text-xs">▼</span>
                </button>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-widest mb-2">Victim Op.</label>
                <button 
                  onClick={() => setActiveModal('victim')} 
                  className="w-full bg-black/40 p-2 border border-neutral-700/50 hover:border-yellow-500 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={`/icons/operators/${operatorVictim.toLowerCase()}.png`} alt={operatorVictim} className="w-10 h-10 object-contain drop-shadow-md" />
                    <span className="font-bold uppercase tracking-widest text-white group-hover:text-yellow-400 transition-colors">{operatorVictim}</span>
                  </div>
                  <span className="text-neutral-500 pr-2 group-hover:text-yellow-500 text-xs">▼</span>
                </button>
              </div>

            </div>
            
            {/* ZONA DA ARMA */}
            <div className="flex-1">
              <label className="block text-xs text-neutral-400 uppercase font-bold tracking-widest mb-2">Weapon</label>
              <select 
                value={weapon} 
                onChange={(e) => setWeapon(e.target.value)} 
                className="w-full bg-black/40 text-white p-4 border border-neutral-700/50 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors appearance-none font-medium cursor-pointer h-[58px]"
              >
                {r6Data[operatorKiller].weapons.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-4 cursor-pointer mt-2 p-3 bg-black/20 border border-neutral-800/80 hover:bg-black/40 transition-colors group">
            <input 
              type="checkbox" 
              checked={isHeadshot} 
              onChange={(e) => setIsHeadshot(e.target.checked)} 
              className="w-5 h-5 accent-yellow-500 rounded-none bg-neutral-800 border-neutral-600 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 cursor-pointer" 
            />
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-300 group-hover:text-yellow-500 transition-colors">
              Headshot Kill
            </span>
          </label>

          {/* TEAM COLORS */}
          <div className="border-t border-neutral-700/50 pt-5 mt-2">
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-xs text-neutral-400 uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                  Team Color (Killer)
                </span>
                <div className="flex gap-3">
                  {r6HudColors.map((color) => (
                    <button 
                      key={`killer-${color.hex}`} 
                      onClick={() => setColorKiller(color.hex)} 
                      title={color.name} 
                      className={`w-8 h-8 transition-all duration-200 cursor-pointer ${colorKiller === color.hex ? 'scale-125 ring-2 ring-yellow-400 ring-offset-2 ring-offset-neutral-900 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:scale-110 opacity-60 hover:opacity-100'}`} 
                      style={{ backgroundColor: color.hex }} 
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-neutral-400 uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                  Team Color (Victim)
                </span>
                <div className="flex gap-3">
                  {r6HudColors.map((color) => (
                    <button 
                      key={`victim-${color.hex}`} 
                      onClick={() => setColorVictim(color.hex)} 
                      title={color.name} 
                      className={`w-8 h-8 transition-all duration-200 cursor-pointer ${colorVictim === color.hex ? 'scale-125 ring-2 ring-yellow-400 ring-offset-2 ring-offset-neutral-900 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:scale-110 opacity-60 hover:opacity-100'}`} 
                      style={{ backgroundColor: color.hex }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW & EXPORT */}
        <div className="flex flex-col gap-6 w-full xl:w-3/5">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-yellow-500 inline-block"></span>
              Live Preview
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 bg-neutral-900 px-3 py-1 border border-neutral-800">
              Transparent Background
            </span>
          </div>
          
          <div className="bg-[#121212] py-16 px-4 flex items-center relative overflow-x-auto h-[350px] border border-white/5 shadow-2xl" 
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, #171717 25%, transparent 25%, transparent 75%, #171717 75%, #171717), repeating-linear-gradient(45deg, #171717 25%, #101010 25%, #101010 75%, #171717 75%, #171717)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
            
            <div className="mx-auto w-max">
              
              <div 
                ref={killFeedRef} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  height: '44px',       
                  width: 'max-content',
                  backgroundColor: 'transparent', 
                  whiteSpace: 'nowrap',
                  fontFamily: 'Scout, sans-serif', 
                  fontWeight: 'normal',
                  color: '#FFFFFF', 
                  letterSpacing: '0.7px' 
                }}
              >
                {/* ZONE 1: Killer Operator Icon */}
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingRight: '0px' 
                }}>
                  <img 
                    src={`/icons/operators/${operatorKiller.toLowerCase()}.png`} 
                    alt={operatorKiller}
                    style={{ width: '100%', height: '100%', objectFit: 'contain'}}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerText = operatorKiller.substring(0,2).toUpperCase();
                      e.target.parentElement.style.backgroundColor = '#1f1f1f';
                      e.target.parentElement.style.fontSize = '12px';
                      e.target.parentElement.style.fontFamily = 'sans-serif';
                      e.target.parentElement.style.border = '1px solid rgba(255,255,255,0.1)';
                      e.target.parentElement.style.borderRadius = '2px';
                    }}
                  />
                </div>

                {/* CENTRAL BAR */}
                <div className="shadow-lg" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '30px', 
                  backgroundColor: 'rgba(33, 33, 33, 0.70)',
                  overflow: 'hidden' 
                }}>
                  
                  {/* ZONE 2: Killer Nick */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      height: '100%', 
                      padding: '0 24px 0 8px', 
                      background: `linear-gradient(to right, ${colorKiller}e6 0%, ${colorKiller}e6 calc(100% - 64px), transparent calc(100% - 24px))` 
                    }}
                  >
                    <span style={{ fontSize: '26px', paddingTop: '1px'}}>
                      {killerNick}
                    </span>
                  </div>
                  
                  {/* ZONE 3: Weapon and Headshot */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px', padding: '0 1px', height: '100%' }}>
                    <WeaponDisplay weapon={weapon} />
                    {isHeadshot && <HeadshotIcon />}
                  </div>

                  {/* ZONE 4: Victim Nick */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      height: '100%', 
                      padding: '0 8px 0 24px', 
                      background: `linear-gradient(to left, ${colorVictim}e6 0%, ${colorVictim}e6 calc(100% - 64px), transparent calc(100% - 24px))` 
                    }}
                  >
                    <span style={{ fontSize: '26px', paddingTop: '1px' }}>
                      {victimNick}
                    </span>
                  </div>

                </div>

                {/* ZONE 5: Victim Operator Icon */}
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingLeft: '0px', 
                  opacity: 0.9
                }}>
                  <img 
                    src={`/icons/operators/${operatorVictim.toLowerCase()}.png`} 
                    alt={operatorVictim}
                    style={{ width: '100%', height: '100%', objectFit: 'contain'}}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerText = operatorVictim.substring(0,2).toUpperCase();
                      e.target.parentElement.style.backgroundColor = '#1f1f1f';
                      e.target.parentElement.style.fontSize = '12px';
                      e.target.parentElement.style.fontFamily = 'sans-serif';
                      e.target.parentElement.style.border = '1px solid rgba(255,255,255,0.1)';
                      e.target.parentElement.style.borderRadius = '2px';
                    }}
                  />
                </div>

              </div>

            </div>
          </div>

          <button 
            onClick={handleDownload} 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-5 px-6 transition-all duration-300 flex justify-center items-center gap-3 mt-2 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transform hover:-translate-y-0.5"
          >
            Export Kill Feed PNG
          </button>
        </div>

      </div>
    </div>
  )
}

export default App;