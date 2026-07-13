import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './FounderJourney.css';

const STAGES = [
  {
    num: '01',
    tag: '2025 &middot; the failure',
    title: 'BorrowXchange',
    body: 'Built a full P2P rental marketplace, start to finish. Shipped the whole product before I\u2019d actually validated anyone wanted it. Nobody had asked for it \u2014 I\u2019d just assumed they would.',
  },
  {
    num: '02',
    tag: 'the reframe',
    title: 'Talk to users first, build second',
    body: 'The lesson that changed how I work. Discovery isn\u2019t a phase you rush through before the real work starts \u2014 it is the work. Everything since has started with a conversation, not a design doc.',
  },
  {
    num: '03',
    tag: '2026 &middot; present',
    title: 'TrueHire',
    body: '20+ discovery calls in, the real insight surfaced: digital background checks are automatable, but physical, on-the-ground verification isn\u2019t. That gap \u2014 and who controls it \u2014 is the wedge.',
  },
  {
    num: '04',
    tag: 'what\u2019s next',
    title: 'The vision',
    body: 'Building the verification layer employers actually trust \u2014 starting with the checks nobody else wants to do by hand. Still early. Still validating. Still talking to people before writing code.',
  },
];

const FounderJourney = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.4'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="founder-journey section-padding" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="fj-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">
            <span className="tag-dot" />
            case file &middot; timeline
          </span>
          <h2 className="fj-title">The Story So Far</h2>
        </motion.div>

        <div className="fj-timeline">
          <div className="fj-line-track">
            <motion.div className="fj-line-fill" style={{ height: lineHeight }} />
          </div>

          <div className="fj-stages">
            {STAGES.map((stage, i) => (
              <motion.div
                className="fj-stage"
                key={stage.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="fj-node">
                  <span className="fj-node-num">{stage.num}</span>
                </div>
                <div className="fj-content">
                  <span
                    className="fj-tag"
                    dangerouslySetInnerHTML={{ __html: stage.tag }}
                  />
                  <h3 className="fj-stage-title">{stage.title}</h3>
                  <p className="fj-stage-body">{stage.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderJourney;