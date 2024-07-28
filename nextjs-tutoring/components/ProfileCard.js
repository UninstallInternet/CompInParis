import Image from 'next/image'
import styles from './ProfileCard.module.css'

const ProfileCard = ({ name, role, imageUrl }) => {
  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        alt={`${name}'s profile picture`}
        width={100}
        height={100}
        className={styles.image}
      />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.role}>{role}</p>
    </div>
  )
}

export default ProfileCard