// app/routes/competences.jsx
import { useState } from 'react';
import styles from './competences.module.css';
import competencesData from './competences.json';
import * as LucideIcons from 'lucide-react';
import { Section } from '~/components/section';
import { Heading } from '~/components/heading';
import { DecoderText } from '~/components/decoder-text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { useNavigation } from '@remix-run/react';
import { Footer } from '~/components/footer';

// === META pour Remix v2 ===
export function meta() {
  return [
    { title: 'Mes Compétences' },
    {
      name: 'description',
      content:
        'Présentation de mes compétences en développement front-end, back-end, bases de données, architecture, DevOps, sécurité et qualité.',
    },
  ];
}

// helper copié de contact.jsx pour piloter les délais d’animation
function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({
    delay: numToMs((msToNum(offset) + numDelay).toFixed(0)),
  });
}

export default function Competences() {
  const [selected, setSelected] = useState(0);
  const { sections, skillsBySection } = competencesData;
  const initDelay = tokens.base.durationS;
  const { state } = useNavigation();

  return (
    <>
      <Section>
        <Transition unmount in={state === 'idle'} timeout={1600}>
          {({ status, nodeRef }) => (
            <div ref={nodeRef} className={styles.competences}>
              {/* Titre principal */}
              <Heading
                className={styles.pageTitle}
                as="h1"
                level={3}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
              >
                <DecoderText
                  text="Mes Compétences"
                  start={status !== 'exited'}
                  delay={300}
                />
              </Heading>

              {/* Sous-titre */}
              <h2
                className={styles.pageSubtitle}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
              >
                Présentation de mes compétences en développement front-end, back-end,
                bases de données, architecture, DevOps, sécurité et qualité.
              </h2>

              {/* Sélecteur de section */}
              <div
                className={styles.sections}
                data-status={status}
                style={getDelay(tokens.base.durationM, initDelay, 0.5)}
              >
                {sections.map((titre, idx) => (
                  <button
                    key={titre}
                    className={styles.sectionButton}
                    data-active={selected === idx}
                    onClick={() => setSelected(idx)}
                  >
                    {titre}
                  </button>
                ))}
              </div>

              {/* Grille des compétences */}
              <div
                className={styles.skillsGrid}
                data-status={status}
                style={getDelay(tokens.base.durationL, initDelay, 0.6)}
              >
                {skillsBySection[selected].map((skill, i) => {
                  const { icon, name, color } = skill;
                  const Icon = LucideIcons[icon] || LucideIcons.Code;

                  return (
                    <div
                      key={name}
                      className={styles.cube}
                      data-status={status}
                      style={{
                        ...getDelay(tokens.base.durationS, initDelay, 0.7),
                        '--icon-color': color,
                      }}
                    >
                      <Icon size={36} />
                      <span className={styles.skillName}>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Transition>
      </Section>
      <Footer />
    </>
  );
}
