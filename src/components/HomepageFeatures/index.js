import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Clean & Modern',
    description: (
      <>
        A beautiful, transparent blue interface designed with glassmorphism
        effects for a premium reading experience.
      </>
    ),
  },
  {
    title: 'Easy Navigation',
    description: (
      <>
        Intuitive structure that helps you find what you need quickly
        and efficiently.
      </>
    ),
  },
  {
    title: 'Ready to Explore',
    description: (
      <>
        Start your journey through the content with a clean,
        distraction-free interface.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
