import styled from 'styled-components';

const Hero = styled.section`
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(255,253,249,0.78), rgba(255,253,249,0.78)), url('/Portada.JPG') center top/cover no-repeat;
  /* Siempre prioriza la parte superior de la imagen */
  text-align: center;
  position: relative;
  box-shadow: 0 2px 16px rgba(234, 215, 183, 0.10);
  padding: 3.5rem 0 3.5rem 0;
  @media (max-width: 700px) {
    padding: 2.2rem 1.5rem 2.5rem 1.5rem;
    background: linear-gradient(rgba(255,253,249,0.85), rgba(255,253,249,0.85)), url('/Portada.JPG') center top/cover no-repeat;
  }
`;

const Names = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  color: #7D8B6A;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;
  @media (max-width: 700px) {
    font-size: 2.1rem;
    margin-bottom: 1.1rem;
  }
`;

const Date = styled.p`
  font-size: 1.3rem;
  color: #5F805F;
  margin-bottom: 2em;
  font-family: 'Lato', sans-serif;
  @media (max-width: 700px) {
    font-size: 1.15rem;
    margin-top: 1.1rem;
  }
`;

const Button = styled.a`
  display: inline-block;
  border: 1.5px solid #EAD7B7;
  border-radius: 24px;
  padding: 0.8em 2.2em;
  background: #fffdf9cc;
  color: #2D2A2A;
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s, border 0.2s;
  box-shadow: 0 2px 8px rgba(234, 215, 183, 0.08);
  &:hover {
    background: #F8E1E7;
    border-color: #E1C9A6;
  }
`;

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const fadeRef = useRef(null);

  useEffect(() => {
    if (fadeRef.current) {
      fadeRef.current.classList.add('visible');
    }
  }, []);

  return (
    <Hero id="hero">
      <div>
        <div className="fade-in" ref={fadeRef}>
          <Names>Gustavo & Laura</Names>
          <div style={{fontFamily: 'Lato, serif', color: '#BFA76A', fontSize: '1.35rem', fontStyle: 'italic', marginBottom: '0.7em', letterSpacing: '0.01em'}}>“El Amor vence siempre”<br/><span style={{fontSize:'1.01rem', color:'#7D8B6A', fontStyle:'normal'}}>San Juan Pablo II</span></div>
          <Date>22 de noviembre de 2025</Date>
        </div>
      </div>
    </Hero>
  );
}
