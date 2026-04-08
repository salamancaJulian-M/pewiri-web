import CommentariesCarousel from './CommentariesCarousel';
import { getCommentaries } from '@/services/get-commentaries';

export default async function CommentariesSection() {
  const testimonials = await getCommentaries();

  if (!testimonials || testimonials.length === 0) return null;

  return <CommentariesCarousel initialData={testimonials} />;
}