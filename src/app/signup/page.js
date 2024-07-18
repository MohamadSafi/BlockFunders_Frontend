import Footer from "@/components/Footer/Footer";
import SignUpForm from "@/components/SignUp/SignUpForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-auto p-4 bg-[#fdf0e1]">
      <div className="flex justify-center mt-12">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-medium"
        >
          <p className="text-4xl font-bold font-sans">
            <span className="text-[#7BA7D7]">B</span>lock
            <span className="text-[#7BA7D7]">F</span>unders
          </p>
        </Link>
      </div>
      <SignUpForm />
      <Footer />
    </main>
  );
}
