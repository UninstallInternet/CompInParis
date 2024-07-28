import styles from './MainContent.module.css'
import StudentsPage from './StudentsPage'
import SettingsPage from './SettingsPage'
import BillingPage from './BillingPage'
import InvitePage from './InvitePage'

const MainContent = ({ currentPage }) => {
  const renderContent = () => {
    switch(currentPage) {
      case 'students':
        return <StudentsPage />
      case 'settings':
        return <SettingsPage />
      case 'billing':
        return <BillingPage />
      case 'invite':
        return <InvitePage />
      default:
        return <h2>Welcome to the Dashboard</h2>
    }
  }

  return (
    <div className={styles.mainContent}>
      {renderContent()}
    </div>
  )
}

export default MainContent