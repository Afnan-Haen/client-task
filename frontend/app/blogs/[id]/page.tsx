import BlogDetail from "../../Page/BlogDetail";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <BlogDetail id={resolvedParams.id} />;
}
