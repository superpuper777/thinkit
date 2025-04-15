import Spinner from "@/components/Spinner/Spinner";

const QuizLoading = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
        <Spinner />
      </div>
    );
  }
  export default QuizLoading;