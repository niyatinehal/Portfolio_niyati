import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const projects = [
  {
    id: 1,
    name: "K-VERSE - SOCIAL MEDIA WEBSITE",
    href: "https://k-verse-connect.netlify.app/",
    imageSrc:
      "https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g",
    used: " ReactJs, javascript, Node.js",
    description: "A social media website.",
  },
  {
    id: 2,
    name: "Bookshala",
    href: "https://bookshalaa-library.netlify.app/",
    imageSrc:
      "https://149795890.v2.pressablecdn.com/wp-content/uploads/2022/10/BatteryParkBE_14.png",
    used: "React.js, javaScript",
    description: "An online book shopping website.",
  },
  {
    id: 3,
    name: "Talk banana",
    href: "https://niyati-talk-banana.netlify.app/",
    imageSrc:
      "https://imgs.search.brave.com/zEB7s_Tcg7VN4hV0oq3vsHbdtpOpejxMR2E9BQ5A7O0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvbWluaW9uLXBp/Y3R1cmVzLXRwZ3R5/NjU4dGpmNWNhaTcu/anBn",
    used: "TailwindCSS, React.js, API calls",
    description: "A personal portfolio website.",
  },
  {
    id: 4,
    name: "My Portfolio",
    href: "https://niyati-talk-banana.netlify.app/",
    imageSrc:
      "https://imgs.search.brave.com/Gdgw6Ki6SWkjnLLa_mB3Zv9-XtGmjO2qjMbMC11EUco/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc1/NDMxOTQ3L3Bob3Rv/L3BvcnRmb2xpby5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OXBiMEFxY1dxaktJ/MmJKSl9wUmlkWnli/NWNLeHBkU1ZCNmRn/WU9wREx3ST0",
    used: "TailwindCSS, React.js, API calls",
    description: "A personal portfolio website.",
  },
  
];

export default function Projects() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div id="projects">
      <div className="mx-auto text-center max-w-2xl px-6 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg leading-7">Browse my recent</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
          Projects
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {projects.map((project) => (
            <div
            key={project.id}
            className="group relative ring-2 ring-base-300 bg-base-200 rounded-2xl shadow-xl p-4"
            data-aos="flip-left"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:brightness-75 duration-300 delay-100 lg:h-80 rounded-t-2xl ">
              <img
                  src={project.imageSrc}
                  alt={project.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between p-4">
                <div className="p-4">
                  <h3 className="text-lg font-bold">
                    <a href={project.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-1 mb-5 text-sm">{project.description}</p>
                  <p className="text-sm font-medium">{project.used}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <button className="btn btn-outline">View More</button>
        </div>
      </div>
    </div>
  );
}