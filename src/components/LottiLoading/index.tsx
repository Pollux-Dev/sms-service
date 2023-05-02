import React, { useEffect, useRef } from 'react';
import s from './lottiloading.module.scss';
import Lotti from 'lottie-web';

const LOTTI_NAME = 'loading-lotti';

const LottiLoading = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lottiRef = Lotti.loadAnimation({
      name: LOTTI_NAME,
      container: loadingRef.current!,
      renderer: 'svg',
      // loop: loopReverse,
      // autoplay: autoPlay,
      path: '/loading.json',

      rendererSettings: {
        progressiveLoad: true,
      },
    });

    return () => {
      Lotti.destroy(LOTTI_NAME);
    };
  }, []);

  return (
    <div className={s.container}>
      <div className="loading_container" ref={loadingRef} />
    </div>
  );
};

export default LottiLoading;
