import Navbar from "@/components/layout/navbar/Navbar"
import Footer from "@/components/layout/footer/Footer"

export default function Layout({ children }) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-white font-poppins text-gray-800">
      <Navbar />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  )
}