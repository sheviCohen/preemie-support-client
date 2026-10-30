import { Outlet } from 'react-router'
import './App.css'
import Header from './pages/header'
import UserProvider from './context/userContext'
import NewMessage from './components/newMessage'


function App() {
  return (
    <>
    <UserProvider>
      <Header />
      <main className="mx-auto max-w-6xl animate-fade-up px-4 py-8">
        <Outlet />
      </main>
      <NewMessage></NewMessage>
      </UserProvider>
    </>
  )
}

export default App

