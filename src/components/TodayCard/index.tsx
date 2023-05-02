import React from 'react';
import s from './todaycard.module.scss';
import { Button, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import P1 from './Sessions-Sessions-ppl1.png';
import P2 from './Sessions-Sessions-ppl2.png';
import P3 from './Sessions-Sessions-ppl3.png';
import P4 from './Sessions-Sessions-ppl4.png';
import Main from './IMAGE.png';
import Link from 'next/link';

const people = [P1, P2, P3, P4];

const TodayCard = () => {
  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.text}>
          <header>
            <div className={s.date_title}>
              <Typography variant="h2">Thursday</Typography>
              <div className={s.date}>
                <Typography>Jan 7th, 2022</Typography>
                <Typography>Friday, 10:00pm WAT</Typography>
              </div>
            </div>
            <div className={s.live}>Live</div>
          </header>

          <Typography gutterBottom className={s.desc}>
            We exist to help people get answers to questions threy’ve not found.
            Either that they cannot ask them or they do not know to frame them,
            or the answers are not framed well...{' '}
            <Link href="/">Read more</Link>
          </Typography>

          <div className={s.people}>
            <div className={s.people_profiles}>
              {people.map((img, idx) => (
                <div
                  className={s.people_img}
                  key={img.src}
                  style={{ transform: `translateX(-${0.7 * idx}rem)` }}
                >
                  <Image src={img} alt="people image" />
                </div>
              ))}
            </div>
            <Typography>500+ going</Typography>
          </div>

          <div className={s.btns}>
            <Button variant="contained" size="large">
              Join Now
            </Button>
            <Button variant="outlined" size="large">
              View Event
            </Button>
          </div>
        </div>

        <div>
          <div className={s.thumbnail}>
            <Image src={Main} alt="today session thumbnail" objectFit="cover" />
          </div>
        </div>
      </div>

      <div className={s.detail}>
        <div className={s.date}>
          <div>
            <p>days</p>
            <Typography variant="h3">04</Typography>
          </div>
          <div>
            <p>Hours</p>
            <Typography variant="h3">12</Typography>
          </div>
          <div>
            <p>Minutes</p>
            <Typography variant="h3">32</Typography>
          </div>
        </div>

        <div className={s.title_detail}>
          <Typography gutterBottom>Title:</Typography>
          <Typography className={s.title}>
            Getting started with Figma; A designer’s First steps
          </Typography>
          <div className={s.tags}>
            <Chip clickable label="#UX design" />
            <Chip clickable label="#UX design" />
            <Chip clickable label="#UX design" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;
