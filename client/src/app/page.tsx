import { Banner } from "../components/banner";
import { Feed } from "../components/feed";
import { Filtering } from "../components/filtering";
import Footer from "../components/footer";
import { Hero } from "../components/hero";

export default function Home() {
  return (
    <>
    <Banner/>
    <Hero/>
    <Filtering/>
    <Feed/>
    <Footer/>
    </>
  );
}
