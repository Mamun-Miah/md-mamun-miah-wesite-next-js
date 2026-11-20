import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen, Check } from 'lucide-react';

const description =
  'Explore my JavaScript OOP Book and Rust Book Bangla, two online books for learning JavaScript and Rust in Bangla at your own pace.';

export const metadata: Metadata = {
  title: 'Programming Books',
  description,
  keywords: ['JavaScript OOP book', 'Rust book Bangla', 'programming books', 'Mamun Miah'],
  alternates: {
    canonical: '/books',
  },
  openGraph: {
    title: 'Programming Books | Mamun Miah',
    description,
    url: '/books',
    type: 'website',
    siteName: 'Mamun Miah',
  },
  twitter: {
    card: 'summary',
    title: 'Programming Books | Mamun Miah',
    description,
  },
};

const books = [
  {
    title: 'JavaScript OOP Book',
    category: 'JavaScript / Bangla Guide',
    mark: 'JS',
    accentClasses: 'bg-[#efb036] text-[#000248]',
    description:
      'A Bangla guide to object-oriented programming in JavaScript. Explore objects, classes, prototypes, and inheritance through explanations, code examples, and practice exercises.',
    highlights: [
      'Practical JavaScript examples and exercises',
      'Chapter navigation and completion tracking',
      'Light and dark reading modes',
    ],
    href: 'https://jsbook.mamundev.com',
    domain: 'jsbook.mamundev.com',
    linkLabel: 'Read JavaScript Book',
  },
  {
    title: 'Rust Book Bangla',
    category: 'Rust / Bangla Translation',
    mark: 'Rust',
    accentClasses: 'bg-[#3b6790] text-white',
    description:
      'An unofficial Bangla translation of The Rust Programming Language. Learn Rust with explanations in Bangla while the original programming terms, commands, and code examples stay in English.',
    highlights: [
      'All 21 chapters, introductory lessons, and appendices',
      'Ownership, borrowing, types, and more',
      'Search, bookmarks, and reading-progress tracking',
    ],
    href: 'https://rust-bangla-book.mamundev.com',
    domain: 'rust-bangla-book.mamundev.com',
    linkLabel: 'Read Rust Book in Bangla',
  },
];

export default function BooksPage() {
  return (
    <main>
      <section className="relative -mt-[90px] bg-gradient-to-br from-[#000248] via-[#172952] to-[#3b6790] px-5 pb-14 pt-36 text-white sm:px-6 sm:pb-16 sm:pt-40 lg:-mt-[100px] lg:px-8 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#efb036] sm:text-base">
            <BookOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
            My Books
          </p>
          <h1 className="max-w-4xl break-words text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Programming Books
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            Two reading projects I&apos;ve built to make learning JavaScript and Rust more approachable.
            Explore the books below and learn one chapter at a time.
          </p>
        </div>
      </section>

      <section aria-label="Book collection" className="bg-gradient-to-b from-[#afc2d3]/10 to-transparent px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {books.map((book) => (
            <article key={book.href} className="flex min-w-0 flex-col rounded-[2rem] border border-slate-100 bg-white p-6 shadow-lg sm:p-7 lg:rounded-[2.5rem] lg:p-8">
              <div className="mb-6 flex items-center gap-4">
                <span aria-hidden="true" className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-mono text-xl font-bold ${book.accentClasses}`}>
                  {book.mark}
                </span>
                <p className="min-w-0 text-xs font-bold uppercase leading-relaxed tracking-wider text-[#3b6790] sm:text-sm">
                  {book.category}
                </p>
              </div>

              <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#000248] lg:text-3xl">
                {book.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-lg">
                {book.description}
              </p>

              <ul aria-label={`${book.title} highlights`} className="mt-6 space-y-3">
                {book.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#3b6790]" aria-hidden="true" />
                    <span className="min-w-0">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p className="mb-4 break-all font-mono text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {book.domain}
                </p>
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3b6790] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#2a5175] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b6790] sm:text-base"
                >
                  {book.linkLabel}
                  <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-center text-sm leading-relaxed text-slate-500">
          Each book has its own dedicated website. Reading links open in a new tab.
        </p>
      </section>
    </main>
  );
}
