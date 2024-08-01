import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import styles from '../styles/StudentDetailsPage.module.css'
import ProfileCard from './ProfileCard'
import Link from 'next/link'


const StudentDetailsPage = ({ session, tutorInfo, onLogout }) => {
  const [student, setStudent] = useState(null)
  const [classGroups, setClassGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetchStudentDetails()
      fetchClassGroups()
    }
  }, [id])

  const fetchStudentDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('Students')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setStudent(data)
    } catch (error) {
      console.error('Error fetching student details:', error)
      setError('Error fetching student details')
    }
  }

  const fetchClassGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('ClassGroup')
        .select('*')
        .eq('student_id', id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setClassGroups(data)
    } catch (error) {
      console.error('Error fetching class groups:', error)
      setError('Error fetching class groups')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    if (page === 'students') {
      router.push('/') // Assuming your students list is on the home page
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
        <div className={styles.studentDetailsPage}>
          <h1>{student?.name}'s Details</h1>
          <h2>Class Groups</h2>
          {classGroups.length === 0 ? (
            <p>No class groups found for this student.</p>
          ) : (
            <ul className={styles.classGroupList}>
              {classGroups.map((group) => (
                <li key={group.id} className={styles.classGroupItem}>
                  <Link href={`/student/${id}/group/${group.id}`}>
                    <div>
                      <p>Date: {new Date(group.created_at).toLocaleDateString()}</p>
                      <p>Subject: {group.name}</p>
                      <p>Notes: {group.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDetailsPage