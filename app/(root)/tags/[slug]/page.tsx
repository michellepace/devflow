type TagPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  return <h1 className="text-heading-2xl">Tag: {slug}</h1>;
}
