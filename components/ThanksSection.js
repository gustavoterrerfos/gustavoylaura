import React from 'react';
import styled from 'styled-components';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

const ThanksContainer = styled.section`
  background: #f8f5f0;  /* Un tono beige claro que combina con la paleta de colores */
  padding: 5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #e8e1d7;  /* Borde sutil para separar visualmente */
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #8B6F5E;  /* Un tono tierra más cálido para diferenciar */
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: #D4B483;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #6B8E7E;  /* Color que combina con la paleta de la boda */
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Signature = styled.div`
  margin-top: 3rem;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.3rem;
  color: #6B8E7E;
`;

export default function ThanksSection() {
  const fadeRef = useFadeInOnScroll();
  
  return (
    <ThanksContainer id="gracias">
      <Content className="fade-in" ref={fadeRef}>
        <Title>¡Gracias!</Title>
        <Message>
          Quedan ya pocos meses para nuestro gran día, pero ese día no sería igual para nosotros si no pudiésemos compartirlo con vosotros. En esta recta final, os pedimos que nos tengáis muy presentes en vuestras oraciones, para que podamos seguir preparándonos lo mejor posible para recibir este sacramento y comenzar nuestra nueva etapa juntos.
        </Message>
        <Message>
          ¡Esperamos que estéis contando los días con tanta ilusión como nosotros y que podamos disfrutar juntos de ese momento tan especial!
        </Message>
        <Signature>
          Con todo nuestro cariño,<br />
          Gustavo y Laura
        </Signature>
      </Content>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .thanks-container {
            padding: 4rem 1.5rem;
          }
          
          .thanks-title {
            font-size: 2rem;
          }
          
          .thanks-message {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </ThanksContainer>
  );
}
