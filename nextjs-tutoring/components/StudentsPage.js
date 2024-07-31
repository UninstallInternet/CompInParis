import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import styles from './StudentsPage.module.css'
import Link from 'next/link'


const StudentsPage = ({ tutorId }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [tutorId])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      
      console.log('Fetching students for tutor ID:', tutorId)

      // Ensure tutorId is a valid UUID
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(tutorId)) {
        throw new Error('Invalid tutorId format. Expected UUID.')
      }

      // First, get the student IDs from the relationship table
      const { data: relationshipData, error: relationshipError } = await supabase
        .from('TutorStudentRelationship')
        .select('student_id')
        .eq('tutor_id', tutorId)

      if (relationshipError) throw relationshipError

      console.log('Relationship Data:', relationshipData)

      if (relationshipData.length === 0) {
        console.log('No students found for this tutor')
        setStudents([])
        return
      }

      const studentIds = relationshipData.map(row => row.student_id)
      console.log('Student IDs:', studentIds)

      // Then, fetch the student details
      const { data: studentsData, error: studentsError } = await supabase
        .from('Students')
        .select('id, name')
        .in('id', studentIds)

      if (studentsError) throw studentsError

      console.log('Students Data:', studentsData)

      setStudents(studentsData)
    } catch (error) {
      setError('Error fetching students: ' + error.message)
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading students...</div>
  if (error) return <div>{error}</div>
  return (
    <div className={styles.studentsPage}>
      <h2>Students List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className={styles.studentsList}>
          {students.map((student) => (
            <li key={student.id} className={styles.studentItem}>
              <Link href={`/student/${student.id}`}>
                {student.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudentsPage