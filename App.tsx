import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Star, ThumbsUp, Heart, ChevronDown, ChevronUp, Lock, X, Loader2 } from 'lucide-react';

// --- Components ---

const CTAButton = ({ text, subtext, onClick }: { text: string; subtext?: string; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full max-w-md mx-auto group relative flex flex-col items-center justify-center bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:from-green-500 hover:via-green-400 hover:to-green-500 text-white font-bold py-5 px-8 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95 border-b-4 border-green-800 animate-pulse hover:animate-none"
  >
    <span className="text-2xl uppercase tracking-wider drop-shadow-md text-center">{text}</span>
    {subtext && <span className="text-sm font-normal opacity-90 mt-1 text-center">{subtext}</span>}
    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
  </button>
);

const Section = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <section className={`py-12 px-6 md:px-8 max-w-3xl mx-auto ${className || ''}`}>
    {children}
  </section>
);

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Mariana S.",
      image: "https://i.imgur.com/nCdT1tV.jpg",
      text: "No creía mucho en estas cosas, pero en la tercera noche me llamó llorando pidiendo volver. ¡Estoy en shock!",
      time: "Hace 2 horas"
    },
    {
      name: "Carlos Eduardo",
      image: "https://i.imgur.com/BJPY2Qu.jpg",
      text: "Lo hice para una persona nueva porque estaba solo. En 4 días conocí a alguien que parece que me conoce de otras vidas. Surrealista.",
      time: "Hace 5 horas"
    },
    {
      name: "Fernanda L.",
      image: "https://i.imgur.com/Sza1ZfT.png",
      text: "Me desbloqueó de todo y me envió un mensaje diciendo que soñó conmigo. Azara es realmente poderosa.",
      time: "Hace 1 día"
    },
    {
      name: "Juliana M.",
      image: "https://i.imgur.com/SPsVs9s.jpg",
      text: "Mi ex era súper orgulloso. Ayer apareció en mi puerta con flores pidiendo perdón. Nunca lo había visto así.",
      time: "Hace 1 día"
    },
    {
      name: "Roberto A.",
      image: "https://i.imgur.com/QfJtgio.jpg",
      text: "Funciona. Solo digo eso. Háganlo y vean con sus propios ojos.",
      time: "Hace 2 días"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-zinc-900/50 p-4 md:p-6 rounded-2xl border border-red-900/30 my-8">
      <h3 className="text-center text-xl font-bold mb-6 text-orange-400">Lo que están diciendo...</h3>
      <div className="relative overflow-hidden h-80 md:h-56">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out transform ${
              index === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-zinc-800 p-4 rounded-xl shadow-lg border border-zinc-700/50">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shadow-md flex-shrink-0"
                />
                <div>
                  <span className="font-bold text-white text-sm md:text-base block leading-tight">{t.name}</span>
                  <span className="text-xs text-zinc-500">{t.time}</span>
                </div>
              </div>
              <p className="text-zinc-300 italic mb-3 text-sm md:text-base leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 text-xs md:text-sm border-t border-zinc-700/50 pt-2 mt-2">
                <div className="flex items-center gap-1 text-blue-400 font-medium">
                  <ThumbsUp size={14} fill="currentColor" /> Me gusta
                </div>
                <div className="flex items-center gap-1 text-red-500 font-medium">
                  <Heart size={14} fill="currentColor" /> Me encanta
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 w-2 rounded-full transition-all ${idx === current ? 'bg-orange-500 w-6' : 'bg-zinc-700'}`}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
      >
        <span className="font-semibold text-lg text-zinc-200">{question}</span>
        {isOpen ? <ChevronUp className="text-orange-500" /> : <ChevronDown className="text-zinc-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Social Proof Popup ---

const SocialProofPopup = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', action: '' });

  useEffect(() => {
    const names = ["María G.", "Ana P.", "Sofía L.", "Lucía M.", "Carmen R.", "Elena T.", "Isabela C.", "Valentina S.", "Camila D.", "Julieta F.", "Gabriela A.", "Fernanda S."];
    const actions = [
      "acaba de activar el Ritual 🔥",
      "inició el Ritual de Unión ❤️",
      "reservó su lugar en el templo ✨",
      "encendió la Llama Sagrada 🔥",
      "está realizando el Ritual de Atracción 🔮"
    ];

    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setData({ name: randomName, action: randomAction });
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000); 
    };

    // Delay inicial
    const initialTimeout = setTimeout(showNotification, 8000);
    // Loop
    const interval = setInterval(() => {
      showNotification();
    }, 20000); // A cada 20 segundos

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`fixed top-14 md:top-20 right-2 z-[60] w-auto max-w-[150px] transition-all duration-700 transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-md border border-zinc-200 border-l-2 border-l-orange-600 shadow-2xl rounded p-1.5 flex items-start gap-1.5">
        <div className="bg-orange-100 p-0.5 rounded-full shrink-0 mt-0.5">
            <Check size={8} className="text-orange-600" />
        </div>
        <div>
            <p className="text-zinc-900 font-bold text-[9px] leading-none mb-0.5">{data.name}</p>
            <p className="text-zinc-600 text-[8px] leading-tight">{data.action}</p>
            <p className="text-zinc-400 text-[7px] mt-0.5">Hace unos instantes</p>
        </div>
      </div>
    </div>
  );
};

// --- Funnel Logic & Components ---

type FunnelStep = 'idle' | 'intent' | 'form_back' | 'form_new' | 'loading' | 'success';

