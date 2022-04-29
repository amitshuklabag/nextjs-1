import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const initials = { latency: "? ms", host: "?", ip: "?", location: "?" };
  const [details, setDetails] = useState(initials);

  function getLatency() {
    setInterval(async () => {
      let started = new Date().getTime();
      let url = "/data.json?t=" + +new Date();
      await fetch(url)
        .then(function (response) {
          var ended = new Date().getTime();
          var milliseconds = ended - started;
          setDetails((prevState) => {
            return {
              ...prevState,
              latency: milliseconds + " ms",
            };
          });
        })
        .catch(function (error) {
          console.log("error", error);
          setDetails((prevState) => {
            return {
              ...prevState,
              latency: "? ms",
            };
          });
        });
    }, 1000);
  }

  async function getVariablesInfo() {
    let visitorInfos = null;
    if (localStorage.getItem("visitorInfos") == null) {
      await fetch("https://ipinfo.io/json")
        .then(async function (response) {
          visitorInfos = await response.json();
          localStorage.setItem("visitorInfos", JSON.stringify(visitorInfos));
          setDetails((prevState) => {
            return {
              ...prevState,
              host: window.location.host,
              ip: visitorInfos.ip ? visitorInfos.ip : "?",
              location: visitorInfos.city
                ? visitorInfos.country + ", " + visitorInfos.city
                : "?",
            };
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      visitorInfos = JSON.parse(localStorage.getItem("visitorInfos"));
    }
  }

  useEffect(() => {
    getLatency();
    getVariablesInfo();
  }, []);

  return (
    <div>
      <Head>
        <title>Elestio NextJs Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <header className={styles["app-header"]}>
          <Image src="/elestio-logo.svg" alt="logo" width={200} height={100} />
        </header>

        <div className={styles["app-body"]}>
          <div
            className={styles["app-heading"]}
            style={{ marginBottom: "40px" }}
          >
            <h1>Welcome to Elestio</h1>
            <h4>Deploy your apps quickly with the easiest CI/CD system</h4>
          </div>

          <p className={styles["app-info-block"]}>
            This Host{" "}
            <strong className={styles["subVal"]} id="host">
              {details?.host}
            </strong>
          </p>

          <p className={styles["app-info-block"]}>
            Your IP{" "}
            <strong className={styles["subVal"]} id="yourIP">
              {details?.ip}
            </strong>
          </p>

          <p className={styles["app-info-block"]}>
            Your Location{" "}
            <strong className={styles["subVal"]} id="location">
              {details?.location}
            </strong>
          </p>

          <p className={styles["app-info-block"]}>
            Latency to server{" "}
            <strong className={styles["subVal"]} id="latency">
              {details?.latency}
            </strong>
          </p>

          <div className={styles["app-deploy"]}>
            <a href="https://dash.elest.io/" className={styles["btn"]}>
              Deploy on Elestio
            </a>
          </div>
        </div>

        <div className={styles["area"]}>
          <ul className={styles["circles"]}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
