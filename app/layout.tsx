import type { Metadata } from "next";
import { Nanum_Myeongjo, Nanum_Gothic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd, buildLocalBusinessSchema, siteUrl } from "@/lib/schema";

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const nanumGothic = Nanum_Gothic({
  variable: "--font-nanum-gothic",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const siteTitle = "석촌 | 남한산성 백숙·삼계탕 전문 한정식집";
const siteDescription =
  "경기 광주시 남한산성면에서 20년간 운영해온 백숙·삼계탕 전문 한정식집 석촌. 농림축산식품부 인증 안심식당, KBS 방송 2회 출연.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | 석촌",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "naver-site-verification": "7e40d9bd18beb606db07648e23dfb4b1f3d734c4",
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "석촌",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/store-exterior.webp",
        width: 1536,
        height: 2048,
        alt: "석촌 매장 입구 전경",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/store-exterior.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${nanumMyeongjo.variable} ${nanumGothic.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <JsonLd data={buildLocalBusinessSchema()} />
      </body>
    </html>
  );
}
