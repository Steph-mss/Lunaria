import { Section } from '~/components/section';
import { Heading } from '~/components/heading';
import { DecoderText } from '~/components/decoder-text';
import { Transition } from '~/components/transition';
import { Link, useNavigation, useOutletContext } from '@remix-run/react';
import { tokens } from '~/components/theme-provider/theme';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import { Footer } from '~/components/footer';

// Import des données JSON
import projects from './projects.json';

export function meta() {
  return [
    { title: 'Mes Projets' },
    {
      name: 'description',
      content: 'Découvrez mes projets en développement web, applications et systèmes.',
    },
  ];
}

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({
    delay: numToMs((msToNum(offset) + numDelay).toFixed(0)),
  });
}

export default function Projects() {
  const { state } = useNavigation();
  const initDelay = tokens.base.durationS;
  const { setIsProjectHovered } = useOutletContext();
  const [background, setBackground] = useState(null);

  useEffect(() => {
    // Réinitialise l'état global quand on quitte la page
    return () => {
      setIsProjectHovered(false);
    };
  }, [setIsProjectHovered]);

  const handleMouseEnter = project => {
    setIsProjectHovered(true);
    setBackground(project.image);
  };

  const handleMouseLeave = () => {
    setIsProjectHovered(false);
    setBackground(null);
  };

  return (
    <>
      <Section
        className={`${styles.projects} ${background ? styles.backgroundActive : ''}`}
        style={{ '--bg-image': background ? `url(${background})` : 'none' }}
      >
        <Transition unmount in={state === 'idle'} timeout={1600}>
          {({ status, nodeRef }) => (
            <div ref={nodeRef} className={styles.layoutContainer} data-status={status}>
              <div className={styles.textColumn}>
                <Heading
                  className={styles.title}
                  as="h1"
                  level={3}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
                >
                  <DecoderText
                    text="Mes Projets"
                    start={status !== 'exited'}
                    delay={300}
                  />
                </Heading>
                <div
                  className={styles.description}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
                >
                  <p>
                    Découvrez mes projets en développement web, applications et systèmes.
                    Chaque projet représente un défi unique et une opportunité
                    d'innovation.
                  </p>
                </div>
              </div>
              <div
                className={styles.projectsColumn}
                style={getDelay(tokens.base.durationM, initDelay, 0.5)}
              >
                {projects.map(project => (
                  <Link
                    key={project.title}
                    to={project.link}
                    className={styles.projectCard}
                    onMouseEnter={() => handleMouseEnter(project)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={styles.projectImageWrapper}>
                      <img
                        className={styles.projectImage}
                        src={project.image}
                        alt={project.title}
                      />
                    </div>
                    <div className={styles.projectContent}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>{project.description}</p>
                      <div className={styles.projectTags}>
                        {project.tags.map(tag => (
                          <span key={tag} className={styles.projectTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </Section>
      <Footer />
    </>
  );
}
