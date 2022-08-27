import Head from "next/head";
import Link from "next/link";
import React from "react";
import { IPokemon, IPokemonDetail } from "../../types/pokemon.model";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const resq = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  const data: IPokemon[] = await resq.json();

  return {
    paths: data.map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const resq = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params?.id}.json`
  );
  const data: IPokemonDetail = await resq.json();
  return {
    props: {
      pokemonItem: data,
    },
  };
};

const PokemonDetail: NextPage<{ pokemonItem: IPokemonDetail }> = ({
  pokemonItem,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon Detail</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Link href={"/"}>
        <a>
          <button>Back to HOME</button>
        </a>
      </Link>
      <h1 style={{ textAlign: "center" }}>Pokemon Detail</h1>
      {pokemonItem && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginBottom: "1rem",
              width: "200px",
              height: "200px",
              position: "relative",
            }}
          >
            <Image
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemonItem.image}`}
              alt="Vercel Logo"
              layout="fill"
            />
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <h3>{pokemonItem.name}</h3>
            <div>{pokemonItem.type.join(", ")}</div>
            <table>
              <thead className={styles.header}>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {pokemonItem.stats.map(({ name, value }) => (
                  <tr key={name}>
                    <td className={styles.attribute}>{name}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
