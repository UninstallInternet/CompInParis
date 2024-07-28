import styles from './Pages.module.css'

const InvitePage = () => (
  <div className={styles.page}>
    <h2>Invite Students</h2>
    <form className={styles.form}>
      <input type="email" placeholder="Enter email address" className={styles.input} />
      <button type="submit" className={styles.button}>Send Invite</button>
    </form>
  </div>
)

export default InvitePage