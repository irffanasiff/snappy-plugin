import React, { useContext } from 'react';
import HomeLayout from '../components/home/HomeLayout';
import AppContext from '../context/app-context';
import styles from './Home.module.scss';

const Home = () => {
  const { setPromptGuide, promptGuide } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {promptGuide ? (
        <div style={{ padding: '1rem', transform: 'translateY(-4.6rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start' }}>
            <button
              style={{ fontSize: '20px', transform: 'rotate(90deg)', background: 'transparent', border: 'none' }}
              onClick={() => setPromptGuide(false)}
            >
              ⌵
            </button>
            <h5>Prompt Guide for Stable Diffusion</h5>{' '}
          </div>
          <p style={{ fontSize: '12px', fontWeight: '300' }}>
            In general, the best stable diffusion prompts will have this form: <br />
            <br /> A <b>type of picture</b> of a<b> main subject</b>, mostly composed of adjectives and nouns, 
            <b>style cues</b> <br /> <br /> <b>type of picture :</b> Some types of picture include digital illustration,
            a child's drawing, oil painting on canvas, matte painting, 3d render, b&w portrait, sculpture, etc <br />
            <br />
            <b>main subject :</b> The main subject can be anything you’re thinking of. You can be as specific or as
            vague as you want, but anything you leave out will be randomized. Being vague is a great way to get variety,
            but you may not get what you’re looking for. Try to be clear about any context or details that are important
            to you.
            <br />
            <br /> Eg: a cat samurai with a pet pug, adorable ferret wizard, wearing coat and suit, A beautiful mansion
            with flowered gardens and a fountain <br />
            <br /> <b>style cues :</b> used to condition the image on. Make sure not to include many styles in one
            prompt, the blend of conflicting styles won’t exactly produce a good result. Some good ones are: concept
            art, steampunk, trending in attestation (to make your image more artistic), hyper realistic, oil on canvas,
            vivid colors, unreal engine( to add more realistic lighting) etc.
          </p>
          <div>Prompt Guide</div>
        </div>
      ) : (
        <HomeLayout />
      )}
    </div>
  );
};

export default Home;
