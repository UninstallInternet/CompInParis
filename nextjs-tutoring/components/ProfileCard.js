import Image from 'next/image'
import styles from './ProfileCard.module.css'

const ProfileCard = ({ name, role, onPageChange, onLogout }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}></div>
      </div>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.role}>{role}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => onPageChange('students')}>View Students</button>
        <button className={styles.button} onClick={() => onPageChange('settings')}>Settings</button>
        <button className={styles.button} onClick={() => onPageChange('billing')}>Do Billing</button>
        <button className={styles.button} onClick={() => onPageChange('invite')}>Invite Students</button>
        <button className={styles.button} onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileCard