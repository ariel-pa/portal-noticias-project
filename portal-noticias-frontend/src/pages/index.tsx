import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Header from '@/components/Header'
import Categoria from '@/components/Categoria/Categoria'
import Search from '@/components/Search/Search'
import Noticia from '@/components/Noticia/Noticia'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Header title="Bienvenido"/>

    <Categoria/>

      <main className={styles.baneer}>
        <Link href="/detalle">
          <p>Baneer</p>
        </Link>
        <Search></Search>     
        
        <Noticia/>
      </main>

      <div>
        
      </div>
    </>
  )
}
