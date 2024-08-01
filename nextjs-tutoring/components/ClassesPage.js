import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import styles from '../styles/ClassesPage.module.css'
import ProfileCard from './ProfileCard'

const ClassesPage = ({ session, tutorInfo, onLogout, studentId, groupId }) => {
  const [classes, setClasses] = useState([])
  const [groupInfo, setGroupInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (groupId) {
      fetchClasses()
      fetchGroupInfo()
    }
  }, [groupId])

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('Classes')
        .select('*')
        .eq('class_group', groupId)
        .order('date', { ascending: false })

      if (error) throw error
      setClasses(data)
    } catch (error) {
      console.error('Error fetching classes:', error)
      setError('Error fetching classes')
    } finally {
      setLoading(false)
    }
  }

  const fetchGroupInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('ClassGroup')
        .select('*')
        .eq('id', groupId)
        .single()

      if (error) throw error
      setGroupInfo(data)
    } catch (error) {
      console.error('Error fetching group info:', error)
      setError('Error fetching group info')
    }
  }

  const handlePageChange = (page) => {
    if (page === 'students') {
      router.push('/')
    } else {
      router.push(`/${page}`)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <ProfileCard
          name={tutorInfo?.name || session?.user.email}
          role="Tutor"
          onPageChange={handlePageChange}
          onLogout={onLogout}
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.classesPage}>
          <h1>Classes for {groupInfo?.name}</h1>
          <button className={styles.backButton} onClick={() => router.push(`/student/${studentId}`)}>
            Back to Student Details
          </button>
          {classes.length === 0 ? (
            <p>No classes found for this group.</p>
          ) : (
            <ul className={styles.classList}>
              {classes.map((class_) => (
                <li key={class_.id} className={styles.classItem}>
                  <p>Date: {new Date(class_.date).toLocaleDateString()}</p>
                  <p>Topic: {class_.topic}</p>
                  <p>Notes: {class_.notes}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClassesPage