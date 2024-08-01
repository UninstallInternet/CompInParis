import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../utils/supabaseClient'
import ClassesPage from '../../../../components/ClassesPage'

export default function ClassesPageWrapper() {
  const [session, setSession] = useState(null)
  const [tutorInfo, setTutorInfo] = useState(null)
  const router = useRouter()
  const { studentId, groupId } = router.query

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        fetchTutorInfo(session.user.id)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        fetchTutorInfo(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchTutorInfo = async (userId) => {
    const { data, error } = await supabase
      .from('Tutors')
      .select('name, email')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching tutor info:', error)
    } else {
      setTutorInfo(data)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <ClassesPage
      session={session}
      tutorInfo={tutorInfo}
      onLogout={handleLogout}
      studentId={studentId}
      groupId={groupId}
    />
  )
}