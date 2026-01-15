

const ProjectList = () => {
  const projects = [
    { number: "01", name: "Web exprience" },
    { number: "02", name: "Digital products & services" },
    { number: "03", name: "Branding" },
    { number: "04", name: "Social and campaigns" },
    { number: "05", name: "Apex Analytics" },
  ]
  
  return(
    <>
      <div className = "w-full p-12 flex flex-col">
        {projects.map((item, idx) => (
          <div 
            key={idx}
            className = "flex flex-row space-x-4 p-4 border-b border-[#363636] text-white"
          >
            <p className="text-xl tracking-wide">[{ item.number }]</p>
            <h1 className="text-7xl tracking-tighter">{ item.name }</h1>
          </div>
        ))}
        
        <div className = "self-center mt-8 border border-[#363636] bg-white text-[#121212] rounded-full p-4">
          View all projects
        </div>
      </div>
    </>
  )
}

export default ProjectList;