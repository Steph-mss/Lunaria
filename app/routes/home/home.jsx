import gamestackTexture2Large from '~/assets/JavaPhone2.png';

import gamestackTextureLarge from '~/assets/JavaPhone.png';

import sliceTextureLarge from '~/assets/OR.png';

import sprTextureLarge from '~/assets/FondA.png';

import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Mes Projects"
        description="Un aperçu concret de ce que j’ai conçu, codé et imaginé."
        buttonText="Explorez mes projets"
        buttonLink="/projects/"
        model={{
          type: 'laptop',
          alt: 'All projects screen',
          textures: [
            {
              srcSet: `${sprTextureLarge} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTextureLarge,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Plateforme de gestion de rendez-vous"
        description="Orchestrez vos rendez vous sans effort "
        buttonText="Voir le projet"
        buttonLink="https://github.com/Steph-mss/ApplicationMicroservice"
        model={{
          type: 'phone',
          alt: 'App RDV screen',
          textures: [
            {
              srcSet: `${gamestackTextureLarge} 375w, ${gamestackTextureLarge} 750w`,
              placeholder: gamestackTextureLarge,
            },
            {
              srcSet: `${gamestackTexture2Large} 375w, ${gamestackTexture2Large} 750w`,
              placeholder: gamestackTextureLarge,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Prêt à coder ? Lancez AWS en un clic"
        description="Déployez votre environnement de développement AWS en quelques minutes seulement"
        buttonText="Voir le projet"
        buttonLink="https://github.com/Steph-mss/Application-AWS"
        model={{
          type: 'laptop',
          alt: 'Application AWS screen',
          textures: [
            {
              srcSet: `${sliceTextureLarge} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTextureLarge,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
