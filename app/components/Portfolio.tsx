import Link from "next/link";

const projects = [
  {
    title: "Hospital Management System",
    tech: "Next.js, TypeScript, Prisma, MySQL",
    desc: "Role-based hospital system with patient, doctor, appointment, and admin dashboards.",
    link: "https://github.com/Mamun-Miah/Hospital-Management-System-Next-js",
  },
  {
    title: "WordPress JSON → GitHub Sync Plugin",
    tech: "PHP, REST API, GitHub API",
    desc: "Automatically sync WordPress posts as JSON files to GitHub for headless CMS.",
    link: "https://github.com/Mamun-Miah/WordPress-API-Automation-to-Github",
  },
  {
    title: "Next.js Authentication System",
    tech: "Next.js, Prisma, MySQL, NextAuth",
    desc: "Secure authentication starter with JWT, protected routes, and DB session handling.",
    link: "https://github.com/Mamun-Miah/Nextjs15-Next-Auth--Prisma-mysql-setup-example",
  },
  {
    title: "Facebook Data Extractor Extension",
    tech: "JavaScript, Chrome APIs",
    desc: "Extract phone, email, WhatsApp & website links from Facebook pages automatically.",
    link: "https://github.com/Mamun-Miah/FB-Page-Link-Collector-Extension",
  },
  {
    title: "ERP Market System",
    tech: "PHP, SQL",
    desc: "Product & sales management, dashboard and business workflow automation.",
    link: "https://github.com/Mamun-Miah/ERP-Market-Management-System",
  },
  {
    title: "E-commerce & Shopify Website",
    tech: "Shopify, Liquid, WordPress WooCommerce, PHP",
    desc: "E-commerce setup, payment gateway, custom theme, product management & order system.",
    link: "https://mdmamunmiah.com",
  },
];

export default function PortfolioPage() {
  return (
    <section className="min-h-screen mt-24 py-24 bg-[#143c6020]">
      {/* Title Section aligned with cards */}
      <div className="container mx-auto px-6 lg:px-8 mb-16">
        <div className="max-w-5xl">
          <h1 className="mainheading mb-2 text-left">My Projects</h1>
          <h2 className="subheading mb-4 text-left">Crafted With Real-World Needs</h2>
          <p className="para font-bolder text-left text-[#333] max-w-2xl">
            I build software that solves problems from full-stack web apps to automation tools.
            Below are some highlighted projects from my journey.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div
            key={i}
            className=" bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <h3 className="heading3 mb-2 text-[#1b1b1b]">{p.title}</h3>
              <p className="text-sm text-[#efb036] font-semibold mb-2 tracking-wide">
                {p.tech}
              </p>
              <p className="para mb-4 text-[#333] leading-relaxed">{p.desc}</p>
            </div>
            <div>
              <Link
                href={p.link}
                target="_blank"
                className="btn secondery-btn"
              >
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Button */}
      <div className="text-center mt-20">
        <Link
          href="https://github.com/Mamun-Miah"
          target="_blank"
          className="bg-[#3b6790] text-white text-lg md:text-xl border-0 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Visit Full GitHub
        </Link>
      </div>
    </section>
  );
}
