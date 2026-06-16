import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';

// Dados super limpos, apenas com as armas (sem cores de ícone)
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
  //
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
  { name: "Azul (Aliado)", hex: "#145c9e" },
  { name: "Laranja (Oponente)", hex: "#d97316" },
  { name: "Vermelho (Inimigo)", hex: "#b82d3e" },
  { name: "Ciano", hex: "#0891b2" },
  { name: "Amarelo", hex: "#ca8a04" },
  { name: "Verde", hex: "#16a34a" },
  { name: "Roxo", hex: "#7e22ce" }
];

const WeaponIconFallback = () => (
  <svg width="42" height="14" viewBox="0 0 120 40" style={{ fill: '#FFFFFF' }}>
    <path d="M5,15 h30 l5,-5 h10 l5,5 h40 l15,-5 v20 l-15,5 h-40 l-5,-5 h-10 l-5,5 h-30 Z" />
    <path d="M40,5 v10 M80,5 v10" stroke="#FFFFFF" strokeWidth="2"/>
    <rect x="100" y="5" width="20" height="30" fill="#FFFFFF"/>
  </svg>
);

// 2. Criamos o componente Inteligente que tenta carregar o PNG
const WeaponDisplay = ({ weapon }) => {
  const [hasError, setHasError] = useState(false);

  // Reinicia o estado de erro sempre que mudas de arma no menu
  useEffect(() => {
    setHasError(false);
  }, [weapon]);

  // Se não encontrar o PNG, mostra o desenho branco (Plano B)
  if (hasError) {
    return <WeaponIconFallback />;
  }

  // Tenta carregar a imagem da pasta. Atenção: o nome do teu ficheiro tem de estar em minúsculas (ex: "supernova.png")
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

  const killFeedRef = useRef(null);

  const handleOperatorKillerChange = (e) => {
    const novoOperador = e.target.value;
    setOperatorKiller(novoOperador);
    setWeapon(r6Data[novoOperador].weapons[0]); 
  };

  const handleOperatorVictimChange = (e) => {
    setOperatorVictim(e.target.value);
  };

  const handleDownload = async () => {
    if (killFeedRef.current === null) return;
    
    try {
      const node = killFeedRef.current;
      
      const dataUrl = await toPng(node, { 
        cacheBust: true,
        backgroundColor: 'transparent',
        pixelRatio: 2, // Mantém a alta qualidade
        // INJEÇÃO DE LIMITES: Força a exportação a ter o tamanho EXATO da pré-visualização
        width: node.offsetWidth,
        height: node.offsetHeight,
        style: {
          transform: 'scale(1)', // Evita bugs se estiveres com zoom no navegador
          transformOrigin: 'top left',
          margin: 0
        }
      });
      
      const link = document.createElement('a');
      link.download = `killfeed-${killerNick}-vs-${victimNick}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar a imagem:', err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center py-10 font-sans">
      <h1 className="text-4xl font-bold mb-10 text-gray-200">Gerador de Kill Feed R6</h1>
      
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl px-4">
        
        {/* Painel de Controlos */}
        <div className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-full xl:w-2/5 flex flex-col gap-5 border border-white/5">
          <h2 className="text-2xl font-semibold mb-3 border-b border-neutral-700 pb-3 text-gray-400">Controlos</h2>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Nick Atirador</label>
              <input type="text" value={killerNick} onChange={(e) => setKillerNick(e.target.value)} className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-neutral-700" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Nick Vítima</label>
              <input type="text" value={victimNick} onChange={(e) => setVictimNick(e.target.value)} className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-neutral-700" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Operador Atirador</label>
              <select value={operatorKiller} onChange={handleOperatorKillerChange} className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-neutral-700 mb-4">
                {operatorsList.map(op => <option key={op} value={op}>{op}</option>)}
              </select>
              
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Operador Vítima</label>
              <select value={operatorVictim} onChange={handleOperatorVictimChange} className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-neutral-700">
                {operatorsList.map(op => <option key={op} value={op}>{op}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Arma Utilizada</label>
              <select value={weapon} onChange={(e) => setWeapon(e.target.value)} className="w-full bg-neutral-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-neutral-700">
                {r6Data[operatorKiller].weapons.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer mt-1 p-2 bg-neutral-800 rounded-lg border border-neutral-700">
            <input type="checkbox" checked={isHeadshot} onChange={(e) => setIsHeadshot(e.target.checked)} className="w-6 h-6 accent-red-500 rounded border-gray-600 focus:ring-red-500 focus:ring-2 bg-neutral-700" />
            <span className="text-lg font-medium">Eliminação por Headshot?</span>
          </label>

          {/* Seletores de Cor Oficiais */}
          <div className="border-t border-neutral-700 pt-5 mt-3">
            <h3 className="text-lg font-semibold mb-3 text-gray-400">Cores da Equipa (Oficiais R6)</h3>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Cor do Atirador</span>
                <div className="flex gap-2">
                  {r6HudColors.map((color) => (
                    <button key={`killer-${color.hex}`} onClick={() => setColorKiller(color.hex)} title={color.name} className={`w-8 h-8 rounded-full transition-transform ${colorKiller === color.hex ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-neutral-900' : 'hover:scale-110 opacity-70'}`} style={{ backgroundColor: color.hex }} />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Cor da Vítima</span>
                <div className="flex gap-2">
                  {r6HudColors.map((color) => (
                    <button key={`victim-${color.hex}`} onClick={() => setColorVictim(color.hex)} title={color.name} className={`w-8 h-8 rounded-full transition-transform ${colorVictim === color.hex ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-neutral-900' : 'hover:scale-110 opacity-70'}`} style={{ backgroundColor: color.hex }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Pré-visualização */}
        <div className="flex flex-col gap-5 w-full xl:w-3/5">
          <h2 className="text-2xl font-semibold text-gray-300">Pré-visualização (Fundo Transparente)</h2>
          
          <div className="bg-neutral-900 py-10 px-4 rounded-xl flex items-center relative overflow-x-auto h-[300px] border border-white/5" 
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, #171717 25%, transparent 25%, transparent 75%, #171717 75%, #171717), repeating-linear-gradient(45deg, #171717 25%, #0a0a0a 25%, #0a0a0a 75%, #171717 75%, #171717)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
            
            <div className="mx-auto w-max">
              
              <div 
                ref={killFeedRef} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', /* Centra a barra de 30px verticalmente dentro dos 44px */
                  height: '44px',       /* ALTURA DA IMAGEM FINAL EXPORTADA */
                  width: 'max-content',
                  backgroundColor: 'transparent', /* Fundo transparente para o recorte dos ícones funcionar */
                  whiteSpace: 'nowrap',
                  fontFamily: 'Scout, sans-serif', 
                  fontWeight: 'normal',
                  color: '#FFFFFF', 
                  letterSpacing: '0.7px' 
                }}
              >
                {/* ZONA 1: Ícone do Operador Atirador (Altura e Largura: 44px) */}
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingRight: '0px' /* Dá espaço entre o ícone e a barra colorida */
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

                {/* ========================================= */}
                {/* INÍCIO DA BARRA CENTRAL (Fina com 30px)     */}
                {/* ========================================= */}
                <div className="shadow-lg" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '30px', 
                  backgroundColor: 'rgba(33, 33, 33, 0.70)',
                  overflow: 'hidden' /* Corta os gradientes para não saírem da barra */
                }}>
                  
                  {/* ZONA 2: Nick Atirador */}
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
                  
                  {/* ZONA 3: Centro Escuro (Arma e Headshot Brancos) */}
                  {/* ZONA 3: Centro Escuro (Arma e Headshot Brancos) */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px', padding: '0 1px', height: '100%' }}>
                    
                    {/* Substituído pelo novo componente dinâmico */}
                    <WeaponDisplay weapon={weapon} />
                    
                    {isHeadshot && <HeadshotIcon />}
                  </div>

                  {/* ZONA 4: Nick Vítima */}
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
                {/* ========================================= */}
                {/* FIM DA BARRA CENTRAL                        */}
                {/* ========================================= */}

                {/* ZONA 5: Ícone da Vítima (Altura e Largura: 44px) */}
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingLeft: '0px', /* Dá espaço entre a barra e o ícone */
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

          <button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex justify-center items-center gap-3 mt-4 shadow-lg text-lg transform hover:scale-[1.01]">
            Baixar Kill Feed PNG
          </button>
        </div>

      </div>
    </div>
  )
}

export default App;