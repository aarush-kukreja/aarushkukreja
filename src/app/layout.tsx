import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aarushkukreja.com"), // Create a URL object
  alternates: {
    canonical: "https://aarushkukreja.com",
  },
  title: 'Aarush Kukreja',
  description:
    "Aarush Kukreja is a computer science student at Princeton University studying computer science and quant finance.",
  keywords:
    "Aarush Kukreja, Algorithmic Trading, Derivatives, Risk Management, Quantitative Analysis, Portfolio Optimization, Monte Carlo Simulation, Arbitrage, Volatility, Fixed Income, Financial Modeling, Time Series Analysis, Statistical Arbitrage, Asset Pricing, Market Microstructure, High-Frequency Trading, Econometrics, Black-Scholes Model, Value at Risk (VaR), Machine Learning in Finance, Behavioral Finance, Agile Methodology, Object-Oriented Programming, DevOps, Continuous Integration, Continuous Deployment, Scrum, Version Control, Microservices, Unit Testing, System Design, Debugging, Refactoring, API Development, Cloud Computing, Big Data, Data Structures, Algorithms, User Interface (UI) Design, User Experience (UX) Design, Software Development Lifecycle (SDLC), Database Management",
  openGraph: {
    locale: "en_US",
    siteName: "Aarush Kukreja",
    type: "website",
    title: "Aarush Kukreja",
    description:
      "Aarush Kukreja is a computer science student at Princeton University studying computer science and quant finance.",
    url: "https://aarushkukreja.com",
    images: [
      {
        url: "./Card.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
