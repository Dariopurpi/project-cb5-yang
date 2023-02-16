import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos } from 'react-icons/md';

import styles from "./styles.module.scss"

export default function SigleAlbum({ albumData }) {

   console.log(albumData.tracks.data[0].title_short)
  
    return (
      <div className={styles.Album}>
        <Link className={styles.linkAlbum} href={"/top_album"}>
          <MdArrowBackIos /> ALBUM
        </Link>
        <div className={styles.containerAlbum}>
          <Image src={albumData.cover_medium} width={250} height={250} alt={albumData.title} />
          <h1>{albumData.title}</h1>
          <h5>{albumData.artist.name}</h5>
          <div className={styles.Tracks}>
            {
                albumData?.tracks?.data?.map(track => 
                <div className={styles.singleTrack}>
                  <span>{track.title_short}</span>
                  <audio controls>
                    <source src={track.preview} type="audio/mp3" />
                  </audio>
                </div>
                )
            }
          </div>
        </div>
        <iframe id={`deezer-widget-${albumData.id}`} 
          src={`https://widget.deezer.com/widget/dark/album/${albumData.id}?app_id=457142&autoplay=false&radius=true&tracklist=true`} 
          width="690" height="710" 
          allowtransparency="true" 
          allowfullscreen="true" 
          allow="encrypted-media">
        </iframe>
      </div>
    );
  }
  
  export async function getStaticPaths() {
    const res = await fetch("https://api.deezer.com/chart/0/albums");
    const data = await res.json();

    const paths = data.data.map((album) => ({
      params: { id: album.id.toString() },
    }));
  
    return { paths, fallback: true };
  }
  
  export async function getStaticProps({ params }) {

    const res = await fetch(`https://api.deezer.com/album/${params.id}`);
    const albumData = await res.json();

    return { 
      props: 
      { 
        albumData, 
      } 
    };
  }