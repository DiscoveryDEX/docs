import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'White Paper',
    Svg: require('@site/static/img/logo_black.svg').default,
    description: (
      <>
        Read the White Paper.
        Download the White Paper PDF.
        Watch White Paper slides
      </>
    ),
  },
  {
    title: 'Maker',
    Svg: require('@site/static/img/logo_black.svg').default,
    description: (
      <>
        Maker... <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Taker',
    Svg: require('@site/static/img/logo_black.svg').default,
    description: (
      <>
        Taker...
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
