import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import heroTemplate from "../assets/images/hero_ui_template.jpg";
import heroVideo from "../assets/images/hero_bg.mp4";

export default function StreamVibePage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Home");

  const navLinks = ["Home", "Movies & Shows", "Support", "Subscriptions"];

  const posters = [
    "Money Heist",
    "Dark",
    "Wednesday",
    "YOU",
    "Narcos",
    "Breaking Bad",
    "Stranger Things",
    "Witcher",
    "Peaky Blinders",
    "1899",
  ];

  return (
    <div className="min-h-screen font-sans text-white bg-[#0a0a0a]">
      
{/* NAVBAR */}

<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0a0a0a]/70 backdrop-blur-md">

<div className="flex items-center gap-2">
<div className="flex items-center justify-center bg-red-500 rounded-lg w-7 h-7">
<span className="text-xs font-black">{">"}</span>
</div>
<span className="text-lg font-bold">StreamVibe</span>
</div>

<div className="hidden gap-2 p-1 rounded-xl md:flex bg-white/5">
{navLinks.map((link) => (
<button
key={link}
onClick={() => setActiveNav(link)}
className={`px-4 py-2 rounded-lg text-sm transition ${
activeNav === link
? "bg-white/10 text-white"
: "text-white/50 hover:text-white"
}`}
>
{link}
</button>
))}
</div>

<div className="flex gap-4 text-white/60">
<button>Search</button>
<button>Alerts</button>
</div>

</nav>

{/* HERO SECTION */}

<section className="relative flex items-center justify-center min-h-screen pt-24 pb-20 overflow-hidden">

{/* Background Video */}
<video
autoPlay
loop
muted
playsInline
className="absolute inset-0 object-cover w-full h-full"
>
<source src={heroVideo} type="video/mp4" />
</video>

{/* Glass overlay */}
<div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

{/* HERO CONTENT */}
<div className="relative z-10 grid items-center max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2">

{/* HERO TEXT */}

<div className="flex flex-col items-center text-center md:text-left md:items-start">

<motion.h1
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="text-5xl font-bold leading-tight"
>
The Best Streaming Experience
</motion.h1>

<motion.p
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2, duration: 0.8 }}
className="mt-6 text-lg leading-relaxed text-white/70"
>
StreamVibe lets you watch your favorite movies and TV shows
anytime, anywhere with a beautiful cinematic streaming experience.
</motion.p>

<motion.button
onClick={() => navigate("/home")}
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.4 }}
className="inline-flex items-center gap-2 py-3 mt-8 font-semibold text-white transition-all duration-300 bg-red-600 shadow-xl px-7 rounded-xl hover:bg-red-500 hover:scale-105"
>
Start Watching Now
</motion.button>

<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1 }}
className="mt-8 text-sm tracking-wide text-white/60 md:text-base"
>
Discover thousands of movies, TV shows, and exclusive originals - all in one streaming platform.
</motion.p>

</div>

{/* HERO UI TEMPLATE */}

<motion.div
initial={{ opacity: 0, x: 80 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: 0.6, duration: 1 }}
className="flex justify-center"
>

<motion.img
src={heroTemplate}
alt="StreamVibe UI"
className="w-[520px] max-w-full rounded-2xl border border-white/10 shadow-2xl"
animate={{ y: [0, -15, 0] }}
transition={{
duration: 6,
repeat: Infinity,
ease: "easeInOut"
}}
/>

</motion.div>

</div>

</section>

{/* TRENDING MOVIES */}

<section className="px-6 py-20 md:px-16">

<h2 className="mb-8 text-2xl font-bold">Trending Movies</h2>

<div className="overflow-hidden">

<motion.div
animate={{ x: ["0%", "-50%"] }}
transition={{
repeat: Infinity,
duration: 25,
ease: "linear"
}}
className="flex gap-4 w-max"
>

{[...posters, ...posters].map((movie, i) => (
<div
key={i}
className="flex items-end w-40 h-56 p-2 rounded-lg bg-gradient-to-br from-red-500/30 to-black"
>
<span className="text-xs text-white/80">{movie}</span>
</div>
))}

</motion.div>

</div>

</section>

{/* CTA */}

<section className="py-20 mx-6 rounded-3xl md:mx-16 bg-gradient-to-r from-red-600/20 to-transparent">

<div className="max-w-lg px-10">

<h2 className="mb-4 text-3xl font-bold">
Start your free trial today!
</h2>

<p className="mb-8 text-white/60">
Join StreamVibe and explore thousands of movies, shows and exclusive originals.
</p>

<button className="px-6 py-3 transition bg-red-600 rounded-xl hover:bg-red-500">
Start Free Trial
</button>

</div>

</section>

{/* FOOTER */}

<footer className="flex justify-between px-6 py-10 md:px-16 text-white/40">

<span>StreamVibe (c) 2026</span>

<div className="flex gap-6 text-sm">
<a href="#">Privacy</a>
<a href="#">Terms</a>
<a href="#">Contact</a>
</div>

</footer>

</div>
  );
}