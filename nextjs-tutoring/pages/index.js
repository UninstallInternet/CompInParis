import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import ProfileCard from '../components/ProfileCard'
import MainContent from '../components/MainContent'
import LoginPage from '../components/LoginPage'
import styles from '../styles/Home.module.css'
import StudentsPage from '../components/StudentsPage'

export default function Home() {
  const [session, setSession] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [tutorInfo, setTutorInfo] = useState(null)
  const router = useRouter()

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
      //.eq('UUID', userId)
      .single()

    if (error) {
      console.error('Error fetching tutor info:', error)
    } else {
      setTutorInfo(data)
    }
  }

  const handleLogin = async (user) => {
    console.log('Logged in:', user)
    await fetchTutorInfo(user.id)
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    } else {
      setTutorInfo(null)
      setSession(null)
      router.push('/') // Redirect to home page, which will show login if not authenticated
    }
  }

  if (!session) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
       
    <div className={styles.container}>
      <ProfileCard
        name={tutorInfo?.name || session.user.email}
        role="Tutor"
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      {currentPage === 'students' ? (
        <StudentsPage tutorId={session.user.id} />
      ) : (
        <MainContent currentPage={currentPage} />
      )}
      
    </div>
  )
}