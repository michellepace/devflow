type QuestionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;
  return <h1 className="text-heading-2xl">Question {id}</h1>;
}
