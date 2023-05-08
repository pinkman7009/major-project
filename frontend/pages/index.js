import Link from "next/link";
import Searchbar from "../components/Searchbar";

export default function Home() {
  return (
    <>
      <div className="flex mx-auto mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-[3rem] font-semibold my-6">
            Welcome to <span className="text-primary">LawBuddy</span>
          </h1>
          <p className="text-xl my-6">
            India's first complete Law-Tech solution with AI
          </p>

          <p className="text-md my-6">
            Describe your problem to get instant recommendations
          </p>
          <Searchbar />
        </div>

        <div className="w-1/2 h-full flex justify-center items-center">
          <img src="landingpage.svg" alt="" />
        </div>
      </div>
      <div className="m-16">
        <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
          Popular Legal Services
        </h3>

        <div className="p-3 rounded-lg border-2 border-primary h-96 p-6 text-center w-full rounded-md flex justify-center items-center">
          <div className="w-full">
            <div className="flex justify-evenly items-center">
              <div className="bg-primary text-white p-3 rounded w-64 h-40 flex flex-col justify-center items-center">
                <p className="font-bold text-lg">Contract Review</p>

                <p className="font-light">
                  Get your contracts reviewed by lawyers!
                </p>
              </div>
              <div className="bg-primary text-white p-3 rounded w-64 h-40 flex flex-col justify-center items-center">
                <p className="font-bold text-lg">Income Tax filings</p>

                <p className="font-light">
                  Income tax filings can be a real headache. Let the lawyers
                  handle it!
                </p>
              </div>
              <div className="bg-primary text-white p-3 rounded w-64 h-40 flex flex-col justify-center items-center">
                <p className="font-bold text-lg">Legal Advice</p>

                <p className="font-light">
                  Seeking legal advice on a matter? No worries, there are
                  lawyers out there giving your legal advice on any matter.
                </p>
              </div>
            </div>

            <Link href="/services">
              <button className="bg-primary text-white transition-all ease-in p-2 h-12 w-94 mt-6 text-primary my-3 text-sm rounded-lg font-bold">
                Choose services
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="m-16">
        <h3 className="text-white font-bold text-2xl my-6 p-3 rounded-lg border-2 border-primary w-1/4 text-center">
          AI based Services
        </h3>

        <div className="p-3 rounded-lg border-2 border-primary h-96 p-6 flex justify-evenly items-center text-center w-full rounded-md ">
          <div className="bg-primary text-white p-3 rounded w-64 h-72 flex flex-col justify-between items-center">
            <p className="font-bold text-lg">Legal Document Simplifier</p>

            <p className="font-light">
              This AI tool will help to summarize any form of legal text or
              document. Get a basic idea of what the document says quickly!
            </p>

            <Link href="/summarizer">
              <button className="bg-white text-primary transition-all ease-in p-2 w-20 text-primary my-3 text-sm rounded font-bold">
                View
              </button>
            </Link>
          </div>
          <div className="bg-primary text-white p-6 rounded w-64 h-72 flex flex-col justify-between items-center">
            <p className="font-bold text-lg">Contract Analyzer</p>

            <p className="font-light">
              Legal words are super confusing. No worries. Our AI analyzes it so
              that you can answer any questions to it and get them answered.
            </p>
            <Link href="/analyzer">
              <button className="bg-white text-primary transition-all ease-in p-2 w-20 text-primary my-3 text-sm rounded font-bold">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
