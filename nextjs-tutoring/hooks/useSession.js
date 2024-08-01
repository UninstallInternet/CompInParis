import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export function useSession() {
  const [session, setSession] = useState(null)
  const [tutorInfo, setTutorInfo] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        fetchTutorInfo(session.user.id)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  return { session, tutorInfo, onLogout: handleLogout }
}