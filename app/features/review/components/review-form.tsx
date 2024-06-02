export const ReviewForm = () => {
  return (
    <form>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-md"
        placeholder="리뷰를 작성해주세요."
      ></textarea>
      <button className="btn-primary mt-2">작성하기</button>
    </form>
  );
};
