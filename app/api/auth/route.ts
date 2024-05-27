import prisma from "@/app/shared/lib/prisma";

// kakao 로그인 요청시 회원 중복 검사 api
export async function snsLogin({ req, res }: { req: any; res?: any }) {
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (user) {
    return res.status(200).json({ message: "이미 가입된 유저입니다." });
  }

  return res.status(200).json({ message: "가입된 사용자가 없습니다." });
}
