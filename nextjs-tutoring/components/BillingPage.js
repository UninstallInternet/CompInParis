import styles from './Pages.module.css'

const BillingPage = () => (
  <div className={styles.page}>
    <h2>Billing Information</h2>
    <div className={styles.billingInfo}>
      <p>Current Plan: Premium</p>
      <p>Next billing date: August 1, 2024</p>
      <button className={styles.button}>Upgrade Plan</button>
    </div>
  </div>
)

export default BillingPage
