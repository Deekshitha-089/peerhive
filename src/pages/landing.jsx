import Navbar from "../components/navbar";
import { Link } from "wouter";
import { Button } from "@/components/ui/custom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/academic-hero.png" 
          alt="Students collaborating" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm"></div>
      </div>

      {/* Navbar (Transparent) */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
           {/* Logo Icon */}
           <div className="w-8 h-8 bg-[hsl(292,27%,36%)] rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">P</div>
           <span className="font-heading text-2xl font-bold text-[hsl(240,10%,20%)]">PeerHive</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-ui text-[hsl(240,10%,20%)]">
          <a href="#features" className="hover:text-[hsl(292,27%,36%)] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[hsl(292,27%,36%)] transition-colors">How It Works</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:block">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-6xl md:text-7xl lg:text-8xl text-[hsl(292,27%,36%)] mb-4 leading-tight"
        >
          PeerHive
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-2xl md:text-3xl text-[hsl(240,10%,20%)] mb-6 italic"
        >
          Collaborate. Review. Elevate.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-body text-lg text-[hsl(240,5%,40%)] max-w-2xl mb-12 leading-relaxed"
        >
          A structured academic platform transforming peer evaluation into meaningful growth. 
          Experience a new standard of collaborative learning.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-[hsl(292,27%,36%)]/20">
              Start Collaborating
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Student Login
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Footer / Decorative Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  );
}
