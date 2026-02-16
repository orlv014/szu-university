import React from 'react';

/** Пути к SVG-логотипам из папки public (добавлены вами). */
const LOGO_SZU_SVG = '/logo_szu.svg'; // синий, для светлого фона
const LOGO_SZU_BLACK_SVG = '/logo_szu_blackversion.svg'; // чёрный, для светлого фона; с invert — для тёмного

/**
 * Логотип СЗУ.
 * Использует SVG из public/: на светлом фоне — синий logo_szu.svg, на тёмном — logo_szu_blackversion.svg (белым через invert).
 */
const Logo: React.FC<{
  className?: string;
  height?: number;
  /** На тёмном фоне: чёрный SVG инвертируется в белый. */
  light?: boolean;
}> = ({ className = '', height = 44, light = false }) => {
  const [failed, setFailed] = React.useState(false);
  const src = light ? LOGO_SZU_BLACK_SVG : LOGO_SZU_SVG;
  if (failed) {
    return (
      <span
        className={`font-black tracking-tight ${light ? 'text-white' : 'text-slate-900'} ${className}`}
        style={{ fontSize: `${Math.round(height * 0.5)}px`, lineHeight: 1 }}
        aria-label="Северо-Западный университет"
      >
        СЗУ
      </span>
    );
  }
  return (
    <img
      src={src}
      alt="Северо-Западный университет"
      height={height}
      onError={() => setFailed(true)}
      className={`object-contain object-left ${light ? 'brightness-0 invert' : ''} ${className}`}
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
    />
  );
};

export default Logo;
