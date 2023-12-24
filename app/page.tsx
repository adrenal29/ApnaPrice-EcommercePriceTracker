
import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import Catelogue from "@/components/Catelogue"
import Link from "next/link"

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "all";
  const currentPage = Number(searchParams?.page) || 1;
  const allProducts = await getAllProducts(query)
  return (
    <>
      <section className="px-6 md:px-20 py-16">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col py-8">
            <p className="small-text">
              Buy products at best price:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Shop and save with
              <span className="text-primary"> ApnaPrice</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <img src="/assets/images/Hero.png" className="h-348 w-248"></img>
        </div>
      </section>

      <section className="trending-section">
        <div  className="flex items-center">
        <h2 className="section-text">Products In Trend</h2>
        <Link href={"/catelogue"}>
        <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={26}
                height={26}
              />
        </Link>
        </div>
      
        <Catelogue allProducts={allProducts} />
        
      </section>
    </>
  )
}


export default Home