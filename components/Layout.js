import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useReveal } from "../lib/useReveal";

export default function Layout({ children }) {
  const router = useRouter();
  useReveal(router.asPath);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
