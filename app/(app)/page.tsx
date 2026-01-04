import { QuestionCard } from "@/components/question-card";
import { getAllQuestions } from "@/lib/data/questions";

const HomePage = async () => {
  const questions = await getAllQuestions();

  return (
    <>
      <h1 className="text-heading-2xl">All Questions</h1>

      <div className="mt-8 space-y-6">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
