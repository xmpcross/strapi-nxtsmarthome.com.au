interface Props {
  name: string;
  className?: string;
}

export default function RetailerLogo({ name, className = '' }: Props) {
  const cleanName = name.toLowerCase();

  if (cleanName.includes('jb hi-fi') || cleanName.includes('jb hifi')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FFE500] px-2 py-1 rounded text-black font-extrabold text-[11px] tracking-tighter leading-none font-sans uppercase ${className}`}>
        JB HI-FI
      </div>
    );
  }

  if (cleanName.includes('amazon')) {
    return (
      <div className={`inline-flex items-center justify-center font-bold text-xs text-slate-900 dark:text-white leading-none ${className}`}>
        <span>amazon</span>
        <span className="text-[9px] font-normal text-amber-500">.com.au</span>
      </div>
    );
  }

  if (cleanName.includes('good guys')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#002D62] text-white px-1.5 py-0.5 rounded font-black text-[9px] tracking-tight leading-none uppercase ${className}`}>
        The Good Guys
      </div>
    );
  }

  if (cleanName.includes('harvey norman')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0A2540] text-white px-1.5 py-0.5 rounded font-bold text-[9px] tracking-tight leading-none ${className}`}>
        Harvey Norman
      </div>
    );
  }

  if (cleanName.includes('officeworks')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00186B] text-white px-1.5 py-0.5 rounded font-extrabold text-[9px] leading-none ${className}`}>
        Officeworks
      </div>
    );
  }

  if (cleanName.includes('bunnings')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0D5233] text-white px-1.5 py-0.5 rounded font-bold text-[9px] tracking-tight leading-none uppercase ${className}`}>
        Bunnings
      </div>
    );
  }

  if (cleanName.includes('bing lee')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#004A99] text-white px-1.5 py-0.5 rounded font-black text-[9px] leading-none uppercase ${className}`}>
        BING LEE
      </div>
    );
  }

  if (cleanName.includes('kogan')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#E31B23] text-white px-1.5 py-0.5 rounded font-black text-[10px] leading-none lowercase ${className}`}>
        kogan
      </div>
    );
  }

  if (cleanName.includes('ebay')) {
    return (
      <div className={`inline-flex items-center justify-center font-black text-xs leading-none ${className}`}>
        <span className="text-[#E53238]">e</span>
        <span className="text-[#0064D2]">b</span>
        <span className="text-[#F5AF02]">a</span>
        <span className="text-[#86B817]">y</span>
      </div>
    );
  }

  if (cleanName.includes('scorptec')) {
    return (
      <div className={`inline-flex items-center justify-center bg-slate-900 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold text-[9px] leading-none ${className}`}>
        SCORPTEC
      </div>
    );
  }

  if (cleanName.includes('mwave')) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#121E36] text-amber-400 px-1.5 py-0.5 rounded font-bold text-[9px] leading-none ${className}`}>
        mwave
      </div>
    );
  }


  return (
    <div className={`inline-flex items-center justify-center bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white px-1.5 py-0.5 rounded font-semibold text-[10px] ${className}`}>
      {name}
    </div>
  );
}
