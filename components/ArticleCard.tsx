import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { Article } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
  variant?: "grid" | "horizontal" | "featured";
}

export function ArticleCard({ article, variant = "grid" }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="flex gap-4 group hover:bg-slate-50 rounded-2xl p-3 transition-colors"
      >
        <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
          <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{article.category}</span>
          <h4 className="text-sm font-semibold text-slate-800 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{article.title}</h4>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
            <Clock size={11} />
            <span>{article.readTime} menit baca</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/blog/${article.slug}`} className="group block relative rounded-3xl overflow-hidden h-[400px]">
        <Image src={article.thumbnail} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white mb-3">
            {article.category}
          </span>
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{article.title}</h2>
          <p className="text-slate-300 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={article.authorPhoto} alt={article.author} width={28} height={28} className="rounded-full" />
              <span className="text-sm text-slate-300">{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-300 text-sm font-medium">
              Baca <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="bg-white rounded-2xl border border-slate-100 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-700">
            <Tag size={11} />
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={article.authorPhoto} alt={article.author} width={24} height={24} className="rounded-full" />
            <span className="text-xs text-slate-500">{article.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} />
            <span>{article.readTime} menit</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">{formattedDate}</span>
          <Link
            href={`/blog/${article.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:gap-2 transition-all"
          >
            Baca <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