const FunnelView = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<FunnelStep>('intent');
  const [yourName, setYourName] = useState('');
  const [targetName, setTargetName] = useState('');
  const [loadingText, setLoadingText] = useState('Iniciando conexión espiritual...');

  // Reset state on mount
  useEffect(() => {
    setStep('intent');
    setYourName('');
    setTargetName('');
  }, []);

  const handleStartLoading = () => {
    setStep('loading');
    setLoadingText('Preparando el hechizo...');
    
    setTimeout(() => {
      setLoadingText('Accediendo a campos energéticos...');
    }, 1500);

    setTimeout(() => {
      setLoadingText('La Sacerdotisa Azara está recibiendo tu intención...');
    }, 3000);

    setTimeout(() => {
      setStep('success');
    }, 5000);
  };

  const handleFinalize = () => {
    window.location.href = "https://go.centerpag.com/PPU38CQ61TB";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col animate-in fade-in duration-500">
       <div className="flex justify-end p-4 md:p-6">
         <button onClick={onClose} className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
           <span className="text-sm uppercase tracking-widest font-bold">Volver</span>
           <X size={32} />
         </button>
       </div>
       
       <div className="flex-grow flex items-center justify-center p-4">
         <div className="w-full max-w-lg">
            
            {/* Step 1: INTENT */}
            {step === 'intent' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold fire-text">¿Cuál es tu intención?</h2>
                  <p className="text-xl text-zinc-300">Elige el camino de tu corazón para que la Sacerdotisa Azara pueda guiar el ritual.</p>
                </div>
                <div className="space-y-4">
                  <button 
                    onClick={() => setStep('form_back')}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-orange-500 p-6 rounded-xl transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white group-hover:text-orange-400">Quiero traer un amor de vuelta</span>
                      <ChevronDown className="-rotate-90 text-zinc-500 group-hover:text-orange-500" />
                    </div>
                  </button>
                  <button 
                    onClick={() => setStep('form_new')}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-orange-500 p-6 rounded-xl transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white group-hover:text-orange-400">Quiero atraer un nuevo amor</span>
                      <ChevronDown className="-rotate-90 text-zinc-500 group-hover:text-orange-500" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2a: FORM BACK */}
            {step === 'form_back' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                   <h2 className="text-3xl font-bold text-white">Prepara el Ritual de la Unión</h2>
                   <p className="text-zinc-400">La Sacerdotisa Azara necesita los nombres para vincular el alma de ustedes dos.</p>
                </div>
                
                <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                  <div>
                    <label className="block text-sm font-bold text-zinc-400 mb-1">Tu nombre</label>
                    <input 
                      type="text" 
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      placeholder="Escribe tu nombre completo"
                      className="w-full bg-black border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-400 mb-1">Nombre de quien deseas</label>
                    <input 
                      type="text" 
                      value={targetName}
                      onChange={(e) => setTargetName(e.target.value)}
                      placeholder="Escribe el nombre de la persona"
                      className="w-full bg-black border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <CTAButton text="Vincular Almas Ahora" onClick={handleStartLoading} />
                  <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
                    <Lock size={12} /> Tus datos están 100% protegidos y privados.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2b: FORM NEW */}
            {step === 'form_new' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                   <h2 className="text-3xl font-bold text-white">Prepara el Ritual de la Atracción</h2>
                   <p className="text-zinc-400">Informa tu nombre para que la Sacerdotisa Azara pueda abrir tus caminos para el amor.</p>
                </div>
                
                <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                  <div>
                    <label className="block text-sm font-bold text-zinc-400 mb-1">Tu nombre</label>
                    <input 
                      type="text" 
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      placeholder="Escribe tu nombre completo"
                      className="w-full bg-black border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <CTAButton text="Abrir Mis Caminos" onClick={handleStartLoading} />
                  <p className="text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
                    <Lock size={12} /> Tus datos están 100% protegidos y privados.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: LOADING */}
            {step === 'loading' && (
              <div className="text-center space-y-8 animate-in fade-in duration-700">
                 <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 border-4 border-orange-900 rounded-full"></div>
                    <div className="absolute inset-0 border-t-4 border-orange-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-2xl">🔥</span>
                    </div>
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-white animate-pulse">{loadingText}</h3>
                   <p className="text-zinc-500 mt-2 text-sm">Por favor, no cierres esta página.</p>
                 </div>
              </div>
            )}

            {/* Step 4: SUCCESS */}
            {step === 'success' && (
              <div className="space-y-8 animate-in zoom-in duration-500">
                 <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-900/30 border-2 border-green-500 mb-4">
                       <Check size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-green-500">¡CONEXIÓN ESTABLECIDA!</h2>
                    
                    {/* Specific Success Message */}
                    {targetName ? (
                      <p className="text-xl text-white leading-relaxed">
                        <span className="text-orange-400 font-bold capitalize">{targetName}</span> está espiritualmente vulnerable. El vínculo ha sido mapeado con éxito.
                      </p>
                    ) : (
                      <p className="text-xl text-white leading-relaxed">
                        Tu campo energético está abierto. El universo está listo para traer tu nuevo amor.
                      </p>
                    )}

                    <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                       <p className="text-zinc-300">Todo está listo. La Sacerdotisa Azara espera tu confirmación para finalizar el ritual.</p>
                    </div>
                 </div>

                 <div className="pt-4">
                   <CTAButton text="FINALIZAR EL RITUAL" onClick={handleFinalize} />
                 </div>
              </div>
            )}

         </div>
       </div>
    </div>
  );
};


