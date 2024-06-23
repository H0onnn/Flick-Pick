import { PageLayout, MainHeader, Flex } from "@/app/shared/components";

import {
  InventorySection,
  UserInfoSection,
} from "@/app/features/user/sections";
import { redirectTo } from "@/app/shared/actions";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: Props) {
  if (!searchParams.category) {
    await redirectTo(`/user/info/${params.id}?category=review`);
  }

  return (
    <PageLayout header={<MainHeader />} className="pt-5">
      <Flex className="gap-4">
        <UserInfoSection />

        <InventorySection category={searchParams?.category as string} />
      </Flex>
    </PageLayout>
  );
}
