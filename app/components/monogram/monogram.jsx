import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}-monogram-clip`;

  return (
    <svg
      aria-hidden="true"
      className={classes(styles.monogram, className)}
      width="48"
      height="29"
      viewBox="0 0 48 29"
      preserveAspectRatio="xMidYMid meet"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M610 933 c-41 -7 -122 -35 -116 -40 2 -3 42 -6 88 -7 73 -2 93 -6 160 -38 82 -39 154 -98 190 -157 l23 -36 6 45 c4 25 10 79 13 121 l7 75 -38 12 c-92 27 -250 39 -333 25z" />
          <path d="M420 798 c-12 -27 -20 -65 -20 -104 0 -120 64 -188 250 -260 213 -83 260 -113 260 -169 0 -41 20 -38 40 7 12 27 20 65 20 104 0 129 -63 189 -297 280 -156 61 -213 100 -213 147 0 43 -19 41 -40 -5z" />
          <path d="M407 355 c-4 -33 -9 -88 -13 -122 l-6 -61 78 -19 c106 -24 278 -25 357 0 68 21 67 40 -2 31 -58 -7 -153 15 -225 54 -52 28 -140 107 -168 152 -15 24 -15 23 -21 -35z" />
        </clipPath>
      </defs>

      <g transform="translate(0, 33.6) scale(0.035, -0.0356)">
        {/* Couche de base visible */}
        <rect clipPath={`url(#${clipId})`} width="1340" height="1160" />
        {/* Surcouche de surbrillance si activée */}
        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect className={styles.highlight} width="1340" height="1160" />
          </g>
        )}
      </g>
    </svg>
  );
});
