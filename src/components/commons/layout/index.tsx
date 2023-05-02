import React, { useEffect, useRef } from 'react';
import s from './layout.module.scss';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface Props {
  children: React.ReactNode;
  pageProps: Record<string, any>;
}

const Layout: React.FC<Props> = ({ children }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { asPath, pathname } = useRouter();

  let homeScaleX = 1;
  let projectScaleX = 1;

  useEffect(() => {
    gsap.to('.home-nav', {
      scaleX: 0,
      transformOrigin: 'left', // duration: 1,
    });
  }, []);

  return (
    <>
      {/*<FixedLayer />*/}

      <motion.div className={s.root} layout>
        {/* <main>
          <Typography variant="h5">Contact Page</Typography>
          {children}
        </main>*/}

        <div className={s.controller}>
          <button
            onClick={() => {
              gsap.set('home-nav', { x: 0, scaleX: 1 });
              let homeScaleX = 1;
              let projectScaleX = 1;

              gsap
                .timeline()
                .to('.home-nav', {
                  scaleX: (x, target) => {
                    const { width } = target.getBoundingClientRect();
                    homeScaleX = window.innerWidth / width;
                    return homeScaleX - 2;
                  },
                  transformOrigin: 'left', // duration: 1,
                })
                .addLabel('home-exit')
                .to(
                  '.home-nav',
                  {
                    scaleX: 1,
                    x: (x, boo) => {
                      console.log('scale: ', homeScaleX * 100);

                      return `${(homeScaleX - 3) * 100}%`;
                    },
                  },
                  'home-nav',
                )

                .to(
                  '.project-nav',
                  {
                    scaleX: (x, target) => {
                      const { width } = target.getBoundingClientRect();
                      projectScaleX = window.innerWidth / width;
                      return projectScaleX - 2;
                    },
                    transformOrigin: 'left',
                  },
                  'home-exit',
                )
                .to('.project-nav', {
                  scaleX: 0,
                  x: (x, boo) => {
                    return `${(projectScaleX - 2) * 100}%`;
                  },
                });
            }}
          >
            one
          </button>
          <button>two</button>
          <button
            onClick={() => {
              gsap.set('.home-nav', {
                x: 0,
                scaleX: 0,
                transformOrigin: 'left',
              });
              gsap.set('.contact-nav', { x: 0, scaleX: 1 });
              gsap.set('.project-nav', { x: 0, scaleX: 1 });
            }}
          >
            reset
          </button>
        </div>

        <aside>
          <Link href={'/contact'}>
            <div className={clsx([s.contact_nav, s.nav, 'contact-nav'])}>
              <Typography variant="h1">Contact</Typography>
            </div>
          </Link>

          <Link href={'/projects'}>
            <div
              className={clsx([s.project_nav, s.nav, 'project-nav'])}
              onClick={() => {
                console.log('path: ', pathname);
                // if (pathname === '/projects') return;

                gsap
                  .timeline()
                  /*.to('.home-nav', {
                    scaleX: 1,
                    transformOrigin: 'left', // duration: 1,
                  })*/
                  .to('.home-nav', {
                    scaleX: (x, target) => {
                      const { width } = document.body
                        .querySelector('.project-nav')!
                        .getBoundingClientRect();
                      homeScaleX = window.innerWidth / width;
                      return homeScaleX - 2;
                    },
                    transformOrigin: 'left', // duration: 1,
                  })
                  .addLabel('home-exit')

                  .to(
                    '.home-nav',
                    {
                      scaleX: 1,
                      // transformOrigin: 'center', // duration: 1,
                      x: () => `${(homeScaleX - 3) * 100}%`,
                    },
                    'home-exit',
                  )

                  .to(
                    '.project-nav',
                    {
                      scaleX: (x, target) => {
                        const { width } = target.getBoundingClientRect();
                        projectScaleX = window.innerWidth / width;
                        return projectScaleX - 2;
                      },
                      transformOrigin: 'left',
                    },
                    'home-exit',
                  )
                  .to('.project-nav', {
                    scaleX: 1,
                    // transformOrigin: 'right',
                    x: () => `${(projectScaleX - 2) * 100}%`,
                  });
              }}
            >
              <Typography variant="h1">Projects</Typography>
            </div>
          </Link>

          <Link href={'/'}>
            <div
              className={clsx([s.home_nav, s.nav, 'home-nav'])}
              onClick={() => {
                console.log('path: ', pathname);
                if (pathname === '/') return;

                gsap
                  .timeline()
                  .to('.project-nav', {
                    scaleX: (x, target) => {
                      const { width } = document
                        .querySelector('.contact-nav')!
                        .getBoundingClientRect();

                      homeScaleX = window.innerWidth / width;
                      return homeScaleX - 1;
                    },
                    transformOrigin: 'right',
                  })

                  .addLabel('project-enter')
                  .to(
                    '.project-nav',
                    {
                      scaleX: 1,
                      x: (x, boo) => {
                        console.log(
                          'homeScaleX: ',
                          homeScaleX,
                          (homeScaleX - 10) * -100,
                        );
                        return `-${(homeScaleX - 10) * 100}%`;
                      },
                    },
                    'project-enter',
                  )
                  .to(
                    '.home-nav',
                    {
                      scaleX: (x, target) => {
                        const { width } = target.getBoundingClientRect();
                        projectScaleX = window.innerWidth / width;
                        return projectScaleX - 2;
                      },
                      transformOrigin: 'right',
                    },
                    'project-enter',
                  )
                  .to('.home-nav', {
                    scaleX: 0,
                    x: (x, boo) => {
                      const v = projectScaleX - 10 * 100;

                      console.log('value: ', v, projectScaleX);

                      return `-${v}%`;
                    },
                  });
              }}
            >
              <Typography variant="h1">About</Typography>
            </div>
          </Link>
        </aside>
      </motion.div>
    </>
  );
};

export default Layout;
