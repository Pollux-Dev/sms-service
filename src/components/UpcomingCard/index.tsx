import React from 'react';
import s from './upcomingcard.module.scss';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';

import T1 from './Sessions-Sessions-unsplash_1FxMET2U5dU.png';
import T2 from './Sessions-Sessions-unsplash_7JX0-bfiuxQ.png';
import T3 from './Sessions-Sessions-unsplash_f_mGDtPvMmk.png';

const upcomingThumb = [T1, T2, T3];

const UpcomingCard = ({ idx }: { idx: number }) => {
  return (
    <div className={s.container}>
      <div className={s.text}>
        <Typography className={s.title}>
          Finding Your niche as a creative...
        </Typography>

        <div className={s.date}>
          <div>
            <Typography noWrap>Jan 7th, 2022</Typography>
            <Typography variant="subtitle2" color="darkgray">
              Friday, 10:00pm WAT
            </Typography>
          </div>
          <Button variant="contained" size="small">
            RSVP
          </Button>
        </div>
      </div>

      <div className={s.thumbnail}>
        <Image
          src={upcomingThumb[idx]}
          alt="upcoming event thumbnail"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default UpcomingCard;