// --- Main App ---

export default function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [isFunnelOpen, setIsFunnelOpen] = useState(false);

  useEffect(() => {
    // Format: DD/MM/YYYY
    const date = new Date().toLocaleDateString('es-ES');
    setCurrentDate(date);
  }, []);

  const openFunnel = () => {
    setIsFunnelOpen(true);
    window.scrollTo(0, 0); // Reset scroll to top
    // Prevent background scrolling not needed if we replace view
  };

  const closeFunnel = () => {
    setIsFunnelOpen(false);
    window.scrollTo(0, 0); // Reset scroll to top
  };

  if (isFunnelOpen) {
    return <FunnelView onClose={closeFunnel} />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200 overflow-x-hidden selection:bg-red-900 selection:text-white pb-20">
      
      {/* Social Proof Popup */}
      <SocialProofPopup />

      {/* Urgency Banner */}
      <div className="bg-red-700 text-white font-medium text-center py-3 px-4 shadow-lg border-b border-red-900 z-50 relative">
        <p className="max-w-4xl mx-auto text-xs md:text-base leading-snug">
          ATENCIÓN: El inicio del año marca la apertura de un nuevo ciclo energético. El día <span className="text-yellow-300 font-bold">{currentDate}</span> el Ritual de la Llama de 5 Noches actúa con fuerza amplificada, acelerando el retorno de un amor perdido o la atracción irresistible de un nuevo amor, despertando deseo y conexión intensa.
        </p>
      </div>

      {/* Header / Hero */}
      <header className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black pt-4 pb-6">
        <Section className="!pt-2">
          <h1 className="text-xl md:text-5xl font-extrabold text-center leading-tight mb-8">
            Susurra el nombre de la persona deseada en esta <span className="fire-text">llama sagrada</span>… y en hasta 5 noches, quedará totalmente obsesionada por ti o alguien nuevo surgirá, tomado por un deseo imposible de ignorar.
          </h1>
          
          <div className="relative group mx-auto mb-8 w-full max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src="https://i.imgur.com/rJhARQH.jpg" 
              alt="Llama Sagrada" 
              className="relative rounded-lg shadow-2xl w-full border border-zinc-800"
            />
          </div>

          <p className="text-xl md:text-2xl text-center font-medium text-zinc-300 leading-relaxed">
            Él o ella se revolverá en la cama por la noche, incapaz de sacarte de su cabeza. Y, en la quinta noche, se arrastrará de vuelta hacia ti — o surgirá en tu vida con una intensidad inexplicable — como si su vida dependiera de ello.
          </p>
        </Section>
      </header>

      {/* Narrative Body */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <p>Yo no ruego a nadie.</p>
        <p>No corro detrás de hombres o mujeres.</p>
        <p>Y con seguridad no me quedo sentada(o) llorando, preguntándome por qué la persona que quiero “necesita espacio”.</p>
        
        <div className="border-l-4 border-red-700 pl-6 py-2 my-8 bg-zinc-900/30">
          <p className="font-bold text-white mb-2">Porque encontré algo más antiguo.</p>
          <p className="font-bold text-white mb-2">Más oscuro.</p>
          <p className="font-bold text-white">Algo contra lo cual ningún corazón humano puede luchar.</p>
        </div>

        <p>Todo lo que hice fue entregar el nombre de la persona que quería traer de vuelta — o atraer por primera vez — a una sacerdotisa que guarda una llama antigua que arde hace más de 1.500 años.</p>
        <p>Ella susurró su nombre en el fuego.</p>
        <p>Y en menos de 48 horas, mi realidad comenzó a cambiar.</p>
        
        <ul className="list-none space-y-2 font-semibold text-white pl-4">
          <li className="flex items-center gap-2"><Check className="text-orange-500" size={20} /> Mensajes.</li>
          <li className="flex items-center gap-2"><Check className="text-orange-500" size={20} /> Señales.</li>
          <li className="flex items-center gap-2"><Check className="text-orange-500" size={20} /> Atención inesperada.</li>
          <li className="flex items-center gap-2"><Check className="text-orange-500" size={20} /> Conexiones surgiendo de la nada.</li>
        </ul>

        <p className="font-medium text-xl text-white">
          Rogando. Llorando. Arrastrándose de vuelta — o acercándose con una intensidad que nunca había vivido antes — como alguien que perdió completamente el control.
        </p>
      </Section>

      {/* The Problem */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-2xl font-bold text-white mb-4">La Última Vez Que Él (O Ella) Se Alejó…</h2>
        <p>O cuando nadie especial parecía aparecer en mi vida…</p>
        <p>La persona pensó que podía simplemente desaparecer.</p>
        <p>O el universo parecía ignorarme.</p>
        <p>Dejarme en el olvido.</p>
        <p>Actuar como si lo que yo sentía no hubiera significado nada.</p>
        <p className="text-orange-500 font-bold italic text-xl">Ahhh… qué tierno.</p>

        <p>Entregué el nombre — o la intención clara de atraer el amor correcto — a la Sacerdotisa Azara.</p>
        <p>Ella encendió la vela sagrada en su templo de fuego, pronunció el nombre o abrió el camino energético, y dejó que el fuego hiciera el trabajo.</p>

        <div className="relative group mx-auto my-8 w-full max-w-lg">
           <img 
              src="https://i.imgur.com/kkGFDp4.jpg" 
              alt="Sacerdotisa" 
              className="relative rounded-lg shadow-2xl w-full border border-zinc-800"
            />
            <p className="text-center text-sm text-zinc-500 mt-2 tracking-widest uppercase">SACERDOTISA</p>
        </div>
      </Section>

      {/* The Timeline */}
      <div className="bg-zinc-900 py-12">
        <Section className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">¿A la mañana siguiente?</h3>
            <p className="text-zinc-400">Un mensaje de la nada.</p>
            <p className="text-zinc-400">Un encuentro inesperado.</p>
            <p className="text-zinc-400">O alguien diciendo:</p>
            <div className="mt-3 bg-zinc-800 p-4 rounded-lg border-l-4 border-orange-500 italic text-white">
              “Tuve el sueño más extraño contigo. No consigo dejar de pensar en ti.”
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">¿En la tercera noche?</h3>
            <p className="text-zinc-400">37 llamadas perdidas.</p>
            <p className="text-zinc-400">Mensajes sin parar.</p>
            <p className="text-zinc-400">O una conexión tan intensa que parecía destino:</p>
            <div className="mt-3 bg-zinc-800 p-4 rounded-lg border-l-4 border-orange-500 italic text-white">
              “Lo siento… no sé qué me está pasando. Necesito verte.”
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">¿En la quinta noche?</h3>
            <p className="text-zinc-400">Él o ella estaba en mi puerta.</p>
            <p className="text-zinc-400">O totalmente presente en mi vida.</p>
            <p className="text-zinc-400">Ojos rojos. Voz temblorosa.</p>
            <p className="text-zinc-400">Jurando que nunca más se iría.</p>
            <div className="mt-3 bg-zinc-800 p-4 rounded-lg border-l-4 border-orange-500 italic text-white">
              Dijo que sentía el pecho en llamas y que yo era la única cosa capaz de apagar ese fuego.
            </div>
          </div>

          <p className="text-center font-bold text-2xl text-orange-500 mt-8">Todo esto en menos de 5 noches.</p>
        </Section>
      </div>

      {/* Why it works */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white">Por Qué Esto Funciona (Y Por Qué Todo Lo Demás Falla)</h2>
        <p>La mayoría de las personas hace todo mal.</p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-400">
          <li>Lloran abrazadas a la almohada.</li>
          <li>Ruegan atención.</li>
          <li>Stalkean redes sociales.</li>
          <li>O simplemente esperan a que el “amor aparezca”.</li>
        </ul>
        <p>Escuchan a amigos decir: <span className="italic text-white">“Dale tiempo al tiempo.”</span></p>

        <div className="bg-red-950/30 p-6 rounded-xl border border-red-900/50">
          <p className="font-bold text-white text-xl mb-4">Déjame contarte la verdad:</p>
          <p className="mb-2">El amor no vuelve por espacio.</p>
          <p className="mb-2">Y no aparece por casualidad.</p>
          <p className="text-orange-400 font-bold">Vuelve — o surge — cuando algo se agarra al alma y no suelta más.</p>
        </div>

        <p>Y es exactamente eso lo que esta llama hace.</p>
        <p>Ella no pide.</p>
        <p>No convence.</p>
        <p className="font-bold text-white">Ella quema tu nombre — o tu energía — en el espíritu de la persona correcta hasta que tú seas todo en lo que ella consigue pensar.</p>
      </Section>

      {/* The Secret */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white text-center mb-6">El Secreto Prohibido de los Templos de Fuego de Persia</h2>
        
        <img 
          src="https://i.imgur.com/RfnM0Aw.jpg" 
          alt="Templo de Fuego" 
          className="rounded-lg shadow-xl w-full border border-zinc-800 mb-6"
        />

        <p>Esto no es un truco moderno de “manifestación”.</p>
        <p>No son velas de tienda barata ni pensamientos positivos.</p>
        <p>Es un ritual de fuego antiguo que se remonta a más de 3.000 años, a las sacerdotisas zoroastristas de Persia.</p>
        <p>Ellas sabían algo que fue escondido de las personas por siglos:</p>
        
        <div className="text-center py-6 px-4 bg-gradient-to-b from-zinc-900 to-black rounded-lg border border-orange-900/30">
          <p className="text-xl font-medium text-white italic">
            "Todo ser humano tiene un punto en el alma que puede ser incendiado. Y cuando se enciende, arde por una única persona — y solo una."
          </p>
        </div>

        <p>Reinas y reyes usaban esto para mantener a sus amores leales. Tan leales que abandonaban amantes, dejaban guerras a la mitad y atravesaban reinos enteros solo para estar cerca de quien incendió su alma nuevamente.</p>
        <p>Los sacerdotes odiaban esto.</p>
        <p>Lo llamaban peligroso.</p>
        <p>Intentaron enterrar este conocimiento.</p>
        <p>Pero los susurros nunca cesaron.</p>
        <p>Porque toda persona que lo usaba sabía la verdad:</p>
        <p className="font-bold text-orange-500 text-xl">Una vez que el nombre entra en la llama sagrada, el alma queda ligada a ti.</p>
        <p className="font-bold text-orange-500 text-xl">Y ese fuego nunca se apaga.</p>
      </Section>

      {/* The Switch */}
      <div className="bg-zinc-900 py-10">
        <Section className="space-y-6 text-lg text-zinc-300 text-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">LAS PERSONAS CREEN QUE TIENEN EL CONTROL DE TODO.</h2>
          <p className="text-red-500 font-bold text-3xl">¡¡No lo tienen!!</p>
          
          <p>Todo ser humano tiene un interruptor escondido dentro de sí.</p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8 text-left">
            <div className="bg-black/50 p-6 rounded-xl border border-orange-500/30">
              <h3 className="text-orange-400 font-bold mb-2 text-xl">¿Cuando está encendido?</h3>
              <ul className="space-y-2">
                <li>No consigue pensar.</li>
                <li>No duerme.</li>
                <li>No para de imaginarte.</li>
              </ul>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-zinc-700">
              <h3 className="text-zinc-400 font-bold mb-2 text-xl">¿Cuando está apagado?</h3>
              <ul className="space-y-2">
                <li>Se vuelve frío.</li>
                <li>Distante.</li>
                <li>Desaparece.</li>
              </ul>
            </div>
          </div>

          <p>El Ritual de la Llama de 5 Noches enciende ese interruptor nuevamente.</p>
          <p>Por eso la gente lo llama <span className="text-orange-500 font-bold">"¡ritual de las personas en LLAMAS!"</span></p>
          <p className="font-medium text-white">Porque cuando el nombre toca la llama, esa persona arderá por ti. Y SOLAMENTE POR TI</p>
        </Section>
      </div>

      {/* 5 Nights Breakdown */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Lo Que Sucede A Lo Largo De Las 5 Noches</h2>
        
        <img 
          src="https://i.imgur.com/EcmtW16.jpg" 
          alt="5 Noches" 
          className="rounded-lg shadow-xl w-full border border-zinc-800 mb-8"
        />

        <p>Esto no son meses de espera.</p>
        <p>No son años de terapia.</p>
        <p>No es “manifestar por seis meses y esperar que funcione”.</p>
        <p className="font-bold text-white">La Sacerdotisa Azara susurra el nombre en la llama sagrada y, en hasta 5 noches, el mundo de la persona se pone patas arriba.</p>

        <div className="space-y-6 mt-8">
          {[
            { night: "Noche 1: La Primera Chispa", desc: "En el momento en que el nombre entra en la llama, algo cambia. La persona se sentirá inquieta esa noche. Se revolverá a las 3 de la mañana sin saber por qué. Tu rostro parpadeará en su mente. Sentirá un dolor extraño en el pecho que no consigue explicar." },
            { night: "Noche 2: El Calor Aumenta", desc: "Empieza a pensar en ti más. Mucho más. Se encontrará mirando fotos antiguas tuyas. Reviviendo conversaciones. La idea de ti con otra persona le provocará náuseas." },
            { night: "Noche 3: El Fuego se Esparce", desc: "Ahora no consigue librarse de ti. Soñará contigo de forma tan real que despierta confundida. Los amigos notarán que algo anda mal. Mandará un mensaje débil solo para “tantear el terreno”, porque no aguanta más la presión." },
            { night: "Noche 4: El Incendio", desc: "Está perdiendo el control. No consigue concentrarse en el trabajo. No siente placer en nada. Todas las otras personas parecen insípidas cerca de ti. El fuego quemó todo. Solo tú quedaste en su mente." },
            { night: "Noche 5: Rendición Total", desc: "Se rompe. ¿El orgullo? Desapareció. ¿Las defensas? Se volvieron cenizas. Llama. Manda mensaje. Aparece. Llora, pide disculpas y jura que nunca más te dejará. Dice cosas como: “No sé qué me pasó, pero no puedo vivir sin ti.”" }
          ].map((item, i) => (
            <div key={i} className="border-l-4 border-orange-600 pl-4 py-2">
              <h4 className="text-xl font-bold text-orange-500 mb-1">{item.night}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-medium text-white">O… si no había nadie específico, alguien nuevo surge, dominado por este mismo fuego.</p>

        <div className="bg-red-900/20 border border-red-600/50 p-6 rounded-xl mt-8">
          <h3 className="text-red-500 font-bold text-xl uppercase mb-2 flex items-center gap-2">
            <ShieldCheck /> Pero Necesito Avisarte…
          </h3>
          <p className="mb-2">Esto no es un juego.</p>
          <p className="mb-4">Cuando la Sacerdotisa Azara realiza este ritual, las personas no solo vuelven.</p>
          <ul className="list-none space-y-1 font-bold text-white mb-4">
            <li>Se pegan.</li>
            <li>Se vuelven obsesionadas.</li>
            <li>No se cansan de ti.</li>
          </ul>
          <p className="text-sm uppercase tracking-wide">Si no estás lista(o) para que esa persona te desee cada segundo de todos los días… no hagas esto.</p>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Historias reales de personas que usaron la llama</h2>
        <TestimonialCarousel />
      </Section>

      {/* History */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white">La Historia Prohibida Que Intentaron Enterrar</h2>
        <p>¿Crees que inventé esto?</p>
        <p className="font-bold text-white">No.</p>
        <p>Este ritual es más antiguo que la iglesia.</p>
        <p>Más antiguo que la terapia.</p>
        <p>Más antiguo que cualquier consejo de relación que ya hayas escuchado.</p>
        <p>Personas usan el fuego para ligar corazones desde hace miles de años.</p>
        
        <ul className="list-disc pl-5 text-zinc-400">
            <li>En templos persas antiguos.</li>
            <li>En cámaras escondidas.</li>
            <li>En ceremonias secretas pasadas de generación en generación.</li>
        </ul>

        <p>Porque quien aprendía esto sabía una cosa:</p>
        <div className="bg-zinc-900 p-4 rounded border-l-2 border-zinc-600 font-medium text-white">
            <p>Todo ser humano tiene un punto débil en el alma.</p>
            <p>Todo ser humano puede ser encendido.</p>
            <p>Todo ser humano puede ser incendiado por alguien.</p>
        </div>
        <p>Y el fuego era como se hacía eso.</p>
      </Section>

      {/* Kings & Queens */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white">Reinas y Reyes Que Hicieron Amores Arrastrarse</h2>
        <img 
          src="https://i.imgur.com/1sAIPUI.jpg" 
          alt="Reinas y Reyes" 
          className="rounded-lg shadow-xl w-full border border-zinc-800 my-4"
        />
        <p>Existen historias — susurradas, borradas de los libros de historia — sobre reinas y reyes que usaron la llama sagrada para traer sus amores de vuelta.</p>
        <p>Una reina — o un rey — mandó realizar el ritual mientras la persona amada estaba lejos, involucrada en otra relación, en otra vida, en otro camino.</p>
        <h4 className="text-xl font-bold text-orange-400">¿Cinco noches después?</h4>
        <p>Ella o él abandonó al amante.</p>
        <p>Abandonó la distracción.</p>
        <p>Abandonó todo lo que creía importante.</p>
        <p>Volvió corriendo, pálido(a) y temblando, susurrando:</p>
        <p className="text-2xl font-serif italic text-center my-4 text-white">“No puedo respirar sin ti.”</p>
        <p>Los generales lo llamaron locura.</p>
        <p>Los sacerdotes lo llamaron brujería.</p>
        <p className="font-bold text-white">Quien usó la llama lo llamó poder.</p>
      </Section>

      {/* Tried to Destroy */}
      <div className="bg-zinc-900 py-10">
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white">Intentaron Destruir Esto</h2>
        <p>¿Cuando los sacerdotes se dieron cuenta de lo que las guardianas del fuego hacían con la llama sagrada?</p>
        <p>Entraron en pánico.</p>
        <p>Lo llamaron maldad.</p>
        <p>Dijeron que amenazaba el orden natural.</p>
        <p className="font-bold text-white text-xl">¿Por qué?</p>
        <p>Porque funcionaba.</p>
        <p>Porque personas “lógicas” se desmoronaban como niños.</p>
        <p>Porque personas “fuertes” lloraban como bebés.</p>
        <p>Porque personas “fieles” abandonaban todo para arrastrarse de vuelta a quien incendió su alma.</p>
        <p>Entonces lo prohibieron. Quemaron los textos. Dispersaron a las sacerdotisas y guardianes.</p>
        <p className="text-orange-500 font-bold">Pero los susurros nunca mueren.</p>
        <p>El conocimiento sobrevivió. Pasado en secreto, de guardiana a guardián, de generación en generación.</p>
        <p className="text-white text-xl font-bold border-b border-orange-500 inline-block pb-1">Y ahora está aquí. Listo para ligar el alma de la persona que deseas a la tuya.</p>
      </Section>
      </div>

      {/* Who is Azara */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white text-center">¿Quién Es la Sacerdotisa Azara?</h2>
        <img 
          src="https://i.imgur.com/S0BPoDO.jpg" 
          alt="Sacerdotisa Azara" 
          className="rounded-lg shadow-xl w-full border border-zinc-800 my-4"
        />
        <p>La Sacerdotisa Azara es descendiente directa de los guardianes del fuego zoroastristas de la antigua Persia.</p>
        <p>Su familia guarda la llama sagrada desde hace más de 1.500 años. Cuando los templos fueron destruidos, huyeron con las brasas, manteniendo la tradición viva en secreto.</p>
        <p>Hoy, ella realiza el ritual de la llama en su templo particular para un número limitado de personas por semana.</p>
        <p>Ella no lo hace por dinero. Es su llamado. Su propósito. Garantizar que este poder antiguo no se pierda en el mundo.</p>
        <p className="text-red-400 italic">Pero el ritual la drena. Cada uno exige días de preparación y recuperación. Por eso solo puede ayudar a un número limitado de personas.</p>
      </Section>

      {/* How it works */}
      <div className="bg-gradient-to-b from-zinc-900 to-black py-12">
        <Section className="space-y-6 text-lg text-zinc-300">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Cómo Funciona</h2>
            <p className="text-center mb-6">Es simple.</p>
            <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg flex gap-4 items-start">
                    <span className="bg-orange-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</span>
                    <p>Haces clic en el botón de abajo y rellenas un formulario corto con el nombre de la persona deseada o solicitas la apertura para un nuevo amor.</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg flex gap-4 items-start">
                    <span className="bg-orange-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</span>
                    <p>La Sacerdotisa Azara realiza el Ritual de la Llama de 5 Noches en su templo.</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg flex gap-4 items-start">
                    <span className="bg-orange-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</span>
                    <p>Tú sigues con tu vida mientras la llama hace el trabajo.</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg flex gap-4 items-start">
                    <span className="bg-orange-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</span>
                    <p>En hasta 5 noches, ve el fuego actuar.</p>
                </div>
            </div>
            <p className="text-center font-bold text-white mt-6">Es eso. No necesitas hacer nada más que estar lista(o) cuando el universo se mueva.</p>
        </Section>
      </div>

      {/* Value Proposition */}
      <Section className="space-y-6 text-lg text-zinc-300 text-center">
        <h2 className="text-3xl font-bold text-white">¿Cuánto Vale la Obsesión De Esa Persona Para Ti?</h2>
        <p>Sé honesta(o).</p>
        <p>¿Cuánto pagarías para acabar con la humillación de ser ignorada(o)?</p>
        <p>¿Para cortar a cualquier otra persona de su vida de una vez?</p>
        <p>¿Para verla de rodillas, rogando por otra oportunidad?</p>
        <p>Las personas gastan miles en terapia y coaches que no funcionan. Pierden meses con estrategias de “contacto cero” que no llevan a ningún lugar.</p>
        <p>Nada de eso enciende el interruptor de la obsesión de esa persona.</p>
        <p>Nada de eso quema tu nombre en su alma.</p>
        <p className="text-2xl font-bold text-orange-500">Pero esto sí lo hace.</p>
      </Section>

      {/* Pricing */}
      <Section className="space-y-6 text-lg text-zinc-300 text-center bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h2 className="text-3xl font-bold text-white">Tu Precio Hoy</h2>
        <p>La Sacerdotisa Azara no hace esto por lucro. Pero necesitamos cubrir los costos de mantener este sitio y su templo.</p>
        <p>Entonces acordamos un valor accesible para cualquier persona, independientemente de la situación.</p>
        <div className="text-xl text-zinc-500 line-through space-y-1">
            <p>No $200.</p>
            <p>No $100.</p>
            <p>Ni siquiera $50.</p>
        </div>
        <p className="font-bold text-white text-xl mt-4">Hoy, puedes tener el Ritual de la Llama de 5 Noches realizado por solo <span className="text-5xl text-green-500 block py-2">$11</span></p>
        <p className="uppercase font-bold tracking-widest text-sm">Once dólares.</p>
        <p>Menos que una cena fuera.</p>
        <p className="text-orange-400 font-bold">Por el poder de hacer que esa persona arda por ti para siempre.</p>
      </Section>

      {/* Bonuses */}
      <Section className="space-y-6">
        <div className="bg-gradient-to-br from-red-900 to-black p-6 rounded-2xl border border-red-600 shadow-2xl">
            <h3 className="text-center text-2xl font-bold text-white mb-2">🎁 BONOS EXCLUSIVOS PARA QUIEN HAGA EL RITUAL HOY</h3>
            <p className="text-center text-yellow-400 text-sm font-bold mb-6">⚠️ ATENCIÓN: Estos bonos no se venden por separado. Solo se liberan para quien activa el Ritual del Fuego HOY.</p>
            
            <div className="space-y-6">
                {[
                    { title: "BONO #1 – Activación del Vínculo Energético Nocturno", price: "$27", desc: "Activación extra durante las 5 noches del ritual, fortaleciendo el vínculo mientras la persona duerme, intensificando sueños, pensamientos involuntarios y la llamada emocional." },
                    { title: "BONO #2 – Ritual de Corte de Terceras Personas", price: "$37", desc: "Ritual silencioso para enfriar cualquier interferencia externa, alejando rivales y conexiones paralelas sin confrontación o conflictos." },
                    { title: "BONO #3 – Sellado de la Llama (Anti-Arrepentimiento)", price: "$47", desc: "Después de la quinta noche, la llama es sellada para evitar enfriamiento, alejamientos futuros o recaídas emocionales." },
                    { title: "BONO #4 – Apertura para Amor Nuevo (si no hay nombre específico)", price: "$27", desc: "Activación energética para atraer a una nueva persona alineada, con conexión intensa desde el primer contacto." },
                    { title: "BONO #5 – Protección Energética de la Llama", price: "$27", desc: "Blindaje contra envidia, interferencias externas y energías negativas que puedan debilitar el ritual." },
                    { title: "BONO #6 – Prioridad Máxima en el Templo", price: "$19", desc: "Tu ritual se inicia inmediatamente, en la misma noche, sin lista de espera." }
                ].map((bonus, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-lg">
                        <h4 className="font-bold text-orange-400 text-lg">🔥 {bonus.title}</h4>
                        <p className="text-xs text-zinc-400 mb-1">Valor real: <span className="line-through">{bonus.price}</span></p>
                        <p className="text-zinc-200 text-sm">{bonus.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-xl font-bold text-white">👉 VALOR TOTAL REAL: <span className="line-through text-red-400">$197</span></p>
                <p className="text-yellow-400 font-bold text-lg mt-2">⚠️ PERO HACIÉNDOLO HOY…</p>
                <div className="bg-white/10 p-4 rounded-lg my-4 space-y-2 text-left inline-block">
                    <p className="flex items-center gap-2 font-bold"><Check className="text-green-500" /> TODOS LOS 6 BONOS</p>
                    <p className="flex items-center gap-2 font-bold"><Check className="text-green-500" /> ACTIVACIÓN INMEDIATA</p>
                    <p className="flex items-center gap-2 font-bold"><Check className="text-green-500" /> PRIORIDAD EN EL TEMPLO</p>
                </div>
            </div>
            
            <div className="mt-6">
                <CTAButton text="ENCIENDE LA LLAMA" onClick={openFunnel} />
            </div>
        </div>
      </Section>

      {/* Urgency */}
      <Section className="space-y-6 text-lg text-zinc-300">
        <h2 className="text-3xl font-bold text-white text-center">Pero Necesitas Actuar Ahora</h2>
        <img 
          src="https://i.imgur.com/gLqf1pr.jpg" 
          alt="Urgencia" 
          className="rounded-lg shadow-xl w-full border border-zinc-800 my-4"
        />
        <p>La Sacerdotisa Azara solo consigue realizar un número limitado de rituales por semana. Su energía no es infinita. Cuando las plazas se acaban, se acaban — hasta que ella se recupere.</p>
        <p>Si cierras esta página y vuelves mañana, tu plaza puede ya haber sido tomada.</p>
        <p>Cada noche que esperas es una noche más en que esa persona se aleja.</p>
        <p>Una noche más en que otra persona clava las garras más profundo en ella.</p>
        <p className="font-bold text-white">Una noche más que pierdes.</p>
        
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg my-8">
            <h3 className="text-xl font-bold text-white mb-4">Y Aquí Está la Verdad Más Oscura…</h3>
            <p>Esta página puede no seguir en línea.</p>
            <p>Ya intentaron enterrar este ritual antes.</p>
            <p>Terapeutas, coaches de relación, toda la industria de “autoayuda” — les encantaría ver esto desaparecer.</p>
            <p>Porque cuando las personas tienen este poder, nadie tiene oportunidad.</p>
            <p>No puedo prometer que esta página estará aquí mañana.</p>
        </div>

        <p className="font-bold text-white">Pero puedo prometer esto:</p>
        <div className="space-y-2 pl-4">
            <p>👉 Si actúas ahora, la Sacerdotisa Azara comenzará tu ritual hoy mismo por la noche.</p>
            <p>👉 Si esperas, tal vez nunca más veas esta página — o a esa persona — nuevamente.</p>
        </div>

        <div className="mt-8">
            <CTAButton text="LO QUIERO, ESTOY LISTA(O)" onClick={openFunnel} />
        </div>
      </Section>

      {/* Guarantee */}
      <div className="bg-zinc-900 py-12">
        <Section className="text-center space-y-6">
            <div className="inline-block p-4 rounded-full bg-black border-4 border-yellow-500 mb-4">
                <ShieldCheck size={64} className="text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-white">Sello de Garantía</h2>
            <h3 className="text-xl font-bold text-yellow-500">EL RIESGO ES 100% MÍO</h3>
            <p className="text-lg text-zinc-300">Tienes 7 días completos para ver los resultados.</p>
            <div className="text-left text-zinc-400 space-y-2 max-w-lg mx-auto bg-black/30 p-6 rounded-xl">
                <p>Si esa persona no está ardiendo de obsesión por ti…</p>
                <p>Si esa persona no vuelve arrastrándose, rogando por tu perdón…</p>
                <p>Si no te quedas completamente en shock con el nivel de desesperación de esa persona por ti…</p>
            </div>
            <p className="text-lg font-medium text-white">Basta enviar un correo electrónico y recibes cada centavo de vuelta. Sin preguntas. Sin complicaciones.</p>
            <p className="text-lg text-zinc-300">O recuperas a esa persona, totalmente devota a ti, o recibes tu dinero de vuelta.</p>
            <p className="font-bold text-green-500 text-xl">No hay riesgo.</p>
            
            <div className="mt-8">
                <CTAButton text="GARANTIZAR EL RITUAL" onClick={openFunnel} />
            </div>
        </Section>
      </div>

      {/* FAQ */}
      <Section className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Preguntas Frecuentes</h2>
        <div className="space-y-2">
            <FAQItem 
                question="¿Y si esa persona está con otra persona?" 
                answer="Genial. Esa otra persona es solo un espacio vacío. La llama no compite — ella apaga. Su conexión con esa persona se enfría. El toque parece incorrecto. La voz irrita. Ella mira y siente solo vacío. Y entonces corre de vuelta hacia ti."
            />
            <FAQItem 
                question="¿Y si esa persona me bloqueó en todo?" 
                answer="Mejor aún. El bloqueo no protege. Atrapa a la persona dentro de su propia cabeza con el fuego. Quedará tan obsesionada que encontrará una forma de hablar contigo — una cuenta nueva, un correo electrónico, apareciendo en persona. El bloqueo se convierte en su prisión, y tú eres la única salida."
            />
            <FAQItem 
                question="¿Y si ya pasaron meses o años?" 
                answer="No importa. El tiempo no apaga esta llama. La conexión entre ustedes todavía existe como una brasa enterrada. Este ritual es el viento que transforma esa brasa en incendio. Cuanto más tiempo pasó, más fuerte golpean los recuerdos cuando vuelven."
            />
            <FAQItem 
                question="¿Y si esa persona juró que nunca volvería?" 
                answer="Las personas dicen muchas cosas. Palabras grandes. Pero las palabras no significan nada cuando el alma está en llamas. En la quinta noche, ni recordará lo que juró. Estará demasiado ocupada rogando para que la aceptes de vuelta."
            />
            <FAQItem 
                question="¿Y si yo no creo en esto?" 
                answer="No necesitas creer. Al fuego no le importa la creencia. Arde de cualquier forma. Todo lo que necesitas hacer es entregar el nombre a la Sacerdotisa Azara. Ella se encarga del resto."
            />
            <FAQItem 
                question="¿Esto es permanente?" 
                answer="Sí. Por eso te avisé. No es temporal. Una vez que el nombre entra en la llama, el vínculo es sellado. No hagas esto si no tienes la seguridad de que quieres a esa persona ligada a ti."
            />
        </div>

        <div className="mt-12 mb-8">
            <CTAButton text="QUIERO AHORA" onClick={openFunnel} />
        </div>
      </Section>

      <footer className="text-center py-8 text-zinc-600 text-xs">
        <p>© {new Date().getFullYear()} Templo de la Llama Sagrada. Todos los derechos reservados.</p>
        <p className="mt-2">Este sitio no está afiliado a Facebook ni a ninguna entidad de Facebook.</p>
      </footer>

    </div>
  );
}