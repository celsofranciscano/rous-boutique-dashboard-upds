"use client";
import DarkMode from "@/components/common/DarkMode";
import Nav from "./Nav";
import Link from "next/link";

async function SideBar() {
  function handlebtnclick() {
    document.getElementById("sidebar")?.classList.toggle("hidden");
    // document.getElementById("capa-sidebar")?.classList.toggle("hidden");
  }
  const links = [
    { name: "Inicio", path: "/" },
    { name: "Tienda", path: "/tienda" },
    { name: "Contacto", path: "/contacto" },
  ];
  return (
    <>
      <header className="bg-white z-20 dark:bg-black border-b dark:border-zinc-800 h-16 shadow-md    fixed w-full flex items-center justify-between px-4 md:px-16">
        <a className="flex gap-1 items-center" href="/">
          <img className="w-12" src="/logo.png" alt="logo idiomify" />
          <span className="text-2xl font-medium dark:text-white text-black ">
            Rous Boutique
          </span>
        </a>

        <Nav links={links} />
        <div className="flex gap-4 items-center ">
          <DarkMode />
          <button className="bg-green-500 rounded-md px-4 py-2 hover:bg-green-600">
            <svg
              class="w-6 h-6  text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                clip-rule="evenodd"
              />
              <path
                fill="currentColor"
                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
              />
            </svg>
          </button>

          <button
            onClick={handlebtnclick}
            className="md:hidden bg-zinc-100 dark:bg-zinc-800 rounded-full p-0.5"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-zinc-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </header>
      <aside
        id="sidebar"
        className="bg-white z-20   dark:bg-black border-r border-zinc-800 w-72 md:w-60  h-screen dark:text-white text-black  fixed top-16  hidden md:hidden px-4 py-8"
      >
        <nav className="">
          <ul className="grid  pt-8 ">
            <li className="hover:bg-blue-100  dark:hover:bg-zinc-950 rounded-md px-4 py-2 ">
              <Link
                onClick={handlebtnclick}
                href="/"
                className="flex items-center gap-3"
              >
                <span>Inicio</span>
              </Link>
            </li>

            <li className=" hover:bg-blue-100  dark:hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/tienda"
                className="flex items-center gap-3"
              >
                <span>Tienda</span>
              </Link>
            </li>
       
            <li className=" hover:bg-blue-100  dark:hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/contacto"
                className="flex items-center gap-3"
              >
                <span>Contacto</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
