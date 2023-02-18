import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { BsPlayCircle } from "react-icons/bs";
import Login from "@/Login/Login";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.scss";

export default function Home({ dataArtist, dataTracks, dataAlbums }) {
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  {
    useEffect(() => {
      if (localStorage.getItem("logged") != null) {
        setLogged(true);
      }
    }, []);

    if (logged === false) {
      return <Login />;
    }
    {
      return (
        <>
          <Head>
            <title>project-cb5-yang</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            <div className={styles.Homepage}>
              <section className={styles.topArtist}>
                <div className={styles.header}>
                  <Link href={"/top_artist"}>
                    <h2>Top Artists</h2>
                  </Link>
                  <Link href={"/top_artist"}>
                    <span>See all</span>
                  </Link>
                </div>
                <div className={styles.container_Content}>
                  {dataArtist?.data.map((artist) => (
                    <Link href={"/top_artist"}>
                      <Image
                        src={artist.picture_big}
                        width={200}
                        height={200}
                        alt={artist.name}
                      />
                      <p>{artist.name}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className={styles.topTracks}>
                <div className={styles.header}>
                  <Link href={"/top_track"}>
                    <h2>Top Tracks</h2>
                  </Link>
                  <Link href={"/top_track"}>
                    <span>See all</span>{" "}
                  </Link>
                </div>
                <div className={styles.container_Content}>
                  {dataTracks?.data.map((track) => (
                    <div className={styles.content}>
                      <Link href={"/top_track"}>
                        <Image
                          src={track.album.cover_medium}
                          width={200}
                          height={200}
                          alt={track.title}
                        />
                      </Link>
                      <Link
                        href={`/single_track/${track.id}`}
                        className={styles.btnPlay}
                      >
                        <BsPlayCircle />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.topAlbums}>
                <div className={styles.header}>
                  <Link href={"/top_album"}>
                    <h2>Top Albums</h2>
                  </Link>
                  <Link href={"/top_album"}>
                    <span>See all</span>
                  </Link>
                </div>
                <div className={styles.container_Content}>
                  {dataAlbums?.data.map((artist) => (
                    <Link href={"/top_album"}>
                      <Image
                        src={artist.cover_medium}
                        width={200}
                        height={200}
                        alt={artist.name}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </>
      );
    }
  }
}

export async function getServerSideProps() {
  const resArtist = await fetch("https://api.deezer.com/chart/0/artists");
  const resTracks = await fetch("https://api.deezer.com/chart/0/tracks");
  const resAlbums = await fetch("https://api.deezer.com/chart/0/albums");

  const dataArtist = await resArtist.json();
  const dataTracks = await resTracks.json();
  const dataAlbums = await resAlbums.json();

  return {
    props: {
      dataArtist,
      dataTracks,
      dataAlbums,
    },
  };
}
