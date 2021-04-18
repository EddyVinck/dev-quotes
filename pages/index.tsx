import * as React from "react";
import Head from "next/head";
import styles from "../styles/pages/Home.module.css";
import { Quote } from "../components/Quote/Quote";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DevQuotes!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Dev Quotes!</h1>
        <Quote />
      </main>

      <footer className={styles.footer}>
        Powered by{" "}
        <img src="/quote.png" alt="DevQuotes logo" className={styles.logo} />
        DevQuotes
      </footer>
    </div>
  );
};

export default Home;
