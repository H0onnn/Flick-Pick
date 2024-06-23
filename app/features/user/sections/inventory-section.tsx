import { Flex } from "@/app/shared/components";
import { CategoryTabs, WishMovieList } from "../components";
import { MyReviews } from "../components/my-review-list";

export const InventorySection = ({ category }: { category: string }) => {
  return (
    <Flex
      direction="column"
      className="bg-gray-50 border-border border-solid border rounded-md w-full h-full p-6"
      asChild
    >
      <section>
        <p className="head6sb">내 활동</p>

        <div className="pt-4">
          <CategoryTabs />
        </div>

        {category === "review" && <MyReviews />}
        {category === "wishlist" && <WishMovieList />}
      </section>
    </Flex>
  );
};
