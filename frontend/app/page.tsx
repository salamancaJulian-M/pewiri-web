import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import CommentariesSection from "@/components/CommentariesSection";

export default async function Home() {  
  return (
    <>
    <Hero/>
    <Categories/>
    <CommentariesSection />
    </>
    );
};
