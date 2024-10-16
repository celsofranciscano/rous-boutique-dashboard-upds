function Footer() {
    return (
      <footer className="bg-white dark:bg-black border-t dark:border-zinc-700 h-16 shadow-md w-full flex gap-4 flex-col md:flex-row items-center justify-between px-4 md:px-20 py-4 ">
        <a className="flex gap-1 items-center mb-2 md:mb-0" href="/" aria-label="Home" title="Home">
          <img className="w-12" src="/logo.png" alt="Rous Boutique logo" />
          <span className="text-xl dark:text-white text-black ">Rous Boutique</span>
        </a>
  
        <nav className="flex items-center justify-center gap-4">
          <ul className="flex gap-4 text-zinc-400">
          
            <li>
              <a href="/auth/login" className="hover:text-zinc-100 ">Access</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-zinc-100 ">Dashboard</a>
            </li>
          </ul>
        </nav>
  
        <div className="mt-2 md:mt-0 text-zinc-400 text-sm ">
          <p>&copy; {new Date().getFullYear()} Rous Boutique. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  