import styles from "./Flair.module.css";
import useFlair, { BIRD_COUNT } from "./useFlair";
import {
  BARK,
  HATCHING,
  INNER_BRANCHES,
  SPRIG,
  SPRIGS,
  TRUNK,
  VIEW_BOX,
} from "./treeShape";

// A small line-art bird facing right, 24x18, with its feet at the bottom.
const Bird = () => (
  <svg viewBox="0 0 24 18" width="24" height="18">
    <path
      className={styles.body}
      d="M 0.8 8 L 5 9.6 Q 8 6.6 13 7 Q 14.6 3.4 17.6 3.6 Q 20.4 3.9 20.6 6.4
         L 23.4 7.4 L 20.4 8.4 Q 19.8 12.8 15 14.6 Q 9 16.2 5.6 12 L 1.2 12.6 Z"
    />
    <path className={styles.wing} d="M 7 10.5 Q 11 4 15 10.5 Z" />
    <circle className={styles.eye} cx="18.2" cy="6" r="0.8" />
    <g className={styles.legs}>
      <line x1="10" y1="15" x2="10" y2="18" />
      <line x1="12.5" y1="14.6" x2="12.5" y2="18" />
    </g>
  </svg>
);

// One layer of leaf sprigs. Each is a copy of the shared sprig shape.
const Sprigs = ({ sprigs, className }) => (
  <g className={`${styles.sprigs} ${className}`}>
    {sprigs.map(({ x, y, angle, size }, index) => (
      <use
        key={index}
        href="#sprig"
        transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}
      />
    ))}
  </g>
);

// Drawn back to front: deep leaves, trunk, middle leaves, the branches that
// peek through, then the front and brightest leaves.
const Tree = ({ treeRef }) => (
  <svg
    ref={treeRef}
    className={styles.tree}
    viewBox={`${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${VIEW_BOX.height}`}>
    <defs>
      <path id="sprig" d={SPRIG} />
    </defs>

    <Sprigs sprigs={SPRIGS.deep} className={styles.deep} />

    <g className={styles.wood}>
      <path d={TRUNK} className={styles.trunk} />
      <g className={styles.bark}>
        {BARK.map(d => (
          <path key={d} d={d} />
        ))}
        <path d={HATCHING} className={styles.hatching} />
      </g>
    </g>

    <Sprigs sprigs={SPRIGS.mid} className={styles.mid} />

    <g className={`${styles.wood} ${styles.innerBranches}`}>
      {INNER_BRANCHES.map(d => (
        <path key={d} d={d} />
      ))}
    </g>

    <Sprigs sprigs={SPRIGS.front} className={styles.front} />
    <Sprigs sprigs={SPRIGS.highlight} className={styles.highlight} />
  </svg>
);

const Flair = () => {
  const { treeRef, birdRefs } = useFlair();

  return (
    <div className={styles.flair} aria-hidden="true">
      <Tree treeRef={treeRef} />

      {Array.from({ length: BIRD_COUNT }, (_, index) => (
        <div
          key={index}
          ref={el => (birdRefs.current[index] = el)}
          className={styles.bird}>
          <Bird />
        </div>
      ))}
    </div>
  );
};

export default Flair;
