import Link from "next/link";

const Nav = () => {
  return (
    <div className = "w-full flex justify-center space-x-8 text-white font-bold p-1">
      <div>
        <Link href = "/">
          <h1>Home</h1>
        </Link>
      </div>
      
      <div>
        <Link href = "/about">
          <h1>About</h1>
        </Link>
      </div>
      
      <div>
        <Link href = "/projects">
          <h1>Work</h1>
        </Link>
      </div>
      
      <div>
        <Link href = "/contact">
          <h1>Contact</h1>
        </Link>
      </div>
    </div>
  )
}

export default Nav;