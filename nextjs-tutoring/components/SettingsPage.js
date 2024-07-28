import styles from './Pages.module.css'

const SettingsPage = () => (
  <div className={styles.page}>
    <h2>Settings</h2>
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email Notifications</label>
        <input type="checkbox" id="email" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="theme">Theme</label>
        <select id="theme" className={styles.select}>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
    </form>
  </div>
)

export default SettingsPage