import { NavLink, useNavigate } from 'react-router';
import { useLogout } from '../api/auth';
import Logo from '../components/logo';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

// עיצוב הקישורים: מודגש בעמוד הנוכחי, רגיל בשאר
const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "rounded-full bg-linear-to-l from-teal-500 to-sky-500 px-4 py-1.5 font-semibold text-white shadow-md shadow-teal-500/25 transition"
    : "rounded-full px-4 py-1.5 text-slate-600 transition hover:-translate-y-0.5 hover:bg-white hover:text-teal-700 hover:shadow-sm";

function Header() {
  const logOut = useLogout();
  const navigate = useNavigate();
  const me=useContext(UserContext);
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 shadow-[0_8px_30px_-14px_rgba(15,118,110,0.3)] backdrop-blur-xl after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-linear-to-l after:from-transparent after:via-teal-400/50 after:to-transparent">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5">
        <Logo />
        <nav className="flex flex-wrap items-center justify-center gap-1">
          <NavLink className={linkClass} to="/" end>דף הבית</NavLink>
          <NavLink className={linkClass} to="/chats">הצ'אטים שלי</NavLink>
          <NavLink className={linkClass} to="/articles"> מאמרים מהצוות</NavLink>
          <NavLink className={linkClass} to="/profile">הפרופיל שלי</NavLink>
          {
              me?.role==="MOTHER" &&
            <NavLink className={linkClass} to="/calendar">הלו"ז שלי</NavLink>
          }
        </nav>
        <button className="rounded-full border border-rose-200 px-4 py-1.5 text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-50 hover:shadow-sm" onClick={() => { logOut(); navigate("/enterance", { replace: true }) }}>להתנתקות</button>
      </div>
    </header>
  )
}

export default Header
