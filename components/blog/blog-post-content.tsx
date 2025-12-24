"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  publishDate: Date;
  readTime: number;
  views: number;
  author: string;
}

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const htmlContent = marked(post.content);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <article className="py-12 min-h-screen" style={{ background: "linear-gradient(180deg, #0A0E27 0%, #1A1F3A 100%)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog">
          <button className="mb-8 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors flex items-center">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Orqaga
          </button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4"
              style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}>
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.publishDate).toISOString().split('T')[0].split('-').reverse().join('/')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} daqiqa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} ko&apos;rishlar</span>
              </div>
              <button
                onClick={handleShare}
                className="ml-auto px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Ulashish
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none mb-12
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-purple-500/30 prose-h2:pb-3
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-purple-300
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-cyan-300
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-purple-400 prose-a:underline hover:prose-a:text-purple-300
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-purple-200 prose-em:italic
            prose-ul:my-4 prose-ul:pl-6
            prose-ol:my-4 prose-ol:pl-6
            prose-li:text-gray-300 prose-li:mb-2 prose-li:marker:text-purple-400
            prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/10 prose-blockquote:pl-6 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-300
            prose-code:bg-purple-500/20 prose-code:text-purple-300 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-purple-500/30 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
            prose-table:border-collapse prose-table:w-full prose-table:my-6
            prose-th:bg-purple-500/20 prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:border prose-th:border-purple-500/30
            prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-purple-500/20 prose-td:text-gray-300
            prose-hr:border-purple-500/30 prose-hr:my-8
            prose-img:rounded-xl prose-img:shadow-lg"
        >
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t pt-8"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Muallif</p>
              <p className="text-lg font-semibold text-white">{post.author}</p>
            </div>
            <Link href="/blog">
              <button className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}>
                Boshqa Maqolalar
              </button>
            </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-8 rounded-2xl text-white text-center"
          style={{
            background: "linear-gradient(135deg, #FF0080, #7928CA)",
            boxShadow: "0 20px 60px rgba(255, 0, 128, 0.3)",
          }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Loyihangizni Biz Bilan Boshlang!
          </h3>
          <p className="mb-6 text-white/90">
            Professional web saytlar, Telegram botlar va AI yechimlarini taqdim etamiz
          </p>
          <Link href="/#contact">
            <button className="px-8 py-4 rounded-xl font-bold bg-white hover:bg-gray-100 transition-all"
              style={{ color: "#FF0080" }}>
              Bepul Konsultatsiya
            </button>
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
