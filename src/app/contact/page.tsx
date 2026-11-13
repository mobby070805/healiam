import type { Metadata } from "next";
import { site } from "@/lib/site";
import { contact } from "@/lib/pages/contact";
import { contactGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { ContactHero, ContactMethods, ContactForm } from "@/components/contact/ContactSections";

const url = `${site.url}${contact.path}`;

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: contact.meta.title,
    description: contact.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: contact.meta.title, description: contact.meta.description },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactGraph()} />
      <Header />
      <main>
        <ContactHero />
        <ContactMethods />
        <ContactForm />
        <FinalCta finalCta={contact.finalCta} />
      </main>
      <Footer />
    </>
  );
}
