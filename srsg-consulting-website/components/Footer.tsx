import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-foreground">SRSG Consulting</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Empowering businesses with modern strategic insights and technological excellence.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">About Us</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Services</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-4">Services</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/esi" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">ESI</Link></li>
            <li><Link href="/epfo" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">EPFO</Link></li>
            <li><Link href="/factories-act" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Factories Act</Link></li>
            <li><Link href="/compliance-consulting" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Compliance</Link></li>
            <li><Link href="/digital-signature" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Digital Signature</Link></li>
            <li><Link href="/health-insurance" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Health Insurance</Link></li>
            <li><Link href="/digital-marketing" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded outline-none p-1 -ml-1">Digital Marketing</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} SRSG Consulting. All rights reserved.</p>
        <div className="flex gap-4">
          {/* Social stubs */}
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
