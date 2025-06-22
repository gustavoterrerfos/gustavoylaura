import styled from 'styled-components';
import { useRef, useEffect } from 'react';

const Section = styled.section`
  padding: 5rem 0;
  background: #F5F9F6;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DecorationTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #B8C2B9, transparent);
  margin: 0 auto;
  width: 80%;
`;

const DecorationBottom = styled(DecorationTop)`
  top: auto;
  bottom: 0;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #7D8B6A;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: #B8C2B9;
  }
`;

const Text = styled.p`
  font-family: 'Lato', sans-serif;
  color: #6B8E7E;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Signature = styled.div`
  margin-top: 2.5rem;
  font-family: 'Playfair Display', cursive;
  color: #7D8B6A;
  font-size: 1.4rem;
  font-style: italic;
`;

export default function InvitationSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section>
      <DecorationTop />
      <Container ref={sectionRef}>
        <Title>Nuestra Boda</Title>
        <Text>
          Con mucha ilusión queremos compartir contigo este día tan importante. 
          Para nosotros, no hay mayor alegría que vivir este momento rodeados de las personas que más queremos.
        </Text>
      </Container>
      <DecorationBottom />
    </Section>
  );
}
