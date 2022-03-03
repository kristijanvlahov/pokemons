import classes from './Navigation.module.css';
import PokemonImage from '../../images/pokeball.png';
import Image from 'next/image';
import Link from 'next/link';

function Navigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link href={'/'}>Pokemon API</Link></div>
      <Image src={PokemonImage} width='100px' height='100px'/>
    </header>
  );
}

export default Navigation;