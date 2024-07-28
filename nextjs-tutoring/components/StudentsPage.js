import styles from './Pages.module.css'

const StudentsPage = () => (
  <div className={styles.page}>
    <h2>Students List</h2>
    <ul className={styles.list}>
      <li>Alice Johnson</li>
      <li>Bob Smith</li>
      <li>Charlie Brown</li>
      <li>Diana Ross</li>
    </ul>
  </div>
)

export default StudentsPage