import React from 'react';
import styles from './Render.module.scss';

import { getMeRandomElements } from '../../../lib/randomElementes';

const inspirationPrompts = [
  'A Panda riding a bike through a city with depth of field',
  'interior design, open plan, kitchen and living room, modular furniture with cotton textiles, wooden floor, high ceiling',
  'Photograph of mount katahdin with a beautiful lake, 35mm, sharp, golden hour',
  'New york city, dust storm, cinematic, dramatic, composition, sunny sky, brutalist, hyper realistic,  epic scale, sense of awe, hypermaximalist, insane level of details, artstation HQ',
  'beautiful dress design for new york fashion week, 8k render in octane —h 600 —test',
  'A sorceress with a witch hat casting a fire ball, beautiful painting, detailed illustration, digital art, overdetailed art, concept art, full character, character concept, long hair,highly saturated colors, fantasy character, detailed illustration, 4k, Dan Mumford,',
  'highly detailed epic cinematic concept art an alien pyramid landscape , art station, landscape, concept art, illustration, highly detailed artwork cinematic, hyper realistic painting',
];

const Inspirations = ({ setValue }): any => {
  return getMeRandomElements(inspirationPrompts, 3).map((prompt, key) => (
    <div
      key={key}
      onClick={() => {
        setValue('prompt', `${prompt}`);
      }}
      className={styles.inspirationHStack}
    >
      <p className={styles.inspirationText}>{prompt}</p>
      <p className={styles.inspirationIcon}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1L4 7" stroke="#686868" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M1 4H7" stroke="#686868" strokeWidth="0.5" strokeLinecap="round" />
        </svg>
      </p>
    </div>
  ));
};

export default Inspirations;
