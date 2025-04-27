import React from 'react';
import Image from 'next/image';

export default function SectionImage({ src, alt }) {
  return (
    <div className="section-img-wrapper">
      <Image src={src} alt={alt} width={1200} height={600} style={{ width: '100%', height: 'auto', borderRadius: '0', boxShadow: 'none' }} />
      <style jsx>{`
        .section-img-wrapper {
  width: 100vw;
  max-width: 100vw;
  margin: 1.5rem 0 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
          width: 100%;
          max-width: 700px;
          margin: 2.5rem auto 1.5rem auto;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
