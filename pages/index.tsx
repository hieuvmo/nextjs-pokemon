import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { IPokemon } from "../types/pokemon.model";

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const resq = await fetch(
          "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
        );
        setPokemon(await resq.json());
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchPokemonList();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 style={{ textAlign: "center" }}>Pokemon List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.map((item) => (
          <Link key={item.id} href={`/pokemon/${item.id}`}>
            <a>
              <div
                style={{
                  marginBottom: "1rem",
                  width: "100px",
                  height: "100px",
                  position: "relative",
                }}
              >
                <Image
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${item.image}`}
                  alt="Vercel Logo"
                  layout="fill"
                  height={200}
                  width={200}
                />
              </div>
              <h3 style={{ textAlign: "center" }}>{item.name}</h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
