import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // আপাতত সব রিকোয়েস্ট স্বাভাবিকভাবে পাস হতে দিচ্ছি। 
  // পরে এখানে আমরা অ্যাডমিন প্যানেলের সিকিউরিটি লজিক বসাবো।
  return NextResponse.next();
}

// কোন কোন রাউটে মিডলওয়্যার কাজ করবে তার কনফিগারেশন
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};