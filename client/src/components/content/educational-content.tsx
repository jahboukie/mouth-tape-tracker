import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Science Behind Nasal Breathing",
    excerpt: "Learn how nasal breathing improves oxygen uptake, reduces snoring, and helps with sleep quality.",
    imageUrl: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How to Start Mouth Taping Safely",
    excerpt: "A beginner's guide to mouth taping with safety tips and product recommendations.",
    imageUrl: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Benefits of Consistent Mouth Taping",
    excerpt: "Discover the long-term health benefits reported by consistent mouth tapers.",
    imageUrl: "https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  }
];

export default function EducationalContent() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-slate-900">Learn About Mouth Taping</h2>
        <Link href="/learn">
          <div className="text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer">View All</div>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <Card key={article.id} className="overflow-hidden border border-slate-100">
            <AspectRatio ratio={16/9} className="bg-slate-100">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="object-cover h-full w-full"
              />
            </AspectRatio>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg text-slate-900 mb-2">{article.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">{article.excerpt}</p>
              <Link href={`/learn#article-${article.id}`}>
                <div className="text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer">
                  Read Article
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
