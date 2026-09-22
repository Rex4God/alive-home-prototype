import { MoveRight } from "lucide-react";

export default function Subscribe() {
  return (
    <>
      <section className="bg-[#F4E8E1] px-4 lg:px-6 py-10 md:p-20">
        <div className="text-center max-w-5xl mx-auto py-10 md:py-20 px-6 text-white border-2 border-white bg-[#C77D01] rounded-xl">
          <h2 className="font-bold text-4xl">Subscribe for our newsletter</h2>
          <p className="text-2xl mt-6 mb-10">
            Get informed of our various offer
          </p>
          <p className="px-4 lg:px-16">
            Stay in the loop with all the latest updates, exclusive offers, and
            special promotions by subscribing to our newsletter. Enter your
            email address below to join our mailing list . Be the first to know
            about exciting news and upcoming products.
          </p>

          <div className="bg-white mt-12 rounded-lg p-1.5 md:p-2.5 max-w-2xl mx-auto">
            <form action="">
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-[85%] p-3 focus:outline-none text-black placeholder:text-[#8F8F8F] placeholder:text-xs"
                />

                <button className="bg-[#C77D01] hover:bg-[#C77D01]/90 text-white cursor-pointer flex items-center justify-between w-[150px] px-2  rounded-lg">
                  Subscribe
                  <MoveRight className="hidden md:block" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
