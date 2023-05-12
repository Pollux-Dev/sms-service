import styles from '@/styles/Home.module.css';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <div className={styles.container}>
      <Container maxWidth={'xxl' as any}>
        <Typography variant="h3">Overview</Typography>
      </Container>
    </div>
  );
}
